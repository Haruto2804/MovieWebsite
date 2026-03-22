import { FaPenNib } from 'react-icons/fa';

const WriterLabel = ({ writerName = "N/A" }) => {
  return (
    /* 1. Thêm items-stretch để các con luôn cao bằng nhau.
       2. Giới hạn max-w để ép chữ xuống dòng thay vì tràn màn hình.
    */
    <div className="flex items-stretch gap-0 group cursor-pointer w-fit max-w-[250px] transition-all duration-300">
      
      {/* Thanh Accent: Dùng self-stretch để bám theo độ cao của nội dung */}
      <div className="w-1 bg-cyan-600 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(8,145,178,0.8)] transition-all duration-300 rounded-l-sm self-stretch"></div>
      
      {/* Container chính: Bỏ h-10, dùng min-h và py-2 để tự co giãn */}
      <div className="flex flex-col justify-center px-4 py-2 min-h-[40px] bg-zinc-900/50 backdrop-blur-md border border-l-0 border-zinc-800 group-hover:border-zinc-700 transition-all flex-1">
        
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-cyan-400 transition-colors leading-none mb-1">
          Screenwriter
        </span>
        
        {/* Tên: 
           - Bỏ truncate (cắt chữ) 
           - Thêm whitespace-normal và break-words để xuống dòng 
        */}
        <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors whitespace-normal break-words leading-tight">
          {writerName}
        </h3>
      </div>

      {/* Icon Bút mực: Dùng self-stretch để giữ form nút vuông vắn */}
      <div className="flex items-center justify-center w-10 bg-zinc-800/80 border border-l-0 border-zinc-800 group-hover:bg-cyan-700 transition-all rounded-r-sm self-stretch">
        <FaPenNib className="size-3 text-zinc-500 group-hover:text-white transition-all group-hover:rotate-12" />
      </div>
    </div>
  );
};

export default WriterLabel;