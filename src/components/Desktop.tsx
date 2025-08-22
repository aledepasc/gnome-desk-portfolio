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

    const newWindow: OpenWindow = {
      id: `${type}-${Date.now()}`,
      type,
      title,
      isMinimized: false,
      position: { x: 100 + windows.length * 30, y: 80 + windows.length * 30 },
      size: type === 'terminal' ? { width: 700, height: 500 } : { width: 600, height: 450 },
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
    setWindows(windows.map(w => 
      w.id === id 
        ? { 
            ...w, 
            position: { x: 0, y: 48 },
            size: { width: window.innerWidth, height: window.innerHeight - 48 }
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
      <div className="absolute top-20 left-6 grid gap-6">
        <DesktopIcon
          icon={Monitor}
          label="Projects"
          onClick={() => openWindow('projects', 'My Projects')}
        />
        <DesktopIcon
          icon={Github}
          label="GitHub"
          onClick={() => window.open('https://github.com/username', '_blank')}
        />
        <DesktopIcon
          icon={Linkedin}
          label="LinkedIn"
          onClick={() => window.open('https://linkedin.com/in/username', '_blank')}
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
        <div className="absolute bottom-4 left-4 flex gap-2">
          {windows.filter(w => w.isMinimized).map(window => (
            <button
              key={window.id}
              onClick={() => updateWindow(window.id, { isMinimized: false })}
              className="px-4 py-2 bg-topbar-bg text-topbar-fg rounded shadow-subtle hover:bg-opacity-80 transition-all"
            >
              {window.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};