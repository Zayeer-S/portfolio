import { useEffect } from 'react';
import { CalculatorMode } from '../shared/types';

interface CalculatorKeyboardHandlers {
  inputNumber?: (num: string) => void;
  inputCharacter?: (char: string) => void;
  inputDecimal?: () => void;
  performOperation?: (op: string) => void;
  performUnaryOperation?: (op: string) => void;
  handleEquals?: () => void;
  clear?: () => void;
  inputValue?: (value: string) => void;
  backspace?: () => void;
}

interface UseCalculatorKeyboardOptions {
  mode: CalculatorMode;
  handlers: CalculatorKeyboardHandlers;
  enabled?: boolean;
}

export function useCalculatorKeyboard({
  mode,
  handlers,
  enabled = true,
}: UseCalculatorKeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        handlers.clear?.();
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        handlers.handleEquals?.();
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        handlers.backspace?.();
        return;
      }

      if (e.key.length > 1) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        if (mode === 'algebraic' && handlers.inputCharacter) {
          handlers.inputCharacter(e.key);
        } else if (handlers.inputNumber) {
          handlers.inputNumber(e.key);
        }
        return;
      }

      if (e.key === '.' && (mode === 'arithmetic' || mode === 'algebraic')) {
        e.preventDefault();
        handlers.inputDecimal?.();
        return;
      }

      // Basic operations (all modes support these in some form)
      if (e.key === '+' && handlers.performOperation) {
        e.preventDefault();
        handlers.performOperation('+');
        return;
      }

      if (e.key === '-' && handlers.performOperation) {
        e.preventDefault();
        handlers.performOperation('-');
        return;
      }

      if (e.key === '*' && handlers.performOperation) {
        e.preventDefault();
        handlers.performOperation('*');
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        handlers.performOperation?.('/');
        return;
      }

      // Algebraic-specific keys
      if (mode === 'algebraic') {
        if ((e.key >= 'a' && e.key <= 'z') || (e.key >= 'A' && e.key <= 'Z')) {
          e.preventDefault();
          handlers.inputCharacter?.(e.key);
          return;
        }

        if (e.key === '^') {
          e.preventDefault();
          handlers.performOperation?.('^');
          return;
        }

        if (e.key === '(' || e.key === ')') {
          e.preventDefault();
          handlers.inputCharacter?.(e.key);
          return;
        }
      }

      // Boolean-specific keys
      if (mode === 'boolean') {
        if (e.key === '&' || e.key.toLowerCase() === 'a') {
          e.preventDefault();
          handlers.performOperation?.('and');
          return;
        }

        if (e.key === '|' || e.key.toLowerCase() === 'o') {
          e.preventDefault();
          handlers.performOperation?.('or');
          return;
        }

        if (e.key === '!' || e.key.toLowerCase() === 'n') {
          e.preventDefault();
          handlers.performUnaryOperation?.('not');
          return;
        }

        if (e.key === '<') {
          e.preventDefault();
          handlers.performOperation?.('<');
          return;
        }

        if (e.key === '>') {
          e.preventDefault();
          handlers.performOperation?.('>');
          return;
        }

        // Parentheses for boolean
        if (e.key === '(' || e.key === ')') {
          e.preventDefault();
          handlers.inputValue?.(e.key);
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, handlers, enabled]);
}
