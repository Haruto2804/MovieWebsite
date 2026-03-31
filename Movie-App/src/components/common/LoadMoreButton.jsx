

const LoadMoreButton = ({ onClick, isLoading }) => {
  return (
    <div className="flex justify-center my-8">
      <button
        onClick={onClick}
        disabled={isLoading}
        className={` cursor-pointer
          relative px-8 py-3 font-semibold text-white transition-all duration-300 
          rounded-full shadow-lg group
          ${isLoading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-cine-red hover:bg-cine-gradient active:scale-95'}
        `}
      >
        <span className="flex items-center gap-2">
          {isLoading ? (
            <>
              {/* Icon xoay khi đang load */}
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang tải...
            </>
          ) : (
            <>
              Xem thêm
              <span className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default LoadMoreButton;