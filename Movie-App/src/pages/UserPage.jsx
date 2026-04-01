import BackButton from "../components/common/BackButton";
import HarutoPicture from '../../public/haruto.png'
import UserStatCard from "../components/common/UserStatCard";
import { FaRegHeart } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { MdLocalMovies } from "react-icons/md";
import MovieSection from "./HomePage/MovieSection";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import movieApi from "../api/movie-api";
const UserPage = (() => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState({
    results: [],
    count: 0
  });
  const [watchList, setWatchlist] = useState({
    results: [],
    count: 0
  })
  const getAvatarUrl = (user) => {
    // 1. Kiểm tra nếu có ảnh trực tiếp từ TMDB
    if (user.avatar.tmdb.avatar_path) {
      return `https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`;
    }

    // 2. Nếu không có, lấy từ Gravatar bằng cái hash
    if (user.avatar.gravatar.hash) {
      return `https://www.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=200`;
    }

    // 3. Nếu cả hai đều không có, dùng một ảnh mặc định (Placeholder)
    return `https://ui-avatars.com/api/?name=${user.username}&background=random`;
  };
  useEffect(() => {
    const fetchAllStatusData = async () => {
      if (!user?.id) return;

      try {
        // Gọi cả 2 API cùng lúc
        const [favRes, watchRes] = await Promise.all([
          movieApi.getFavoriteMovie(user.id),
          movieApi.getWatchlist(user.id)
        ]);

        setFavorites({
          results: favRes.results,
          count: favRes.total_results
        });

        setWatchlist({
          results: watchRes.results,
          count: watchRes.total_results
        });

        console.log("Dữ liệu đã load xong:", { favRes, watchRes });
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu User:", error);
      }
    };

    fetchAllStatusData();
  }, [user.id]); console.log(favorites)
  return (
    <div className="mt-5 flex flex-col gap-7 w-full">
      {/* user header profile */}
      <div className="flex flex-col gap-2">
        <div className="w-fit">
          <BackButton />
        </div>
        <div className="flex gap-4 items-center">
          <img src={getAvatarUrl(user)} className="size-25 rounded-full " alt="" />
          <div className="flex flex-col gap-3">
            <p className="text-5xl font-bold">{user.name ? user.name : user.username}</p>
            <p className="text-gray-500">Manage your favorites and watch history</p>
          </div>
        </div>
      </div>
      {/* user stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        <UserStatCard
          key="1"
          icon={<FaRegHeart />}
          value={favorites.count}
          title="Favorite"
          colorClass="text-red-500"
        />
        <UserStatCard
          key="2"
          icon={<LuHistory />}
          value={watchList.count}
          title="Watch List"
          colorClass="text-purple-500"
        />
        <UserStatCard
          key="2"
          icon={<MdLocalMovies />}
          value={watchList.count + favorites.count}
          title="Total Movies"
          colorClass="text-cine-red"
        />
      </div>
      <MovieSection
        title="Favorite Movie"
        movieList={favorites.results.toReversed()}
      />
      <MovieSection
        title="Watch List "
        movieList={watchList.results.toReversed()}
      />
    </div>
  )
})
export default UserPage;