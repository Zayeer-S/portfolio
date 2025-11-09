import { useCallback } from 'react';

interface UseCalculatorOperationsOptions {
  expression: string;
  waitingForNewInput: boolean;
  lastResult: string | null;
  setExpression: (expr: string) => void;
  setDisplay: (disp: string) => void;
  setWaitingForNewInput: (waiting: boolean) => void;
  setPreviousDisplay: (disp: string) => void;
}

export function useCalculatorOperations({
  expression,
  waitingForNewInput,
  lastResult,
  setExpression,
  setDisplay,
  setWaitingForNewInput,
  setPreviousDisplay,
}: UseCalculatorOperationsOptions) {
  const performOperation = useCallback(
    (operation: string) => {
      if (waitingForNewInput && lastResult !== null) {
        const newExpression = lastResult + operation;
        setExpression(newExpression);
        setDisplay(newExpression);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      } else {
        const newExpression = expression + operation;
        setExpression(newExpression);
        setDisplay(newExpression);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      }
    },
    [
      expression,
      waitingForNewInput,
      lastResult,
      setExpression,
      setDisplay,
      setWaitingForNewInput,
      setPreviousDisplay,
    ]
  );

  const performUnaryOperation = useCallback(
    (operation: string) => {
      if (waitingForNewInput && lastResult !== null) {
        const newExpression = operation + lastResult;
        setExpression(newExpression);
        setDisplay(newExpression);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      } else {
        const newExpression = operation + expression;
        setExpression(newExpression);
        setDisplay(newExpression);
        setWaitingForNewInput(false);
        setPreviousDisplay('');
      }
    },
    [
      expression,
      waitingForNewInput,
      lastResult,
      setExpression,
      setDisplay,
      setWaitingForNewInput,
      setPreviousDisplay,
    ]
  );

  return {
    performOperation,
    performUnaryOperation,
  };
}
