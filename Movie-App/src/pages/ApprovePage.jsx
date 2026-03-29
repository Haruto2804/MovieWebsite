import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, Smartphone, ExternalLink } from 'lucide-react';

const ApprovePage = () => {
  const [seconds, setSeconds] = useState(0);

  // Hiệu ứng đếm thời gian giả lập để người dùng không cảm thấy bị "treo" web
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center">
      {/* Hiệu ứng vòng xoay chính */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-cine-red blur-[60px] opacity-20 animate-pulse"></div>
        <div className="relative">
          <Loader2 className="w-20 h-20 text-cine-red animate-spin stroke-[1.5]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-white opacity-80" />
          </div>
        </div>
      </div>

      {/* Nội dung thông báo */}
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
        Đang chờ xác nhận từ <span className="text-cine-red">TMDB </span>
      </h1>
      
      <div className="max-w-md space-y-4">
        <p className="text-gray-400 leading-relaxed">
          Vui lòng kiểm tra cửa sổ trình duyệt mới hoặc ứng dụng xác thực của bạn để hoàn tất đăng nhập.
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-full text-sm text-gray-300">
          <Smartphone className="w-4 h-4 text-cine-red" />
          <span>Thời gian chờ: {seconds} giây</span>
        </div>
      </div>

      {/* Chân trang / Trợ giúp */}
      <div className="mt-12 flex flex-col gap-3">
        <button 
          onClick={() => window.location.reload()}
          className="text-sm text-gray-500 hover:text-cine-red transition-colors flex items-center gap-2 justify-center"
        >
          <ExternalLink className="w-4 h-4" />
          Bạn chưa thấy cửa sổ xác nhận? Thử lại
        </button>
        
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">
          Powered by Cine Red Security
        </p>
      </div>

      {/* Trang trí góc màn hình (Vibe rạp phim) */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-30"></div>
    </div>
  );
};

export default ApprovePage;