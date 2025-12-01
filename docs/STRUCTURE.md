portfolio/
├── .github/
│   └── workflows/
│       └── ci.yml 
│
├── .husky/
│   └── workflows/
│       ├── pre-commit
│       └── pre-push
│
├── cypress/
│   ├── e2e
│   │   ├── under_development
│   └── support
│       ├── commands/
│       │   ├── calculator.ts
│       │   ├── desktop.ts
│       │   ├── startMenu.ts
│       │   ├── taskbar.ts
│       │   └── window.ts
│       ├── commands.ts
│       ├── contants.ts
│       └── e2e.ts
│
├── docs/
│   ├── DEV_DIARY.md
│   └── STRUCTURE.md
│
├── public/
│   ├── calculator-modern.png                                          
│   ├── closed-folder-modern.png                                          
│   ├── cv-modern.png                                          
│   ├── mail-modern.png                                          
│   ├── notepad-modern.png                                          
│   ├── open-folder-modern.png                                          
│   ├── settings-modern.png                                          
│   ├── start-menu-symbol-modern.png                                          
│   ├── technologies-modern.png                                          
│   └── zayeer-sultan-cv.pdf                                       
│
├── src/
│   ├── app/                                    
│   │   ├── globals.css                                           
│   │   ├── layout.tsx                                           
│   │   └── page.tsx                                # Desktop page
│   │    
│   └── components/      
│       ├── desktop/  
│       │   ├── grid/  
│       │   │   ├── DesktopGrid.tsx                 # Creates a dynamically generated grid for desktop icons based on client viewport
│       │   │   └── DesktopIcon.tsx                 # Reusable, draggable, grid-obeying desktop icons
│       │   ├── menu/  
│       │   │   └── StartMenu.tsx                   # Contains various typical OS utilities                       
│       │   ├── taskbar/  
│       │   │   ├── SystemTray.tsx                                        
│       │   │   ├── Taskbar.tsx                                        
│       │   │   ├── TaskbarDragPreview.tsx                                        
│       │   │   └── TaskbarItem.tsx                                        
│       │   └── TypewriterIntro.tsx                 # Creates a typing introduction on desktop background                            
│       │                                          
│       ├── ui/       
│       │   └── window/     
│       │       ├── ResizeHandles.tsx       
│       │       └── Window.tsx       
│       │                                          
│       ├── windows/                                  
│       │   ├── calculator/                                       
│       │   │   ├── hooks/       
│       │   │   │    ├── useCalculatorCallbacks.ts                                 
│       │   │   │    ├── useCalculatorInput.ts                                     
│       │   │   │    ├── useCalculatorKeyboard.ts                                    
│       │   │   │    └── useCalculatorOperations.ts                                
│       │   │   ├── modes/       
│       │   │   │    ├── AlgebraicCalculator.tsx                                       
│       │   │   │    ├── ArithmeticCalculator.tsx                                       
│       │   │   │    └── BooleanCalculator.tsx                                       
│       │   │   ├── shared/                                       
│       │   │   │    ├── Button.tsx                                       
│       │   │   │    ├── types.tsx                                      
│       │   │   │    └── utils.ts                                      
│       │   │   ├── CalculatorDisplay.tsx                               
│       │   │   ├── CalculatorSidebar.tsx                               
│       │   │   └── CalculatorWindow.tsx                   
│       │   ├── technologies/     
│       │   │   ├── data/       
│       │   │   │    ├── quizStorage.ts                                       
│       │   │   │    └── technologyData.ts       
│       │   │   ├── hooks/       
│       │   │   │    └── useFlickerAnimation.ts 
│       │   │   ├── CalculatorDisplay.tsx                               
│       │   │   └── CalculatorWindow.tsx                   
│       │   ├── ContactWindow.tsx                   # Contact info                  
│       │   ├── CreditsWindow.tsx                   # Attributions for icons from flaticon.com                  
│       │   ├── NotepadWindow.tsx                   # Notepad app in start menu                
│       │   ├── ProjectsWindow.tsx                  # Projects list        
│       │   ├── SettingsWindow.tsx                  # Theme settings         
│       │   └── TechnologiesWindow.tsx              # Technologies list
│       │  
│       ├── constants/                                      
│       │   └── layout.ts                           # Contains UI and layout dimension constants       
│       │  
│       ├── contexts/                                      
│       │   └── ThemeContext.tsx                    # Remembers themes and uses system theme by default            
│       │                                       
│       ├── hooks/                                      
│       │   ├── useWindowManager.ts                 # All window state and mouse managament                                  
│       │   └── useWindowResize.ts                  # All resizing state managamement and mouse management
│       │                                   
│       └── styles/                                      
│       │   └── themes.ts                           # Contains various themes
│       │                                   
│       └── types/                                      
│           └── index.ts                                        
│                                      
├── .gitignore                                      # Files to exclude from version control
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
