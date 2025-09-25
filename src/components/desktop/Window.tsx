'use client';

import { useRef } from 'react';
import { WindowProps } from '@/types';
import { Theme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { useWindowResize } from '@/hooks/useWindowResize';
import { LAYOUT_CONSTANTS } from '@/constants/layout';
import ResizeHandles from './ResizeHandles';

interface WindowPropsWithTheme extends Omit<WindowProps, 'theme'> {
  theme?: Theme;
}

const getInitialDimensions = (windowId?: string) => {
  if (typeof window === 'undefined') {
    return { 
      position: { x: 100, y: 100 }, 
      size: { 
        width: LAYOUT_CONSTANTS.DEFAULT_WINDOW.WIDTH, 
        height: LAYOUT_CONSTANTS.DEFAULT_WINDOW.HEIGHT 
      } 
    };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const taskbarHeight = 44;
  const availableHeight = viewportHeight - taskbarHeight;

  const windowIndex = windowId ? windowId.length : 0;
  const offsetMultiplier = (windowIndex % LAYOUT_CONSTANTS.WINDOW_STACK_CYCLE_COUNT) * LAYOUT_CONSTANTS.WINDOW_STACK_OFFSET;

  if (viewportWidth < LAYOUT_CONSTANTS.MOBILE_BREAKPOINT) { // Mobile
    const maxWindowWidth = LAYOUT_CONSTANTS.MOBILE_WINDOW.MAX_WIDTH;
    const maxWindowHeight = LAYOUT_CONSTANTS.MOBILE_WINDOW.MAX_HEIGHT;
    const baseX = Math.min(10 + offsetMultiplier, viewportWidth - maxWindowWidth - 10);
    const baseY = Math.min(10 + offsetMultiplier, availableHeight - maxWindowHeight - 10);
    return {
      position: { x: Math.max(LAYOUT_CONSTANTS.MOBILE_MIN_MARGIN, baseX), y: Math.max(LAYOUT_CONSTANTS.MOBILE_MIN_MARGIN, baseY) },
      size: { 
        width: Math.min(viewportWidth - LAYOUT_CONSTANTS.MOBILE_MARGIN, maxWindowWidth), 
        height: Math.min(availableHeight - LAYOUT_CONSTANTS.MOBILE_MARGIN, maxWindowHeight) 
      }
    };
  } else if (viewportWidth < LAYOUT_CONSTANTS.TABLET_BREAKPOINT) { // Tablet
    const windowWidth = Math.min(viewportWidth * 0.8, 500);
    const windowHeight = Math.min(availableHeight * 0.8, 500);
    const baseX = Math.min(50 + offsetMultiplier, viewportWidth - windowWidth - 20);
    const baseY = Math.min(50 + offsetMultiplier, availableHeight - windowHeight - 20);
    return {
      position: { x: Math.max(LAYOUT_CONSTANTS.TABLET_MIN_MARGIN, baseX), y: Math.max(LAYOUT_CONSTANTS.TABLET_MIN_MARGIN, baseY) },
      size: { 
        width: windowWidth, 
        height: windowHeight 
      }
    };
  } else { // Desktop... or TV 😭
    const baseX = Math.min(100 + offsetMultiplier, viewportWidth - LAYOUT_CONSTANTS.DEFAULT_WINDOW.WIDTH - LAYOUT_CONSTANTS.DESKTOP_MARGIN);
    const baseY = Math.min(100 + offsetMultiplier, availableHeight - LAYOUT_CONSTANTS.DEFAULT_WINDOW.HEIGHT - LAYOUT_CONSTANTS.DESKTOP_MARGIN);
    return {
      position: { x: Math.max(LAYOUT_CONSTANTS.DESKTOP_MIN_MARGIN, baseX), y: Math.max(LAYOUT_CONSTANTS.DESKTOP_MIN_MARGIN, baseY) },
      size: { 
        width: LAYOUT_CONSTANTS.DEFAULT_WINDOW.WIDTH, 
        height: LAYOUT_CONSTANTS.DEFAULT_WINDOW.HEIGHT 
      }
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
    handleTouchStart,
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
        minWidth: `${LAYOUT_CONSTANTS.WINDOW_MIN_HEIGHT}px`,
        minHeight: `${LAYOUT_CONSTANTS.WINDOW_MIN_HEIGHT}px`,
      }}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`title-bar h-8 ${styles.window.titleBar.background} ${styles.window.titleBar.text} px-2 flex items-center justify-between cursor-move rounded-t-lg`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
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