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
    <div 
      className="ml-auto flex items-center pr-2 select-none"
      role="status"
      aria-label="System tray"
    >
      <div 
        className={`flex flex-col items-end text-xs ${systemTrayClasses} leading-tight`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div aria-label={`Current time: ${isClient ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'loading'}`}>
          {isClient ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
        </div>
        <div aria-label={`Current date: ${isClient ? currentTime.toLocaleDateString('en-GB') : 'loading'}`}>
          {isClient ? currentTime.toLocaleDateString('en-GB') : '--/--/----'}
        </div>
      </div>
    </div>
  );
}