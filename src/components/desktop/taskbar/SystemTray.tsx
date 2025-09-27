'use client';

interface SystemTrayProps {
  currentTime: Date;
  isClient: boolean;
  systemTrayClasses: string;
}

export default function SystemTray({ 
  currentTime, 
  isClient, 
  systemTrayClasses 
}: SystemTrayProps) {
  return (
    <div className="ml-auto flex items-center pr-2 select-none">
      <div className={`flex flex-col items-end text-xs ${systemTrayClasses} leading-tight`}>
        <div>
          {isClient ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
        </div>
        <div>
          {isClient ? currentTime.toLocaleDateString('en-GB') : '--/--/----'}
        </div>
      </div>
    </div>
  );
}