'use client';

import { useState, useEffect, useMemo } from 'react';
import { LAYOUT_CONSTANTS } from '@/constants/layout';

export type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

interface UseWindowResizeProps {
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  isMaximized: boolean;
  minSize?: { width: number; height: number };
  onFocus: () => void;
}

export function useWindowResize({
  initialPosition,
  initialSize,
  isMaximized,
  onFocus,
}: UseWindowResizeProps) {
  const constrainToViewport = (x: number, y: number, width: number, height: number) => {
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height - LAYOUT_CONSTANTS.TASKBAR_HEIGHT;
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    };
  };

  const getConstrainedInitialPosition = () => {
    if (typeof window === 'undefined') return initialPosition;
    return constrainToViewport(
      initialPosition.x,
      initialPosition.y,
      initialSize.width,
      initialSize.height
    );
  };

  const [position, setPosition] = useState(getConstrainedInitialPosition);
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
    posY: 0,
  });

  const initialDimensions = useMemo(
    () => ({
      position: initialPosition,
      size: initialSize,
    }),
    [initialPosition, initialSize]
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const constrained = constrainToViewport(
        initialDimensions.position.x,
        initialDimensions.position.y,
        initialDimensions.size.width,
        initialDimensions.size.height
      );
      if (
        constrained.x !== initialDimensions.position.x ||
        constrained.y !== initialDimensions.position.y
      ) {
        setPosition(constrained);
      }
    }
  }, [initialDimensions]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    // Don't start dragging if touching window control buttons or resize handles
    if (target.tagName === 'BUTTON' || target.classList.contains('resize-handle')) {
      return;
    }
    if (e.target === e.currentTarget || target.classList.contains('title-bar')) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
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
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        const constrained = constrainToViewport(newX, newY, size.width, size.height);
        setPosition(constrained);
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
          newWidth = Math.max(LAYOUT_CONSTANTS.WINDOW_MIN_WIDTH, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes('w')) {
          newWidth = Math.max(LAYOUT_CONSTANTS.WINDOW_MIN_WIDTH, resizeStart.width - deltaX);
          if (newWidth > LAYOUT_CONSTANTS.WINDOW_MIN_WIDTH) {
            newX = resizeStart.posX + deltaX;
          }
        }

        // Handle vertical resizing
        if (resizeDirection.includes('s')) {
          newHeight = Math.max(LAYOUT_CONSTANTS.WINDOW_MIN_HEIGHT, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes('n')) {
          newHeight = Math.max(LAYOUT_CONSTANTS.WINDOW_MIN_HEIGHT, resizeStart.height - deltaY);
          if (newHeight > LAYOUT_CONSTANTS.WINDOW_MIN_HEIGHT) {
            newY = resizeStart.posY + deltaY;
          }
        }

        const constrained = constrainToViewport(newX, newY, newWidth, newHeight);

        setSize({ width: newWidth, height: newHeight });
        setPosition(constrained);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && !isMaximized) {
        const touch = e.touches[0];
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;
        const constrained = constrainToViewport(newX, newY, size.width, size.height);
        setPosition(constrained);
      }

      if (isDragging) {
        e.preventDefault();
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, isResizing, dragStart, resizeStart, isMaximized, resizeDirection, size]);

  useEffect(() => {
    const handleResize = () => {
      if (!isMaximized) {
        const constrained = constrainToViewport(position.x, position.y, size.width, size.height);
        if (constrained.x !== position.x || constrained.y !== position.y) {
          setPosition(constrained);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [position, size, isMaximized]);

  const getWindowStyle = () => {
    return isMaximized
      ? { left: 0, top: 0, width: '100vw', height: '100vh' }
      : {
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        };
  };

  return {
    position,
    size,
    isDragging,
    isResizing,
    handleMouseDown,
    handleTouchStart,
    handleResizeMouseDown,
    getWindowStyle,
  };
}
