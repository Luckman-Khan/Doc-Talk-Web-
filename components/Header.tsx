import React from 'react';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';

interface HeaderProps {
    onSettingsClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  return (
    <div className="bg-[#008069] text-white p-2 flex items-center justify-between shadow-md z-10 sticky top-0">
      <div className="flex items-center gap-2">
        <button className="p-1 rounded-full hover:bg-white/10 md:hidden">
            <ArrowLeft size={24} />
        </button>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden border border-white/20">
             <img src="https://picsum.photos/200/200" alt="Doc Talk" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#008069]"></div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg leading-tight">Doc Talk 🩺</h1>
          <span className="text-xs text-white/80">Online</span>
        </div>
      </div>

      <div className="flex items-center gap-4 pr-2">
        <button className="p-2 rounded-full hover:bg-white/10">
          <Video size={22} />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10">
          <Phone size={20} />
        </button>
        <button 
            className="p-2 rounded-full hover:bg-white/10"
            onClick={onSettingsClick}
            title="Settings / Reset Key"
        >
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};