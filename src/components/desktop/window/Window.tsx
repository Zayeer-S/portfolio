'use client';

import { useRef, useState, useEffect } from 'react';
import { WindowProps } from '@/types';
import { Theme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { useWindowResize } from '@/hooks/useWindowResize';
import { LAYOUT_CONSTANTS } from '@/constants/layout';
import ResizeHandles from './ResizeHandles';

interface WindowPropsWithTheme extends Omit<WindowProps, 'theme'> {
  theme?: Theme;
  minWidth?: number;
  minHeight?: number;
}

const getInitialDimensions = (windowId?: string) => {
  if (typeof window === 'undefined') {
    return {
      position: { x: 100, y: 100 },
      size: {
        width: LAYOUT_CONSTANTS.DEFAULT_WINDOW.WIDTH,
        height: LAYOUT_CONSTANTS.DEFAULT_WINDOW.HEIGHT,
      },
    };
  }

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const taskbarHeight = 44;
  const availableHeight = viewportHeight - taskbarHeight;

  const windowIndex = windowId ? windowId.length : 0;
  const offsetMultiplier =
    (windowIndex % LAYOUT_CONSTANTS.WINDOW_STACK_CYCLE_COUNT) *
    LAYOUT_CONSTANTS.WINDOW_STACK_OFFSET;

  if (viewportWidth < LAYOUT_CONSTANTS.MOBILE_BREAKPOINT) {
    // Mobile
    const maxWindowWidth = LAYOUT_CONSTANTS.MOBILE_WINDOW.MAX_WIDTH;
    const maxWindowHeight = LAYOUT_CONSTANTS.MOBILE_WINDOW.MAX_HEIGHT;
    const baseX = Math.min(10 + offsetMultiplier, viewportWidth - maxWindowWidth - 10);
    const baseY = Math.min(10 + offsetMultiplier, availableHeight - maxWindowHeight - 10);
    return {
      position: {
        x: Math.max(LAYOUT_CONSTANTS.MOBILE_MIN_MARGIN, baseX),
        y: Math.max(LAYOUT_CONSTANTS.MOBILE_MIN_MARGIN, baseY),
      },
      size: {
        width: Math.min(viewportWidth - LAYOUT_CONSTANTS.MOBILE_MARGIN, maxWindowWidth),
        height: Math.min(availableHeight - LAYOUT_CONSTANTS.MOBILE_MARGIN, maxWindowHeight),
      },
    };
  } else if (viewportWidth < LAYOUT_CONSTANTS.TABLET_BREAKPOINT) {
    // Tablet
    const windowWidth = Math.min(viewportWidth * 0.8, 500);
    const windowHeight = Math.min(availableHeight * 0.8, 500);
    const baseX = Math.min(50 + offsetMultiplier, viewportWidth - windowWidth - 20);
    const baseY = Math.min(50 + offsetMultiplier, availableHeight - windowHeight - 20);
    return {
      position: {
        x: Math.max(LAYOUT_CONSTANTS.TABLET_MIN_MARGIN, baseX),
        y: Math.max(LAYOUT_CONSTANTS.TABLET_MIN_MARGIN, baseY),
      },
      size: {
        width: windowWidth,
        height: windowHeight,
      },
    };
  } else {
    // Desktop... or TV 😭
    const baseX = Math.min(
      100 + offsetMultiplier,
      viewportWidth - LAYOUT_CONSTANTS.DEFAULT_WINDOW.WIDTH - LAYOUT_CONSTANTS.DESKTOP_MARGIN
    );
    const baseY = Math.min(
      100 + offsetMultiplier,
      availableHeight - LAYOUT_CONSTANTS.DEFAULT_WINDOW.HEIGHT - LAYOUT_CONSTANTS.DESKTOP_MARGIN
    );
    return {
      position: {
        x: Math.max(LAYOUT_CONSTANTS.DESKTOP_MIN_MARGIN, baseX),
        y: Math.max(LAYOUT_CONSTANTS.DESKTOP_MIN_MARGIN, baseY),
      },
      size: {
        width: LAYOUT_CONSTANTS.DEFAULT_WINDOW.WIDTH,
        height: LAYOUT_CONSTANTS.DEFAULT_WINDOW.HEIGHT,
      },
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
  theme,
  minWidth,
  minHeight,
}: WindowPropsWithTheme) {
  const windowRef = useRef<HTMLDivElement>(null);
  const initialDimensions = getInitialDimensions(id);

  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<
    'opening' | 'closing' | 'minimizing' | 'unminimizing' | 'maximizing' | 'unmaximizing' | null
  >(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Refs to track values and detect real transitions
  const prevMinimizedRef = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true);
      setIsAnimating(true);
      setAnimationType('opening');

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setAnimationType(null);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  useEffect(() => {
    const wasMinimized = prevMinimizedRef.current;
    const isNowMinimized = isMinimized;

    // Update the ref for next comparison
    prevMinimizedRef.current = isMinimized;

    if (!shouldRender || !isOpen) return;

    if (isNowMinimized && (wasMinimized === undefined || !wasMinimized)) {
      // Starting to minimize (including first time)
      setIsAnimating(true);
      setAnimationType('minimizing');

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setAnimationType(null);
      }, 300);

      return () => clearTimeout(timer);
    } else if (!isNowMinimized && wasMinimized === true) {
      // Starting to unminimize
      if (animationType !== 'opening') {
        setIsAnimating(true);
        setAnimationType('unminimizing');

        const timer = setTimeout(() => {
          setIsAnimating(false);
          setAnimationType(null);
        }, 200);

        return () => clearTimeout(timer);
      }
    }
  }, [isMinimized, shouldRender, isOpen, animationType]);

  const handleClose = () => {
    if (isAnimating && animationType === 'closing') {
      return;
    }

    setIsAnimating(true);
    setAnimationType('closing');

    setTimeout(() => {
      setShouldRender(false);
      setIsAnimating(false);
      setAnimationType(null);
      onClose();
    }, 150);
  };

  const handleMaximize = () => {
    if (!isMaximized) {
      setIsAnimating(true);
      setAnimationType('maximizing');

      setTimeout(() => {
        setIsAnimating(false);
        setAnimationType(null);
      }, 250);
    } else {
      setIsAnimating(true);
      setAnimationType('unmaximizing');

      setTimeout(() => {
        setIsAnimating(false);
        setAnimationType(null);
      }, 250);
    }

    onMaximize();
  };

  useEffect(() => {
    if (!isOpen && shouldRender && !isAnimating) {
      setShouldRender(false);
    }
  }, [isOpen, shouldRender, isAnimating]);

  const styles = theme
    ? getThemeClasses(theme)
    : {
        window: {
          background: 'bg-white',
          border: 'border border-gray-400',
          shadow: 'shadow-lg',
          borderRadius: 'rounded-lg',
          titleBar: {
            background: 'bg-gradient-to-b from-blue-500 to-blue-600',
            text: 'text-white',
            buttons: {
              minimize:
                'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200 border border-gray-400 text-black',
              maximize:
                'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200 border border-gray-400 text-black',
              close:
                'bg-gradient-to-b from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 border border-gray-400 text-white',
            },
          },
        },
      };

  const {
    handleMouseDown,
    handleTouchStart,
    handleResizeMouseDown,
    getWindowStyle,
    isDragging,
    isResizing,
  } = useWindowResize({
    initialPosition: initialDimensions.position,
    initialSize: initialDimensions.size,
    isMaximized,
    onFocus,
  });

  if (!shouldRender) return null;

  const getAnimationStyle = () => {
    const baseStyle = {
      transition: isDragging || isResizing ? 'none' : undefined,
    };

    if (!isAnimating || !animationType) {
      return {
        ...baseStyle,
        opacity: isMinimized && !isAnimating ? 0 : 1,
        visibility: isMinimized && !isAnimating ? ('hidden' as const) : ('visible' as const),
      };
    }

    switch (animationType) {
      case 'opening':
        return {
          ...baseStyle,
          opacity: 1,
          animation: 'windowOpen 0.2s ease-out',
        };

      case 'closing':
        return {
          ...baseStyle,
          opacity: 0,
          transform: 'scale(0.95) translateY(10px)',
          transition: 'all 0.15s ease-in',
        };

      case 'minimizing':
        const taskbarY = window.innerHeight - LAYOUT_CONSTANTS.TASKBAR_HEIGHT;
        const currentY = (getWindowStyle().top as number) || 0;
        const translateY = taskbarY - currentY;
        return {
          ...baseStyle,
          opacity: 0,
          transform: `translateY(${translateY}px)`,
          transition: 'all 0.3s ease-in',
        };

      case 'unminimizing':
        return {
          ...baseStyle,
          opacity: 1,
          animation: 'windowOpen 0.2s ease-out',
        };

      case 'maximizing':
        return {
          ...baseStyle,
          transition: 'all 0.25s ease-out',
        };

      case 'unmaximizing':
        return {
          ...baseStyle,
          transition: 'all 0.25s ease-out',
        };

      default:
        return {
          ...baseStyle,
          opacity: 1,
        };
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes windowOpen {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }
      `}</style>

      <div
        ref={windowRef}
        role="dialog"
        aria-labelledby={`${id}-title`}
        aria-modal="false"
        aria-hidden={isMinimized}
        className={`fixed ${styles.window.background} ${styles.window.border} ${styles.window.shadow} ${styles.window.borderRadius} flex flex-col ${
          isMinimized && !isAnimating ? 'hidden' : ''
        } ${isMaximized ? 'rounded-none' : ''}`}
        style={{
          ...getWindowStyle(),
          ...getAnimationStyle(),
          zIndex: zIndex,
          pointerEvents: 'auto',
          minWidth: `${minWidth ?? LAYOUT_CONSTANTS.WINDOW_MIN_HEIGHT}px`,
          minHeight: `${minHeight ?? LAYOUT_CONSTANTS.WINDOW_MIN_HEIGHT}px`,
          willChange: isDragging || isResizing || isAnimating ? 'transform' : 'auto',
        }}
        onMouseDown={onFocus}
      >
        {/* Title Bar */}
        <div
          className={`title-bar h-8 ${styles.window.titleBar.background} ${styles.window.titleBar.text} px-2 flex items-center justify-between cursor-move rounded-t-lg select-none`}
          aria-label="Window title bar"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="flex items-center pointer-events-none">
            <div className="w-4 h-4 mr-2 pointer-events-none">
              <div className="w-full h-full rounded-sm pointer-events-none"></div>
            </div>
            <span id={`${id}-title`} className="text-sm font-normal pointer-events-none">
              {title}
            </span>
          </div>
          <div
            className="flex"
            role="group"
            aria-label="Window minimize, maximise and close buttons"
          >
            <button
              aria-label="Minimize the window"
              aria-pressed={isMinimized}
              onClick={e => {
                e.stopPropagation();
                onMinimize();
              }}
              className={`w-6 h-5 ${styles.window.titleBar.buttons.minimize} text-xs mr-1`}
            >
              –
            </button>
            <button
              aria-label="Maximise the window"
              aria-pressed={isMaximized}
              onClick={e => {
                e.stopPropagation();
                handleMaximize();
              }}
              className={`w-6 h-5 ${styles.window.titleBar.buttons.maximize} text-xs mr-1`}
            >
              □
            </button>
            <button
              aria-label="Close the window"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                handleClose();
              }}
              className={`w-6 h-5 ${styles.window.titleBar.buttons.close} text-xs`}
            >
              ×
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-4 overflow-auto flex-1" role="document" aria-label={`${title} content`}>
          {children}
        </div>

        <ResizeHandles isMaximized={isMaximized} onResizeMouseDown={handleResizeMouseDown} />
      </div>
    </>
  );
}
