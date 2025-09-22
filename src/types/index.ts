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
}

export interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
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

export type WindowId = 'resume' | 'projects' | 'technologies' | 'about' | 'contact';