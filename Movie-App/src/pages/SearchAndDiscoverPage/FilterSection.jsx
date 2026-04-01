
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
    <div className="w-full space-y-4">
      {/* Tiêu đề nhỏ bên trong filter - ẩn trên desktop vì đã có label bên ngoài */}
      <div className="flex items-center gap-2 lg:hidden mb-2">
         <div className="h-4 w-1 bg-cine-red rounded-full" />
         <p className="text-sm font-bold uppercase tracking-wider text-white">Lọc phim</p>
      </div>

      {/* Grid Layout: 1 cột trên mobile, 2 cột trên tablet/desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        
        {/* Bộ lọc Năm */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter ml-1">Thời gian</span>
          <Filter
            setFilter={setFilter}
            options={movieYear}
            title="Năm phát hành"
            type="year"
            className="w-full"
          />
        </div>    

      </div>
    </div>
  );
};

export default FilterSection;