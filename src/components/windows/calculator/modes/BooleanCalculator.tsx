import { useState, useCallback } from 'react';
import { CalculatorModeProps } from '../shared/types';
import CalculatorDisplay from '../CalculatorDisplay';
import Button from '../shared/Button';
import { useCalculatorKeyboard } from '../hooks/useCalculatorKeyboard';
import { useCalculatorCallbacks } from '../hooks/useCalculatorCallbacks';

export default function BooleanCalculator({ evaluateExpression }: CalculatorModeProps) {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');
  const [previousDisplay, setPreviousDisplay] = useState('');
  const [waitingForNewInput, setWaitingForNewInput] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const { clear, backspace, handleEquals } = useCalculatorCallbacks({
    expression,
    display,
    waitingForNewInput,
    setExpression,
    setDisplay,
    setPreviousDisplay,
    setWaitingForNewInput,
    setLastResult,
    evaluateExpression,
  });

  const inputValue = useCallback(
    (value: string) => {
      if (waitingForNewInput) {
        setExpression(value);
        setDisplay(value);
        setPreviousDisplay('');
        setWaitingForNewInput(false);
      } else {
        const newExpression = expression + value;
        setExpression(newExpression);
        setDisplay(newExpression);
      }
    },
    [expression, waitingForNewInput]
  );

  const inputNumber = useCallback(
    (num: string) => {
      if (waitingForNewInput) {
        setExpression(num);
        setDisplay(num);
        setPreviousDisplay('');
        setWaitingForNewInput(false);
      } else {
        const newExpression = expression + num;
        setExpression(newExpression);
        setDisplay(newExpression);
      }
    },
    [expression, waitingForNewInput]
  );

  const performOperation = useCallback(
    (operation: string) => {
      if (waitingForNewInput && lastResult !== null) {
        const newExpression = lastResult + operation;
        setExpression(newExpression);
        setDisplay(newExpression);
        setPreviousDisplay('');
        setWaitingForNewInput(false);
      } else {
        const newExpression = expression + operation;
        setExpression(newExpression);
        setDisplay(newExpression);
        setPreviousDisplay('');
        setWaitingForNewInput(false);
      }
    },
    [expression, waitingForNewInput, lastResult]
  );

  const performUnaryOperation = useCallback(
    (operation: string) => {
      if (waitingForNewInput && lastResult !== null) {
        const newExpression = operation + lastResult;
        setExpression(newExpression);
        setDisplay(newExpression);
        setPreviousDisplay('');
        setWaitingForNewInput(false);
      } else {
        const newExpression = operation + expression;
        setExpression(newExpression);
        setDisplay(newExpression);
        setPreviousDisplay('');
        setWaitingForNewInput(false);
      }
    },
    [expression, waitingForNewInput, lastResult]
  );

  useCalculatorKeyboard({
    mode: 'boolean',
    handlers: {
      inputNumber,
      inputValue,
      performOperation,
      performUnaryOperation,
      handleEquals,
      clear,
      backspace,
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
