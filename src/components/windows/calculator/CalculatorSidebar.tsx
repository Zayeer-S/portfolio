import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { CalculatorMode } from './shared/types';
import { HiBars3, HiInformationCircle } from 'react-icons/hi2';

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
      <div className="absolute top-10 left-2 flex flex-row items-center gap-1">
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
          className={`text-sm font-medium mb-[3px] ${styles.calculator.display.textMuted} whitespace-nowrap`}
        >
          {modeOptions.find(option => option.id === currentMode)?.label}
        </span>
        <div className="relative group mb-[2px]">
          <HiInformationCircle
            className={`w-4 h-4 ${styles.calculator.display.textMuted} cursor-help`}
            aria-label="Calculator information"
          />
          <div
            className={`absolute left-0 top-6 w-64 p-3 ${styles.calculator.display.background} ${styles.calculator.display.border} border rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-xs z-30`}
          >
            <p className={`${styles.calculator.display.text}`}>
              This calculator is a microservice powered by my own custom built REST API (Evalr)
            </p>
          </div>
        </div>
      </div>

      {/*Outer*/}
      <div
        className={`absolute top-0 left-0 h-full overflow-hidden z-10 transition-all duration-300 ease-out ${
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
          <div className="pt-22 px-3">
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
