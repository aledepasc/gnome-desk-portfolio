import { useState, useEffect } from "react";
import { Menu, Volume2, Wifi, Battery } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface TopBarProps {
  onApplicationsClick: () => void;
  showApplicationsMenu: boolean;
}

export const TopBar = ({ onApplicationsClick, showApplicationsMenu }: TopBarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`${isMobile ? 'h-14' : 'h-12'} bg-topbar-bg backdrop-blur-sm flex items-center justify-between px-4 relative z-50 border-b border-white/10`}>
      {/* Left - Applications Menu */}
      <div className="flex items-center">
        <button
          onClick={onApplicationsClick}
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all ${
            showApplicationsMenu 
              ? 'bg-primary text-primary-foreground' 
              : 'text-topbar-fg hover:bg-white/10'
          }`}
        >
          <Menu size={16} />
          {!isMobile && <span className="text-sm font-medium">Applications</span>}
        </button>
      </div>

      {/* Center - Date and Time */}
      <div className="flex flex-col items-center text-topbar-fg">
        <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium`}>
          {formatTime(currentTime)}
        </div>
        {!isMobile && (
          <div className="text-xs opacity-80">
            {formatDate(currentTime)}
          </div>
        )}
      </div>

      {/* Right - System Icons */}
      <div className="flex items-center gap-3">
        {!isMobile && (
          <button className="p-2 text-topbar-fg hover:bg-white/10 rounded transition-colors">
            <Volume2 size={16} />
          </button>
        )}
        <button className="p-2 text-topbar-fg hover:bg-white/10 rounded transition-colors">
          <Wifi size={16} />
        </button>
        <button className="p-2 text-topbar-fg hover:bg-white/10 rounded transition-colors">
          <Battery size={16} />
        </button>
      </div>
    </div>
  );
};