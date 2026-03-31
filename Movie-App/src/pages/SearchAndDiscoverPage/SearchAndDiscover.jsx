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
      <div className="w-fit">
        <BackButton />
      </div>

      <p className="text-5xl font-bold">Search & Discover</p>
      
      <SearchInput
        query={query}
        setQuery={setQuery}
        value={query}
        placeholder="Search for Movies by title..." 
      />

      <FilterSection setFilter={setFilter} />

      {totalResults > 0 && (
        <p className="text-gray-500 text-sm mb-2">
          Found <span className="text-white font-bold">{totalResults.toLocaleString()}</span> movies
        </p>
      )}

      <div className="max-md:mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
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