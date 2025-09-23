'use client';

import { useState, useEffect } from 'react';

interface TypewriterIntroProps {
  delay?: number;
  secondDelay?: number;
  speed?: number;
}

export default function TypewriterIntro({ 
  delay = 750,
  secondDelay = 400,
  speed = 75,
}: TypewriterIntroProps) {
  const lines = ["CS Student @ SHU", "Software Engineer"];
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  // Start typing after initial delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  // Typewriter effect for each line
  useEffect(() => {
    if (!hasStarted || currentLineIndex >= lines.length) return;

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedText(currentLine.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Line is complete, move to next line after a brief pause
      const nextLineTimer = setTimeout(() => {
        setCompletedLines(prev => [...prev, currentLine]);
        setCurrentLineIndex(currentLineIndex + 1);
        setDisplayedText('');
        setCurrentCharIndex(0);
      }, secondDelay);

      return () => clearTimeout(nextLineTimer);
    }
  }, [currentCharIndex, currentLineIndex, lines, speed, hasStarted]);

  // Cursor blinking effect - only while typing or briefly after
  useEffect(() => {
    const isAllTypingComplete = currentLineIndex >= lines.length;
    
    if (isAllTypingComplete) {
      // Hide cursor 1 second after all typing is complete
      const hideTimer = setTimeout(() => {
        setShowCursor(false);
      }, 2000);
      
      return () => clearTimeout(hideTimer);
    } else {
      // Blink cursor while typing
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
          <div className='text-center text-white font-light tracking-wide drop-shadow-lg'>
            <div className="text-5xl">
              Hi, I'm Zayeer
            </div>
            
            {/* Completed typewritten lines */}
            {completedLines.map((line, index) => (
              <div key={index} className="text-3xl">
                {line}
              </div>
            ))}
            
            {/* Currently typing line */}
            {currentLineIndex < lines.length && (
              <div className="text-3xl">
                {displayedText}
                <span 
                  className={`inline-block w-0.5 h-5 bg-white ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-75`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}