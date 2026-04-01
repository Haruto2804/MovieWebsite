import { useContext, useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { AuthContext } from '../../contexts/authContext';
import { useParams } from 'react-router-dom';
import movieApi from '../../api/movie-api';

const FavoriteButton = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const handleToggleFavoriteButton = async () => {
    if (!user || !user.id) {
      alert("Vui lòng đăng nhập để sử dụng tính năng này!");
      return;
    }
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);
    if (newStatus === false) {
      await movieApi.removeFavorite(user.id, id);
      console.log("Đã xóa khỏi yêu thích");
    }
    else {
      await movieApi.addFavorite(user.id, id);
    }
  }
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && user.id) {
        try {
          const favorites = await movieApi.getFavoriteMovie(user.id);
          const isExist = favorites.results.some(movie => movie.id.toString() === id.toString());
          setIsFavorite(isExist);
        } catch (error) {
          console.error("Lỗi kiểm tra trạng thái yêu thích:", error);
        }
      }
    };
    checkFavoriteStatus();
  }, [id, user]);
  return (
    <button
      onClick= {handleToggleFavoriteButton}
      className="p-3 cursor-pointer rounded-lg bg-gray-800/50 hover:bg-gray-700 transition-all"
    >
      <Heart
        // Nếu đã thích: hiện màu đỏ và đổ màu đặc (fill)
        // Nếu chưa: chỉ hiện viền trắng
        size={22}
        className={`transition-colors duration-300 ${isFavorite
          ? "fill-red-500 text-red-500"
          : "text-white"
          }`}
      />
    </button>
  );
};
export default FavoriteButton;