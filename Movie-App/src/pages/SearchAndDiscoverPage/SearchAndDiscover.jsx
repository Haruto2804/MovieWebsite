import BackButton from "../../components/common/BackButton"
import Filter from "../../components/common/Filter"
import SearchInput from "../../components/common/SearchInput"
import FilterSection from "./FilterSection"

const SearchAndDiscover = () => {
  return (
    <div className="mt-3 flex flex-col gap-4 text-white mx-auto md:mx-0">
      <div className="w-fit">
        <BackButton />
      </div>

      <p className="text-5xl font-bold">Search & Discover</p>
      <SearchInput placeholder="Search for Movies"/>
      <FilterSection />
      
    </div>
  )
}
export default SearchAndDiscover