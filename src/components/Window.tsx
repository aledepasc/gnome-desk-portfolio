import { useState, useRef, useEffect, ReactNode } from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  title: string;
  children: ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (position: { x: number; y: number }) => void;
  onResize: (size: { width: number; height: number }) => void;
  onMouseDown: () => void;
}

export const Window = ({
  title,
  children,
  position,
  size,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  onResize,
  onMouseDown,
}: WindowProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = Math.max(48, e.clientY - dragOffset.y); // Don't go above topbar
        onMove({ x: newX, y: newY });
      }
      
      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        const newWidth = Math.max(300, resizeStart.width + deltaX);
        const newHeight = Math.max(200, resizeStart.height + deltaY);
        
        onResize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, onMove, onResize]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('window-title')) {
      onMouseDown();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    });
  };

  return (
    <div
      ref={windowRef}
      className="absolute bg-window-bg border border-window-border rounded-lg shadow-window animate-window-appear"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      onMouseDown={onMouseDown}
    >
      {/* Title Bar */}
      <div
        className="h-12 bg-gradient-window border-b border-window-border rounded-t-lg flex items-center justify-between px-4 cursor-move select-none"
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className="window-title text-sm font-medium text-foreground flex-1">
          {title}
        </div>
        
        {/* Window Controls */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
            title="Minimize"
          >
            <Minus size={8} className="text-yellow-800 opacity-0 hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={onMaximize}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
            title="Maximize"
          >
            <Square size={8} className="text-green-800 opacity-0 hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
            title="Close"
          >
            <X size={8} className="text-red-800 opacity-0 hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto" style={{ height: size.height - 48 }}>
        {children}
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        onMouseDown={handleResizeMouseDown}
      >
        <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-muted-foreground opacity-50"></div>
      </div>
    </div>
  );
};