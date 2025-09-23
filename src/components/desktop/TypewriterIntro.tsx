'use client';

import { useState, useEffect } from 'react';
import { Theme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

interface TypewriterIntroProps {
  delay?: number;
  secondDelay?: number;
  speed?: number;
  theme?: Theme;
}

export default function TypewriterIntro({ 
  delay = 750,
  secondDelay = 400,
  speed = 75,
  theme,
}: TypewriterIntroProps) {
  const styles = theme ? getThemeClasses(theme) : null;
  const textColor = styles?.typewriter || "text-white";

  const lines = ["CS Student @ SHU", "Software Engineer"];
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted || currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentLine.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else { // Line is complete
      const nextLineTimer = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLine]);
        setCurrentLineIndex(currentLineIndex + 1);
        setDisplayedText('');
        setCurrentCharIndex(0);
      }, secondDelay);

      return () => clearTimeout(nextLineTimer);
    }
  }, [currentCharIndex, currentLineIndex, lines, speed, hasStarted]);

  // Cursor blinking effect
  useEffect(() => {
    const isAllTypingComplete = currentLineIndex >= lines.length;
    
    if (isAllTypingComplete) {
      const hideTimer = setTimeout(() => {
        setShowCursor(false);
      }, 2000);
      
      return () => clearTimeout(hideTimer);
    } else { // Blink cursor while typing
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorTimer);
    }
  }, [currentLineIndex, lines.length]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pb-95 pointer-events-none">
      <div className="text mr-16">
        <div className="space-y-2">
          <div className="text-center text-white text-5xl font-light tracking-wide drop-shadow-lg">
            Hi, I'm Zayeer
          </div>
          
          <div className="text-center text-white text-3xl font-light tracking-wide drop-shadow-lg min-h-[2.25rem] flex items-center justify-center">
            <span>
              {completedLines[0] || (currentLineIndex === 0 ? displayedText : '')}
            </span>
            <span className="inline-block w-0.5 h-7 ml-1" style={{ minWidth: '2px' }}>
              {currentLineIndex === 0 && (
                <span 
                  className={`block w-full h-full bg-white ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-75`}
                />
              )}
            </span>
          </div>
          
           {/* Currently typing line */}
          <div className="text-center text-white text-3xl font-light tracking-wide drop-shadow-lg min-h-[2.25rem] flex items-center justify-center">
            <span>
              {completedLines[1] || (currentLineIndex === 1 ? displayedText : '')}
            </span>
            <span className="inline-block w-0.5 h-7 ml-1" style={{ minWidth: '2px' }}>
              {currentLineIndex === 1 && (
                <span 
                  className={`block w-full h-full bg-white ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-75`}
                />  
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}