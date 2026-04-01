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
    playing: "Đang chiếu",
    popular: "Phổ biến",
    topRated: "Đánh giá cao",
    upcoming: "Sắp chiếu"
  };
  return titles[key] || key;
};
const Home = () => {
  const { homeMovies, featuredMovie } = useContext(MovieContext);
  const [isOpen, setIsOpen] = useState(false);
  const [trailerVideos, setTrailerVideos] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false); // State mới cho "Xem thêm"
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

        {/* Container chính: Giảm padding trên mobile, giảm min-height cho phù hợp tỷ lệ màn hình dọc */}
        <div className="relative p-5 md:p-10 min-h-[500px] md:min-h-137.5 flex items-end md:items-center">

          {/* 1. Ảnh nền Banner: Object-cover để không bị méo trên mọi thiết bị */}
          <div
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie?.backdrop_path})`
            }}
            className="rounded-xl absolute inset-0 bg-cover bg-[center_top] md:bg-center transition-all duration-1000"
          ></div>

          {/* 2. Lớp phủ Gradient: Tăng độ đậm lớp phủ phía dưới trên mobile để đọc chữ dễ hơn */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 md:bg-linear-to-r md:from-black md:via-black/60 md:to-transparent rounded-xl"></div>

          {/* 3. Nội dung phim: Căn giữa nhẹ trên mobile hoặc đẩy xuống dưới cùng */}
          <div className="relative flex flex-col gap-3 md:gap-4 max-w-2xl z-10 w-full">

            <div className="w-fit">
              <Label labelName="Featured" />
            </div>

            {/* Title: Responsive font size (text-3xl cho mobile, text-6xl cho desktop) */}
            <h1 className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-2xl line-clamp-2 md:line-clamp-none">
              {featuredMovie?.title || featuredMovie?.original_title}
            </h1>

            {/* Metadata: Giảm size chữ một chút trên mobile */}
            <div className="flex items-center gap-3 md:gap-5 text-sm md:text-[15px] text-zinc-200 font-medium">
              <div className="flex items-center gap-1">
                <MdOutlineStar className="size-4 text-yellow-500" />
                <span className="text-white">{featuredMovie?.vote_average?.toFixed(1)}</span>
              </div>
              <span className="opacity-50">•</span>
              <span>{featuredMovie?.release_date?.split("-")[0]}</span>
              <span className="opacity-50">•</span>
              <span className="uppercase bg-white/20 px-1.5 py-0.5 rounded text-[10px] md:text-xs">
                {featuredMovie?.original_language}
              </span>
            </div>

            {/* Overview: Giảm size chữ trên mobile để không chiếm không gian */}
            <div className="flex flex-col gap-2">
              <p className={`text-slate-200 text-sm md:text-lg leading-relaxed transition-all duration-300 ${!isExpanded ? "line-clamp-2 md:line-clamp-3" : ""}`}>
                {featuredMovie?.overview}
              </p>

              {featuredMovie?.overview?.length > 150 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-cine-red font-bold text-xs md:text-sm uppercase hover:underline w-fit cursor-pointer"
                >
                  {isExpanded ? "Rút gọn" : "Xem thêm"}
                </button>
              )}
            </div>

            {/* Button Group: Sắp xếp theo chiều dọc trên mobile nhỏ hoặc ngang trên tablet/desktop */}
            <div className="flex flex-wrap gap-3 items-center mt-3">
              <button
                onClick={handlePlayButton}
                className="flex-1 md:flex-none flex justify-center items-center gap-3 bg-white rounded-lg px-6 md:px-8 py-3 
        cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-cine-red 
        group active:scale-95 shadow-lg"
              >
                <FaPlay className="size-4 md:size-5 text-black group-hover:text-white" />
                <span className="text-black text-sm md:text-md font-bold group-hover:text-white whitespace-nowrap">Play Now</span>
              </button>

              <button
                onClick={() => navigate(`/movie/${featuredMovie.id}`)}
                className="flex-1 md:flex-none flex justify-center items-center gap-3 bg-zinc-600/60 backdrop-blur-md rounded-lg px-6 md:px-8 py-3 
          cursor-pointer transition-all duration-300 hover:bg-zinc-500
          group active:scale-95 text-white shadow-lg"
              >
                <IoInformationCircleOutline className="size-5 md:size-6" />
                <span className="text-sm md:text-md font-bold whitespace-nowrap">More Info</span>
              </button>
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