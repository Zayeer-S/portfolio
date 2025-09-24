import { DesktopIconProps } from '@/types';

export default function DesktopIcon({ icon, label, onClick, hoverClass }: DesktopIconProps) {
  // Add/Remove the select/hover color appropriately
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', `${icon}|${label}`);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`flex flex-col items-center px-1 py-1 ${hoverClass || 'hover:bg-gray-500/30'} cursor-pointer rounded group transition-opacity`}      
      onDoubleClick={onClick}
    >
      <div className="w-10 h-12 mb-1 flex items-center justify-center text-5xl pointer-events-none">
        {icon}
      </div>
      <span className="text-white text-xs text-center group-hover px-1 rounded pointer-events-none">
        {label}
      </span>
    </div>
  );
}