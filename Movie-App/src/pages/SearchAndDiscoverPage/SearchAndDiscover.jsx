import BackButton from "../../components/common/BackButton"
import SearchInput from "../../components/common/SearchInput"
import FilterSection from "./FilterSection"
import MovieCard from '../../components/common/MovieCard'
import { Loader2 } from "lucide-react"
import Pagination from "../../components/common/Pagination"
import { useMovieContext } from "../../contexts/movieContext"

const SearchAndDiscover = () => {
  const { query, setQuery, setFilter, results, loading, currentPage, setCurrentPage } = useMovieContext();

  const movieList = results?.results || [];
  const totalResults = results?.total_results || 0;
  const totalPages = results?.total_pages || 0;

  return (
    // Thêm max-w-[1400px] để tránh nội dung quá rộng trên màn hình UltraWide
    <div className="p-3 sm:p-5 md:p-8 mt-3 flex flex-col gap-6 md:gap-10 text-white max-w-[1400px] mx-auto w-full">
      
      {/* Container header chính */}
      <div className="w-full flex flex-col gap-8 md:gap-12">

        {/* --- 1. Top Section: BackButton & Badge --- */}
        <div className="flex items-center justify-between">
          <div className="group flex items-center gap-2 md:gap-3 cursor-pointer">
            <div className="p-1.5 md:p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-cine-red group-hover:border-cine-red transition-all duration-300">
              <BackButton />
            </div>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-zinc-500 group-hover:text-white transition-colors">
              Quay lại
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-zinc-900/50 border border-white/5 shadow-inner">
            <div className="size-1 md:size-1.5 rounded-full bg-cine-red animate-pulse shadow-[0_0_8px_#E50914]" />
            <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">Live TMDB</span>
          </div>
        </div>

        {/* --- 2. Hero Heading --- */}
        <div className="relative space-y-2">
          {/* Responsive Text: 4xl cho mobile, 8xl cho desktop */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
            Cine<span className="text-zinc-800 outline-text">Search</span>
          </h1>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-[2px] w-8 md:w-12 bg-cine-red shrink-0" />
            <p className="text-zinc-500 font-medium tracking-tight md:tracking-[0.1em] text-xs sm:text-sm md:text-lg">
              Khám phá hàng triệu câu chuyện qua màn ảnh nhỏ
            </p>
          </div>
          {/* Giảm blur trên mobile để tăng hiệu năng */}
          <div className="absolute -top-10 -left-10 md:-left-20 size-40 md:size-64 bg-cine-red/10 blur-[60px] md:blur-[100px] rounded-full -z-10" />
        </div>

        {/* --- 3. Control Panel (Search & Filter) --- */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cine-red to-purple-600 rounded-[1.5rem] md:rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 p-5 md:p-8 bg-[#0f0f0f]/80 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl">
            {/* Search Input - Chiếm 12 cột trên mobile, 5 cột trên desktop */}
            <div className="lg:col-span-5 flex flex-col gap-2 md:gap-3">
              <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-cine-red ml-1">Bạn đang tìm gì?</label>
              <div className="relative">
                <SearchInput
                  query={query}
                  setQuery={setQuery}
                  value={query}
                  placeholder="Tên phim..."
                  // Responsive padding cho input
                  className="w-full bg-white/5 border-white/10 focus:border-cine-red focus:bg-white/10 py-4 md:py-6 px-5 md:px-6 rounded-xl md:rounded-2xl transition-all text-base md:text-lg placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Filter Section - Chiếm 12 cột trên mobile, 7 cột trên desktop */}
            <div className="lg:col-span-7 flex flex-col gap-2 md:gap-3 justify-center">
              <label className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Bộ lọc thông minh</label>
              <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <FilterSection setFilter={setFilter} />
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. Result Counter --- */}
        {totalResults > 0 && (
          <div className="flex flex-row items-end justify-between gap-4 border-b border-white/5 pb-6">
            <div className="space-y-1">
              <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest text-left">Kết quả phân tích</p>
              <h2 className="text-lg sm:text-xl md:text-2xl font-light italic">
                Tìm thấy <span className="text-cine-red font-black not-italic text-2xl md:text-3xl">{totalResults.toLocaleString()}</span> bộ phim
              </h2>
            </div>

            <div className="hidden sm:flex gap-2">
              <div className="h-1 w-8 md:w-12 bg-cine-red rounded-full" />
              <div className="h-1 w-3 md:w-4 bg-zinc-800 rounded-full" />
              <div className="h-1 w-1.5 md:w-2 bg-zinc-800 rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* --- 5. Movies Grid --- */}
      {/* Tối ưu grid: 2 cột (mobile), 3 cột (tablet), 4-6 cột (desktop) */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-6 md:gap-x-6 md:gap-y-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 col-span-full gap-4">
            <Loader2 className="size-10 text-cine-red animate-spin" />
            <p className="text-zinc-400 animate-pulse text-sm">Đang kết nối TMDB...</p>
          </div>
        ) : movieList.length > 0 ? (
          movieList.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))
        ) : query ? (
          <div className="col-span-full py-20 text-center text-zinc-500">
            <p className="text-lg">Không tìm thấy phim cho <span className="text-cine-red">"{query}"</span></p>
            <p className="text-sm">Vui lòng kiểm tra lại từ khóa hoặc bộ lọc.</p>
          </div>
        ) : (
          <div className="col-span-full py-20 text-center text-zinc-600 italic">
             Nhập tên phim để bắt đầu khám phá! 🍿
          </div>
        )}
      </div>

      {/* --- 6. Pagination --- */}
      {totalResults > 0 && (
        <div className="py-10 border-t border-white/5">
            <Pagination
              loading={loading}
              page={currentPage}
              setPage={setCurrentPage}
              totalResults={totalResults}
              totalPages={totalPages}
            />
        </div>
      )}
    </div>
  )
}

export default SearchAndDiscover