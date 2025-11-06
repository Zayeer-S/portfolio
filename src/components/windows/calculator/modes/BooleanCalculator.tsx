import { useState, useCallback } from 'react';
import { CalculatorModeProps } from '../shared/types';
import CalculatorDisplay from '../CalculatorDisplay';
import Button from '../shared/Button';
import { useCalculatorKeyboard } from '../hooks/useCalculatorKeyboard';

export default function BooleanCalculator({ evaluateExpression }: CalculatorModeProps) {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [previousDisplay, setPreviousDisplay] = useState('');
  const [waitingForNewInput, setWaitingForNewInput] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const inputValue = useCallback(
    (value: string) => {
      if (waitingForNewInput) {
        setExpression(value);
        setDisplay(value);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      } else {
        const newExpression = expression === '' || display === '0' ? value : expression + value;
        setExpression(newExpression);
        setDisplay(display === '0' ? value : display + value);
      }
    },
    [expression, display, waitingForNewInput]
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

  const performUnaryOperation = useCallback(
    (operation: string) => {
      if (waitingForNewInput && lastResult !== null) {
        const newExpression = operation + ' ' + lastResult;
        setExpression(newExpression);
        setPreviousDisplay(newExpression);
        setDisplay('');
        setWaitingForNewInput(false);
      } else if (expression !== '' && display !== '') {
        const newExpression = operation + ' ' + expression;
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

  useCalculatorKeyboard({
    mode: 'boolean',
    handlers: {
      inputNumber,
      inputValue,
      performOperation,
      performUnaryOperation,
      handleEquals,
      clear,
    },
  });

  return (
    <>
      <CalculatorDisplay display={display} previousDisplay={previousDisplay} />

      <div
        className="grid grid-cols-4 gap-1 flex-1"
        onMouseDown={e => e.stopPropagation()}
        role="group"
        aria-label="Boolean calculator buttons"
      >
        <Button onClick={clear} variant="clear" ariaLabel="Clear all">
          C
        </Button>
        <Button
          onClick={() => performUnaryOperation('not')}
          variant="operation"
          ariaLabel="NOT operator"
        >
          not
        </Button>
        <Button onClick={() => inputValue('(')} ariaLabel="Left parenthesis">
          (
        </Button>
        <Button onClick={() => inputValue(')')} ariaLabel="Right parenthesis">
          )
        </Button>

        <Button onClick={() => inputNumber('1')} ariaLabel="1 (true)">
          1
        </Button>
        <Button onClick={() => inputNumber('0')} ariaLabel="0 (false)">
          0
        </Button>
        <Button
          onClick={() => performOperation('and')}
          variant="operation"
          ariaLabel="AND operator"
        >
          and
        </Button>
        <Button onClick={() => performOperation('or')} variant="operation" ariaLabel="OR operator">
          or
        </Button>

        <Button onClick={() => inputNumber('2')} ariaLabel="2">
          2
        </Button>
        <Button onClick={() => inputNumber('3')} ariaLabel="3">
          3
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
        <Button onClick={() => inputNumber('7')} ariaLabel="7">
          7
        </Button>
        <Button onClick={() => inputNumber('8')} ariaLabel="8">
          8
        </Button>
        <Button onClick={() => inputNumber('9')} ariaLabel="9">
          9
        </Button>

        <Button onClick={() => performOperation('<')} variant="operation" ariaLabel="Less than">
          &lt;
        </Button>
        <Button onClick={() => performOperation('>')} variant="operation" ariaLabel="Greater than">
          &gt;
        </Button>
        <Button
          onClick={() => performOperation('=')}
          variant="operation"
          ariaLabel="Equals comparison"
        >
          =
        </Button>
        <Button onClick={() => performOperation('!=')} variant="operation" ariaLabel="Not equals">
          ≠
        </Button>

        <Button
          onClick={() => performOperation('<=')}
          variant="operation"
          ariaLabel="Less than or equal"
        >
          ≤
        </Button>
        <Button
          onClick={() => performOperation('>=')}
          variant="operation"
          ariaLabel="Greater than or equal"
        >
          ≥
        </Button>
        <Button onClick={() => {}} variant="disabled" ariaLabel="Reserved slot">
          &nbsp; {/*<= don't delete this fool!*/}
        </Button>
        <Button onClick={handleEquals} variant="equals" ariaLabel="Equals">
          =
        </Button>
      </div>
    </>
  );
}
