import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

const Pagination = ({ page = 1, loading, setPage, totalResults = 5 }) => {
  const totalPages = useMemo(() => {
    return Math.ceil(totalResults / 10);
  }, [totalResults]); // Cập nhật khi totalResults thay đổi
return (
  <div className="flex flex-col items-center gap-4 my-10">
    {/* Hiển thị vị trí trang hiện tại */}
    <div className="text-zinc-400 text-sm">
      Page <span className="text-white font-bold">{page}</span> of {totalPages || 1}
    </div>
    <div className="flex items-center gap-3">
      {/* Nút TRƯỚC (Previous) */}
      <button
        disabled={page <= 1 || loading}
        onClick={() => {
          setPage(prev => prev - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="cursor-pointer flex items-center gap-1 px-3 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={18} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Hiển thị danh sách số trang (Ví dụ hiện 3 trang quanh trang hiện tại) */}
      <div className="flex gap-2">
        {page > 2 && (
          <button onClick={() => setPage(1)} className="w-10 h-10 rounded bg-zinc-800 hidden sm:block">1</button>
        )}
        {page > 3 && <span className="text-zinc-600 hidden sm:block">...</span>}

        <button className="w-10 h-10 rounded bg-cine-red text-white font-bold">{page}</button>

        {page < totalPages && (
          <button onClick={() => setPage(page + 1)} className="w-10 h-10 rounded bg-zinc-800 hover:bg-zinc-700 hidden sm:block">
            {page + 1}
          </button>
        )}
      </div>

      {/* Nút SAU (Next) */}
      <button
        disabled={page >= totalPages || loading}
        onClick={() => {
          setPage(prev => prev + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className=" cursor-pointer flex items-center gap-1 px-3 py-2 bg-zinc-800 rounded-md hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={18} />
      </button>
    </div>
  </div>
);
};
export default Pagination;