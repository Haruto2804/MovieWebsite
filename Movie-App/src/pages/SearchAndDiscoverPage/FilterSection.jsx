
import Filter from "../../components/common/Filter";
import { MovieContext } from "../../contexts/movieContext";

const movieYear = [
  "Tất cả", // Thay "All" bằng tiếng Việt cho đồng bộ UI
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021"
];

const FilterSection = ({ setFilter }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full">
        <div className="w-full min-w-0">
          <Filter
            setFilter={setFilter}
            options={movieYear}
            title="Năm phát hành"
            type="year"
          />
        </div>
        
      </div>
    </div>
  )
}

export default FilterSection;