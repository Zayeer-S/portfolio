import { Theme } from '@/contexts/ThemeContext';

export interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface WindowsState {
  [key: string]: WindowState;
}

export interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  zIndex: number;
  onFocus: () => void;
  theme?: Theme;
}

export interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
  hoverClass?: string;
}

export interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (windowId: WindowId) => void;
}

export interface TaskbarProps {
  windows: WindowsState;
  onToggleStartMenu: () => void;
  onMinimizeWindow: (windowId: WindowId) => void;
  startMenuOpen: boolean;
  currentTime: Date;
  isClient: boolean;
}

export type WindowId = 'projects' | 'technologies' |'contact' | 'settings' | 'calculator' | 'notepad' | 'credits';