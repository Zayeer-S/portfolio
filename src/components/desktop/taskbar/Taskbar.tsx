'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { TaskbarProps } from '@/types';
import { LAYOUT_CONSTANTS } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { getAppIcon } from '@/styles/icons';
import { useTaskbarDrag } from '@/hooks/useTaskbarDrag';
import TaskbarDragPreview from './TaskbarDragPreview';
import TaskbarItem from './TaskbarItem';
import SystemTray from './SystemTray';

export default function Taskbar({ 
  windows, 
  onToggleStartMenu, 
  onMinimizeWindow, 
  currentTime, 
  isClient 
}: TaskbarProps) {
  const [taskbarOrder, setTaskbarOrder] = useState<string[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const dragLogic = useTaskbarDrag();

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchSupported);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  // Get open windows and maintain order
  const openWindows = Object.entries(windows).filter(([, window]) => window.isOpen);
  const currentWindowIds = openWindows.map(([id]) => id);
  
  const orderedWindowIds = useMemo(() => {
    return taskbarOrder.filter(id => currentWindowIds.includes(id))
      .concat(currentWindowIds.filter(id => !taskbarOrder.includes(id)));
  }, [taskbarOrder, currentWindowIds]);

  // Update order when windows change
  useEffect(() => {
    const orderedIds = orderedWindowIds.join(',');
    const currentOrderIds = taskbarOrder.filter(id => currentWindowIds.includes(id)).join(',');
    
    if (orderedIds !== currentOrderIds) {
      setTaskbarOrder(orderedWindowIds);
    }
  }, [orderedWindowIds, taskbarOrder, currentWindowIds]);

  // Handle drag start
  const handleMouseDown = useCallback((e: React.MouseEvent, windowId: string) => {
    if (e.button !== 0) return;
    
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    dragLogic.startDrag(windowId, e.clientX, e.clientY, containerRect);
    e.preventDefault();
  }, [dragLogic]);

  const handleTouchStart = useCallback((e: React.TouchEvent, windowId: string) => {
    if (dragLogic.isProcessingTouch) return;
    
    const touch = e.touches[0];
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    dragLogic.startDrag(windowId, touch.clientX, touch.clientY, containerRect);
    e.stopPropagation();
  }, [dragLogic]);

  // Handle insertion position updates during drag
  const updateInsertionPosition = useCallback((clientX: number) => {
    if (containerRef.current && dragLogic.draggedItem) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = clientX - containerRect.left;
      
      let newInsertionIndex = 0;
      const buttons = containerRef.current.querySelectorAll('[data-taskbar-item]');
      
      for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i] as HTMLElement;
        const buttonRect = button.getBoundingClientRect();
        const buttonX = buttonRect.left - containerRect.left;
        const buttonWidth = buttonRect.width;
        
        if (mouseX < buttonX + buttonWidth / 2) {
          newInsertionIndex = i;
          break;
        }
        newInsertionIndex = i + 1;
      }
      
      const draggedIndex = orderedWindowIds.indexOf(dragLogic.draggedItem);
      if (newInsertionIndex > draggedIndex) {
        newInsertionIndex--;
      }
      
      if (newInsertionIndex !== dragLogic.insertionIndex) {
        dragLogic.setInsertionIndex(newInsertionIndex);
        
        const newOrder = [...orderedWindowIds];
        const draggedItemIndex = newOrder.indexOf(dragLogic.draggedItem);
        if (draggedItemIndex !== -1) {
          newOrder.splice(draggedItemIndex, 1);
          newOrder.splice(newInsertionIndex, 0, dragLogic.draggedItem);
          setTaskbarOrder(newOrder);
        }
      }
    }
  }, [dragLogic, orderedWindowIds]);

  // Global mouse/touch handlers for drag operations
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragLogic.draggedItem) return;
      
      dragLogic.updateDrag(e.clientX, e.clientY);
      
      if (dragLogic.hasDraggedBeyondThreshold) {
        updateInsertionPosition(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragLogic.draggedItem) return;
      
      const touch = e.touches[0];
      if (!touch) return;
      
      dragLogic.updateDrag(touch.clientX, touch.clientY);
      
      if (dragLogic.hasDraggedBeyondThreshold) {
        updateInsertionPosition(touch.clientX);
        e.preventDefault();
      }
    };

    const handleMouseUp = () => {
      dragLogic.endDrag(onMinimizeWindow);
    };

    const handleTouchEnd = () => {
      if (!dragLogic.isProcessingTouch) {
        dragLogic.endDrag(onMinimizeWindow);
      }
    };

    if (dragLogic.draggedItem) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true });
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.userSelect = '';
    };
  }, [dragLogic.draggedItem, dragLogic.hasDraggedBeyondThreshold, updateInsertionPosition, onMinimizeWindow, dragLogic]);

  return (
    <>
      <div 
        className={`fixed bottom-0 left-0 right-0 h-11 ${styles.taskbar.background} flex items-center px-2 z-50`}
        style={{ zIndex: LAYOUT_CONSTANTS.Z_INDEX.TASKBAR }}
        role="toolbar"
        aria-label="Taskbar"
      >
        {/* Start Button */}
        <button
          className={`h-[33.5px] w-[42px] ${styles.taskbar.startButton} rounded text-sm font-medium flex items-center justify-center border-0 hover:scale-110 transition-all duration-150`}
          onClick={onToggleStartMenu}
          style={{ border: 'none', outline: 'none' }}
          aria-label="Open start menu"
        >
          {getAppIcon('startMenu', { size: 32 })}
        </button>

        {/* Task Buttons Container */}
        <div 
          ref={containerRef} 
          className="flex ml-3 space-x-1 relative"
          role="group"
          aria-label="Open windows"
        >
          {orderedWindowIds.map((windowId) => {
            const window = windows[windowId];
            if (!window?.isOpen) return null;
            
            const isBeingDragged = dragLogic.draggedItem === windowId;
            const isClicked = dragLogic.clickedItem === windowId;
            
            return (
              <TaskbarItem
                key={windowId}
                windowId={windowId}
                isMinimized={window.isMinimized}
                isBeingDragged={isBeingDragged}
                isClicked={isClicked}
                isTouchDevice={isTouchDevice}
                taskbarButtonClasses={styles.taskbar.taskButtons}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              />
            );
          })}
        </div>

        {/* System Tray */}
        <SystemTray 
          currentTime={currentTime}
          isClient={isClient}
          systemTrayClasses={styles.taskbar.systemTray}
        />
      </div>

      {/* Drag Preview Portal */}
      {dragLogic.isDragging && dragLogic.draggedItem && dragLogic.taskbarRect && (
        <TaskbarDragPreview 
          windowId={dragLogic.draggedItem} 
          position={dragLogic.dragPosition} 
          taskbarRect={dragLogic.taskbarRect}
        />
      )}
    </>
  );
}