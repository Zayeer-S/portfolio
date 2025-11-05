import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { CalculatorMode } from './shared/types';

interface CalculatorSidebarProps {
  isOpen: boolean;
  currentMode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
  onToggle: () => void;
}

interface ModeOption {
  id: CalculatorMode;
  label: string;
  icon: string;
}

const modeOptions: ModeOption[] = [
  {
    id: 'arithmetic',
    label: 'Arithmetic',
    icon: '🔢',
  },
  {
    id: 'algebraic',
    label: 'Algebraic',
    icon: '𝑥',
  },
  {
    id: 'boolean',
    label: 'Boolean',
    icon: '⊕',
  },
];

export default function CalculatorSidebar({
  isOpen,
  currentMode,
  onModeChange,
  onToggle,
}: CalculatorSidebarProps) {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  return (
    <>
      {/* Hamburger button */}
      <div className="absolute -top-3 -left-3 z-20 flex flex-row items-center gap-2">
        <button
          onClick={onToggle}
          className={`${styles.calculator.sidebar.hamburger} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-110 select-none flex items-center justify-center`}
          title={isOpen ? 'Close menu' : 'Open menu'}
          style={{ width: '36px', height: '36px' }}
          aria-label={isOpen ? 'Close calculator mode menu' : 'Open calculator mode menu'}
          aria-expanded={isOpen}
        >
          <span className="text-base select-none">☰</span>
        </button>
        <span
          className={`text-sm font-medium ${styles.calculator.display.textMuted} whitespace-nowrap`}
        >
          {modeOptions.find(option => option.id === currentMode)?.label}
        </span>
      </div>

      {/* Sidebar */}
      <div
        className={`absolute -top-4 -left-4 -bottom-4 ${styles.calculator.sidebar.background} bg-opacity-80 shadow-lg z-0 rounded-lg transition-all duration-300 ease-out ${
          isOpen ? 'w-48 opacity-100' : 'w-0 opacity-0 pointer-events-none'
        }`}
        role="navigation"
        aria-label="Calculator modes"
      >
        <div className="pt-12 px-3">
          <div className={`text-xs font-semibold ${styles.calculator.display.textMuted} mb-2 px-2`}>
            Calculator Modes
          </div>
          {modeOptions.map(option => (
            <button
              key={option.id}
              onClick={() => onModeChange(option.id)}
              className={`w-full p-3 rounded cursor-pointer transition-all duration-150 hover:scale-105 flex flex-col items-start ${
                currentMode === option.id
                  ? styles.calculator.sidebar.modeItemActive
                  : styles.calculator.sidebar.modeItem
              }`}
              aria-label={`Switch to ${option.label} mode`}
              aria-pressed={currentMode === option.id}
            >
              <div className="flex items-center space-x-2 w-full">
                <span className="text-lg">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
