import { useContext, useEffect, useMemo } from "react";
import Filter from "../../components/common/Filter";
import { MovieContext } from "../../contexts/movieContext";
const movieYear = [
  "All",
  "2026",
  "2025",
  "2024",
  "2023"
]
const FilterSection = ({setFilter})=> {
  const {genres, fetchGenres} = useContext(MovieContext);
  console.log(genres)
  useEffect(()=> {
    if (genres.length === 0) {
    fetchGenres();
  }
  },[fetchGenres,genres]);
  const genresOption = useMemo(()=> {
    return genres.map((item)=> item.name)
  },[genres]);
  console.log(genresOption)
  return (
    <div className="w-full">
     <p className="text-xl font-bold">Filter</p>
     <div className="flex max-md:flex-col gap-4">
        <Filter 
        key= "1"
        setFilter = {setFilter}
        options={movieYear}
        title = "Year"
        type = "year"
        />
          <Filter 
        key= "2"
        setFilter = {setFilter}
        options={genresOption}
        title = "Genre"
        type = "genre"
        />
      
     </div>
    </div>
  )
}
export default FilterSection;