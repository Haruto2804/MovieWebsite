import BackButton from "../components/common/BackButton";
import HarutoPicture from '../../public/haruto.png'
import UserStatCard from "../components/common/UserStatCard";
import { FaRegHeart } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { MdLocalMovies } from "react-icons/md";
import MovieSection from "./HomePage/MovieSection";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

const userStats = [
  {
    icon: <FaRegHeart />,
    value: 10, // Dùng dấu hai chấm :
    title: "Favorite",
    colorClass: "text-red-500",
  },
  {
    icon: <LuHistory />,
    value: 124,
    title: "Watch List",
    colorClass: "text-purple-500",
  },
  {
    icon: <MdLocalMovies />,
    value: 8.5,
    title: "Total Movies",
    colorClass: "text-cine-red",
  }
];
export const mockOMDbMovies = [
  {
    imdbID: "tt0111161",
    Title: "The Shawshank Redemption",
    Year: "1994",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMDAyY2ViOTAtOWU4Ni00NmNmLTVmNTUtMmIyM2E1M2RjZDgxXkEyXkFqcGdeQXVyOTAyMDgxODQ@._V1_SX300.jpg"
  },
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"
  },
  {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Year: "2008",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
  },
  {
    imdbID: "tt0109830",
    Title: "Forrest Gump",
    Year: "1994",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Y2I1LWJhNzYtMmZiYmUx2Zjk3N2RlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
  }
];

const UserPage = (() => {
  const {user} = useContext(AuthContext);
  console.log(user);
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
        {userStats.map((item, index) => (
          <UserStatCard
            key={index}
            icon={item.icon}
            value={item.value}
            title={item.title}
            colorClass={item.colorClass}
          />
        ))}
      </div>
      <MovieSection 
        title="Favorite Movie"
        movieList={mockOMDbMovies}
      />
        <MovieSection 
        title="Watch List "
        movieList={mockOMDbMovies}
      />
    </div>
  )
})
export default UserPage;