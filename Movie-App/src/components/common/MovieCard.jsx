import { FaPlay, FaHeart } from "react-icons/fa";
import { RiMovie2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const releaseYear = movie.release_date?.split("-")[0] || "N/A";

  return (
    <Link to={`/movie/${movie.id}`} className="block w-full">
      <div className="overflow-hidden cursor-pointer relative aspect-[2/3] w-full rounded-md group bg-zinc-900 shadow-md">

        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-500"></div>


        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-white/20 backdrop-blur-md p-3 md:p-4 flex items-center transform scale-50 group-hover:scale-100 transition-all duration-500">
            <FaPlay className="size-4 md:size-6 text-white" />
          </div>
        </div>

        <div className="absolute top-2 left-2 md:top-3 md:left-2 flex gap-1 items-center bg-black/60 backdrop-blur-sm px-1.5 py-0.5 md:px-2 md:py-1 rounded-md border border-white/10">
          <RiMovie2Fill className="size-3 md:size-4 text-yellow-500" />
          <span className="text-[9px] md:text-[11px] font-bold text-yellow-500">{releaseYear}</span>
        </div>

        <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 absolute bottom-2 left-2 right-2 md:bottom-3 flex flex-col gap-0.5 md:gap-1">
          <div className="flex items-center justify-between gap-1">
            <h1 className="text-[11px] md:text-sm font-bold text-white truncate drop-shadow-lg">
              {movie.title}
            </h1>
            <div className="shrink-0 rounded-full bg-white/10 p-1 md:p-1.5 hover:bg-red-500 transition-colors hidden xs:block">
              <FaHeart className="size-2.5 md:size-3 text-white" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[9px] md:text-[11px] font-medium text-zinc-300">
            <span className="flex items-center gap-1">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
            <span>•</span>
            <span className="uppercase">{movie.original_language}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;