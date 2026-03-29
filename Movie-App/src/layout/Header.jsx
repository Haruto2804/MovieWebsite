import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { FiUser, FiX } from "react-icons/fi"; // Thêm icon đóng (X)
import { RiMovie2AiFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai"; // Icon bổ trợ cho Sidebar
import { MdOutlineExplore } from "react-icons/md"; // Icon bổ trợ cho Sidebar
const navigation = [
  {
    value: 'Home', path: '/'
  },
  {
    value: 'Search & Discover', path: '/search_discover'
  }
]
const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hàm helper để đóng sidebar khi click vào link
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <header className="bg-blur flex justify-between items-center px-5 py-3 z-[100] sticky top-0 border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="flex gap-4 items-center">
          {/* Nút mở Sidebar - Tách ra khỏi Link logo */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-white hover:text-gray-400 transition-colors cursor-pointer"
          >
            <GiHamburgerMenu className="size-6 md:hiddens" />
          </button>

          <Link to="/" className="flex gap-4 items-center">
            <div className="group cursor-pointer bg-cine-gradient p-2 rounded-lg">
              <RiMovie2AiFill className="size-6 text-white group-hover:scale-110 transition-all duration-300" />
            </div>
            <p className="text-2xl font-bold bg-cine-gradient bg-clip-text text-transparent">
              CineStream
            </p>
          </Link>
        </div>

        {/* Menu chính trên Desktop */}
        <ul className="text-gray-400 gap-6 md:flex hidden font-medium">
          <Link to="/" className="hover:text-white transition-all duration-300">Home</Link>
          <Link to="/search_discover" className="hover:text-white transition-all duration-300">Search & Discover</Link>
        </ul>

        <div className="flex gap-3">
          <div className="rounded-full flex items-center p-2 cursor-pointer hover:bg-slate-800 transition-all duration-300">
            <GoSearch className="size-5 text-slate-300" />
          </div>
          <div className="rounded-full flex items-center p-2 cursor-pointer hover:bg-slate-800 transition-all duration-300">
            <FiUser className="size-5 text-slate-300" />
          </div>
        </div>
      </header>

      {/* --- SIDEBAR COMPONENT --- */}

      {/* Overlay (Lớp phủ mờ) */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[1000] transition-opacity duration-300 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeSidebar}
      />

      {/* Sidebar Panel */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-[#0a0a0a] border-r border-white/10 z-[1001] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <RiMovie2AiFill className="size-6 text-purple-500" />
            <span className="text-xl font-bold text-white">Menu</span>
          </div>
          <button onClick={closeSidebar} className="text-gray-400 hover:text-white">
            <FiX className="size-6" />
          </button>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          {navigation.map((item) => (
            <Link
              to={item.path}
              onClick={closeSidebar}
              className="flex items-center gap-4 px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-white rounded-xl transition-all"
            >
              <AiOutlineHome className="size-5" />
              <span className="font-medium">{item.value}</span>
            </Link>
          ))}



        </nav>
      </aside>
    </>
  );
};

export default Header;