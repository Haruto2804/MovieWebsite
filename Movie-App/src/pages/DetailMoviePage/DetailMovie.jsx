import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom";
import movieApi from "../../api/movie-api.js";
import Label from "../../components/common/Label"
import { MdOutlineStar } from "react-icons/md"
import { FaPlay } from "react-icons/fa"
import FavoriteButton from "../../components/common/FavoriteButton"
import ShareButton from "../../components/common/ShareButton"
import GenreLabel from "../../components/common/GenreLabel"
import DirectorLabel from '../../components/common/DirectorLabel'
import WriterLabel from '../../components/common/WriterLabel'
import CastSection from './CastSection'
import MovieSection from "../HomePage/MovieSection"
import RatingSection from '../DetailMoviePage/RatingSection.jsx'
import { Loader2 } from "lucide-react";
import BackButton from '../../components//common/BackButton.jsx'
const formatRuntime = (runtimeStr) => {
  if (!runtimeStr || runtimeStr === "N/A") return "N/A";
  const totalMinutes = parseInt(runtimeStr);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const DetailMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null); // Để null ban đầu để check !movie
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chỉ chạy khi id (trên URL) thay đổi
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // 1. Lấy chi tiết phim trước
        const movieData = await movieApi.fetchDetailMovie(id);

        if (movieData && movieData.Response === "True") {
          setMovie(movieData);

          // 2. Có dữ liệu phim rồi mới đi lấy phim gợi ý dựa trên phim đó
          const suggestions = await movieApi.getSuggestedMovies(movieData);
          setSuggestedMovies(suggestions);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Lỗi fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  // Memoize để tránh tính toán lại vô ích
  const displayGenre = useMemo(() => {
    if (!movie?.Genre || movie.Genre === "N/A") return [];
    return movie.Genre.split(', ').map(g => g.trim());
  }, [movie?.Genre]);

  const actorList = useMemo(() => {
    if (!movie?.Actors || movie.Actors === "N/A") return [];
    return movie.Actors.split(', ');
  }, [movie?.Actors]);

  const displayRuntime = useMemo(() => {
    return formatRuntime(movie?.Runtime);
  }, [movie?.Runtime]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
        {/* Icon Loader2 với class animate-spin của Tailwind */}
        <Loader2 className="w-10 h-10 text-cine-red animate-spin" />
        <p className="text-white text-lg font-medium animate-pulse">
          Đang tải thông tin phim...
        </p>
      </div>
    );
  }

  // Trạng thái không tìm thấy phim
  if (!movie || movie.Response === "False") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4 text-white">
        <div className="text-6xl text-slate-600">?</div>
        <h2 className="text-2xl font-bold">Không tìm thấy phim!</h2>
        <p className="text-slate-400">Vui lòng kiểm tra lại ID hoặc đường truyền mạng.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-cine-red rounded-lg hover:bg-red-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative p-4 w-full min-h-125">
        <div
          style={{ backgroundImage: `url(${movie.Poster})` }}
          className="rounded-lg absolute inset-0 bg-cover bg-center"
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="mt-20 relative flex flex-col gap-3 w-full md:w-1/2 z-10">
          <div className="w-fit">
            <BackButton />
          </div>

          <Label labelName="Featured" />
          <h1 className="text-6xl font-bold text-white">{movie.Title}</h1>

          <div className="flex items-center gap-5 text-[15px] text-white">
            <div className="flex items-center">
              <MdOutlineStar className="size-4 text-yellow-500" />
              <span>{movie.imdbRating}</span>
            </div>
            <span>•</span>
            <span>{movie.Year}</span>
            <span>•</span>
            <span>{displayRuntime}</span>
            <span>•</span>
            <span className="capitalize">{movie.Type}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {displayGenre.map((genre, index) => (
              <GenreLabel key={index} genreLabel={genre} />
            ))}
          </div>

          <div className="flex gap-3 w-full">
            <DirectorLabel authorName={movie.Director} />
            <WriterLabel writerName={movie.Writer} />
          </div>

          <p className="text-slate-300 w-full leading-relaxed">
            {movie.Plot}
          </p>

          <div className="flex gap-3 items-center mt-4">
            <button className="flex gap-3 items-center bg-white rounded-lg px-6 py-3 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 group active:scale-95">
              <FaPlay className="size-5 text-black group-hover:text-white" />
              <span className="text-black text-md font-semibold group-hover:text-white">Play Now</span>
            </button>
            <FavoriteButton />
            <ShareButton />
          </div>
        </div>
      </div>

      <CastSection castList={actorList} />

      <RatingSection ratingList={movie.Ratings || []} />

      {/* Hiển thị phim gợi ý */}
      {suggestedMovies && suggestedMovies.length > 0 ? (
        <MovieSection
          title="More like this"
          movieList={suggestedMovies}
        />
      ) : (
        <div className="p-4 text-slate-400 italic text-center w-full">
          Hiện không có danh sách phim gợi ý cho bộ phim này.
        </div>
      )}
    </div>
  )
}

export default DetailMovie;