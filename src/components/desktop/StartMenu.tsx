import { StartMenuProps, WindowId } from '@/types';
import { getThemeClasses } from '@/styles/themes';
import { useTheme } from '@/contexts/ThemeContext';

export default function StartMenu({ isOpen, onClose, onOpenWindow }: StartMenuProps) {
  if (!isOpen) return null;

  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const handleItemClick = (windowId: WindowId) => {
    onOpenWindow(windowId);
    onClose(); // Close start menu after opening a window
  };

  return (
    <div className={`absolute bottom-10 left-0 w-80 h-96 ${styles.startMenu.background} rounded-tr-lg shadow-lg`}>
      <div className={`h-12 ${styles.startMenu.header} flex items-center px-4 rounded-tr-lg`}>
        <div className="w-8 h-8 bg-blue-300 rounded-full mr-3"></div>
        <span className={`font-medium ${styles.startMenu.text}`}>Zayeer Sultan</span>
      </div>
      <div className="p-4 space-y-2">
        <div 
          className={`${styles.startMenu.items} p-2 rounded cursor-pointer`} 
          onClick={() => handleItemClick('projects')}
        >
          <span className="text-sm">📁 My Projects</span>
        </div>
        <div 
          className={`${styles.startMenu.items} p-2 rounded cursor-pointer`} 
          onClick={() => handleItemClick('technologies')}
        >
          <span className="text-sm">⚙️ Technologies</span>
        </div>
        <div 
          className={`${styles.startMenu.items} p-2 rounded cursor-pointer`} 
          onClick={() => handleItemClick('contact')}
        >
          <span className="text-sm">📧 Contact</span>
        </div>
        <div 
          className={`${styles.startMenu.items} p-2 rounded cursor-pointer`} 
          onClick={() => handleItemClick('settings')}
        >
          <span className="text-sm">⚙️ Settings</span>
        </div>      
      </div>
    </div>
  );
}