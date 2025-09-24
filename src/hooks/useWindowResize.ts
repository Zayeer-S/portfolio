'use client';

import { useState, useEffect } from 'react';

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface UseWindowResizeProps {
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  isMaximized: boolean;
  minSize?: {width: number, height: number};
  onFocus: () => void;
}

export function useWindowResize({
  initialPosition,
  initialSize,
  isMaximized,
  onFocus
}: UseWindowResizeProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState<ResizeDirection | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ 
    x: 0, 
    y: 0, 
    width: 0, 
    height: 0, 
    posX: 0, 
    posY: 0 
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't start dragging if clicking on window control buttons or resize handles
    if (target.tagName === 'BUTTON' || target.classList.contains('resize-handle')) {
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

  const handleResizeMouseDown = (e: React.MouseEvent, direction: ResizeDirection) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y,
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
      
      if (isResizing && !isMaximized && resizeDirection) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.posX;
        let newY = resizeStart.posY;

        // Handle horizontal resizing
        if (resizeDirection.includes('e')) {
          newWidth = Math.max(200, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes('w')) {
          newWidth = Math.max(200, resizeStart.width - deltaX);
          if (newWidth > 200) {
            newX = resizeStart.posX + deltaX;
          }
        }

        // Handle vertical resizing
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(150, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes('n')) {
          newHeight = Math.max(150, resizeStart.height - deltaY);
          if (newHeight > 150) {
            newY = resizeStart.posY + deltaY;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, isMaximized, resizeDirection]);

  const getWindowStyle = () => {
    return isMaximized 
      ? { left: 0, top: 0, width: '100vw', height: '100vh' }
      : { 
          left: position.x, 
          top: position.y, 
          width: size.width, 
          height: size.height 
        };
  };

  return {
    position,
    size,
    isDragging,
    isResizing,
    handleMouseDown,
    handleResizeMouseDown,
    getWindowStyle
  };
}