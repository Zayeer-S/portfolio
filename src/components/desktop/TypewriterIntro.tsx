'use client';

import { useState, useEffect, useMemo } from 'react';
import { Theme } from '@/contexts/ThemeContext';

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
}: TypewriterIntroProps) {
  const lines = useMemo(() => ["CS Student @ SHU", "Software Engineer"], []);
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
  }, [currentCharIndex, currentLineIndex, lines, speed, hasStarted, secondDelay]);

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
    <div className="fixed inset-0 flex items-start justify-center pt-16 sm:pt-20 md:pt-24 pointer-events-none px-4">
      <div className="text-center w-full max-w-4xl">
        <div className="space-y-2">
          <div className="text-white text-4xl sm:text-5xl md:text-6xl font-light tracking-wide drop-shadow-lg">
            Hi, I&apos;m Zayeer
          </div>
          
          <div className="text-white text-2xl sm:text-3xl md:text-4xl font-light tracking-wide drop-shadow-lg min-h-[1.75rem] sm:min-h-[2rem] md:min-h-[2.25rem] flex items-center justify-center">
            <span>
              {completedLines[0] || (currentLineIndex === 0 ? displayedText : '')}
            </span>
            <span className="inline-block w-0.5 h-5 sm:h-7 md:h-8 ml-1" style={{ minWidth: '2px' }}>
              {currentLineIndex === 0 && (
                <span 
                  className={`block w-full h-full bg-white ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-75`}
                />
              )}
            </span>
          </div>
          
          <div className="text-white text-2xl sm:text-3xl md:text-4xl font-light tracking-wide drop-shadow-lg min-h-[1.75rem] sm:min-h-[2rem] md:min-h-[2.25rem] flex items-center justify-center">
            <span>
              {completedLines[1] || (currentLineIndex === 1 ? displayedText : '')}
            </span>
            <span className="inline-block w-0.5 h-5 sm:h-7 md:h-8 ml-1" style={{ minWidth: '2px' }}>
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