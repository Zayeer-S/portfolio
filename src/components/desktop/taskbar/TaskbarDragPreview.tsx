'use client';

import { createPortal } from 'react-dom';
import { getAppIcon, AppIconKey } from '@/styles/icons';

interface TaskbarDragPreviewProps {
  windowId: string;
  position: { x: number; y: number };
  taskbarRect: DOMRect;
}

function getWindowIcon(windowId: string) {
  if (windowId === 'projects') {
    return getAppIcon('projectsOpen', { size: 32 });
  }
  return getAppIcon(windowId as AppIconKey, { size: 32 });
}

export default function TaskbarDragPreview({ 
  windowId, 
  position, 
  taskbarRect 
}: TaskbarDragPreviewProps) {
  return createPortal(
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x - 20,
        top: taskbarRect.top + (taskbarRect.height - 32) / 2,
        width: '40px',
        height: '32px',
      }}
    >
      <div
        className="w-full h-full flex items-center justify-center transition-none"
        style={{ 
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
          transform: 'scale(1.1)',
        }}
      >
        {getWindowIcon(windowId)}
      </div>
    </div>,
    document.body
  );
}