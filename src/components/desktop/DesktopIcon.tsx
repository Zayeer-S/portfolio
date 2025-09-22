import { DesktopIconProps } from '@/types';

export default function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  return (
    <div
    className="flex flex-col items-center p-2 hover:bg-gray-500/30 cursor-pointer rounded group"      
    onDoubleClick={onClick}
    >
      <div className="w-12 h-12 mb-1 flex items-center justify-center text-5xl">
        {icon}
      </div>
      <span className="text-white text-xs text-center group-hover px-1 rounded">
        {label}
      </span>
    </div>
  );
}