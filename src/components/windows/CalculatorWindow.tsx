import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function CalculatorWindow() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [previousDisplay, setPreviousDisplay] = useState('');

  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        inputNumber(e.key);
      } else if (e.key === '.') {
        inputDecimal();
      } else if (e.key === '+') {
        performOperation('+');
      } else if (e.key === '-') {
        performOperation('-');
      } else if (e.key === '*') {
        performOperation('×');
      } else if (e.key === '/') {
        e.preventDefault();
        performOperation('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setPreviousDisplay(display + ' ' + nextOperation);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setPreviousDisplay(String(newValue) + ' ' + nextOperation);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const displayBg = theme === 'modern-dark' ? 'bg-black' : 'bg-white';
  const buttonBg = theme === 'modern-dark' 
    ? 'bg-neutral-700 hover:bg-neutral-600 border-neutral-600' 
    : 'bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-400';

  const Button = ({ 
    onClick, 
    className = '', 
    children, 
    wide = false 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
    wide?: boolean;
  }) => (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={`
        min-h-8 text-sm font-medium border ${buttonBg}
        active:transform active:scale-95
        transition-all duration-75 select-none
        ${styles.window.content.text}
        ${wide ? 'col-span-2' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <div 
      className="h-full flex flex-col p-3 space-y-3"
      style={{ minWidth: '280px', minHeight: '320px' }}
    >
      {/* Display calculator with previous input as a "shadow" */}
      <div className={`${displayBg} border-2 border-inset ${styles.window.content.border} p-3 flex flex-col justify-end text-right font-mono flex-shrink-0 min-h-16`}>
        {/* Shadow */}
        <div className={`text-xs ${styles.window.content.textMuted} h-4 overflow-hidden`}>
          {previousDisplay}
        </div>
        {/* Current display */}
        <div className={`text-xl font-bold ${styles.window.content.text}`}>
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1 flex-1"
           onMouseDown={(e) => e.stopPropagation()}
      >
        <Button onClick={clear} className="bg-gradient-to-b from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 text-red-800">
          C
        </Button>
        <Button onClick={() => {}} className={`${styles.window.content.textMuted} cursor-not-allowed`}>
          ±
        </Button>
        <Button onClick={() => {}} className={`${styles.window.content.textMuted} cursor-not-allowed`}>
          %
        </Button>
        <Button onClick={() => performOperation('÷')} className="bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800">
          ÷
        </Button>

        <Button onClick={() => inputNumber('7')}>7</Button>
        <Button onClick={() => inputNumber('8')}>8</Button>
        <Button onClick={() => inputNumber('9')}>9</Button>
        <Button onClick={() => performOperation('×')} className="bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800">
          ×
        </Button>

        <Button onClick={() => inputNumber('4')}>4</Button>
        <Button onClick={() => inputNumber('5')}>5</Button>
        <Button onClick={() => inputNumber('6')}>6</Button>
        <Button onClick={() => performOperation('-')} className="bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800">
          -
        </Button>

        <Button onClick={() => inputNumber('1')}>1</Button>
        <Button onClick={() => inputNumber('2')}>2</Button>
        <Button onClick={() => inputNumber('3')}>3</Button>
        <Button onClick={() => performOperation('+')} className="bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800">
          +
        </Button>

        <Button onClick={() => inputNumber('0')} wide>0</Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button onClick={handleEquals} className="bg-gradient-to-b from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 text-green-800">
          =
        </Button>
      </div>
    </div>
  );
}