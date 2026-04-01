import React, { useContext, useState } from "react";
import { FiUser, FiX, FiLogOut, FiHome, FiSearch } from "react-icons/fi";
import { RiMovie2AiFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AuthContext } from "../contexts/authContext";
import AuthService from "../services/authService";
import LoginButton from "../components/common/LoginButton";
import LogoutButton from '../components/common/LogoutButton';

const navigation = [
  { value: 'Trang chủ', path: '/', icon: <FiHome className="size-5" /> },
  { value: 'Tìm kiếm & Khám phá', path: '/search_discover', icon: <FiSearch className="size-5" /> }
];

const Header = () => {
  const { login, user, handleLogout } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* --- MAIN HEADER --- */}
      <header className="sticky top-0 z-[100] w-full border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex size-10 items-center justify-center rounded-full text-white active:scale-90 md:hidden hover:bg-white/10 transition-all"
            >
              <GiHamburgerMenu className="size-5" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex size-9 items-center justify-center rounded-xl bg-cine-gradient shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform">
                <RiMovie2AiFill className="size-6 text-white" />
              </div>
              <span className="hidden text-xl font-extrabold tracking-tight text-white sm:block bg-cine-gradient bg-clip-text text-transparent">
                CineStream
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-semibold transition-colors hover:text-white ${
                  location.pathname === item.path ? "text-white" : "text-gray-400"
                }`}
              >
                {item.value}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {login === false ? (
              <LoginButton login={() => AuthService.login()} />
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/user" 
                  className="flex items-center gap-2 rounded-full bg-white/5 py-1.5 pl-1.5 pr-3 hover:bg-white/10 transition-all border border-white/10"
                >
                  <div className="size-7 rounded-full bg-cine-gradient flex items-center justify-center overflow-hidden">
                    {/* Nếu có avatar thì thay FiUser bằng img */}
                    <FiUser className="size-4 text-white" />
                  </div>
                  <span className="max-w-[80px] truncate text-sm font-medium text-white hidden xs:block">
                    {user?.username}
                  </span>
                </Link>
                <div className="hidden md:block">
                    <LogoutButton logout={() => handleLogout()} />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- SIDEBAR MOBILE --- */}
      
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[1000] bg-black/60 backdrop-blur-sm transition-all duration-300 ${
          isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 z-[1001] h-full w-[280px] bg-[#0d0d0d] shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-cine-gradient flex items-center justify-center">
                <RiMovie2AiFill className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">CineStream</span>
            </div>
            <button 
              onClick={closeSidebar} 
              className="flex size-10 items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white"
            >
              <FiX className="size-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-2 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.value}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-4 rounded-2xl px-4 py-4 transition-all ${
                  location.pathname === item.path 
                    ? "bg-cine-gradient text-white shadow-lg shadow-purple-500/20" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-semibold">{item.value}</span>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer (User Info & Logout) */}
          {login && (
            <div className="p-4 mt-auto border-t border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                    <FiUser className="size-5 text-purple-400" />
                    <span className="text-sm font-medium text-white truncate w-32">{user?.username}</span>
                </div>
                <button 
                  onClick={() => { handleLogout(); closeSidebar(); }}
                  className="p-2 text-gray-500 hover:text-cine-red transition-colors"
                >
                  <FiLogOut className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;