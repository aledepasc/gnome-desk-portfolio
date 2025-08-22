import { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  size?: 'sm' | 'default';
}

export const DesktopIcon = ({ icon: Icon, label, onClick, size = 'default' }: DesktopIconProps) => {
  const iconSize = size === 'sm' ? 24 : 32;
  const containerSize = size === 'sm' ? 'p-3' : 'p-4';
  const labelSize = size === 'sm' ? 'text-xs' : 'text-sm';
  
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group text-white"
    >
      <div className={`${containerSize} rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-icon group-hover:bg-white/30 transition-all duration-200`}>
        <Icon size={iconSize} className="text-white" />
      </div>
      <span className={`${labelSize} font-medium text-white/90 group-hover:text-white transition-colors`}>
        {label}
      </span>
    </button>
  );
};