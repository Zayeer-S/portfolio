'use client';

import { useState, useRef, useEffect } from 'react';
import { WindowProps } from '@/types';

export default function Window({ 
  id, 
  title, 
  children, 
  isOpen, 
  isMinimized, 
  isMaximized, 
  onClose, 
  onMinimize, 
  onMaximize, 
  zIndex, 
  onFocus 
}: WindowProps) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't start dragging if clicking on window control buttons
    if (target.tagName === 'BUTTON') {
      return;
    }
    if (e.target === e.currentTarget || target.classList.contains('title-bar')) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
      onFocus();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={`fixed bg-white border border-gray-400 shadow-lg rounded-t-lg ${
        isMinimized ? 'hidden' : ''
      } ${isMaximized ? 'inset-0 rounded-none' : 'w-96 h-80'}`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        zIndex: zIndex,
        pointerEvents: 'auto',
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="title-bar h-8 bg-gradient-to-b from-blue-500 to-blue-600 text-white px-2 flex items-center justify-between cursor-move rounded-t-lg"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center pointer-events-none">
          <div className="w-4 h-4 mr-2">
            <div className="w-full h-full bg-blue-300 rounded-sm"></div>
          </div>
          <span className="text-sm font-normal">{title}</span>
        </div>
        <div className="flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-6 h-5 bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400 text-xs hover:from-gray-300 hover:to-gray-400 mr-1"
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="w-6 h-5 bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400 text-xs hover:from-gray-300 hover:to-gray-400 mr-1"
          >
            □
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-6 h-5 bg-gradient-to-b from-red-400 to-red-500 border border-gray-400 text-white text-xs hover:from-red-500 hover:to-red-600"
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="p-4 h-full overflow-auto" style={{ height: 'calc(100% - 32px)' }}>
        {children}
      </div>
    </div>
  );
}