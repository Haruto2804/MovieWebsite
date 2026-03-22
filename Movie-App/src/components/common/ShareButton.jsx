import { BsShare } from "react-icons/bs";

import { Heart } from 'lucide-react';

const ShareButton = () => {

  return (
    <button 
      className=" group p-3 cursor-pointer rounded-lg bg-gray-800/50  hover:bg-blue-700 transition-all">
      <BsShare size={22} className="group-hover:scale-110 transition-all duration-300 "/>
    </button>
  );
};
export default ShareButton;