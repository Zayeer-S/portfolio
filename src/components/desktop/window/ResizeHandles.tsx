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
      />
      <div
        className="resize-handle absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'ne')}
      />
      <div
        className="resize-handle absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'sw')}
      />
      <div
        className="resize-handle absolute bottom-0 right-0 w-2 h-2 cursor-se-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'se')}
      />



      <div
        className="resize-handle absolute top-0 left-2 right-2 h-1 cursor-n-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'n')}
      />
      <div
        className="resize-handle absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 's')}
      />
      <div
        className="resize-handle absolute left-0 top-2 bottom-2 w-1 cursor-w-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'w')}
      />
      <div
        className="resize-handle absolute right-0 top-2 bottom-2 w-1 cursor-e-resize"
        onMouseDown={(e) => onResizeMouseDown(e, 'e')}
      />
    </>
  );
}