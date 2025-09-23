'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'modern-light' | 'modern-dark' | 'classic';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('modern-light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('desktop-theme') as Theme;
    if (savedTheme && (savedTheme === 'modern-light' || savedTheme === 'modern-dark' || savedTheme === 'classic')) {
      setTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage on change
  useEffect(() => {
    localStorage.setItem('desktop-theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme(prev => {
      if (prev === 'modern-light') return 'modern-dark';
      if (prev === 'modern-dark') return 'classic';
      return 'modern-light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}