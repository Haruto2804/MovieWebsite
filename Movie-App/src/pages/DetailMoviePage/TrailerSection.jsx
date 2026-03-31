import VideoCard from "../../components/common/VideoCard"
import LoadMoreButton from '../../components/common/LoadMoreButton'
const TrailerSection = (({ videos, handleLoadMore,visibleVideos }) => {
  if (videos.length === 0) {
    <p>Không tìm thấy phim liên quan</p>
  }
  return (
    <div className="px-10 mt-10">
      <div className="flex items-center justify-between mb-6 gap-3">
        <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Trailer</h2>
        <div className="h-px flex-1 bg-zinc-800"></div>
        <span className="text-slate-500 text-sm">{videos.length} videos</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Chỉ hiển thị theo visibleVideos */}
        {videos.slice(0, visibleVideos).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <LoadMoreButton 
      onClick={handleLoadMore}
      />
    </div>
  )
})
export default TrailerSection