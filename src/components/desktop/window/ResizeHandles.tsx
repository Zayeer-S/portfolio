import { ResizeDirection } from '@/hooks/useWindowResize';

interface ResizeHandlesProps {
  isMaximized: boolean;
  onResizeMouseDown: (e: React.MouseEvent, direction: ResizeDirection) => void;
}

export default function ResizeHandles({ isMaximized, onResizeMouseDown }: ResizeHandlesProps) {
  if (isMaximized) return null;

  return (
    <>
      <div
        className="resize-handle absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'nw')}
        role="button"
        aria-label="Resize window from top-left corner"
        tabIndex={0}
      />
      <div
        className="resize-handle absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'ne')}
        role="button"
        aria-label="Resize window from top-right corner"
        tabIndex={0}
      />
      <div
        className="resize-handle absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'sw')}
        role="button"
        aria-label="Resize window from bottom-left corner"
        tabIndex={0}
      />
      <div
        className="resize-handle absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'se')}
        role="button"
        aria-label="Resize window from bottom-right corner"
        tabIndex={0}
      />

      <div
        className="resize-handle absolute top-0 left-2 right-2 h-1 cursor-n-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'n')}
        role="button"
        aria-label="Resize window from top edge"
        tabIndex={0}
      />
      <div
        className="resize-handle absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 's')}
        role="button"
        aria-label="Resize window from bottom edge"
        tabIndex={0}
      />
      <div
        className="resize-handle absolute left-0 top-2 bottom-2 w-1 cursor-w-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'w')}
        role="button"
        aria-label="Resize window from left edge"
        tabIndex={0}
      />
      <div
        className="resize-handle absolute right-0 top-2 bottom-2 w-1 cursor-e-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'e')}
        role="button"
        aria-label="Resize window from right edge"
        tabIndex={0}
      />
    </>
  );
}