import { TaskbarProps, WindowId } from '@/types';

export default function Taskbar({ 
  windows, 
  onToggleStartMenu, 
  onMinimizeWindow, 
  startMenuOpen, 
  currentTime, 
  isClient 
}: TaskbarProps) {
  const getWindowLabel = (windowId: string) => {
    const labels: { [key: string]: string } = {
      resume: '📄 Resume',
      projects: '📁 Projects',
      technologies: '⚙️ Tech',
      about: '👤 About',
      contact: '📧 Contact',
      settings: '⚙️ Settings',
      calculator: '🔢 Calc',
    };
    return labels[windowId] || windowId;
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 h-11 bg-gradient-to-b from-blue-200 to-blue-300 border-t border-blue-400 flex items-center px-2">
      {/* Start Button */}
      <button
        className="h-8 px-4 bg-gradient-to-b from-green-400 to-green-500 border border-green-600 rounded text-white text-sm font-medium hover:from-green-500 hover:to-green-600 flex items-center"
        onClick={onToggleStartMenu}
      >
        <div className="w-4 h-4 mr-2">
          <div className="w-full h-full bg-white rounded-sm opacity-80"></div>
        </div>
        Start
      </button>

      {/* Task Buttons */}
      <div className="flex ml-2 space-x-1">
        {Object.entries(windows).map(([windowId, window]) => 
          window.isOpen ? (
            <button
              key={windowId}
              className={`h-8 px-3 text-sm border rounded ${
                window.isMinimized 
                  ? 'bg-gray-300 border-gray-400' 
                  : 'bg-gradient-to-b from-blue-400 to-blue-500 border-blue-600 text-white'
              }`}
              onClick={() => onMinimizeWindow(windowId as WindowId)}
            >
              {getWindowLabel(windowId)}
            </button>
          ) : null
        )}
      </div>

      {/* System Tray */}
      <div className="ml-auto flex items-center pr-2 select-none">
        <div className="flex flex-col items-end text-xs text-gray-700 leading-tight">
          <div>
            {isClient ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
          </div>
          <div>
            {isClient ? currentTime.toLocaleDateString('en-GB') : '--/--/----'}
          </div>
        </div>
      </div>
    </div>
  );
}