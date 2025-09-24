'use client';

import { useState, useEffect } from 'react';
import { WindowsState, WindowId } from '@/types';

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowsState>({
    resume: { isOpen: false, isMinimized: false, isMaximized: false },
    projects: { isOpen: false, isMinimized: false, isMaximized: false },
    about: { isOpen: false, isMinimized: false, isMaximized: false },
    contact: { isOpen: false, isMinimized: false, isMaximized: false },
    technologies: { isOpen: false, isMinimized: false, isMaximized: false },
    settings: { isOpen: false, isMinimized: false, isMaximized: false },
    calculator: { isOpen: false, isMinimized: false, isMaximized: false },
  });

  const [windowOrder, setWindowOrder] = useState<string[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (windowId: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: { isOpen: true, isMinimized: false, isMaximized: false }
    }));
    focusWindow(windowId);
  };

  const closeWindow = (windowId: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: { isOpen: false, isMinimized: false, isMaximized: false }
    }));
    setWindowOrder(prev => prev.filter(id => id !== windowId));
  };

  const minimizeWindow = (windowId: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMinimized: !prev[windowId].isMinimized }
    }));
  };

  const maximizeWindow = (windowId: WindowId) => {
    setWindows(prev => ({
      ...prev,
      [windowId]: { ...prev[windowId], isMaximized: !prev[windowId].isMaximized }
    }));
  };

  const focusWindow = (windowId: WindowId) => {
    setWindowOrder(prev => [windowId, ...prev.filter(id => id !== windowId)]);
  };

  const getWindowZIndex = (windowId: WindowId) => {
    const index = windowOrder.indexOf(windowId);
    return index === -1 ? 1000 : 1000 + (windowOrder.length - 1 - index);
  };

  const toggleStartMenu = () => {
    setStartMenuOpen(prev => !prev);
  };

  const closeStartMenu = () => {
    setStartMenuOpen(false);
  };

  return {
    windows,
    windowOrder,
    startMenuOpen,
    currentTime,
    isClient,

    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    getWindowZIndex,

    toggleStartMenu,
    closeStartMenu,
  };
}