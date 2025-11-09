import { useState, useCallback } from 'react';
import { CalculatorModeProps } from '../shared/types';
import CalculatorDisplay from '../CalculatorDisplay';
import Button from '../shared/Button';
import { useCalculatorKeyboard } from '../hooks/useCalculatorKeyboard';
import { useCalculatorCallbacks } from '../hooks/useCalculatorCallbacks';
import { useCalculatorOperations } from '../hooks/useCalculatorOperations';

export default function ArithmeticCalculator({ evaluateExpression }: CalculatorModeProps) {
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
    setWaitingForNewInput,
    setPreviousDisplay,
    setLastResult,
    evaluateExpression,
  });

  const { performOperation } = useCalculatorOperations({
    expression,
    waitingForNewInput,
    lastResult,
    setExpression,
    setDisplay,
    setWaitingForNewInput,
    setPreviousDisplay,
  });

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

  useCalculatorKeyboard({
    mode: 'arithmetic',
    handlers: {
      inputNumber,
      inputDecimal,
      performOperation,
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
        aria-label="Arithmetic calculator buttons"
      >
        <Button onClick={clear} variant="clear" ariaLabel="Clear all">
          C
        </Button>
        <Button onClick={() => {}} variant="disabled" ariaLabel="Plus minus (disabled)">
          ±
        </Button>
        <Button onClick={() => {}} variant="disabled" ariaLabel="Percent (disabled)">
          %
        </Button>
        <Button onClick={() => performOperation('/')} variant="operation" ariaLabel="Divide">
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
        <Button onClick={() => performOperation('*')} variant="operation" ariaLabel="Multiply">
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
        <Button onClick={() => performOperation('-')} variant="operation" ariaLabel="Subtract">
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
        <Button onClick={() => performOperation('+')} variant="operation" ariaLabel="Add">
          +
        </Button>

        <Button onClick={() => inputNumber('0')} wide ariaLabel="0">
          0
        </Button>
        <Button onClick={inputDecimal} ariaLabel="Decimal point">
          .
        </Button>
        <Button onClick={handleEquals} variant="equals" ariaLabel="Equals">
          =
        </Button>
      </div>
    </>
  );
}
