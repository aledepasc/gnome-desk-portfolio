import { LucideIcon } from "lucide-react";

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const DesktopIcon = ({ icon: Icon, label, onClick }: DesktopIconProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group text-white"
    >
      <div className="p-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 shadow-icon group-hover:bg-white/30 transition-all duration-200">
        <Icon size={32} className="text-white" />
      </div>
      <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
};