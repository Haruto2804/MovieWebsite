import { useContext, useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react'; // Sử dụng icon Plus và Check cho Watchlist
import { AuthContext } from '../../contexts/authContext';
import { useParams } from 'react-router-dom';
import movieApi from '../../api/movie-api';

const WatchlistButton = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Xử lý Toggle Watchlist
  const handleToggleWatchlist = async () => {
    if (!user || !user.id) {
      alert("Vui lòng đăng nhập để sử dụng tính năng này!");
      return;
    }

    const newStatus = !isInWatchlist;
    setIsInWatchlist(newStatus);

    try {
      if (newStatus === false) {
        // Giả định movieApi có method removeWatchlist
        await movieApi.removeFromWatchlist(user.id, id);
        console.log("Đã xóa khỏi danh sách xem sau");
      } else {
        // Giả định movieApi có method addWatchlist
        await movieApi.addToWatchlist(user.id, id);
        console.log("Đã thêm vào danh sách xem sau");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật Watchlist:", error);
      // Rollback lại state nếu API lỗi
      setIsInWatchlist(!newStatus);
    }
  };

  // Kiểm tra trạng thái Watchlist khi load
  useEffect(() => {
    const checkWatchlistStatus = async () => {
      if (user && user.id) {
        try {
          // Giả định movieApi có method getWatchlist
          const watchlist = await movieApi.getWatchlist(user.id);
          const isExist = watchlist.results.some(movie => movie.id.toString() === id.toString());
          setIsInWatchlist(isExist);
        } catch (error) {
          console.error("Lỗi kiểm tra trạng thái Watchlist:", error);
        }
      }
    };
    checkWatchlistStatus();
  }, [id, user]);

  return (
    <button
      onClick={handleToggleWatchlist}
      className={`flex items-center gap-2 p-3 cursor-pointer rounded-lg transition-all ${
        isInWatchlist 
          ? "bg-blue-600 hover:bg-blue-700 text-white" 
          : "bg-gray-800/50 hover:bg-gray-700 text-white"
      }`}
    >
      {isInWatchlist ? (
        <>
          <Check size={22} className="transition-transform duration-300 scale-110" />
          <span className="text-sm font-medium">Đã thêm</span>
        </>
      ) : (
        <>
          <Plus size={22} className="transition-transform duration-300" />
          <span className="text-sm font-medium">Danh sách phát</span>
        </>
      )}
    </button>
  );
};

export default WatchlistButton;