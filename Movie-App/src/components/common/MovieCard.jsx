
import { MdOutlineStar } from "react-icons/md";
import { FaPlay, FaHeart } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  console.log(movie)
  return (
    <div className="overflow-hidden cursor-pointer relative h-80 w-54 rounded-md group">
      {/* ảnh nền */}
      <div className="group-hover:scale-110 transition-all duration-600 absolute inset-0 bg-[url('../../../public/sm.png')] bg-cover bg-center "></div>
      {/* NÚT PLAY Ở CHÍNH GIỮA */}
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-600 absolute inset-0 flex items-center justify-center">
        <div className="rounded-full bg-slate-500/50 w-fit p-4 flex items-center">
          <FaPlay className="size-6" />
        </div>
      </div>

      <div className="absolute top-3 left-2 flex gap-1 items-center bg-black/50 w-fit px-1 py-0.5 rounded-xs">
        <MdOutlineStar className="text-yellow-500 size-3" />
        <span className="text-xs font-semibold select-none text-yellow-500 ">{movie.rating}</span>
      </div>
      {/* 5. Thông tin phim (Phía dưới) */}
      <div className="opacity-0 group-hover:opacity-100 transition-all duration-600 mb-3 absolute bottom-0 w-[95%] text-white text-md left-2 right-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex w-full justify-between items-center">
            <h1 className="text-md font-bold tracking-tight drop-shadow-md whitespace-nowrap truncate">{movie.title}</h1>
            <div className="rounded-full bg-black/40 p-2 ">
              <FaHeart className="size-4" />
            </div>
          </div>


        </div>

        <div className=" flex items-center gap-2 text-xs font-medium text-zinc-300">
          <span className=" text-yellow-500 font-bold">★ {movie.ratingg}</span>
          <span>•</span>
          <span>{movie.year}</span>
        </div>

        {/* Thể loại (Tags) */}
        <div className=" flex gap-2 flex-wrap ">
          {movie.genres.map((item) => (
            <span className="flex items-center justify-center rounded-md bg-zinc-800/80 px-1 py-0.5 text-[10px] font-semibold backdrop-blur-sm border border-white/5 uppercase tracking-wider">
              <span>{item}</span>
            </span>
          ))}


        </div>
      </div>
    </div>
  )
}
export default MovieCard;