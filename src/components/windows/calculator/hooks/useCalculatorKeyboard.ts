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
      // Numbers (all modes)
      if (e.key >= '0' && e.key <= '9') {
        if (mode === 'algebraic' && handlers.inputCharacter) {
          handlers.inputCharacter(e.key);
        } else if (handlers.inputNumber) {
          handlers.inputNumber(e.key);
        }
        return;
      }

      // Decimal point (arithmetic and algebraic)
      if (e.key === '.' && (mode === 'arithmetic' || mode === 'algebraic')) {
        handlers.inputDecimal?.();
        return;
      }

      // Basic operations (all modes support these in some form)
      if (e.key === '+' && handlers.performOperation) {
        handlers.performOperation('+');
        return;
      }

      if (e.key === '-' && handlers.performOperation) {
        handlers.performOperation('-');
        return;
      }

      if (e.key === '*' && handlers.performOperation) {
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
          handlers.inputCharacter?.(e.key.toLowerCase());
          return;
        }

        if (e.key === '^') {
          handlers.performOperation?.('^');
          return;
        }

        if (e.key === '(' || e.key === ')') {
          handlers.inputCharacter?.(e.key);
          return;
        }
      }

      // Boolean-specific keys
      if (mode === 'boolean') {
        // Boolean operators
        if (e.key === '&' || e.key.toLowerCase() === 'a') {
          handlers.performOperation?.('and');
          return;
        }

        if (e.key === '|' || e.key.toLowerCase() === 'o') {
          handlers.performOperation?.('or');
          return;
        }

        if (e.key === '!' || e.key.toLowerCase() === 'n') {
          handlers.performUnaryOperation?.('not');
          return;
        }

        // Comparison operators
        if (e.key === '<') {
          handlers.performOperation?.('<');
          return;
        }

        if (e.key === '>') {
          handlers.performOperation?.('>');
          return;
        }

        // Parentheses for boolean
        if (e.key === '(' || e.key === ')') {
          handlers.inputValue?.(e.key);
          return;
        }
      }

      // Equals (all modes)
      if (e.key === 'Enter' || (e.key === '=' && mode !== 'boolean')) {
        handlers.handleEquals?.();
        return;
      }

      // Clear (all modes)
      if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handlers.clear?.();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [mode, handlers, enabled]);
}
