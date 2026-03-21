import MovieCard from "../../components/common/MovieCard";

const MovieSection = ({title = "Default", movieList}) => {
  return (
    <>
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex gap-4">
        <MovieCard />
          <MovieCard />
            <MovieCard />
      </div>
    </>
  )
}
export default MovieSection;