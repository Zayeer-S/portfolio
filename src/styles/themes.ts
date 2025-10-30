import { Theme } from '@/contexts/ThemeContext';

export const themeStyles = {
  'modern-light': {
    desktop: {
      background: 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500',
      iconHover: 'hover:bg-white/20',
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
          close: 'bg-transparent hover:bg-red-500 hover:text-white text-neutral-600',
        },
      },
      content: {
        text: 'text-neutral-800',
        textSecondary: 'text-neutral-600',
        textMuted: 'text-neutral-500',
        border: 'border-neutral-300',
        hover: 'hover:bg-neutral-50',
        accent: 'text-blue-600',
      },
    },
    taskbar: {
      background: 'bg-white/80 backdrop-blur-md border-t border-neutral-200',
      startButton: 'hover:bg-neutral-300/50 text-white',
      taskButtons: 'hover:bg-neutral-300/50 text-white rounded border-none',
      systemTray: 'text-neutral-700',
    },
    startMenu: {
      background: 'bg-white/70 backdrop-blur-md border border-neutral-300 shadow-2xl',
      header: 'bg-neutral-100 border-b border-neutral-300',
      items: 'hover:bg-neutral-100 text-neutral-800',
      text: 'text-neutral-800',
    },
    typewriter: 'text-neutral-800',
    calculator: {
      display: {
        background: 'bg-white',
        text: 'text-neutral-800',
        textMuted: 'text-neutral-500',
        border: 'border-neutral-300',
      },
      button: {
        default:
          'bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-400',
        operation:
          'bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800',
        clear:
          'bg-gradient-to-b from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 text-red-800',
        equals:
          'bg-gradient-to-b from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 text-green-800',
        disabled: 'text-neutral-400 cursor-not-allowed',
      },
      sidebar: {
        background: 'bg-white/95 backdrop-blur-md border-r border-neutral-300',
        hamburger: 'hover:bg-neutral-100 text-neutral-800',
        modeItem: 'hover:bg-neutral-100 text-neutral-800',
        modeItemActive: 'bg-blue-100 text-blue-800',
      },
    },
  },
  'modern-dark': {
    desktop: {
      background: 'bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900',
      iconHover: 'hover:bg-white/10',
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
          close: 'bg-transparent hover:bg-neutral-800 hover:text-white text-neutral-400',
        },
      },
      content: {
        text: 'text-white',
        textSecondary: 'text-neutral-300',
        textMuted: 'text-neutral-400',
        border: 'border-neutral-700',
        hover: 'hover:bg-neutral-800',
        accent: 'text-blue-400',
      },
    },
    taskbar: {
      background: 'bg-neutral-900/85 backdrop-blur-md border-t border-neutral-800',
      startButton: 'hover:bg-neutral-700 text-white',
      taskButtons: 'bg-transparent hover:bg-neutral-700/50 text-white rounded border-none',
      systemTray: 'text-neutral-300',
    },
    startMenu: {
      background: 'bg-neutral-900/70 backdrop-blur-md border border-neutral-700 shadow-2xl',
      header: 'bg-neutral-900 border-b border-neutral-700',
      items: 'hover:bg-neutral-600 text-neutral-100',
      text: 'text-neutral-100',
    },
    typewriter: 'text-white',
    calculator: {
      display: {
        background: 'bg-black',
        text: 'text-white',
        textMuted: 'text-neutral-400',
        border: 'border-neutral-700',
      },
      button: {
        default: 'bg-neutral-700 hover:bg-neutral-600 border-neutral-600',
        operation: 'bg-blue-700 hover:bg-blue-600 text-blue-100',
        clear: 'bg-red-700 hover:bg-red-600 text-red-100',
        equals: 'bg-green-700 hover:bg-green-600 text-green-100',
        disabled: 'text-neutral-500 cursor-not-allowed',
      },
      sidebar: {
        background: 'bg-neutral-900/95 backdrop-blur-md border-r border-neutral-700',
        hamburger: 'hover:bg-neutral-800 text-neutral-100',
        modeItem: 'hover:bg-neutral-700 text-neutral-100',
        modeItemActive: 'bg-blue-700 text-blue-100',
      },
    },
  },
  classic: {
    desktop: {
      background: 'bg-gradient-to-br from-blue-400 to-blue-800',
      iconHover: 'hover:bg-blue-200/30',
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
          minimize:
            'bg-gradient-to-b from-neutral-200 to-neutral-300 hover:from-neutral-100 hover:to-neutral-200 border border-neutral-400 text-black',
          maximize:
            'bg-gradient-to-b from-neutral-200 to-neutral-300 hover:from-neutral-100 hover:to-neutral-200 border border-neutral-400 text-black',
          close:
            'bg-gradient-to-b from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 border border-neutral-400 text-white',
        },
      },
      content: {
        text: 'text-neutral-800',
        textSecondary: 'text-neutral-600',
        textMuted: 'text-neutral-500',
        border: 'border-neutral-400',
        hover: 'hover:bg-neutral-50',
        accent: 'text-blue-600',
      },
    },
    taskbar: {
      background: 'bg-neutral-300/85 backdrop-blur-md border-t-2 border-neutral-500',
      startButton:
        'bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-lg',
      taskButtons: 'bg-transparent hover:bg-blue-200/50 text-neutral-800 rounded border-none',
      systemTray: 'text-neutral-800',
    },
    startMenu: {
      background: 'bg-neutral-200/70 backdrop-blur-md border border-neutral-400',
      header: 'bg-gradient-to-r from-blue-600 to-blue-400',
      items: 'hover:bg-blue-100 text-neutral-800',
      text: 'text-neutral-800',
    },
    typewriter: 'text-white',
    calculator: {
      display: {
        background: 'bg-white',
        text: 'text-neutral-800',
        textMuted: 'text-neutral-500',
        border: 'border-neutral-400',
      },
      button: {
        default:
          'bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-400',
        operation:
          'bg-gradient-to-b from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-blue-900',
        clear:
          'bg-gradient-to-b from-red-300 to-red-400 hover:from-red-400 hover:to-red-500 text-red-900',
        equals:
          'bg-gradient-to-b from-green-300 to-green-400 hover:from-green-400 hover:to-green-500 text-green-900',
        disabled: 'text-neutral-400 cursor-not-allowed',
      },
      sidebar: {
        background: 'bg-neutral-200/95 backdrop-blur-md border-r border-neutral-400',
        hamburger: 'hover:bg-neutral-300 text-neutral-800',
        modeItem: 'hover:bg-blue-100 text-neutral-800',
        modeItemActive: 'bg-blue-200 text-blue-900',
      },
    },
  },
};

export function getThemeClasses(theme: Theme) {
  return themeStyles[theme];
}

export function getThemeName(theme: Theme): string {
  const names = {
    'modern-light': 'Modern Light',
    'modern-dark': 'Modern Dark',
    classic: 'Classic',
  };
  return names[theme];
}
