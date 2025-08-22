import { useState } from "react";
import { TopBar } from "./TopBar";
import { DesktopIcon } from "./DesktopIcon";
import { Window } from "./Window";
import { ApplicationsMenu } from "./ApplicationsMenu";
import { PersonalInfoWindow } from "./windows/PersonalInfoWindow";
import { ContactWindow } from "./windows/ContactWindow";
import { SkillsWindow } from "./windows/SkillsWindow";
import { ExperienceWindow } from "./windows/ExperienceWindow";
import { TerminalWindow } from "./windows/TerminalWindow";
import { ProjectsWindow } from "./windows/ProjectsWindow";
import { Monitor, Github, Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import wallpaper from "@/assets/gnome-wallpaper.jpg";

export type WindowType = 'personal' | 'contact' | 'skills' | 'experience' | 'terminal' | 'projects';

interface OpenWindow {
  id: string;
  type: WindowType;
  title: string;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export const Desktop = () => {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [showApplicationsMenu, setShowApplicationsMenu] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(100);
  const isMobile = useIsMobile();

  const openWindow = (type: WindowType, title: string) => {
    // Check if window is already open
    const existing = windows.find(w => w.type === type);
    if (existing) {
      // Bring to front and unminimize
      setWindows(windows.map(w => 
        w.id === existing.id 
          ? { ...w, isMinimized: false, zIndex: nextZIndex }
          : w
      ));
      setNextZIndex(nextZIndex + 1);
      return;
    }

    // Mobile-responsive window sizing and positioning
    const getWindowConfig = () => {
      if (isMobile) {
        return {
          position: { x: 10, y: 58 },
          size: { 
            width: window.innerWidth - 20, 
            height: window.innerHeight - 78
          }
        };
      }
      
      return {
        position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
        size: type === 'terminal' ? { width: 700, height: 500 } : { width: 600, height: 450 }
      };
    };

    const config = getWindowConfig();
    const newWindow: OpenWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      isMinimized: false,
      position: config.position,
      size: config.size,
      zIndex: nextZIndex,
    };

    setWindows([...windows, newWindow]);
    setNextZIndex(nextZIndex + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    const topBarHeight = isMobile ? 58 : 48;
    setWindows(windows.map(w => 
      w.id === id 
        ? { 
            ...w, 
            position: { x: 0, y: topBarHeight },
            size: { 
              width: window.innerWidth, 
              height: window.innerHeight - topBarHeight 
            }
          } 
        : w
    ));
  };

  const updateWindow = (id: string, updates: Partial<OpenWindow>) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, ...updates } : w
    ));
  };

  const bringToFront = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(nextZIndex + 1);
  };

  const renderWindowContent = (type: WindowType) => {
    switch (type) {
      case 'personal':
        return <PersonalInfoWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'terminal':
        return <TerminalWindow />;
      case 'projects':
        return <ProjectsWindow />;
      default:
        return <div>Window content</div>;
    }
  };

  return (
    <div 
      className="h-screen w-full overflow-hidden relative"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* TopBar */}
      <TopBar 
        onApplicationsClick={() => setShowApplicationsMenu(!showApplicationsMenu)}
        showApplicationsMenu={showApplicationsMenu}
      />
      
      {/* Applications Menu */}
      {showApplicationsMenu && (
        <ApplicationsMenu 
          onClose={() => setShowApplicationsMenu(false)}
          onOpenWindow={openWindow}
        />
      )}

      {/* Desktop Icons */}
      <div className={`absolute ${isMobile ? 'top-16 left-4 flex gap-4' : 'top-20 left-6 grid gap-6'}`}>
        <DesktopIcon
          icon={Monitor}
          label="Projects"
          onClick={() => openWindow('projects', 'My Projects')}
          size={isMobile ? 'sm' : 'default'}
        />
        <DesktopIcon
          icon={Github}
          label="GitHub"
          onClick={() => window.open('https://github.com/username', '_blank')}
          size={isMobile ? 'sm' : 'default'}
        />
        <DesktopIcon
          icon={Linkedin}
          label="LinkedIn"
          onClick={() => window.open('https://linkedin.com/in/username', '_blank')}
          size={isMobile ? 'sm' : 'default'}
        />
      </div>

      {/* Windows */}
      {windows.filter(w => !w.isMinimized).map(window => (
        <Window
          key={window.id}
          title={window.title}
          position={window.position}
          size={window.size}
          zIndex={window.zIndex}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onMaximize={() => maximizeWindow(window.id)}
          onMove={(position) => updateWindow(window.id, { position })}
          onResize={(size) => updateWindow(window.id, { size })}
          onMouseDown={() => bringToFront(window.id)}
        >
          {renderWindowContent(window.type)}
        </Window>
      ))}

      {/* Taskbar (minimized windows) */}
      {windows.filter(w => w.isMinimized).length > 0 && (
        <div className={`absolute bottom-4 left-4 flex gap-2 ${isMobile ? 'flex-wrap max-w-[calc(100vw-2rem)]' : ''}`}>
          {windows.filter(w => w.isMinimized).map(window => (
            <button
              key={window.id}
              onClick={() => updateWindow(window.id, { isMinimized: false })}
              className={`${isMobile ? 'px-2 py-1 text-sm' : 'px-4 py-2'} bg-topbar-bg text-topbar-fg rounded shadow-subtle hover:bg-opacity-80 transition-all`}
            >
              {isMobile ? window.title.substring(0, 8) + '...' : window.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};