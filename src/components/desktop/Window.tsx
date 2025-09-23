'use client';

import { useRef } from 'react';
import { WindowProps } from '@/types';
import { useWindowResize } from '@/hooks/useWindowResize';
import ResizeHandles from './ResizeHandles';

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
  const windowRef = useRef<HTMLDivElement>(null);
  
  const {
    handleMouseDown,
    handleResizeMouseDown,
    getWindowStyle
  } = useWindowResize({
    initialPosition: { x: 100, y: 100 },
    initialSize: { width: 384, height: 320 },
    isMaximized,
    onFocus
  });

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={`fixed bg-white border border-gray-400 shadow-lg rounded-t-lg flex flex-col ${
        isMinimized ? 'hidden' : ''
      } ${isMaximized ? 'rounded-none' : ''}`}
      style={{
        ...getWindowStyle(),
        zIndex: zIndex,
        pointerEvents: 'auto',
        minWidth: '200px',
        minHeight: '150px',
      }}
      onMouseDown={onFocus}
    >
      <div
        className="title-bar h-8 bg-gradient-to-b from-blue-500 to-blue-600 text-white px-2 flex items-center justify-between cursor-move rounded-t-lg"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center pointer-events-none">
          <div className="w-4 h-4 mr-2 pointer-events-none">
            <div className="w-full h-full bg-blue-300 rounded-sm pointer-events-none"></div>
          </div>
          <span className="text-sm font-normal pointer-events-none">{title}</span>
        </div>
        <div className="flex">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="w-6 h-5 bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400 text-xs hover:from-gray-100 hover:to-gray-200 mr-1"
          >
            –
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="w-6 h-5 bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400 text-xs hover:from-gray-100 hover:to-gray-200 mr-1"
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
      <div className="p-4 overflow-auto flex-1">
        {children}
      </div>

      <ResizeHandles 
        isMaximized={isMaximized}
        onResizeMouseDown={handleResizeMouseDown}
      />
    </div>
  );
}