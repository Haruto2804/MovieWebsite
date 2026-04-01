import BackButton from "../../components/common/BackButton"
import SearchInput from "../../components/common/SearchInput"
import FilterSection from "./FilterSection"
import MovieCard from '../../components/common/MovieCard'
import { Loader2 } from "lucide-react"
import Pagination from "../../components/common/Pagination"
import { useMovieContext } from "../../contexts/movieContext"

const SearchAndDiscover = () => {
  const { query, setQuery, setFilter, results, loading, currentPage, setCurrentPage } = useMovieContext();

  // TMDB trả về mảng phim nằm trong results.results
  const movieList = results?.results || [];
  const totalResults = results?.total_results || 0;
  const totalPages = results?.total_pages || 0;
  return (
    <div className="p-3 mt-3 flex flex-col gap-4 text-white mx-auto md:mx-0 w-full">
      <div className="max-w-350 mx-auto w-full px-4 pt-10 pb-12 flex flex-col gap-10 text-white">

        {/* --- 1. Top Section: BackButton & Badge --- */}
        <div className="flex items-center justify-between">
          <div className="group flex items-center gap-3 cursor-pointer">
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-cine-red group-hover:border-cine-red transition-all duration-300">
              <BackButton />
            </div>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-500 group-hover:text-white transition-colors">
              Quay lại
            </span>
          </div>

          {/* Hiệu ứng trạng thái nhỏ xinh */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/50 border border-white/5 shadow-inner">
            <div className="size-1.5 rounded-full bg-cine-red animate-pulse shadow-[0_0_8px_#E50914]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Live TMDB Database</span>
          </div>
        </div>

        {/* --- 2. Hero Heading: Typography cực mạnh --- */}
        <div className="relative space-y-2">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
            Cine<span className="text-zinc-800 outline-text">Search</span>
          </h1>
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-cine-red" />
            <p className="text-zinc-500 font-medium tracking-[0.1em] text-sm md:text-lg">
              Khám phá hàng triệu câu chuyện qua màn ảnh nhỏ
            </p>
          </div>

          {/* Decor Glow phía sau tiêu đề */}
          <div className="absolute -top-10 -left-20 size-64 bg-cine-red/10 blur-[100px] rounded-full -z-10" />
        </div>

        {/* --- 3. Control Panel: Search & Filter (Thiết kế Kính mờ) --- */}
        <div className="relative group">
          {/* Viền gradient phát sáng nhẹ khi hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cine-red to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 bg-[#0f0f0f]/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl">

            {/* Search Input Custom */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-cine-red ml-2">Bạn đang tìm gì?</label>
              <div className="relative">
                <SearchInput
                  query={query}
                  setQuery={setQuery}
                  value={query}
                  placeholder="Tên phim..."
                  className="w-full bg-white/5 border-white/10 focus:border-cine-red focus:bg-white/10 py-7 px-6 rounded-2xl transition-all text-lg placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Filter Section */}
            <div className="lg:col-span-7 flex flex-col gap-3 justify-center">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-2 text-right lg:text-left">Bộ lọc thông minh</label>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <FilterSection setFilter={setFilter} />
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. Result Counter: Hiện đại & Tối giản --- */}
        {totalResults > 0 && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
            <div className="space-y-1">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Kết quả phân tích</p>
              <h2 className="text-2xl font-light italic">
                Tìm thấy <span className="text-cine-red font-black not-italic text-3xl">{totalResults.toLocaleString()}</span> bộ phim
              </h2>
            </div>

            <div className="flex gap-2">
              <div className="h-1 w-12 bg-cine-red rounded-full" />
              <div className="h-1 w-4 bg-zinc-800 rounded-full" />
              <div className="h-1 w-2 bg-zinc-800 rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-3 gap-y-6 px-2 md:px-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 col-span-full gap-4">
            <Loader2 className="size-10 text-cine-red animate-spin" />
            <p className="text-zinc-400 animate-pulse">Đang tìm kiếm phim từ TMDB...</p>
          </div>
        ) : movieList.length > 0 ? (
          // Thay item.imdbID thành item.id cho đúng chuẩn TMDB
          movieList.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))
        ) : query ? (
          <div className="col-span-full py-20 text-center text-zinc-500">
            <p className="text-lg">Oops! No movies found for <span className="text-cine-red">"{query}"</span></p>
            <p className="text-sm">Try checking your spelling or change filters.</p>
          </div>
        ) : (
          <div className="col-span-full py-20 text-center text-gray-600 italic">
            Type something to start discovering movies!🍿
          </div>
        )}
      </div>

      {/* Pagination của TMDB thường dựa trên total_pages tốt hơn total_results */}
      {totalResults > 0 && (
        <Pagination
          loading={loading}
          page={currentPage}
          setPage={setCurrentPage}
          totalResults={totalResults}
          totalPages={totalPages} // Bạn có thể truyền thêm totalPages nếu component Pagination hỗ trợ
        />
      )}
    </div>
  )
}

export default SearchAndDiscover