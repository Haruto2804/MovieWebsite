import ActorCard from "../../components/common/ActorCard";

const CastSection = ({ castList = [] }) => {
  // TMDB trả về rất nhiều diễn viên, thường ta chỉ hiện top 8 hoặc 12 người quan trọng nhất
  const topCast = castList.slice(0, 12);

  return (
    <section className="my-16 px-4">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="font-bold text-2xl text-white/80 tracking-tight uppercase">
          Cast
        </h2>
        <div className="h-px flex-1 bg-zinc-800"></div>
      </div>

      {/* Grid Layout: 
          - Mobile: 2 cột (cho cân đối)
          - Tablet: 3 cột 
          - Desktop: 4 cột
          - Large Desktop: 6 cột (để Card to vừa phải, không bị thô)
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
        {topCast.length > 0 ? (
          topCast.map((actor) => (
            <ActorCard key={actor.id} actor={actor} />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center py-10 italic">
            No cast information available.
          </p>
        )}
      </div>

      {/* Nút xem thêm nếu danh sách quá dài */}
      {castList.length > 12 && (
        <div className="mt-10 flex justify-center">
          <button className="text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors border-b border-transparent hover:border-white pb-1">
            View Full Cast ({castList.length})
          </button>
        </div>
      )}
    </section>
  );
};

export default CastSection;