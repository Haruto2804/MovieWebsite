import BackButton from "../components/common/BackButton";
import UserStatCard from "../components/common/UserStatCard";
import { FaRegHeart } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { MdLocalMovies } from "react-icons/md";
import MovieSection from "./HomePage/MovieSection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import movieApi from "../api/movie-api";

const UserPage = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({ results: [], count: 0 });
  const [watchList, setWatchlist] = useState({ results: [], count: 0 });

  const getAvatarUrl = (user) => {
    if (!user) return "";
    if (user.avatar?.tmdb?.avatar_path) {
      return `https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`;
    }
    if (user.avatar?.gravatar?.hash) {
      return `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=200`;
    }
    return `https://ui-avatars.com/api/?name=${user.username || "User"}&background=random`;
  };

  useEffect(() => {
    const fetchAllStatusData = async () => {
      if (!user?.id) return;
      try {
        const [favRes, watchRes] = await Promise.all([
          movieApi.getFavoriteMovie(user.id),
          movieApi.getWatchlist(user.id)
        ]);

        setFavorites({
          results: favRes.results || [],
          count: favRes.total_results || 0
        });

        setWatchlist({
          results: watchRes.results || [],
          count: watchRes.total_results || 0
        });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu User:", error);
      }
    };
    fetchAllStatusData();
  }, [user?.id]);

  if (!user) return <div className="text-white p-10 text-center">Vui lòng đăng nhập...</div>;

  return (
    <div className="mt-5 flex flex-col gap-7 w-full px-4 md:px-0 max-w-full overflow-x-hidden">
      
      {/* 1. Header Profile - Responsive Row to Column */}
      <div className="flex flex-col gap-4">
        <div className="w-fit">
          <BackButton />
        </div>
        <div className="flex flex-row items-center gap-4 md:gap-6">
          <img 
            src={getAvatarUrl(user)} 
            className="size-16 md:size-25 rounded-full border-2 border-cine-red object-cover" 
            alt="avatar" 
          />
          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-2xl md:text-5xl font-bold text-white truncate max-w-[200px] md:max-w-none">
              {user.name || user.username}
            </h1>
            <p className="text-gray-500 text-sm md:text-base italic">Manage your library</p>
          </div>
        </div>
      </div>

      {/* 2. Stats Grid - 1 cột trên mobile, 3 cột trên desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        <UserStatCard
          icon={<FaRegHeart />}
          value={favorites.count}
          title="Yêu thích"
          colorClass="text-red-500"
        />
        <UserStatCard
          icon={<LuHistory />}
          value={watchList.count}
          title="Xem sau"
          colorClass="text-purple-500"
        />
        <UserStatCard
          icon={<MdLocalMovies />}
          value={watchList.count + favorites.count}
          title="Tổng phim"
          colorClass="text-cine-red"
        />
      </div>

      {/* 3. Movie Sections - Đảm bảo component MovieSection có overflow-x-auto nếu dùng list ngang */}
      <div className="flex flex-col gap-10">
        <div className="w-full">
          <MovieSection
            title="Phim yêu thích"
            movieList={[...favorites.results].reverse()}
          />
        </div>
        <div className="w-full">
          <MovieSection
            title="Phim xem sau"
            movieList={[...watchList.results].reverse()}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;