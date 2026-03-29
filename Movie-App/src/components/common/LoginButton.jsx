import React from 'react';

const LoginButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 px-6 py-2.5 font-semibold text-white bg-cine-red rounded-full transition-all duration-200 hover:bg-red-700 active:scale-95 shadow-md"
    >
      <span>Đăng nhập</span>
    </button>
  );
};

export default LoginButton;