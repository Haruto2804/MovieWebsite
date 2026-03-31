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
      <div className="relative w-full min-h-150 flex items-center px-4">
        <div
          style={{ backgroundImage: `url(${getFullImageUrl(currentMovie.backdrop_path, 'original')})` }}
          className="rounded-lg absolute inset-0 bg-cover bg-center transition-all duration-700"
        ></div>
        <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-transparent"></div>

        <div className="mt-20 relative flex flex-col gap-4 w-full md:w-1/2 z-10 px-6">
          <div className="w-fit"><BackButton /></div>
          <Label labelName="Featured" />
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-md">
            {currentMovie.title}
          </h1>

          <div className="flex items-center gap-5 text-[15px] text-white">
            <div className="flex items-center gap-1">
              <MdOutlineStar className="size-5 text-yellow-500" />
              <span className="font-bold text-lg">{currentMovie.vote_average?.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{currentMovie.release_date?.split("-")[0]}</span>
            <span>•</span>
            <span>{displayRuntime}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentMovie.genres?.map((genre) => (
              <GenreLabel key={genre.id} genreLabel={genre.name} />
            ))}
          </div>

          <p className="text-slate-300 text-lg leading-relaxed line-clamp-4 italic">
            {currentMovie.overview}
          </p>

          <div className="flex gap-4 items-center mt-4">
            <button className="flex gap-3 items-center bg-white rounded-lg px-8 py-3 cursor-pointer transition-all hover:bg-cine-red group active:scale-95 shadow-xl">
              <FaPlay className="size-5 text-black group-hover:text-white" />
              <span
                onClick={() => handlePlayButton()}
                className="text-black text-md font-bold group-hover:text-white uppercase">Play Now</span>
            </button>
            <FavoriteButton movie={currentMovie} />
            <ShareButton />
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
      <div className="px-10">
        <CastSection castList={credits.slice(0, 10)} />
      </div>
      <div className="px-10">
        <ProductionSection companies={currentMovie?.production_companies} />
      </div>
      {/* Similar Movies */}
      <div className="px-10">
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