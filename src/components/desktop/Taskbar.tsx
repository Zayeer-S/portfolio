import { useState, useRef, useEffect } from 'react';
import { TaskbarProps, WindowId } from '@/types';

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

  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Add drag detection
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [hasDraggedBeyondThreshold, setHasDraggedBeyondThreshold] = useState(false);
  const DRAG_THRESHOLD = 5; // pixels

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
        
        // Calculate insertion position based on mouse position
        if (containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const mouseX = e.clientX - containerRect.left;
          
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
      }
    };

    const handleMouseUp = () => {
      // Handle click animation and window minimize/restore
      if (draggedItem && !hasDraggedBeyondThreshold) {
        setClickedItem(draggedItem);
        
        setTimeout(() => {
          onMinimizeWindow(draggedItem as WindowId);
          setClickedItem(null);
        }, 100);
      }
      
      setIsDragging(false);
      setDraggedItem(null);
      setInsertionIndex(-1);
      setHasDraggedBeyondThreshold(false);
    };

    if (draggedItem) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [draggedItem, dragStartPosition, hasDraggedBeyondThreshold, orderedWindowIds, insertionIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-11 bg-gradient-to-b from-blue-200 to-blue-300 border-t border-blue-400 flex items-center px-2 z-50">
      {/* Start Button */}
      <button
        className="h-8 px-4 bg-gradient-to-b from-green-400 to-green-500 border border-green-600 rounded text-white text-sm font-medium hover:from-green-500 hover:to-green-600 flex items-center"
        onClick={onToggleStartMenu}
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
              className={`h-8 w-10 text-lg transition-all duration-150 flex items-center justify-center ${
                ''
              } ${
                isBeingDragged ? 'opacity-0 pointer-events-none' : 
                clickedItem === windowId ? 'scale-75' : 'hover:scale-105'
              }`}
              style={{ 
                cursor: 'default',
                userSelect: 'none',
                textShadow: window.isMinimized 
                  ? '0 0 3px rgba(0,0,0,0.3)' 
                  : '0 0 4px rgba(0,0,0,0.5)',
                opacity: window.isMinimized ? 0.7 : 1
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
        <div className="flex flex-col items-end text-xs text-gray-700 leading-tight">
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