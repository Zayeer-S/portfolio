portfolio/
├── .github/
│ └── workflows/
│ └── ci.yml
│
├── .husky/
│ └── workflows/
│ ├── pre-commit
│ └── pre-push
│
├── docs/
│ ├── DEV_DIARY.md
│ └── STRUCTURE.md
│
├── public/ # All icons from flaticon, see CreditsWindow.tsx for detailed attributions
│ ├── calculator-modern.png  
│ ├── closed-folder-modern.png  
│ ├── cv-modern.png  
│ ├── mail-modern.png  
│ ├── notepad-modern.png  
│ ├── open-folder-modern.png  
│ ├── settings-modern.png  
│ ├── start-menu-symbol-modern.png  
│ ├── technologies-modern.png  
│ └── zayeer-sultan-cv.pdf  
│
├── src/
│ ├── app/  
│ │ ├── globals.css  
│ │ ├── layout.tsx  
│ │ └── page.tsx # Desktop page
│ │  
│ └── components/  
│ ├── desktop/  
│ │ ├── grid/  
│ │ │ ├── DesktopGrid.tsx # Creates a dynamically generated grid for desktop icons based on client viewport
│ │ │ └── DesktopIcon.tsx # Reusable, draggable, grid-obeying desktop icons
│ │ ├── menu/  
│ │ │ └── StartMenu.tsx # Contains various typical OS utilities  
│ │ ├── taskbar/  
│ │ │ ├── SystemTray.tsx  
│ │ │ ├── Taskbar.tsx  
│ │ │ ├── TaskbarDragPreview.tsx  
│ │ │ └── TaskbarItem.tsx  
│ │ ├── window/  
│ │ │ ├── ResizeHandles.tsx # Adds resize handles in all directions  
│ │ │ └── Window.tsx # Reusable and resizable window component  
│ │ └── TypewriterIntro.tsx # Creates a typing introduction on desktop background  
│ │  
│ ├── windows/  
│ │ ├── CalculatorWindow.tsx # Calculator app in start menu  
│ │ ├── ContactWindow.tsx # Contact info  
│ │ ├── CreditsWindow.tsx # Attributions for icons from flaticon.com  
│ │ ├── NotepadWindow.tsx # Notepad app in start menu  
│ │ ├── ProjectsWindow.tsx # Projects list  
│ │ ├── SettingsWindow.tsx # Theme settings  
│ │ └── TechnologiesWindow.tsx # Technologies list
│ │  
│ ├── constants/  
│ │ └── layout.ts # Contains UI and layout dimension constants  
│ │  
│ ├── contexts/  
│ │ └── ThemeContext.tsx # Remembers themes and uses system theme by default  
│ │  
│ ├── hooks/  
│ │ ├── useWindowManager.ts # All window state management and mouse managament  
│ │ └── useWindowResize.ts # All resizing state managamement and mouse management
│ │  
│ └── styles/  
│ │ └── themes.ts # Contains various themes
│ │  
│ └── types/  
│ └── index.ts  
│  
├── .gitignore # Files to exclude from version control
├── .lintstagedrc.js
├── .prettierignore
├── .prettierrc.json
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
