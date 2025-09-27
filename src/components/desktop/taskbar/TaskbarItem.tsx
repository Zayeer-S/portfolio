'use client';

import { getAppIcon, AppIconKey } from '@/styles/icons';

interface TaskbarItemProps {
  windowId: string;
  isMinimized: boolean;
  isBeingDragged: boolean;
  isClicked: boolean;
  isTouchDevice: boolean;
  taskbarButtonClasses: string;
  onMouseDown: (e: React.MouseEvent, windowId: string) => void;
  onTouchStart: (e: React.TouchEvent, windowId: string) => void;
}

function getWindowIcon(windowId: string) {
  if (windowId === 'projects') {
    return getAppIcon('projectsOpen', { size: Math.round(18 * 1.7) });
  }
  return getAppIcon(windowId as AppIconKey, { size: Math.round(18 * 1.7) });
}

export default function TaskbarItem({
  windowId,
  isMinimized,
  isBeingDragged,
  isClicked,
  isTouchDevice,
  taskbarButtonClasses,
  onMouseDown,
  onTouchStart,
}: TaskbarItemProps) {
  return (
    <button
      data-taskbar-item={windowId}
      onMouseDown={(e) => onMouseDown(e, windowId)}
      onTouchStart={(e) => onTouchStart(e, windowId)}
      className={`h-8 w-10 transition-all duration-150 flex items-center justify-center ${taskbarButtonClasses} ${
        isBeingDragged ? 'opacity-30' : 
        isClicked ? 'scale-75' : 'hover:scale-105'
      } ${isTouchDevice ? 'touch-manipulation' : ''}`}
      style={{ 
        cursor: 'default',
        userSelect: 'none',
        opacity: isMinimized ? 0.7 : (isBeingDragged ? 0.3 : 1),
      }}
    >
      {getWindowIcon(windowId)}
    </button>
  );
}