import { useTheme } from '@/contexts/ThemeContext';
import { getThemeClasses } from '@/styles/themes';
import { ButtonProps } from './types';

export default function Button({
  onClick,
  className = '',
  children,
  wide = false,
  ariaLabel,
  variant = 'default',
}: ButtonProps) {
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const getVariantStyles = () => {
    switch (variant) {
      case 'operation':
        return styles.calculator.button.operation;
      case 'clear':
        return styles.calculator.button.clear;
      case 'equals':
        return styles.calculator.button.equals;
      case 'disabled':
        return styles.calculator.button.disabled;
      default:
        return styles.calculator.button.default;
    }
  };

  const isDisabled = variant === 'disabled';

  return (
    <button
      onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={e => {
        if (isDisabled) return;
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      onPointerDown={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      aria-label={ariaLabel}
      disabled={isDisabled}
      className={`
        min-h-6 rounded text-sm font-medium border ${getVariantStyles()}
        ${isDisabled ? '' : 'active:transform active:scale-95'}
        transition-all duration-75 select-none
        ${styles.window.content.text}
        ${wide ? 'col-span-2' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
