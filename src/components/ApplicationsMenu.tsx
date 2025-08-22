import { User, Mail, Code, Briefcase, Terminal } from "lucide-react";
import { WindowType } from "./Desktop";

interface ApplicationsMenuProps {
  onClose: () => void;
  onOpenWindow: (type: WindowType, title: string) => void;
}

const menuItems = [
  { type: 'personal' as WindowType, title: 'Personal Info', icon: User, description: 'About me' },
  { type: 'contact' as WindowType, title: 'Contact', icon: Mail, description: 'Get in touch' },
  { type: 'skills' as WindowType, title: 'Skills', icon: Code, description: 'Technical skills' },
  { type: 'experience' as WindowType, title: 'Experience', icon: Briefcase, description: 'Work history' },
  { type: 'terminal' as WindowType, title: 'Terminal', icon: Terminal, description: 'Resume CLI' },
];

export const ApplicationsMenu = ({ onClose, onOpenWindow }: ApplicationsMenuProps) => {
  const handleItemClick = (type: WindowType, title: string) => {
    onOpenWindow(type, title);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute top-12 left-4 z-50 w-80 bg-window-bg rounded-lg shadow-window border border-window-border animate-window-appear">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Applications</h3>
          
          <div className="grid gap-2">
            {menuItems.map((item) => (
              <button
                key={item.type}
                onClick={() => handleItemClick(item.type, item.title)}
                className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted transition-colors text-left"
              >
                <div className="p-2 rounded-md bg-primary/10">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};