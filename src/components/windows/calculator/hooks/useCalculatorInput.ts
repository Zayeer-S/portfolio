import { useCallback } from 'react';

interface UseCalculatorInputOptions {
  expression: string;
  display: string;
  waitingForNewInput: boolean;
  setExpression: (expr: string) => void;
  setDisplay: (disp: string) => void;
  setWaitingForNewInput: (waiting: boolean) => void;
  setPreviousDisplay: (disp: string) => void;
}

export function useCalculatorInput({
  expression,
  display,
  waitingForNewInput,
  setExpression,
  setDisplay,
  setWaitingForNewInput,
  setPreviousDisplay,
}: UseCalculatorInputOptions) {
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
    [
      expression,
      display,
      waitingForNewInput,
      setExpression,
      setDisplay,
      setWaitingForNewInput,
      setPreviousDisplay,
    ]
  );

  const inputCharacter = useCallback(
    (char: string) => {
      if (waitingForNewInput) {
        setExpression(char);
        setDisplay(char);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      } else {
        const newExpression = expression + char;
        setExpression(newExpression);
        setDisplay(newExpression);
      }
    },
    [
      expression,
      waitingForNewInput,
      setExpression,
      setDisplay,
      setWaitingForNewInput,
      setPreviousDisplay,
    ]
  );

  const inputValue = useCallback(
    (value: string) => {
      if (waitingForNewInput) {
        setExpression(value);
        setDisplay(value);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      } else {
        const newExpression = expression + value;
        setExpression(newExpression);
        setDisplay(newExpression);
      }
    },
    [
      expression,
      waitingForNewInput,
      setExpression,
      setDisplay,
      setWaitingForNewInput,
      setPreviousDisplay,
    ]
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
  }, [
    expression,
    display,
    waitingForNewInput,
    setExpression,
    setDisplay,
    setWaitingForNewInput,
    setPreviousDisplay,
  ]);

  return {
    inputNumber,
    inputCharacter,
    inputValue,
    inputDecimal,
  };
}
