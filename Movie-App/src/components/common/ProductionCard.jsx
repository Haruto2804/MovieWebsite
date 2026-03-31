import { getFullImageUrl } from "../../util.js";

const ProductionCard = ({ company }) => {
  const { name, logo_path, origin_country } = company;
  
  return (
    <div className="group relative flex flex-col items-center justify-center p-6 bg-zinc-900/30 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-lg">
      
      {/* Logo Container */}
      <div className="h-16 w-full flex items-center justify-center mb-4">
        {logo_path ? (
          <img
            src={getFullImageUrl(logo_path, "w200")} // Dùng w200 cho logo là vừa đẹp
            alt={name}
            className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          />
        ) : (
          <span className="text-zinc-500 font-bold text-center text-sm uppercase tracking-widest">
            {name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="text-center">
        <p className="text-white text-xs font-bold truncate max-w-[140px] mb-1">
          {name}
        </p>
        {origin_country && (
          <span className="text-[10px] text-zinc-500 font-medium px-2 py-0.5 bg-zinc-800 rounded-full uppercase">
            {origin_country}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductionCard;