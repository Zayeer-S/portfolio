import { useState, useEffect, ReactNode } from 'react';

interface DesktopIconProps {
  icon: string | ReactNode;
  label: string;
  onClick: () => void;
  hoverClass?: string;
  useReactIcon?: boolean;
  iconId: string;
}

export default function DesktopIcon({ 
  icon, 
  label, 
  onClick, 
  hoverClass, 
  useReactIcon = false,
  iconId 
}: DesktopIconProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('onTouchStart' in window || navigator.maxTouchPoints > 0);
    };

    checkTouchDevice();

    window.addEventListener('resize', checkTouchDevice)
    
    return () => window.removeEventListener('resize', checkTouchDevice);
  }, []);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', iconId);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      onClick();
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`flex flex-col items-center px-1 py-1 ${hoverClass || 'hover:bg-gray-500/30'} cursor-pointer rounded group transition-opacity`}
      onClick={handleClick}
      onDoubleClick={isTouchDevice ? undefined : onClick}
    >
      <div className="w-12 h-14 sm:w-16 sm:h-16 mb-1 flex items-center justify-center pointer-events-none">
        {useReactIcon ? (
          <div className="flex items-center justify-center">
            {icon}
          </div>
        ) : (
          <span className="text-4xl sm:text-5xl pointer-events-none">
            {icon}
          </span>
        )}
      </div>
      <span className="text-white text-xs sm:text-xs text-center group-hover rounded pointer-events-none leading-tight">
        {label}
      </span>
    </div>
  );
}