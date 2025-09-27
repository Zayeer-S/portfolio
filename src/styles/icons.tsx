import { FaPowerOff, FaRedo } from 'react-icons/fa';
import { Theme } from '@/contexts/ThemeContext';

export interface IconProps {
  size?: number;
  className?: string;
  theme?: Theme;
}

const ThemedReactIcon = ({ 
  IconComponent, 
  size = 18, 
  className,
  theme 
}: { 
  IconComponent: any; 
  size?: number; 
  className?: string; 
  theme?: Theme;
}) => {
  const getIconColor = () => {
    if (theme === 'modern-dark') return '#FFFFFF';
    return '#000000';
  };

  return (
    <IconComponent 
      size={size}
      className={className}
      style={{ color: getIconColor() }}
    />
  );
};

const PngIcon = ({ 
  src, 
  alt, 
  size = 18, 
  className 
}: { 
  src: string; 
  alt: string; 
  size?: number; 
  className?: string; 
}) => (
  <img 
    src={src} 
    alt={alt} 
    width={size} 
    height={size} 
    className={className}
    style={{ width: size, height: size }}
  />
);

export const AppIcons = {
  projects: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/closed-folder-modern.png" alt="Projects" size={size} className={className} />
  ),
  projectsOpen: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/open-folder-modern.png" alt="Projects" size={size} className={className} />
  ),
  technologies: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/technologies-modern.png" alt="Technologies" size={size} className={className} />
  ),
  contact: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/mail-modern.png" alt="Contact" size={size} className={className} />
  ),
  settings: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/settings-modern.png" alt="Settings" size={size} className={className} />
  ),
  calculator: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/calculator-modern.png" alt="Calculator" size={size} className={className} />
  ),
  notepad: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/notepad-modern.png" alt="Notepad" size={size} className={className} />
  ),
  cv: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/cv-modern.png" alt="CV" size={size} className={className} />
  ),
  startMenu: ({ size = 18, className }: IconProps) => (
    <PngIcon src="/start-menu-symbol-modern.png" alt="Start Menu" size={size} className={className} />
  ),
  // Theme-aware React Icons for power and reload
  power: ({ size = 18, className, theme }: IconProps) => (
    <ThemedReactIcon IconComponent={FaPowerOff} size={size} className={className} theme={theme} />
  ),
  reload: ({ size = 18, className, theme }: IconProps) => (
    <ThemedReactIcon IconComponent={FaRedo} size={size} className={className} theme={theme} />
  ),
};

export type AppIconKey = keyof typeof AppIcons;

export const getAppIcon = (iconKey: AppIconKey, props?: IconProps) => {
  const IconComponent = AppIcons[iconKey];
  return IconComponent ? <IconComponent {...props} /> : <AppIcons.settings {...props} />;
};