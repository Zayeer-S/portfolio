import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';

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
      className={`${styles.calculator.display.background} border-2 border-inset ${styles.calculator.display.border} p-3 flex flex-col justify-end text-right font-mono flex-shrink-0 min-h-16`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Calculator display showing ${display}`}
    >
      {/* Previous expression - hidden from screen readers */}
      <div
        className={`text-xs ${styles.calculator.display.textMuted} h-4 overflow-hidden`}
        aria-hidden="true"
      >
        {previousDisplay}
      </div>
      {/* Current display */}
      <div className={`text-xl font-bold ${styles.calculator.display.text}`}>{display}</div>
    </div>
  );
}
