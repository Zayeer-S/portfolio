import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { env } from '@/config/env';

interface EvaluateRequest {
  expression: string;
  variables?: Record<string, number>;
}

interface EvaluateResponse {
  value: number;
  displayValue: string;
  isBooleanExpression: boolean;
  variables: Record<string, number>;
  expression: string;
  postfixNotation?: string;
}

interface ErrorResponse {
  error: string;
  message: string;
  expression?: string;
  statusCode: number;
}

interface CacheEntry {
  expression: string;
  variables: Record<string, number>;
  result: string;
}

export default function CalculatorWindow() {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [previousDisplay, setPreviousDisplay] = useState('');
  const [waitingForNewInput, setWaitingForNewInput] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [calculationCache, setCalculationCache] = useState<CacheEntry[]>([]);

  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const evaluateExpression = useCallback(
    async (expr: string): Promise<string> => {
      try {
        const cacheKey = JSON.stringify({ expression: expr, variables: {} });
        const cached = calculationCache.find(
          entry =>
            JSON.stringify({ expression: entry.expression, variables: entry.variables }) ===
            cacheKey
        );

        if (cached) {
          return cached.result;
        }

        const requestBody: EvaluateRequest = {
          expression: expr,
          variables: {},
        };

        const response = await fetch(`${env.NEXT_PUBLIC_EVALR_API_URL}/evaluate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData: ErrorResponse = await response.json();
          throw new Error(errorData.message || 'API request failed');
        }

        const data: EvaluateResponse = await response.json();

        // gotta reduce api calls somehow; aws expensive yo
        setCalculationCache(prev => [
          ...prev.slice(-9),
          { expression: expr, variables: {}, result: data.displayValue },
        ]);

        return data.displayValue;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`API Error: ${error.message}`);
        }
        throw new Error('Unknown error occurred');
      }
    },
    [calculationCache]
  );

  const inputNumber = useCallback(
    (num: string) => {
      if (waitingForNewInput) {
        setExpression(num);
        setDisplay(num);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      } else {
        const newExpression = expression === '' || display === '0' ? num : expression + num;
        setExpression(newExpression);
        setDisplay(display === '0' ? num : display + num);
      }
    },
    [expression, display, waitingForNewInput]
  );

  const inputDecimal = useCallback(() => {
    if (waitingForNewInput) {
      setExpression('0.');
      setDisplay('0.');
      setWaitingForNewInput(false);
      setPreviousDisplay('');
    } else if (!display.includes('.')) {
      const newExpression = expression + '.';
      setExpression(newExpression);
      setDisplay(display + '.');
    }
  }, [expression, display, waitingForNewInput]);

  const clear = useCallback(() => {
    setExpression('');
    setDisplay('0');
    setPreviousDisplay('');
    setWaitingForNewInput(false);
    setLastResult(null);
  }, []);

  const performOperation = useCallback(
    (operation: string) => {
      if (waitingForNewInput && lastResult !== null) {
        const newExpression = lastResult + ' ' + operation + ' ';
        setExpression(newExpression);
        setPreviousDisplay(newExpression);
        setDisplay('');
        setWaitingForNewInput(false);
      } else if (expression !== '' && display !== '') {
        const newExpression = expression + ' ' + operation + ' ';
        setExpression(newExpression);
        setPreviousDisplay(newExpression);
        setDisplay('');
      }
    },
    [expression, display, waitingForNewInput, lastResult]
  );

  const handleEquals = useCallback(async () => {
    if (expression === '' || expression.trim() === '') {
      return;
    }

    try {
      const result = await evaluateExpression(expression);
      setDisplay(result);
      setLastResult(result);
      setPreviousDisplay(expression + ' =');
      setExpression('');
      setWaitingForNewInput(true);
    } catch (error) {
      if (error instanceof Error) {
        setDisplay('Error');
        setPreviousDisplay(error.message);
      } else {
        setDisplay('Error');
        setPreviousDisplay('Unknown error occurred');
      }
      setExpression('');
      setWaitingForNewInput(true);
    }
  }, [expression, evaluateExpression]);

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
        performOperation('*');
      } else if (e.key === '/') {
        e.preventDefault();
        performOperation('/');
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputNumber, inputDecimal, performOperation, handleEquals, clear]);

  const displayBg = theme === 'modern-dark' ? 'bg-black' : 'bg-white';
  const buttonBg =
    theme === 'modern-dark'
      ? 'bg-neutral-700 hover:bg-neutral-600 border-neutral-600'
      : 'bg-gradient-to-b from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 border-gray-400';

  const Button = ({
    onClick,
    className = '',
    children,
    wide = false,
    ariaLabel,
  }: {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
    wide?: boolean;
    ariaLabel: string;
  }) => (
    <button
      onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      aria-label={ariaLabel}
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
      role="application"
      aria-label="Calculator"
    >
      {/* Display calculator with previous input as a "shadow" */}
      <div
        className={`${displayBg} border-2 border-inset ${styles.window.content.border} p-3 flex flex-col justify-end text-right font-mono flex-shrink-0 min-h-16`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Calculator display showing ${display}`}
      >
        {/* Shadow - hidden from screen readers */}
        <div
          className={`text-xs ${styles.window.content.textMuted} h-4 overflow-hidden`}
          aria-hidden="true"
        >
          {previousDisplay}
        </div>
        {/* Current display */}
        <div className={`text-xl font-bold ${styles.window.content.text}`}>{display}</div>
      </div>

      <div
        className="grid grid-cols-4 gap-1 flex-1"
        onMouseDown={e => e.stopPropagation()}
        role="group"
        aria-label="Calculator buttons"
      >
        <Button
          onClick={clear}
          className="bg-gradient-to-b from-red-200 to-red-300 hover:from-red-300 hover:to-red-400 text-red-800"
          ariaLabel="Clear all"
        >
          C
        </Button>
        <Button
          onClick={() => {}}
          className={`${styles.window.content.textMuted} cursor-not-allowed`}
          ariaLabel="Plus minus (disabled)"
        >
          ±
        </Button>
        <Button
          onClick={() => {}}
          className={`${styles.window.content.textMuted} cursor-not-allowed`}
          ariaLabel="Percent (disabled)"
        >
          %
        </Button>
        <Button
          onClick={() => performOperation('/')}
          className="bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800"
          ariaLabel="Divide"
        >
          ÷
        </Button>

        <Button onClick={() => inputNumber('7')} ariaLabel="7">
          7
        </Button>
        <Button onClick={() => inputNumber('8')} ariaLabel="8">
          8
        </Button>
        <Button onClick={() => inputNumber('9')} ariaLabel="9">
          9
        </Button>
        <Button
          onClick={() => performOperation('*')}
          className="bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800"
          ariaLabel="Multiply"
        >
          ×
        </Button>

        <Button onClick={() => inputNumber('4')} ariaLabel="4">
          4
        </Button>
        <Button onClick={() => inputNumber('5')} ariaLabel="5">
          5
        </Button>
        <Button onClick={() => inputNumber('6')} ariaLabel="6">
          6
        </Button>
        <Button
          onClick={() => performOperation('-')}
          className="bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800"
          ariaLabel="Subtract"
        >
          -
        </Button>

        <Button onClick={() => inputNumber('1')} ariaLabel="1">
          1
        </Button>
        <Button onClick={() => inputNumber('2')} ariaLabel="2">
          2
        </Button>
        <Button onClick={() => inputNumber('3')} ariaLabel="3">
          3
        </Button>
        <Button
          onClick={() => performOperation('+')}
          className="bg-gradient-to-b from-blue-200 to-blue-300 hover:from-blue-300 hover:to-blue-400 text-blue-800"
          ariaLabel="Add"
        >
          +
        </Button>

        <Button onClick={() => inputNumber('0')} wide ariaLabel="0">
          0
        </Button>
        <Button onClick={inputDecimal} ariaLabel="Decimal point">
          .
        </Button>
        <Button
          onClick={handleEquals}
          className="bg-gradient-to-b from-green-200 to-green-300 hover:from-green-300 hover:to-green-400 text-green-800"
          ariaLabel="Equals"
        >
          =
        </Button>
      </div>
    </div>
  );
}
