import { createContext, useEffect, useState, useRef } from "react";
import authService from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(() => {
    // Khởi tạo user từ localStorage để load nhanh khi F5
    const savedUser = localStorage.getItem('user_details');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const hasFetched = useRef(false);

  const handleLogin = async () => {
    try {
      await authService.login();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleLogout = async ()=> {
    try {
      await authService.logout();
      setLogin(false);
      alert("Đăng xuất thành công!");
    }
    catch(err) {
      console.error("Đăng xuất thất bại",err);
    }
  }
  useEffect(() => {
    const handleFetchUser = async () => {
      // 1. Chặn ngay nếu đã gọi rồi (đặc biệt là React StrictMode trong Dev)
      if (hasFetched.current) return;

      const sessionId = localStorage.getItem('tmdb_session_id');

      if (sessionId) {
        // 2. Đánh dấu đã bắt đầu fetch
        hasFetched.current = true;

        try {
          const userDetail = await authService.getAccountDetail(sessionId);
          
          if (userDetail) {
            setUser(userDetail);
            setLogin(true); // Nếu lấy được user thì đánh dấu đã login
            localStorage.setItem('user_details', JSON.stringify(userDetail));
          }
        } catch (error) {
          console.error("Lỗi khi lấy thông tin tài khoản:", error);
          // Nếu lỗi, cho phép lần render sau (nếu có) có thể thử lại
          hasFetched.current = false;
        }
      }
    };

    handleFetchUser();
  }, []);

  const value = {
    handleLogin,
    handleLogout,
    login,
    setLogin,
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};