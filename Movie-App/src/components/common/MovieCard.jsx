import { FaPlay, FaHeart } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // Đường dẫn ảnh TMDB
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  // Lấy năm từ release_date (vd: "2024-05-10" -> "2024")
  const releaseYear = movie.release_date?.split("-")[0] || "N/A";

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="overflow-hidden cursor-pointer relative h-80 w-54 rounded-md group bg-zinc-900">
        
        {/* 1. Ảnh nền - Dùng thẻ img sẽ tối ưu hơn backgroundImage cho lazy load */}
        <img 
          src={posterUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
        />

        {/* 2. Overlay (Lớp phủ đen) - Chỉ đậm lên khi hover */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-500"></div>

        {/* 3. NÚT PLAY Ở CHÍNH GIỮA */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/20 backdrop-blur-md p-4 flex items-center transform scale-50 group-hover:scale-100 transition-all duration-500">
            <FaPlay className="size-6 text-white" />
          </div>
        </div>

        {/* 4. Badge năm ở góc trên */}
        <div className="absolute top-3 left-2 flex gap-1 items-center bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-md border border-white/10">
          <RiMovie2Fill className="size-4 text-yellow-500" />
          <span className="text-[10px] font-bold text-yellow-500">{releaseYear}</span>
        </div>

        {/* 5. Thông tin phim (Phía dưới) */}
        <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 absolute bottom-3 left-2 right-2 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
             <h1 className="text-sm font-bold text-white truncate drop-shadow-lg">
                {movie.title}
             </h1>
             <div className="shrink-0 rounded-full bg-white/10 p-1.5 hover:bg-red-500 transition-colors">
                <FaHeart className="size-3 text-white" />
             </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-medium text-zinc-300">
            <span className="flex items-center gap-1">
               ⭐ {movie.vote_average?.toFixed(1)}
            </span>
            <span>•</span>
            <span className="uppercase">{movie.original_language}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;