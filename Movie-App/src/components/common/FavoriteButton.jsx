import { useState } from 'react';
import { Heart } from 'lucide-react';

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button 
      onClick={() => setIsFavorite(!isFavorite)}
      className="p-3 cursor-pointer rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-all"
    >
      <Heart 
        // Nếu đã thích: hiện màu đỏ và đổ màu đặc (fill)
        // Nếu chưa: chỉ hiện viền trắng
        size={22}
        className={`transition-colors duration-300 ${
          isFavorite 
            ? "fill-red-500 text-red-500" 
            : "text-white"
        }`} 
      />
    </button>
  );
};
export default FavoriteButton;