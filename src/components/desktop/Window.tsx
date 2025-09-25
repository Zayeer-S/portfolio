'use client';

import { useRef } from 'react';
import { WindowProps } from '@/types';
import { Theme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { useWindowResize } from '@/hooks/useWindowResize';
import ResizeHandles from './ResizeHandles';

interface WindowPropsWithTheme extends Omit<WindowProps, 'theme'> {
  theme?: Theme;
}

const getInitialDimensions = (windowId?: string) => {
  if (typeof window === 'undefined') {
    return { position: { x: 100, y: 100 }, size: { width: 384, height: 320 } };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const taskbarHeight = 44;
  const availableHeight = viewportHeight - taskbarHeight;

  const windowIndex = windowId ? windowId.length : 0;
  const offsetMultiplier = (windowIndex % 5) * 30;

  if (viewportWidth < 500) { // Mobile
    const baseX = Math.min(10 + offsetMultiplier, viewportWidth - 370);
    const baseY = Math.min(10 + offsetMultiplier, availableHeight - 420);
    return {
      position: { x: Math.max(5, baseX), y: Math.max(5, baseY) },
      size: { 
        width: Math.min(viewportWidth - 20, 350), 
        height: Math.min(availableHeight - 20, 400) 
      }
    };
  } else if (viewportWidth < 1024) { // Tablet
    const baseX = Math.min(50 + offsetMultiplier, viewportWidth - 520);
    const baseY = Math.min(50 + offsetMultiplier, availableHeight - 520);
    return {
      position: { x: Math.max(20, baseX), y: Math.max(20, baseY) },
      size: { 
        width: Math.min(viewportWidth * 0.8, 500), 
        height: Math.min(availableHeight * 0.8, 500) 
      }
    };
  } else { // Desktop... or TV 😭
    const baseX = Math.min(100 + offsetMultiplier, viewportWidth - 404);
    const baseY = Math.min(100 + offsetMultiplier, availableHeight - 340);
    return {
      position: { x: Math.max(20, baseX), y: Math.max(20, baseY) },
      size: { width: 384, height: 320 }
    };
  }
};

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
  onFocus,
  theme 
}: WindowPropsWithTheme) {
  const windowRef = useRef<HTMLDivElement>(null);
  const initialDimensions = getInitialDimensions(id);
  
  const styles = theme ? getThemeClasses(theme) : {
    window: {
      background: 'bg-white',
      border: 'border border-gray-400',
      shadow: 'shadow-lg',
      borderRadius: 'rounded-lg',
      titleBar: {
        background: 'bg-gradient-to-b from-blue-500 to-blue-600',
        text: 'text-white',
        buttons: {
          minimize: 'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200 border border-gray-400 text-black',
          maximize: 'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200 border border-gray-400 text-black',
          close: 'bg-gradient-to-b from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 border border-gray-400 text-white'
        }
      }
    }
  };
  const {
    handleMouseDown,
    handleResizeMouseDown,
    getWindowStyle
  } = useWindowResize({
    initialPosition: initialDimensions.position,
    initialSize: initialDimensions.size,
    isMaximized,
    onFocus
  });

  if (!isOpen) return null;

  return (
    <div
      ref={windowRef}
      className={`fixed ${styles.window.background} ${styles.window.border} ${styles.window.shadow} ${styles.window.borderRadius} flex flex-col ${
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
      {/* Title Bar */}
      <div
        className={`title-bar h-8 ${styles.window.titleBar.background} ${styles.window.titleBar.text} px-2 flex items-center justify-between cursor-move rounded-t-lg`}
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
            className={`w-6 h-5 ${styles.window.titleBar.buttons.minimize} text-xs mr-1`}
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className={`w-6 h-5 ${styles.window.titleBar.buttons.maximize} text-xs mr-1`}
          >
            □
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className={`w-6 h-5 ${styles.window.titleBar.buttons.close} text-xs`}
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