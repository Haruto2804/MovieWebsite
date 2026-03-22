import { FaPlay } from 'react-icons/fa';

const DirectorLabel = ({ authorName = "Bảo Haruto", role = "Director" }) => {
  return (
    /* 1. items-stretch: Ép tất cả các con (thanh đỏ, nội dung, nút play) cao bằng nhau.
      2. max-w-[250px]: Giới hạn độ rộng để ép chữ xuống dòng khi quá dài.
    */
    <div className="flex items-stretch gap-0 group cursor-pointer w-fit max-w-[280px] transition-all duration-300">
      
      {/* 1. Thanh Accent: self-stretch giúp nó luôn bám theo độ cao của cụm nội dung */}
      <div className="w-1 bg-red-600 group-hover:bg-red-500 group-hover:shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all duration-300 rounded-l-sm self-stretch"></div>
      
      <div className="flex flex-col justify-center px-4 py-2 bg-zinc-900/50 backdrop-blur-md border border-l-0 border-zinc-800 group-hover:border-zinc-700 transition-all flex-1 min-h-[44px]">
        
        {/* Vai trò */}
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-red-400 transition-colors leading-none mb-1">
          {role}
        </span>
        
        {/* Tên: whitespace-normal + break-words để tự động xuống hàng */}
        <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors whitespace-normal break-words leading-tight">
          {authorName}
        </h3>
      </div>

      {/* 3. Nút Play: Bỏ size-10 (vì size-10 cố định h-10), thay bằng w-10 */}
      <div className="w-10 flex items-center justify-center bg-zinc-800/80 border border-l-0 border-zinc-800 group-hover:bg-red-600 transition-all rounded-r-sm self-stretch">
        <FaPlay className="size-3 text-zinc-500 group-hover:text-white group-hover:scale-110 transition-all" />
      </div>
    </div>
  );
};

export default DirectorLabel;