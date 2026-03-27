import Filter from "../../components/common/Filter";
const movieYear = [
  "All",
  "2026",
  "2025",
  "2024",
  "2023"
]
const FilterSection = ({setFilter})=> {
  return (
    <div className="w-full">
     <p className="text-xl font-bold">Filter</p>
     <div className="flex max-md:flex-col gap-4">
        <Filter 
        setFilter = {setFilter}
        options={movieYear}
        title = "Year"
        type = "year"
        />
     </div>
    </div>
  )
}
export default FilterSection;