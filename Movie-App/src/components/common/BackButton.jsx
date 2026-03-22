import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)}
      className="group flex cursor-pointer items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md 
                 text-white border border-white/10 rounded-full transition-all 
                 duration-300 hover:bg-white hover:text-black hover:scale-105 active:scale-95"
    >
      <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};
export default BackButton;