// src/styles/themes.ts

import { Theme } from '@/contexts/ThemeContext';

export const themeStyles = {
  'modern-light': {
    desktop: {
      background: 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500',
      iconHover: 'hover:bg-white/20'
    },
    window: {
      background: 'bg-white',
      border: 'border border-gray-300',
      shadow: 'shadow-2xl',
      borderRadius: 'rounded-lg',
      titleBar: {
        background: 'bg-white border-b border-gray-200',
        text: 'text-gray-800',
        buttons: {
          minimize: 'bg-transparent hover:bg-gray-100 text-gray-600',
          maximize: 'bg-transparent hover:bg-gray-100 text-gray-600',
          close: 'bg-transparent hover:bg-red-500 hover:text-white text-gray-600'
        }
      }
    },
    taskbar: {
      background: 'bg-white/80 backdrop-blur-md border-t border-gray-300',
      startButton: 'bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300',
      taskButtons: 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-800 border border-gray-300',
      systemTray: 'text-gray-700'
    },
    startMenu: {
      background: 'bg-white/95 backdrop-blur-md border border-gray-300 shadow-2xl',
      header: 'bg-gray-100 border-b border-gray-300',
      items: 'hover:bg-gray-100 text-gray-800',
      text: 'text-gray-800'
    },
    typewriter: 'text-gray-800'
  },
  'modern-dark': {
    desktop: {
      background: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
      iconHover: 'hover:bg-white/10'
    },
    window: {
      background: 'bg-gray-800',
      border: 'border border-gray-600',
      shadow: 'shadow-2xl',
      borderRadius: 'rounded-lg',
      titleBar: {
        background: 'bg-gray-800 border-b border-gray-600',
        text: 'text-gray-100',
        buttons: {
          minimize: 'bg-transparent hover:bg-gray-700 text-gray-300',
          maximize: 'bg-transparent hover:bg-gray-700 text-gray-300',
          close: 'bg-transparent hover:bg-red-600 hover:text-white text-gray-300'
        }
      }
    },
    taskbar: {
      background: 'bg-gray-900/80 backdrop-blur-md border-t border-gray-700',
      startButton: 'bg-transparent hover:bg-white/10 text-white border border-gray-600',
      taskButtons: 'bg-gray-700/50 hover:bg-gray-600/50 text-white border border-gray-600',
      systemTray: 'text-gray-300'
    },
    startMenu: {
      background: 'bg-gray-900/95 backdrop-blur-md border border-gray-700 shadow-2xl',
      header: 'bg-gray-800 border-b border-gray-700',
      items: 'hover:bg-gray-700 text-gray-200',
      text: 'text-gray-200'
    },
    typewriter: 'text-white'
  },
  classic: {
    desktop: {
      background: 'bg-gradient-to-br from-blue-400 to-blue-800',
      iconHover: 'hover:bg-blue-200/30'
    },
    window: {
      background: 'bg-white',
      border: 'border border-gray-400',
      shadow: 'shadow-lg',
      borderRadius: 'rounded-t-lg',
      titleBar: {
        background: 'bg-gradient-to-b from-blue-500 to-blue-600',
        text: 'text-white',
        buttons: {
          minimize: 'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200 border border-gray-400 text-black',
          maximize: 'bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-100 hover:to-gray-200 border border-gray-400 text-black',
          close: 'bg-gradient-to-b from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 border border-gray-400 text-white'
        }
      }
    },
    taskbar: {
      background: 'bg-gradient-to-b from-blue-200 to-blue-300 border-t border-blue-400',
      startButton: 'bg-gradient-to-b from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 border border-green-600 text-white',
      taskButtons: 'bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 border border-blue-600 text-white',
      systemTray: 'text-gray-700'
    },
    startMenu: {
      background: 'bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-400',
      header: 'bg-gradient-to-r from-blue-600 to-blue-400',
      items: 'hover:bg-blue-100 text-gray-800',
      text: 'text-white'
    },
    typewriter: 'text-white'
  }
};

export function getThemeClasses(theme: Theme) {
  return themeStyles[theme];
}

export function getThemeName(theme: Theme): string {
  const names = {
    'modern-light': 'Modern Light',
    'modern-dark': 'Modern Dark',
    'classic': 'Classic'
  };  
  return names[theme];
}