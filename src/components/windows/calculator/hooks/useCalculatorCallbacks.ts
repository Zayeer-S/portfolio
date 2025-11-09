import { useCallback } from 'react';

interface UseCalculatorCallbacksOptions {
  expression: string;
  display: string;
  waitingForNewInput: boolean;
  setExpression: (expr: string) => void;
  setDisplay: (disp: string) => void;
  setWaitingForNewInput: (waiting: boolean) => void;
  setPreviousDisplay: (disp: string) => void;
  setLastResult: (result: string | null) => void;
  evaluateExpression: (expr: string, variables?: Record<string, number>) => Promise<string>;
  variables?: Record<string, number>;
}

export function useCalculatorCallbacks({
  expression,
  display,
  waitingForNewInput,
  setExpression,
  setDisplay,
  setWaitingForNewInput,
  setPreviousDisplay,
  setLastResult,
  evaluateExpression,
  variables,
}: UseCalculatorCallbacksOptions) {
  const clear = useCallback(() => {
    setExpression('');
    setDisplay('0');
    setWaitingForNewInput(false);
    setLastResult(null);
    setPreviousDisplay('');
  }, [setExpression, setDisplay, setWaitingForNewInput, setLastResult, setPreviousDisplay]);

  const backspace = useCallback(() => {
    if (waitingForNewInput) {
      return;
    }

    const booleanOperators = ['and', 'or', 'not', '!=', '<=', '>='];

    for (const op of booleanOperators) {
      if (expression.endsWith(op)) {
        const newExpression = expression.slice(0, -op.length);
        setExpression(newExpression);
        setDisplay(newExpression || '0');
        return;
      }
    }

    const newExpression = expression.slice(0, -1);
    const newDisplay = display.slice(0, -1);
    setExpression(newExpression);
    setDisplay(newDisplay || '0');
  }, [expression, display, waitingForNewInput, setExpression, setDisplay]);

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
  }, [
    expression,
    variables,
    evaluateExpression,
    setDisplay,
    setLastResult,
    setPreviousDisplay,
    setExpression,
    setWaitingForNewInput,
  ]);

  return {
    clear,
    backspace,
    handleEquals,
  };
}
