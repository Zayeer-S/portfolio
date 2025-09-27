import { useState, useRef, useEffect, useCallback } from 'react';
import { TaskbarProps, WindowId } from '@/types';
import { LAYOUT_CONSTANTS } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function Taskbar({ 
  windows, 
  onToggleStartMenu, 
  onMinimizeWindow, 
  startMenuOpen, 
  currentTime, 
  isClient 
}: TaskbarProps) {
  const [taskbarOrder, setTaskbarOrder] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [insertionIndex, setInsertionIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggedElementRef = useRef<HTMLButtonElement>(null);

  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [hasDraggedBeyondThreshold, setHasDraggedBeyondThreshold] = useState(false);
  const [lastMinimizeTime, setLastMinimizeTime] = useState<number>(0);
  const [isProcessingTouch, setIsProcessingTouch] = useState<boolean>(false);
  
  const DRAG_THRESHOLD = 5;
  const MINIMIZE_DEBOUNCE = 200;

  useEffect(() => {
    const checkTouchDevice = () => {
      const touchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(touchSupported);
    };
    
    checkTouchDevice();
    window.addEventListener('resize', checkTouchDevice);
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  const getWindowSymbol = (windowId: string) => {
    const symbols: { [key: string]: string } = {
      projects: '📁',
      technologies: '⚙️',
      contact: '📧',
      settings: '⚙️',
      calculator: '🔢',
      notepad: '📝',    
    };
    return symbols[windowId] || '❓';
  };

  // Get open windows and maintain order
  const openWindows = Object.entries(windows).filter(([_, window]) => window.isOpen);
  const currentWindowIds = openWindows.map(([id]) => id);
  const orderedWindowIds = taskbarOrder.filter(id => currentWindowIds.includes(id))
    .concat(currentWindowIds.filter(id => !taskbarOrder.includes(id)));

  // Update order when windows change
  useEffect(() => {
    if (orderedWindowIds.length !== taskbarOrder.length || 
        !orderedWindowIds.every(id => taskbarOrder.includes(id))) {
      setTaskbarOrder(orderedWindowIds);
    }
  }, [currentWindowIds.join(',')]);

  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    if (e.button !== 0) return; // Only left click
    
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedItem(windowId);
    setDragStartPosition({ x: e.clientX, y: e.clientY });
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDragPosition({ x: e.clientX, y: e.clientY });
    setHasDraggedBeyondThreshold(false);
    
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent, windowId: string) => {
    console.log('TASKBAR DEBUG: touchStart for', windowId, 'touches:', e.touches.length, 'isProcessingTouch:', isProcessingTouch);
    
    if (isProcessingTouch) {
      console.log('TASKBAR DEBUG: Skipping touchStart - already processing');
      return;
    }
    
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedItem(windowId);
    setDragStartPosition({ x: touch.clientX, y: touch.clientY });
    setDragOffset({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    });
    setDragPosition({ x: touch.clientX, y: touch.clientY });
    setHasDraggedBeyondThreshold(false);
    
    e.stopPropagation();
  };

  const updateInsertionPosition = useCallback((clientX: number) => {
    if (containerRef.current && draggedItem) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const mouseX = clientX - containerRect.left;
      
      // Find which position to insert at
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
      
      // Don't count the dragged item itself
      const draggedIndex = orderedWindowIds.indexOf(draggedItem);
      if (newInsertionIndex > draggedIndex) {
        newInsertionIndex--;
      }
      
      if (newInsertionIndex !== insertionIndex) {
        setInsertionIndex(newInsertionIndex);
        
        // Update order in real-time during drag
        const newOrder = [...orderedWindowIds];
        const draggedItemIndex = newOrder.indexOf(draggedItem);
        if (draggedItemIndex !== -1) {
          newOrder.splice(draggedItemIndex, 1);
          newOrder.splice(newInsertionIndex, 0, draggedItem);
          setTaskbarOrder(newOrder);
        }
      }
    }
  }, [draggedItem, orderedWindowIds, insertionIndex]);

  const handleDragEnd = useCallback(() => {
    console.log('TASKBAR DEBUG: handleDragEnd called', { draggedItem, hasDraggedBeyondThreshold, isProcessingTouch });
    
    // Prevent multiple rapid calls
    if (isProcessingTouch) {
      console.log('TASKBAR DEBUG: Already processing touch, skipping');
      return;
    }
    
    // Handle click/tap if no drag occurred
    if (draggedItem && !hasDraggedBeyondThreshold) {
      const now = Date.now();
      console.log('TASKBAR DEBUG: Time since last minimize:', now - lastMinimizeTime);
      
      // Debounce rapid calls
      if (now - lastMinimizeTime > MINIMIZE_DEBOUNCE) {
        setIsProcessingTouch(true);
        setClickedItem(draggedItem);
        setLastMinimizeTime(now);
        
        setTimeout(() => {
          console.log('TASKBAR DEBUG: About to call onMinimizeWindow for', draggedItem);
          onMinimizeWindow(draggedItem as WindowId);
          setClickedItem(null);
          
          // Reset processing state after a delay
          setTimeout(() => {
            setIsProcessingTouch(false);
          }, 200);
        }, 100);
      } else {
        console.log('TASKBAR DEBUG: Minimize call debounced');
      }
    }
    
    setIsDragging(false);
    setDraggedItem(null);
    setInsertionIndex(-1);
    setHasDraggedBeyondThreshold(false);
  }, [draggedItem, hasDraggedBeyondThreshold, onMinimizeWindow, lastMinimizeTime, isProcessingTouch]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedItem) return;
      
      // Check if we've moved beyond the threshold to start actual dragging
      const deltaX = Math.abs(e.clientX - dragStartPosition.x);
      const deltaY = Math.abs(e.clientY - dragStartPosition.y);
      const hasMovedBeyondThreshold = deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD;
      
      if (hasMovedBeyondThreshold && !hasDraggedBeyondThreshold) {
        setHasDraggedBeyondThreshold(true);
        setIsDragging(true);
      }
      
      if (hasDraggedBeyondThreshold) {
        setDragPosition({ x: e.clientX, y: e.clientY });
        updateInsertionPosition(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!draggedItem) return;
      
      const touch = e.touches[0];
      if (!touch) return;
      
      // Check if we've moved beyond the threshold to start actual dragging
      const deltaX = Math.abs(touch.clientX - dragStartPosition.x);
      const deltaY = Math.abs(touch.clientY - dragStartPosition.y);
      const hasMovedBeyondThreshold = deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD;
      
      if (hasMovedBeyondThreshold && !hasDraggedBeyondThreshold) {
        setHasDraggedBeyondThreshold(true);
        setIsDragging(true);
        e.preventDefault(); // Prevent scrolling when dragging
      }
      
      if (hasDraggedBeyondThreshold) {
        setDragPosition({ x: touch.clientX, y: touch.clientY });
        updateInsertionPosition(touch.clientX);
        e.preventDefault();
      }
    };

    const handleMouseUp = () => {
      handleDragEnd();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      console.log('TASKBAR DEBUG: Global touchEnd fired, isProcessingTouch:', isProcessingTouch);
      
      // Only handle if not already processing
      if (!isProcessingTouch) {
        handleDragEnd();
      }
    };

    if (draggedItem) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: false, capture: true });
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      document.removeEventListener('touchmove', handleTouchMove, { capture: true } as any);
      document.removeEventListener('touchend', handleTouchEnd, { capture: true } as any);
      document.body.style.userSelect = '';
    };
  }, [draggedItem, dragStartPosition, hasDraggedBeyondThreshold, updateInsertionPosition, handleDragEnd]);

  return (
    <div className={`fixed bottom-0 left-0 right-0 h-11 ${styles.taskbar.background} flex items-center px-2 z-50`}
         style={{ zIndex: LAYOUT_CONSTANTS.Z_INDEX.TASKBAR }}>
      {/* Start Button */}
      <button
        className={`h-8 px-4 ${styles.taskbar.startButton} rounded text-sm font-medium flex items-center border-0`}
        onClick={onToggleStartMenu}
        style={{ border: 'none', outline: 'none' }}
      >
        <div className="w-4 h-4 mr-2">
          <div className="w-full h-full bg-white rounded-sm opacity-80"></div>
        </div>
        Start
      </button>

      {/* Task Buttons Container */}
      <div ref={containerRef} className="flex ml-2 space-x-1 relative">
        {orderedWindowIds.map((windowId) => {
          const window = windows[windowId];
          if (!window?.isOpen) return null;
          
          const isBeingDragged = draggedItem === windowId;
          
          return (
            <button
              key={windowId}
              ref={isBeingDragged ? draggedElementRef : undefined}
              data-taskbar-item={windowId}
              onMouseDown={(e) => handleMouseDown(e, windowId)}
              onTouchStart={(e) => handleTouchStart(e, windowId)}
              className={`h-8 w-10 text-3xl transition-all duration-150 flex items-center justify-center leading-none ${styles.taskbar.taskButtons} ${
                isBeingDragged ? 'opacity-0 pointer-events-none' : 
                clickedItem === windowId ? 'scale-75' : 'hover:scale-105'
              } ${isTouchDevice ? 'touch-manipulation' : ''}`}
              style={{ 
                cursor: 'default',
                userSelect: 'none',
                textShadow: window.isMinimized 
                  ? '0 0 3px rgba(0,0,0,0.3)' 
                  : '0 0 4px rgba(0,0,0,0.5)',
                opacity: window.isMinimized ? 0.7 : 1,
                border: 'none',
                outline: 'none',
                touchAction: 'manipulation'
              }}
            >
              {getWindowSymbol(windowId)}
            </button>
          );
        })}
      </div>

      {isDragging && draggedItem && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: dragPosition.x - dragOffset.x,
            top: dragPosition.y - dragOffset.y,
          }}
        >
          <button
            className="h-8 w-10 text-lg shadow-lg transform rotate-3 scale-110 flex items-center justify-center"
            style={{ 
              userSelect: 'none',
              textShadow: '0 0 6px rgba(0,0,0,0.8)',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          >
            {getWindowSymbol(draggedItem)}
          </button>
        </div>
      )}

      {/* System Tray */}
      <div className="ml-auto flex items-center pr-2 select-none">
        <div className={`flex flex-col items-end text-xs ${styles.taskbar.systemTray} leading-tight`}>
          <div>
            {isClient ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
          </div>
          <div>
            {isClient ? currentTime.toLocaleDateString('en-GB') : '--/--/----'}
          </div>
        </div>
      </div>
    </div>
  );
}