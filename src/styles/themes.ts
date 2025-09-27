import { Theme } from '@/contexts/ThemeContext';

export const themeStyles = {
  'modern-light': {
    desktop: {
      background: 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500',
      iconHover: 'hover:bg-white/20'
    },
    window: {
      background: 'bg-white',
      border: 'border border-neutral-300',
      shadow: 'shadow-2xl',
      borderRadius: 'rounded-lg',
      titleBar: {
        background: 'bg-white border-b border-neutral-200',
        text: 'text-neutral-800',
        buttons: {
          minimize: 'bg-transparent hover:bg-neutral-100 text-neutral-600',
          maximize: 'bg-transparent hover:bg-neutral-100 text-neutral-600',
          close: 'bg-transparent hover:bg-red-500 hover:text-white text-neutral-600'
        }
      },
      content: {
        text: 'text-neutral-800',
        textSecondary: 'text-neutral-600',
        textMuted: 'text-neutral-500',
        border: 'border-neutral-300',
        hover: 'hover:bg-neutral-50',
        accent: 'text-blue-600'
      }
    },
    taskbar: {
      background: 'bg-white/60 backdrop-blur-md border-t border-neutral-200',
      startButton: 'bg-blue-500 hover:bg-blue-600 text-white',
      taskButtons: 'bg-transparent hover:bg-neutral-200/50 text-neutral-800 rounded',
      systemTray: 'text-neutral-700'
    },
    startMenu: {
      background: 'bg-white/50 backdrop-blur-md border border-neutral-300 shadow-2xl',
      header: 'bg-neutral-100 border-b border-neutral-300',
      items: 'hover:bg-neutral-100 text-neutral-800',
      text: 'text-neutral-800'
    },
    typewriter: 'text-neutral-800'
  },
  'modern-dark': {
    desktop: {
      background: 'bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900',
      iconHover: 'hover:bg-white/10'
    },
    window: {
      background: 'bg-neutral-900',
      border: 'border border-neutral-700',
      shadow: 'shadow-2xl',
      borderRadius: 'rounded-lg',
      titleBar: {
        background: 'bg-black border-b border-neutral-700',
        text: 'text-white',
        buttons: {
          minimize: 'bg-transparent hover:bg-neutral-800 text-neutral-400 hover:text-white',
          maximize: 'bg-transparent hover:bg-neutral-800 text-neutral-400 hover:text-white',
          close: 'bg-transparent hover:bg-neutral-800 hover:text-white text-neutral-400'
        }
      },
      content: {
        text: 'text-white',
        textSecondary: 'text-neutral-300',
        textMuted: 'text-neutral-400',
        border: 'border-neutral-700',
        hover: 'hover:bg-neutral-800',
        accent: 'text-blue-400'
      }
    },
    taskbar: {
      background: 'bg-neutral-900/85 backdrop-blur-md border-t border-neutral-800',
      startButton: 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700',
      taskButtons: 'bg-transparent hover:bg-neutral-700/50 text-white rounded',
      systemTray: 'text-neutral-300'
    },
    startMenu: {
      background: 'bg-neutral-900/70 backdrop-blur-md border border-neutral-700 shadow-2xl',
      header: 'bg-neutral-900 border-b border-neutral-700',
      items: 'hover:bg-neutral-800 text-neutral-100',
      text: 'text-neutral-100'
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
      border: 'border border-neutral-400',
      shadow: 'shadow-lg',
      borderRadius: 'rounded-t-lg',
      titleBar: {
        background: 'bg-gradient-to-b from-blue-500 to-blue-600',
        text: 'text-white',
        buttons: {
          minimize: 'bg-gradient-to-b from-neutral-200 to-neutral-300 hover:from-neutral-100 hover:to-neutral-200 border border-neutral-400 text-black',
          maximize: 'bg-gradient-to-b from-neutral-200 to-neutral-300 hover:from-neutral-100 hover:to-neutral-200 border border-neutral-400 text-black',
          close: 'bg-gradient-to-b from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 border border-neutral-400 text-white'
        }
      },
      content: {
        text: 'text-neutral-800',
        textSecondary: 'text-neutral-600',
        textMuted: 'text-neutral-500',
        border: 'border-neutral-400',
        hover: 'hover:bg-neutral-50',
        accent: 'text-blue-600'
      }
    },
    taskbar: {
      background: 'bg-neutral-300/85 backdrop-blur-md border-t-2 border-neutral-500',
      startButton: 'bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg',
      taskButtons: 'bg-transparent hover:bg-blue-200/50 text-neutral-800 rounded',
      systemTray: 'text-neutral-800'
    },
    startMenu: {
      background: 'bg-neutral-200/70 backdrop-blur-md border border-neutral-400',
      header: 'bg-gradient-to-r from-blue-600 to-blue-400',
      items: 'hover:bg-blue-100 text-neutral-800',
      text: 'text-neutral-800'
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