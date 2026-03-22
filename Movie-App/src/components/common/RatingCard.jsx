import React from 'react';
import { Star } from 'lucide-react'; // Cần cài lucide-react: npm install lucide-react

const RatingCard = ({ source = "IMDb", value = "8.5", color = "cyan" }) => {
  // Config màu sắc linh hoạt (mặc định là Cyan)
  const themeColor = {
    cyan: "from-cyan-500 to-blue-600 shadow-cyan-500/20 text-cyan-400",
    gold: "from-yellow-400 to-orange-500 shadow-yellow-500/20 text-yellow-400",
    pink: "from-pink-500 to-rose-600 shadow-pink-500/20 text-pink-400"
  }[color] || "from-cyan-500 to-blue-600";

  return (
    <div className="cursor-pointer group relative flex items-center p-1 w-fit min-w-50 bg-zinc-950/40 backdrop-blur-md rounded-2xl border border-white/5 transition-all duration-500 hover:scale-105 hover:border-white/20">
      
      {/* 1. Icon Section với hiệu ứng Ngôi sao tỏa sáng */}
      <div className="relative flex items-center justify-center size-14 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 ml-1">
        {/* Glow nền phía sau icon */}
        <div className={`absolute inset-0 bg-linear-to-br ${themeColor} opacity-10 group-hover:opacity-30 transition-opacity`} />
        {/* Ngôi sao chính - Xoay và tỏa sáng khi hover */}
        <Star 
          size={28} 
          fill="currentColor" 
          className={`${themeColor.split(' ').pop()} transition-all duration-700 group-hover:rotate-360 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]`} 
        />
      </div>

      {/* 2. Nội dung text */}
      <div className="flex flex-col px-4 py-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors duration-300">
          {source}
        </span>
        
        <div className="flex items-baseline gap-1">
          <h3 className="text-2xl font-black text-white tracking-tighter tabular-nums drop-shadow-md">
            {value}
          </h3>
          <span className="text-xs font-bold text-zinc-600 group-hover:text-zinc-400 transition-colors">/10</span>
        </div>
      </div>

      {/* 3. Hiệu ứng viền Neon chạy dọc (Right Accent) */}
      <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${themeColor} 
        absolute right-3 opacity-40 group-hover:h-12 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]`} />

      {/* 4. Tia sáng quét ngang khi Hover (Shine Effect) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[25deg] group-hover:left-[150%] transition-all duration-1000" />
      </div>
    </div>
  );
};

export default RatingCard;