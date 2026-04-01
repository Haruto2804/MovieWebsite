import { useEffect, useMemo, useState, useRef } from "react"
import { useParams } from "react-router-dom";
import movieApi from "../../api/movie-api.js";
import Label from "../../components/common/Label"
import { MdOutlineStar } from "react-icons/md"
import { FaPlay } from "react-icons/fa"
import FavoriteButton from "../../components/common/FavoriteButton"
import ShareButton from "../../components/common/ShareButton"
import GenreLabel from "../../components/common/GenreLabel"
import CastSection from './CastSection'
import MovieSection from "../HomePage/MovieSection"
import { Loader2 } from "lucide-react";
import BackButton from '../../components/common/BackButton.jsx'
import { getFullImageUrl } from "../../util.js";
import ProductionSection from "./ProductionSection.jsx";
import VideoCard from "../../components/common/VideoCard.jsx";
import RelatedVideoSection from "./RelatedVideoSection.jsx";
import TrailerSection from "./TrailerSection.jsx";
import TrailerModal from "./TrailerModal.jsx";
import WatchlistButton from "../../components/common/WatchListButton.jsx";
const DetailMovie = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  // thông tin chi tiết của phim hiện tại
  const [currentMovie, setCurrentMovie] = useState(null);
  // danh sách diễn viên phim hiện tại
  const [credits, setCredits] = useState([]);
  // danh sách phim tương tự vided hiện tại
  const [similar, setSimilar] = useState([]);
  // danh sách các video liên quan của phim hiện tại
  const [videos, setVideos] = useState([]);
  // số lượng video hiển thị hiện tại trên giao diện
  const [visibleVideos, setVisibleVideo] = useState(4);
  // so luong video hien thi cho trailer video
  const [visibleTrailerVideos, setVisibleTrailerVideos] = useState(4);

  const [isExpanded, setIsExpanded] = useState(false);
  // quan ly trang thai modal trailer phim
  const [isOpen, setIsOpen] = useState(false);

  const trailerVideo = useMemo(() => {
    if (!videos || videos.length === 0) {
      return [];
    }
    return videos.filter((item) => item.type === 'Trailer')
  }, [videos])

  useEffect(() => {
    const fetchAllInfoCurrentMovie = async () => {
      setLoading(true); // BẬT LOADING
      try {
        const [currentMovieRes, creditsRes, similarRes, videosRes] = await Promise.all([
          movieApi.getDetailsMovie(id),
          movieApi.getCreditsMovie(id),
          movieApi.getSimilarMovie(id),
          movieApi.getMoreVideos(id)
        ]);

        setCurrentMovie(currentMovieRes);
        setCredits(creditsRes || []);
        setSimilar(similarRes || []);
        setVideos(videosRes || []);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết phim:", error);
      } finally {
        setLoading(false); // TẮT LOADING
      }
    };

    if (id) {
      fetchAllInfoCurrentMovie();
      window.scrollTo(0, 0); // Cuộn lên đầu khi đổi phim
    }
  }, [id]);
  const handleLoadMore = (() => {
    // thêm 4 videos nữa
    setVisibleVideo(prev => prev + 4);
  })
  const handleLoadMoreTrailer = (() => {
    // thêm 4 videos nữa
    setVisibleTrailerVideos(prev => prev + 4);
  })
  const displayRuntime = useMemo(() => {
    if (!currentMovie?.runtime) return "N/A";
    const hours = Math.floor(currentMovie.runtime / 60);
    const minutes = currentMovie.runtime % 60;
    return `${hours}h ${minutes}m`;
  }, [currentMovie]);
  const handlePlayButton = () => {
    // 1. Cuộn xuống
    trailerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    setTimeout(() => {
      setIsOpen(true);
    }, 1000);
  };
  const trailerRef = useRef(null);
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-150 w-full gap-4">
        <Loader2 className="w-12 h-12 text-cine-red animate-spin" />
        <p className="text-white text-lg font-medium animate-pulse">Đang tải phim...</p>
      </div>
    );
  }

  if (!currentMovie) return <div className="text-white p-10 text-center">Không tìm thấy phim!</div>;

  return (
    <div className="flex flex-col gap-10 w-full pb-20">
      {/* Banner Section */}
      <div className="relative w-full min-h-[600px] md:min-h-150 flex items-end md:items-center p-4 md:p-10">
        {/* 1. Ảnh nền: Ưu tiên hiển thị mặt nhân vật tốt hơn trên mobile bằng bg-[center_top] */}
        <div
          style={{ backgroundImage: `url(${getFullImageUrl(currentMovie.backdrop_path, 'original')})` }}
          className="absolute inset-0 bg-cover bg-[center_top] md:bg-center transition-all duration-700"
        ></div>

        {/* 2. Lớp phủ: Overlay tối hơn ở dưới trên Mobile để text không bị chìm */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 md:bg-linear-to-r md:from-black md:via-black/60 md:to-transparent"></div>

        {/* 3. Nội dung phim */}
        <div className="relative mt-16 md:mt-20 flex flex-col gap-3 md:gap-5 w-full md:w-2/3 lg:w-1/2 z-10 px-2 md:px-6">

          {/* Navigation & Label */}
          <div className="flex flex-col gap-3">
            <div className="w-fit transform scale-90 md:scale-100 origin-left">
              <BackButton />
            </div>
            <Label labelName="Featured" />
          </div>

          {/* Title: Giảm size mạnh trên mobile (text-3xl) để không chiếm hết chỗ */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
            {currentMovie.title}
          </h1>

          {/* Metadata & Rating */}
          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-sm md:text-[15px] text-zinc-100">
            <div className="flex items-center gap-1 bg-black/30 px-2 py-1 rounded-md backdrop-blur-sm">
              <MdOutlineStar className="size-4 md:size-5 text-yellow-500" />
              <span className="font-bold text-base md:text-lg">{currentMovie.vote_average?.toFixed(1)}</span>
            </div>
            <span className="hidden md:inline text-zinc-400">•</span>
            <span className="font-medium">{currentMovie.release_date?.split("-")[0]}</span>
            <span className="text-zinc-400">•</span>
            <span className="font-medium">{displayRuntime}</span>
          </div>

          {/* Genres: Ẩn bớt trên mobile nếu quá nhiều hoặc để flex-wrap */}
          <div className="flex flex-wrap gap-2">
            {currentMovie.genres?.map((genre) => (
              <GenreLabel key={genre.id} genreLabel={genre.name} />
            ))}
          </div>

          {/* Overview: Line-clamp chặt hơn trên mobile */}
          <div className="flex flex-col gap-1">
            <p className={`text-zinc-300 text-sm md:text-lg leading-relaxed italic transition-all duration-300 ${!isExpanded ? "line-clamp-2 md:line-clamp-3" : ""}`}>
              {currentMovie.overview}
            </p>

            {currentMovie.overview?.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-cine-red font-bold text-xs uppercase hover:underline w-fit cursor-pointer py-1"
              >
                {isExpanded ? "Thu gọn" : "Xem thêm"}
              </button>
            )}
          </div>

          {/* Action Buttons: Tối ưu nút Play to và các nút icon nhỏ */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Nút Play Now ưu tiên nổi bật nhất */}
            <button
              onClick={() => handlePlayButton()}
              className="flex-1 md:flex-none flex gap-3 items-center justify-center bg-white rounded-xl px-6 md:px-10 py-3.5 cursor-pointer transition-all hover:bg-cine-red group active:scale-95 shadow-xl"
            >
              <FaPlay className="size-4 md:size-5 text-black group-hover:text-white" />
              <span className="text-black text-sm md:text-base font-black group-hover:text-white uppercase tracking-wider">
                Play Now
              </span>
            </button>

            {/* Các nút phụ: Gom nhóm để không bị nhảy hàng lộn xộn */}
            <div className="flex gap-2 md:gap-4 items-center justify-center md:justify-start">
              <div className="p-1 md:p-0 transition-transform hover:scale-110 active:scale-90">
                <FavoriteButton movie={currentMovie} />
              </div>
              <div className="p-1 md:p-0 transition-transform hover:scale-110 active:scale-90">
                <ShareButton />
              </div>
              <div className="p-1 md:p-0 transition-transform hover:scale-110 active:scale-90">
                <WatchlistButton />
              </div>
            </div>
          </div>

        </div>
      </div>
      <div ref={trailerRef}>

      </div>
      <TrailerSection
        visibleVideos={visibleTrailerVideos}
        handleLoadMore={handleLoadMoreTrailer}
        videos={trailerVideo.slice(0, visibleVideos)}
      />

      {/* Related Videos Section */}
      <RelatedVideoSection
        visibleVideos={visibleVideos}
        handleLoadMore={handleLoadMore}
        videos={videos.slice(0, visibleVideos)} />


      {/* Cast Section */}
      <div className="">
        <CastSection castList={credits.slice(0, 10)} />
      </div>
      <div className="">
        <ProductionSection companies={currentMovie?.production_companies} />
      </div>
      {/* Similar Movies */}
      <div className="">
        <MovieSection title="More Like This" movieList={similar} />
      </div>

      {trailerVideo && trailerVideo.length > 0 && (
        <TrailerModal
          videoId={trailerVideo[0].key}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  )
}

export default DetailMovie;