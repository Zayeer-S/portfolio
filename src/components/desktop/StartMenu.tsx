// src/components/desktop/StartMenu.tsx

import { StartMenuProps, WindowId } from '@/types';

export default function StartMenu({ isOpen, onClose, onOpenWindow }: StartMenuProps) {
  if (!isOpen) return null;

  const handleItemClick = (windowId: WindowId) => {
    onOpenWindow(windowId);
    onClose(); // Close start menu after opening a window
  };

  return (
    <div className="absolute bottom-10 left-0 w-80 h-96 bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-400 rounded-tr-lg shadow-lg">
      <div className="h-12 bg-gradient-to-r from-blue-600 to-blue-400 flex items-center px-4 rounded-tr-lg">
        <div className="w-8 h-8 bg-blue-300 rounded-full mr-3"></div>
        <span className="text-white font-medium">Zayeer Sultan</span>
      </div>
      <div className="p-4 space-y-2">
        <div 
          className="hover:bg-blue-100 p-2 rounded cursor-pointer" 
          onClick={() => handleItemClick('about' as WindowId)}
        >
          <span className="text-sm">📄 About Me</span>
        </div>
        <div 
          className="hover:bg-blue-100 p-2 rounded cursor-pointer" 
          onClick={() => handleItemClick('projects' as WindowId)}
        >
          <span className="text-sm">📁 My Projects</span>
        </div>
        <div 
          className="hover:bg-blue-100 p-2 rounded cursor-pointer" 
          onClick={() => handleItemClick('technologies' as WindowId)}
        >
          <span className="text-sm">⚙️ Technologies</span>
        </div>
        <div 
          className="hover:bg-blue-100 p-2 rounded cursor-pointer" 
          onClick={() => {
            window.open("/Zayeer Sultan - CV.pdf", "_blank");
            onClose();
          }}
        >
          <span className="text-sm">📋 Resume</span>
        </div>
        <div 
          className="hover:bg-blue-100 p-2 rounded cursor-pointer" 
          onClick={() => handleItemClick('contact' as WindowId)}
        >
          <span className="text-sm">📧 Contact</span>
        </div>
      </div>
    </div>
  );
}