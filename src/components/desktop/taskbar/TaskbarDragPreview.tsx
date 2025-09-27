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
    return getAppIcon('projectsOpen', { size: Math.round(18 * 1.7) });
  }
  return getAppIcon(windowId as AppIconKey, { size: Math.round(18 * 1.7) });
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
        left: position.x - 20, // Center the 40px wide icon
        top: taskbarRect.top + (taskbarRect.height - 32) / 2, // Center vertically in taskbar
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