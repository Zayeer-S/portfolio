import { useState } from 'react';
import { StartMenuProps, WindowId } from '@/types';
import { getThemeClasses } from '@/styles/themes';
import { useTheme } from '@/contexts/ThemeContext';

export default function StartMenu({ isOpen, onClose, onOpenWindow }: StartMenuProps) {
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  
  const { theme } = useTheme();
  const styles = getThemeClasses(theme);

  const handleItemClick = (windowId: WindowId) => {
    onOpenWindow(windowId);
    onClose(); // Close start menu after opening a window
  };

  const handlePowerClick = () => {
    setShowPowerMenu(!showPowerMenu);
  };

  const handleReloadPage = () => {
    window.location.reload();
  };

  return (
    <div 
      className={`fixed bottom-10 left-0 w-80 h-96 ${styles.startMenu.background} rounded-tr-lg shadow-lg
        transform transition-all duration-200 ease-out origin-bottom-left
        ${isOpen 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-14 opacity-0 scale-95 pointer-events-none'
        }`}
    >
      <div className="p-4 space-y-2">
        {/* Two-column grid layout */}
        <div className="grid grid-cols-2 gap-2">
          {/* Column 1 */}
          <div className="space-y-2">
            <div 
              className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-105`} 
              onClick={() => handleItemClick('settings')}
            >
              <span className="text-sm">⚙️ Settings</span>
            </div>
            <div 
              className={`${styles.startMenu.items} p-2 rounded cursor-pointer relative transition-all duration-150 hover:scale-105`} 
              onClick={handlePowerClick}
            >
              <span className="text-sm">🔌 Power</span>
              
              {showPowerMenu && (
                <div className={`absolute bottom-full left-0 mb-1 ${styles.startMenu.background} border border-gray-300 rounded shadow-lg z-10 w-32
                  transform transition-all duration-200 ease-out
                  animate-in slide-in-from-bottom-4 fade-in zoom-in-95`}>
                  <div 
                    className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-105`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReloadPage();
                    }}
                  >
                    <span className="text-xs">🔄 Reload Page</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Column 2 */}
          <div className="space-y-2">
            <div 
              className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-105`} 
              onClick={() => handleItemClick('notepad')}
            >
              <span className="text-sm">📝 Notepad</span>
            </div>
            <div 
              className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-105`} 
              onClick={() => handleItemClick('calculator')}
            >
              <span className="text-sm">🔢 Calculator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}