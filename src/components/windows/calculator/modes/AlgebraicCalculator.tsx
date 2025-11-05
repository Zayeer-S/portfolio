import { useState, useCallback } from 'react';
import { CalculatorModeProps } from '../shared/types';
import CalculatorDisplay from '../CalculatorDisplay';
import Button from '../shared/Button';
import { useCalculatorKeyboard } from '../shared/useCalculatorKeyboard';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

export default function AlgebraicCalculator({ evaluateExpression }: CalculatorModeProps) {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [previousDisplay, setPreviousDisplay] = useState('');
  const [waitingForNewInput, setWaitingForNewInput] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [variables, setVariables] = useState<Record<string, number>>({});
  const [showVariableInput, setShowVariableInput] = useState(false);
  const [currentVariable, setCurrentVariable] = useState('');
  const [variableValue, setVariableValue] = useState('');

  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const inputCharacter = useCallback(
    (char: string) => {
      if (waitingForNewInput) {
        setExpression(char);
        setDisplay(char);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      } else {
        const newExpression = expression === '' || display === '0' ? char : expression + char;
        setExpression(newExpression);
        setDisplay(display === '0' ? char : display + char);
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

  const clearVariables = useCallback(() => {
    setVariables({});
    setPreviousDisplay('Variables cleared');
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
      const result = await evaluateExpression(expression, variables);
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
  }, [expression, variables, evaluateExpression]);

  const handleSetVariable = useCallback(() => {
    if (currentVariable && variableValue) {
      const value = parseFloat(variableValue);
      if (!isNaN(value)) {
        setVariables(prev => ({ ...prev, [currentVariable]: value }));
        setPreviousDisplay(`${currentVariable} = ${value}`);
        setCurrentVariable('');
        setVariableValue('');
        setShowVariableInput(false);
      }
    }
  }, [currentVariable, variableValue]);

  // Use the shared keyboard hook (disabled when typing in variable input)
  useCalculatorKeyboard({
    mode: 'algebraic',
    handlers: {
      inputCharacter,
      inputDecimal,
      performOperation,
      handleEquals,
      clear,
    },
    enabled: !showVariableInput,
  });

  return (
    <>
      <CalculatorDisplay display={display} previousDisplay={previousDisplay} />

      {/* Variables display */}
      {Object.keys(variables).length > 0 && (
        <div
          className={`${styles.calculator.display.background} border ${styles.calculator.display.border} p-2 text-xs font-mono`}
        >
          <div className={`${styles.calculator.display.textMuted} mb-1`}>Variables:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(variables).map(([key, value]) => (
              <span key={key} className={`${styles.calculator.display.text}`}>
                {key} = {value}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Variable input panel */}
      {showVariableInput && (
        <div
          className={`${styles.calculator.display.background} border ${styles.calculator.display.border} p-2 space-y-2`}
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="var"
              value={currentVariable}
              onChange={e => setCurrentVariable(e.target.value.toLowerCase())}
              maxLength={10}
              className={`flex-1 px-2 py-1 border ${styles.calculator.display.border} ${styles.calculator.display.background} ${styles.calculator.display.text} text-sm font-mono rounded`}
              autoFocus
            />
            <input
              type="number"
              placeholder="value"
              value={variableValue}
              onChange={e => setVariableValue(e.target.value)}
              className={`flex-1 px-2 py-1 border ${styles.calculator.display.border} ${styles.calculator.display.background} ${styles.calculator.display.text} text-sm font-mono rounded`}
            />
          </div>
          <div className="flex gap-1">
            <Button onClick={handleSetVariable} variant="equals" ariaLabel="Set variable" wide>
              Set
            </Button>
            <Button
              onClick={() => {
                setShowVariableInput(false);
                setCurrentVariable('');
                setVariableValue('');
              }}
              variant="clear"
              ariaLabel="Cancel"
              wide
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div
        className="grid grid-cols-4 gap-1 flex-1"
        onMouseDown={e => e.stopPropagation()}
        role="group"
        aria-label="Algebraic calculator buttons"
      >
        <Button onClick={clear} variant="clear" ariaLabel="Clear expression">
          C
        </Button>
        <Button
          onClick={clearVariables}
          variant="clear"
          ariaLabel="Clear variables"
          className="text-xs"
        >
          CV
        </Button>
        <Button
          onClick={() => setShowVariableInput(!showVariableInput)}
          variant="operation"
          ariaLabel="Set variable"
          className="text-xs"
        >
          VAR
        </Button>
        <Button onClick={() => performOperation('/')} variant="operation" ariaLabel="Divide">
          ÷
        </Button>

        <Button onClick={() => inputCharacter('7')} ariaLabel="7">
          7
        </Button>
        <Button onClick={() => inputCharacter('8')} ariaLabel="8">
          8
        </Button>
        <Button onClick={() => inputCharacter('9')} ariaLabel="9">
          9
        </Button>
        <Button onClick={() => performOperation('*')} variant="operation" ariaLabel="Multiply">
          ×
        </Button>

        <Button onClick={() => inputCharacter('4')} ariaLabel="4">
          4
        </Button>
        <Button onClick={() => inputCharacter('5')} ariaLabel="5">
          5
        </Button>
        <Button onClick={() => inputCharacter('6')} ariaLabel="6">
          6
        </Button>
        <Button onClick={() => performOperation('-')} variant="operation" ariaLabel="Subtract">
          -
        </Button>

        <Button onClick={() => inputCharacter('1')} ariaLabel="1">
          1
        </Button>
        <Button onClick={() => inputCharacter('2')} ariaLabel="2">
          2
        </Button>
        <Button onClick={() => inputCharacter('3')} ariaLabel="3">
          3
        </Button>
        <Button onClick={() => performOperation('+')} variant="operation" ariaLabel="Add">
          +
        </Button>

        <Button onClick={() => inputCharacter('0')} ariaLabel="0">
          0
        </Button>
        <Button onClick={inputDecimal} ariaLabel="Decimal point">
          .
        </Button>
        <Button onClick={() => performOperation('^')} variant="operation" ariaLabel="Power">
          ^
        </Button>
        <Button onClick={handleEquals} variant="equals" ariaLabel="Equals">
          =
        </Button>

        <Button onClick={() => inputCharacter('(')} ariaLabel="Left parenthesis">
          (
        </Button>
        <Button onClick={() => inputCharacter(')')} ariaLabel="Right parenthesis">
          )
        </Button>
        <Button onClick={() => inputCharacter('x')} ariaLabel="Variable x">
          x
        </Button>
        <Button onClick={() => inputCharacter('y')} ariaLabel="Variable y">
          y
        </Button>
      </div>
    </>
  );
}
