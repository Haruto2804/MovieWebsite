import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm cái này để chuyển trang
import { Loader2, ShieldCheck, Smartphone, ExternalLink } from 'lucide-react';
import { AuthContext } from '../contexts/authContext';
import authService from '../services/authService';

const ApprovePage = () => {
  const [seconds, setSeconds] = useState(0);
  const {setUser,setLogin } = useContext(AuthContext);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const initialized = useRef(false); // Flag để chống chạy 2 lần

  useEffect(() => {
    // 1. Timer logic
    let timer;
    if (!isDone) {
      timer = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // 2. Auth logic
    const initSession = async () => {
      // Nếu đã chạy rồi thì bỏ qua (chống Strict Mode render 2 lần)
      if (initialized.current) return;
      
      const urlParams = new URLSearchParams(window.location.search);
      const approved = urlParams.get('approved');
      const request_token = urlParams.get('request_token');

      if (approved === 'true' && request_token) {
        initialized.current = true; // Đánh dấu đã chạy
        
        try {
          const sessionId = await authService.createSession();
          const userData = await authService.getAccountDetail(sessionId);
          
          setUser(userData);
          setIsDone(true);
          
          // Đợi 1 chút để user thấy thông báo thành công rồi chuyển trang
          setTimeout(()=> {
            setLogin(true);
            navigate('/')
          },2000)
          
        } catch (err) {
          console.error("Lỗi xác thực:", err);
          setError("Phiên làm việc hết hạn hoặc token không hợp lệ.");
          setIsDone(true); 
        }
      }
    };

    initSession();

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDone, setUser, navigate, setLogin]);
  return (
    <div className="mx-auto min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-600 blur-[60px] opacity-20 animate-pulse"></div>
        <div className="relative">
          {isDone && !error ? (
            <ShieldCheck className="w-20 h-20 text-green-500 transition-all scale-110" />
          ) : (
            <Loader2 className={`w-20 h-20 ${error ? 'text-gray-500' : 'text-red-600'} animate-spin stroke-[1.5]`} />
          )}
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
        {isDone 
          ? (error ? "Có lỗi xảy ra" : "Xác thực thành công!") 
          : <>Đang chờ xác nhận từ <span className="text-red-600">TMDB</span></>
        }
      </h1>

      <div className="max-w-md space-y-4">
        <p className="text-gray-400 leading-relaxed">
          {error || (isDone 
            ? "Hệ thống đang đưa bạn quay trở lại ứng dụng..." 
            : "Vui lòng kiểm tra cửa sổ trình duyệt mới để hoàn tất đăng nhập.")}
        </p>

        {!isDone && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-full text-sm text-gray-300">
            <Smartphone className="w-4 h-4 text-red-600" />
            <span>Thời gian chờ: {seconds} giây</span>
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-col gap-3">
        <button
          onClick={() => window.location.href = '/login'} // Hoặc link login của bạn
          className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-2 justify-center"
        >
          <ExternalLink className="w-4 h-4" />
          <span>{error ? "Quay lại trang đăng nhập" : "Bạn chưa thấy cửa sổ xác nhận? Thử lại"}</span>
        </button>

        <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em]">
          Powered by Cine Red Security
        </p>
      </div>

      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-30"></div>
    </div>
  );
};

export default ApprovePage;