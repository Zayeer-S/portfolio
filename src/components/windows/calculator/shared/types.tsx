export type CalculatorMode = 'arithmetic' | 'algebraic' | 'boolean';

export interface EvaluateRequest {
  expression: string;
  variables?: Record<string, number>;
}

export interface EvaluateResponse {
  value: number;
  displayValue: string;
  isBooleanExpression: boolean;
  variables: Record<string, number>;
  expression: string;
  postfixNotation?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  expression?: string;
  statusCode: number;
}

export interface CacheEntry {
  expression: string;
  variables: Record<string, number>;
  result: string;
}

export interface CalculatorModeProps {
  evaluateExpression: (expr: string, variables?: Record<string, number>) => Promise<string>;
}

export interface ButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  wide?: boolean;
  ariaLabel: string;
  variant?: 'default' | 'operation' | 'clear' | 'equals' | 'disabled';
}
