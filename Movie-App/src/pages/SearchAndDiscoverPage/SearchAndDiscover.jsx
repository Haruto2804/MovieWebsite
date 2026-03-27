
import BackButton from "../../components/common/BackButton"
import SearchInput from "../../components/common/SearchInput"
import FilterSection from "./FilterSection"
import { useMovieSearch } from "../../hooks/useMovieSearch"
import MovieCard from '../../components/common/MovieCard'
import { Loader2 } from "lucide-react"
import Pagination from "../../components/common/Pagination"
const SearchAndDiscover = () => {

  const { query, setQuery, setFilter, results, loading,currentPage,setCurrentPage } = useMovieSearch("");
    console.log(currentPage)
  return (

    <div className="mt-3 flex flex-col gap-4 text-white mx-auto md:mx-0  w-full">
      <div className="w-fit">
        <BackButton />
      </div>

      <p className="text-5xl font-bold">Search & Discover</p>
      <SearchInput
        setQuery={setQuery}
        value={query}
        placeholder="Search for Movies" />
      <FilterSection
        setFilter={setFilter}
      />
      {Number(results.totalResults)  > 0 && (
        <p className="text-gray-500 text-sm mb-2">
          Found <span className="text-white font-bold">{results.length}</span> movies
        </p>
      )}
      <div className=" max-md:mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3
      ">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 col-span-full gap-4">
            <Loader2 className="size-10 text-cine-red animate-spin" />
            <p className="text-zinc-400 animate-pulse">Đang tìm kiếm phim...</p>
          </div>
        ) : results?.Search?.length > 0 ? (
          results?.Search?.map((item) => <MovieCard key={item.imdbID} movie={item} />)
        ) : query ? ( // CHỈ HIỆN KHI ĐÃ CÓ QUERY
          <div className="col-span-full py-20 text-center text-zinc-500">
            <p className="text-lg">Oops! No movies found for <span className="text-cine-red">"{query}"</span></p>
            <p className="text-sm">Try checking your spelling or use different keywords.</p>
          </div>
        ) : (
          // TRƯỜNG HỢP MỚI VÀO TRANG (QUERY TRỐNG)
          <div className="col-span-full py-20 text-center text-gray-600 italic">
            Type something to start discovering movies!🍿
          </div>
        )}
      </div>

      <Pagination 
      loading = {loading}
      page = {currentPage}
      setPage = {setCurrentPage}
      totalResults = {Number(results.totalResults)}
      />
    </div>
  )
}
export default SearchAndDiscover