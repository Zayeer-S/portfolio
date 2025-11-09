import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { formatExpressionForDispaly as formatExpressionForDisplay } from './shared/utils';

interface CalculatorDisplayProps {
  display: string;
  previousDisplay?: string;
}

export default function CalculatorDisplay({
  display,
  previousDisplay = '',
}: CalculatorDisplayProps) {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  return (
    <div
      className={`${styles.calculator.display.background} border-2 rounded border-inset ${styles.calculator.display.border} p-3 flex flex-col justify-end text-right font-mono flex-shrink-0 mt-8 min-h-24`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Calculator display showing ${display}`}
    >
      {/* Previous expression - hidden from screen readers */}
      <div
        className={`text-base ${styles.calculator.display.textMuted} h- overflow-hidden`}
        aria-hidden="true"
      >
        {formatExpressionForDisplay(previousDisplay)}
      </div>
      {/* Current display */}
      <div className={`text-5xl font-bold ${styles.calculator.display.text}`}>
        {formatExpressionForDisplay(display)}
      </div>
    </div>
  );
}
