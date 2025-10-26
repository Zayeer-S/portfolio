// hooks/useTaskbarDrag.ts
'use client';

import { useState, useCallback } from 'react';
import { WindowId } from '@/types';

export interface DragState {
  isDragging: boolean;
  draggedItem: string | null;
  dragPosition: { x: number; y: number };
  insertionIndex: number;
  clickedItem: string | null;
  hasDraggedBeyondThreshold: boolean;
  isProcessingTouch: boolean;
  taskbarRect: DOMRect | null;
}

export interface DragActions {
  startDrag: (windowId: string, clientX: number, clientY: number, containerRect: DOMRect) => void;
  updateDrag: (clientX: number, clientY: number) => void;
  endDrag: (onMinimize: (windowId: WindowId) => void) => void;
  setInsertionIndex: (index: number) => void;
}

const DRAG_THRESHOLD = 8;
const MINIMIZE_DEBOUNCE = 200;

export function useTaskbarDrag(): DragState & DragActions {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [insertionIndex, setInsertionIndex] = useState<number>(-1);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });
  const [hasDraggedBeyondThreshold, setHasDraggedBeyondThreshold] = useState(false);
  const [lastMinimizeTime, setLastMinimizeTime] = useState<number>(0);
  const [isProcessingTouch, setIsProcessingTouch] = useState<boolean>(false);
  const [taskbarRect, setTaskbarRect] = useState<DOMRect | null>(null);

  const startDrag = useCallback(
    (windowId: string, clientX: number, clientY: number, containerRect: DOMRect) => {
      setDraggedItem(windowId);
      setDragStartPosition({ x: clientX, y: clientY });
      setDragPosition({ x: clientX, y: clientY });
      setHasDraggedBeyondThreshold(false);
      setTaskbarRect(containerRect);
    },
    []
  );

  const updateDrag = useCallback(
    (clientX: number, clientY: number) => {
      if (!draggedItem) return;

      const deltaX = Math.abs(clientX - dragStartPosition.x);
      const deltaY = Math.abs(clientY - dragStartPosition.y);
      const hasMovedBeyondThreshold = deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD;

      if (hasMovedBeyondThreshold && !hasDraggedBeyondThreshold) {
        setHasDraggedBeyondThreshold(true);
        setIsDragging(true);
      }

      if (hasDraggedBeyondThreshold) {
        setDragPosition({ x: clientX, y: clientY });
      }
    },
    [draggedItem, dragStartPosition, hasDraggedBeyondThreshold]
  );

  const endDrag = useCallback(
    (onMinimize: (windowId: WindowId) => void) => {
      if (isProcessingTouch) return;

      if (draggedItem && !hasDraggedBeyondThreshold) {
        const now = Date.now();

        if (now - lastMinimizeTime > MINIMIZE_DEBOUNCE) {
          setIsProcessingTouch(true);
          setClickedItem(draggedItem);
          setLastMinimizeTime(now);

          setTimeout(() => {
            onMinimize(draggedItem as WindowId);
            setClickedItem(null);

            setTimeout(() => {
              setIsProcessingTouch(false);
            }, 200);
          }, 100);
        }
      }

      setIsDragging(false);
      setDraggedItem(null);
      setInsertionIndex(-1);
      setHasDraggedBeyondThreshold(false);
      setTaskbarRect(null);
    },
    [draggedItem, hasDraggedBeyondThreshold, isProcessingTouch, lastMinimizeTime]
  );

  return {
    // State
    isDragging,
    draggedItem,
    dragPosition,
    insertionIndex,
    clickedItem,
    hasDraggedBeyondThreshold,
    isProcessingTouch,
    taskbarRect,
    // Actions
    startDrag,
    updateDrag,
    endDrag,
    setInsertionIndex,
  };
}
