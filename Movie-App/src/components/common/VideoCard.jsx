import { FaPlay } from "react-icons/fa";

const VideoCard = ({ video }) => {
  // Link thumbnail mặc định của YouTube dựa trên key
  const thumbnailUrl = `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`;
  const videoUrl = `https://www.youtube.com/watch?v=${video.key}`;
  return (
    <div className="flex flex-col gap-3 group cursor-pointer" onClick={() => window.open(videoUrl, '_blank')}>
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 group-hover:border-cine-red transition-all duration-300 shadow-lg">
        <img 
          src={thumbnailUrl} 
          alt={video.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Overlay Play Button */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-cine-red p-3 rounded-full shadow-orange-500/20 shadow-xl">
            <FaPlay className="text-white size-5" />
          </div>
        </div>

        {/* Tag loại video (Trailer, Clip, Teaser...) */}
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded font-bold uppercase tracking-wider">
          {video.type}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-white font-medium text-lg line-clamp-2 t group-hover:text-cine-red transition-colors">
          {video.name}
        </h3>
        <p className="text-slate-500 text-xs flex items-center gap-2">
          <span>{video.site}</span>
          <span>•</span>
          <span>{video.iso_3166_1}</span>
        </p>
      </div>
    </div>
  );
};

export default VideoCard;