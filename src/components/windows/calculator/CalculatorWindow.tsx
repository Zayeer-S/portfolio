import { useState, useCallback, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import CalculatorSidebar from './CalculatorSidebar';
import ArithmeticCalculator from './modes/ArithmeticCalculator';
import AlgebraicCalculator from './modes/AlgebraicCalculator';
import BooleanCalculator from './modes/BooleanCalculator';
import {
  CalculatorMode,
  EvaluateRequest,
  EvaluateResponse,
  ErrorResponse,
  CacheEntry,
} from './shared/types';
import { env } from '@/config/env';

export default function CalculatorWindow() {
  const [mode, setMode] = useState<CalculatorMode>('arithmetic');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [calculationCache, setCalculationCache] = useState<CacheEntry[]>([]);

  const { theme } = useTheme();

  useEffect(() => {
    const warmUpTheApiBaby = async () => {
      try {
        const requestBody: EvaluateRequest = {
          expression: '0+0',
          variables: {},
        };

        await fetch(`${env.NEXT_PUBLIC_EVALR_API_URL}/evaluate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
      } catch (error) {
        console.debug('API Request Failed :( (Enjoy your cold start!):', error);
      }
    };

    warmUpTheApiBaby();
  }, []);

  const evaluateExpression = useCallback(
    async (expr: string, variables?: Record<string, number>): Promise<string> => {
      try {
        const cacheKey = JSON.stringify({ expression: expr, variables: variables || {} });
        const cached = calculationCache.find(
          entry =>
            JSON.stringify({ expression: entry.expression, variables: entry.variables }) ===
            cacheKey
        );

        if (cached) {
          return cached.result;
        }

        const requestBody: EvaluateRequest = {
          expression: expr,
          variables: variables || {},
        };

        const response = await fetch(`${env.NEXT_PUBLIC_EVALR_API_URL}/evaluate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData: ErrorResponse = await response.json();
          throw new Error(errorData.message || 'API request failed');
        }

        const data: EvaluateResponse = await response.json();

        setCalculationCache(prev => [
          ...prev.slice(-9),
          { expression: expr, variables: variables || {}, result: data.displayValue },
        ]);

        return data.displayValue;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`API Error: ${error.message}`);
        }
        throw new Error('Unknown error occurred');
      }
    },
    [calculationCache]
  );

  const handleModeChange = (newMode: CalculatorMode) => {
    setMode(newMode);
    setIsSidebarOpen(false);
  };

  const renderCalculatorMode = () => {
    switch (mode) {
      case 'arithmetic':
        return <ArithmeticCalculator evaluateExpression={evaluateExpression} />;
      case 'algebraic':
        return <AlgebraicCalculator evaluateExpression={evaluateExpression} />;
      case 'boolean':
        return <BooleanCalculator evaluateExpression={evaluateExpression} />;
      default:
        return <ArithmeticCalculator evaluateExpression={evaluateExpression} />;
    }
  };

  return (
    <div
      className="h-full flex flex-col relative"
      style={{ minWidth: '280px', minHeight: '320px' }}
      role="application"
      aria-label="Calculator"
    >
      <div className="-top-3 -left-3">
        <CalculatorSidebar
          isOpen={isSidebarOpen}
          currentMode={mode}
          onModeChange={handleModeChange}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
      <div className="flex-1 flex flex-col space-y-3">{renderCalculatorMode()}</div>
    </div>
  );
}
