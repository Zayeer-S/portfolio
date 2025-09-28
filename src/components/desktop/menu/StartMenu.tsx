import { useState } from 'react';
import { StartMenuProps, WindowId } from '@/types';
import { getThemeClasses } from '@/styles/themes';
import { useTheme } from '@/contexts/ThemeContext';
import { getAppIcon } from '@/styles/icons';

export default function StartMenu({ isOpen, onClose, onOpenWindow }: StartMenuProps) {
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [isLeftColumnExpanded, setIsLeftColumnExpanded] = useState(false);
  
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

  const toggleLeftColumn = () => {
    setIsLeftColumnExpanded(!isLeftColumnExpanded);
  };

  const menuItems = [
    { id: 'calculator' as WindowId, name: 'Calculator', iconKey: 'calculator' as const },
    { id: 'notepad' as WindowId, name: 'Notepad', iconKey: 'notepad' as const }
  ];
  const sortedItems = menuItems.sort((a, b) => a.name.localeCompare(b.name));
  
  const groupedItems = sortedItems.reduce((groups, item) => {
    const firstLetter = item.name[0].toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(item);
    return groups;
  }, {} as Record<string, typeof menuItems>);

  return (
    <div 
      className={`fixed bottom-10 left-0 w-80 h-96 ${styles.startMenu.background} rounded-tr-lg shadow-lg overflow-hidden
        transform transition-all duration-200 ease-out origin-bottom-left
        ${isOpen 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-14 opacity-0 scale-95 pointer-events-none'
        }`}
    >
      <div className="p-4 h-full flex relative">
        {/* Applications in alphabetical order (always visible) */}
        <div className="flex-1 overflow-y-auto ml-[46px] pr-2">
          <div className="space-y-1">
            {Object.entries(groupedItems).map(([letter, items]) => (
              <div key={letter}>
                {/* Letter header with bigger font */}
                <div className={`${styles.startMenu.text} font-bold text-lg mb-1 px-1`}>
                  {letter}
                </div>
                {/* Items under each letter */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-105 flex items-center space-x-2 ml-3`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <span className="flex items-center justify-center w-8 h-8">
                      {getAppIcon(item.iconKey, { size: 32 })}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Hamburger button*/}
        <div 
          className="absolute select-none"
          style={{ top: '10px', left: '10px', zIndex: 20 }}
        >
          <button
            onClick={toggleLeftColumn}
            className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-110 select-none flex items-center justify-center`}
            title={isLeftColumnExpanded ? "Collapse menu" : "Expand menu"}
            style={{ width: '40px', height: '40px' }}
          >
            <span className="text-lg select-none">☰</span>
          </button>
        </div>

        <div className="absolute" style={{ bottom: '10px', left: '10px', zIndex: 20 }}>
          <div className="flex flex-col space-y-2">
            {/* Settings icon */}
            <div 
              className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-110 select-none flex items-center justify-center`}
              style={{ width: '40px', height: '40px' }}
              onClick={() => handleItemClick('settings')}
              title={!isLeftColumnExpanded ? "Settings" : undefined}
            >
              {getAppIcon('settings', { size: 24 })}
            </div>
            
            {/* Power icon */}
            <div 
              className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-110 select-none flex items-center justify-center`}
              style={{ width: '40px', height: '40px',}}
              onClick={handlePowerClick}
              title={!isLeftColumnExpanded ? "Power" : undefined}
            >
              {getAppIcon('power', { size: 24, theme })}
            </div>
          </div>
        </div>

        {/* Settings text*/}
        <div 
          className={`absolute transition-all duration-300 ease-out select-none ${isLeftColumnExpanded ? 'opacity-100 translate-x-0 delay-100' : 'opacity-0 -translate-x-4'}`}
          style={{ bottom: '67px', left: '52px', zIndex: 20 }}
        >
          <span className="text-sm whitespace-nowrap select-none">Settings</span>
        </div>

        {/*Power text*/}
        <div 
          className={`absolute transition-all duration-300 ease-out select-none ${isLeftColumnExpanded ? 'opacity-100 translate-x-0 delay-150' : 'opacity-0 -translate-x-4'}`}
          style={{ bottom: '20px', left: '52px', zIndex: 20 }}
        >
          <span className="text-sm whitespace-nowrap select-none">Power</span>
        </div>

        {/* Power menu*/}
        {showPowerMenu && (
          <div className={`absolute ${styles.startMenu.background} border border-gray-300 rounded shadow-lg w-32
            transform transition-all duration-200 ease-out
            animate-in slide-in-from-bottom-4 fade-in zoom-in-95 select-none`}
            style={{ bottom: '64px', left: '16px', zIndex: 30 }}
          >
            <div 
              className={`${styles.startMenu.items} p-2 rounded cursor-pointer transition-all duration-150 hover:scale-105 select-none flex items-center space-x-2`}
              onClick={(e) => {
                e.stopPropagation();
                handleReloadPage();
              }}
            >
              <span className="flex items-center justify-center w-4 h-4">
                {getAppIcon('reload', { size: 12, theme })}
              </span>
              <span className="text-xs select-none">Reload Page</span>
            </div>
          </div>
        )}

        {/* White background overlay i.e. the one toggled by hamburger */}
        <div className={`absolute left-0 top-0 bottom-0 ${isLeftColumnExpanded ? 'w-60' : 'w-17'} transition-all duration-300 ease-out ${isLeftColumnExpanded ? styles.startMenu.background + ' rounded-tr-lg shadow-lg' : ''} z-10`}>
        </div>
      </div>
    </div>
  );
}