import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { CalculatorMode } from './shared/types';
import { HiBars3 } from 'react-icons/hi2';

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
      <div className="absolute -top-3 -left-3 flex flex-row items-center gap-2">
        <button
          onClick={onToggle}
          className={`${styles.calculator.sidebar.hamburger} p-2 z-20 rounded cursor-pointer transition-all duration-150 hover:scale-110 select-none flex items-center justify-center`}
          title={isOpen ? 'Close menu' : 'Open menu'}
          style={{ width: '36px', height: '32px' }}
          aria-label={isOpen ? 'Close calculator mode menu' : 'Open calculator mode menu'}
          aria-expanded={isOpen}
        >
          <HiBars3 className="text-base select-none w-8 h-8"></HiBars3>
        </button>
        <span
          className={`text-sm font-medium ${styles.calculator.display.textMuted} whitespace-nowrap`}
        >
          {modeOptions.find(option => option.id === currentMode)?.label}
        </span>
      </div>

      {/*Outer*/}
      <div
        className={`absolute -top-4 -left-4 -bottom-4 overflow-hidden z-0 rounded-l-lg transition-all duration-300 ease-out ${
          isOpen ? 'w-48' : 'w-0'
        }`}
        role="navigation"
        aria-label="Calculator modes"
      >
        {/*Inner*/}
        <div
          className={`w-48 h-full ${styles.calculator.sidebar.background} shadow-lg transition-transform duration-300 ease-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="pt-12 px-3">
            <div
              className={`text-xs font-semibold ${styles.calculator.display.textMuted} mb-3 px-2`}
            >
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
      </div>
    </>
  );
}
