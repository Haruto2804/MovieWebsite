import { useNavigate } from "react-router-dom";

const GenreLabel = ({ genreLabel = "" }) => {
  const genres = genreLabel ? genreLabel.split(',').map(g => g.trim()) : [];
  if (genres.length === 0) return null;

  return (
    <div
      className="flex flex-wrap gap-3 mt-4">
      {genres.map((genre, index) => (
        <span
          key={index}
          className="
          
            px-4 py-1.5 text-[12px] font-black 
            cursor-pointer
            /* Colors & Border: Dùng tông Zinc sâu để nổi bật text */
            bg-zinc-900 text-zinc-300 border border-zinc-700 
            rounded-md backdrop-blur-md
            
            /* Hover: Đổi sang màu vàng sáng đặc trưng web phim */
            hover:bg-cine-red hover:text-white hover:border-cine-red
            
            /* Animation */
            transition-all duration-300 transform hover:-translate-y-1
          "
        >
          {genre}
        </span>
      ))}
    </div>
  );
};

export default GenreLabel;