import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MovieCardSkeleton = () => {
  return (
    /* Thiết lập màu nền tối (baseColor) và màu highlight (highlightColor) 
       để tạo cảm giác sang trọng, đúng chất cinema.
    */
    <SkeletonTheme baseColor="#1a1a1a" highlightColor="#2a2a2a">
      <div className="flex flex-col gap-2 min-w-40 flex-1">
        
        {/* Container của Poster với tỷ lệ 2:3 */}
        <div className="relative aspect-2/3 w-full">
          
          {/* Tag "2026" nhỏ ở góc trái */}
          <div className="absolute top-2 left-2 z-10">
            <Skeleton width={35} height={16} borderRadius={4} />
          </div>
          
          <div className="h-full leading-0"> 
             <Skeleton height="100%" borderRadius="12px" />
          </div>
        </div>

        {/* Phần chữ giả lập bên dưới */}
        <div className="mt-1 flex flex-col gap-1">
          <Skeleton width="85%" height={14} />
          <Skeleton width="50%" height={10} />
        </div>
        
      </div>
    </SkeletonTheme>
  );
};

export default MovieCardSkeleton;