import Label from "../../components/common/Label";
import { MdOutlineStar } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import FavoriteButton from "../../components/common/FavoriteButton";
import MovieSection from "./MovieSection";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { MovieContext } from "../../contexts/movieContext";
import TrailerModal from '../DetailMoviePage/TrailerModal'
import movieApi from "../../api/movie-api";
import { useNavigate } from "react-router-dom";
const formatTitle = (key) => {
  const titles = {
    playing: "Playing",
    popular: "Popular",
    topRated: "Top rated",
    upcoming: "Upcoming"
  };
  return titles[key] || key;
};
const Home = () => {
  const { homeMovies, featuredMovie } = useContext(MovieContext);
  const [isOpen, setIsOpen] = useState(false);
  const [trailerVideos, setTrailerVideos] = useState([]);
  const navigate = useNavigate();
  const handlePlayButton = async () => {
    if (!featuredMovie?.id) return;

    try {
      // Gọi API lấy trailer dựa trên ID phim đang Featured
      const videos = await movieApi.getTrailerVideos(featuredMovie.id);
      setTrailerVideos(videos);
      // Nếu có video thì mới mở Modal
      if (videos && videos.length > 0) {
        setIsOpen(true);
      } else {
        alert("Phim này hiện chưa có trailer!");
      }
    } catch (error) {
      console.error("Lỗi lấy trailer:", error);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-10 w-full p-2">
        {isOpen && (
          <TrailerModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            videoId={trailerVideos[0].key}
          />
        )}

        <div className="relative p-4 min-h-137.5 flex items-center">
          {/* 1. Ảnh nền Banner: Dùng backdrop_path thay vì ảnh fix cứng */}
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie?.backdrop_path})`
            }}
            className="rounded-lg absolute inset-0 bg-cover bg-center transition-all duration-1000"
          ></div>

          {/* 2. Lớp phủ Gradient: Giúp chữ trắng nổi bật hơn trên mọi loại ảnh */}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent rounded-lg"></div>

          {/* 3. Nội dung phim */}
          <div className="mt-10 relative flex flex-col gap-4 max-w-2xl z-10">
            <Label labelName="Featured" />

            <div className="text-6xl font-bold text-white drop-shadow-lg">
              {featuredMovie?.title || featuredMovie?.original_title}
            </div>

            <div className="flex items-center gap-5 text-[15px] text-zinc-200">
              <div className="flex items-center gap-1">
                <MdOutlineStar className="size-4 text-yellow-500" />
                <span className="font-bold">{featuredMovie?.vote_average?.toFixed(2)}</span>
              </div>
              <span>•</span>
              {/* Lấy năm từ release_date */}
              <span>{featuredMovie?.release_date?.split("-")[0]}</span>
              <span>•</span>
              {/* Ngôn ngữ gốc */}
              <span className="uppercase">{featuredMovie?.original_language}</span>
            </div>

            {/* Overview: Dùng line-clamp để không bị quá dài làm nát layout */}
            <p className="text-slate-300 text-lg leading-relaxed line-clamp-3">
              {featuredMovie?.overview}
            </p>

            <div className="flex gap-3 items-center mt-2">
              <button
                onClick={handlePlayButton}
                className="flex gap-3 items-center bg-white rounded-lg px-8 py-3 
        cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-cine-red 
        group active:scale-95 shadow-lg">
                <FaPlay className="size-5 text-black group-hover:text-white" />
                <span className="text-black text-md font-bold group-hover:text-white">Play Now</span>
              </button>

              
                <button 
                onClick={()=> navigate(`/movie/${featuredMovie.id}`)}
                className="flex gap-3 items-center bg-zinc-600/80 backdrop-blur-md rounded-lg px-8 py-3 
                  cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-500
                  group active:scale-95 text-white">
                  <IoInformationCircleOutline className="size-6" />
                  <span className="text-md font-bold">More Info</span>
                </button>
  


              <FavoriteButton movie={featuredMovie} />
            </div>
          </div>
        </div>
        {homeMovies.isLoading ? (
          <div className="text-white">Đang tải phim ....</div>
        ) : (
          Object.keys(homeMovies)
            .filter((key) => key !== "isLoading") // Loại bỏ key isLoading để không render nhầm
            .map((key) => (
              <MovieSection
                key={key}
                title={formatTitle(key)}
                movieList={homeMovies[key]} //
              />
            ))
        )}
      </div>

    </>
  )
}
export default Home;