import React, { useState } from 'react';
import { Home, Compass, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      {/* Nút bấm để mở Sidebar (Đặt cạnh Logo CineStream của bạn) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Overlay (Lớp phủ mờ khi mở Sidebar) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Main */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-cine-dark text-white z-70 
        transform transition-transform duration-300 ease-in-out border-r border-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Header Sidebar */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <span className="text-[#c026d3] font-bold text-xl">CineStream</span>
          <button onClick={() => setIsOpen(false)} className="hover:text-gray-400">
            <X className= "cursor-pointer" size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          
          {/* Item 1: Home */}
          <a 
            href="#home" 
            className="cursor-pointer flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all group"
          >
            <Home className="text-gray-400 group-hover:text-[#c026d3]" size={22} />
            <span className="font-medium">Home</span>
          </a>

          {/* Item 2: Search & Discover */}
          <a 
            href="#discover" 
            className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 transition-all group"
          >
            <Compass className="text-gray-400 group-hover:text-[#c026d3]" size={22} />
            <span className="font-medium">Search & Discover</span>
          </a>

        </nav>
      </div>
    </div>
  );
};

export default Sidebar;