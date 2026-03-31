import { getFullImageUrl } from "../../util.js";

const ActorCard = ({ actor }) => {
  const { name, character, profile_path } = actor;

  return (
    <div className="group cursor-pointer w-full">
      <div className="relative flex flex-col gap-4 p-4 bg-zinc-900/40 rounded-3xl border border-white/5 transition-all duration-500 hover:bg-zinc-800/60 hover:-translate-y-3 hover:border-cine-red/30 shadow-2xl">
        
        {/* Avatar to hơn: Tỉ lệ 3:4 (chuẩn ảnh chân dung nghệ sĩ) */}
        <div className="aspect-3/4 w-full rounded-2xl overflow-hidden bg-zinc-800 relative shadow-2xl">
          {profile_path ? (
            <img 
              src={getFullImageUrl(profile_path, "w342")} // Dùng size lớn hơn (w342) để ảnh không bị vỡ khi phóng to
              alt={name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-tr from-zinc-800 to-zinc-700 flex items-center justify-center text-zinc-500 text-5xl font-bold">
              {name.charAt(0)}
            </div>
          )}
          
          {/* Overlay gradient nhẹ ở dưới chân ảnh */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Info Section: Căn trái cho chuyên nghiệp */}
        <div className="flex flex-col gap-1 px-1">
          <h4 className="text-white text-lg font-bold tracking-tight group-hover:text-cine-red transition-colors duration-300 truncate">
            {name}
          </h4>
          <p className="text-zinc-500 text-sm font-medium italic truncate">
            {character ? `as ${character}` : 'Cast Member'}
          </p>
        </div>

        {/* Nút tròn nhỏ trang trí góc dưới */}
        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-cine-red flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-[0_0_15px_rgba(229,9,20,0.5)]">
           <span className="text-white text-xs">★</span>
        </div>
      </div>
    </div>
  );
};
export default ActorCard;