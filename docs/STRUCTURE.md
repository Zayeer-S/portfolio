portfolio/
├── .gitignore                                  # Files to exclude from version control
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
│
├── docs/
│   ├── README.md                                           
│   └── STRUCTURE.md
│
├── public/
│   └── Zayeer Sultan - CV.pdf                                       
│
└── src/
    ├── app/                                    
    │   ├── globals.css                                           
    │   ├── layout.tsx                                           
    │   └── page.tsx                            # Desktop page
    │    
    └── components/      
        ├── desktop/  
        │   ├── DesktopGrid.tsx                 # Creates a dynamically generated grid for desktop icons based on client viewport
        │   ├── DesktopIcon.tsx                 # Reusable, draggable, grid-obeying desktop icons
        │   ├── ResizeHandles.tsx               # Adds resize handles in all directions                       
        │   ├── StartMenu.tsx                   # Contains various typical OS utilities                       
        │   ├── Taskbar.tsx                                        
        │   ├── TypewriterIntro.tsx             # Creates a typing introduction on desktop background                            
        │   └── Window.tsx                      # Reusable and resizable window component                            
        │                                          
        ├── windows/                                  
        │   ├── CalculatorWindow.tsx            # Calculator app in start menu                                         
        │   ├── ContactWindow.tsx               # Contact info                  
        │   ├── ProjectsWindow.tsx              # Projects list        
        │   ├── SettingsWindow.tsx              # Theme settings         
        │   └── TechnologiesWindow.tsx          # Technologies list
        │  
        ├── constants/                                      
        │   └── layout.ts                       # Contains UI and layout dimension constants       
        │  
        ├── contexts/                                      
        │   └── ThemeContext.tsx                # Remembers themes and uses system theme by default            
        │                                       
        ├── hooks/                                      
        │   ├── useWindowManager.ts             # All window state management and mouse managament                                  
        │   └── useWindowResize.ts              # All resizing state managamement and mouse management
        │                                   
        └── styles/                                      
        │   └── themes.ts                       # Contains various themes
        │                                   
        └── types/                                      
            └── index.ts                                        
