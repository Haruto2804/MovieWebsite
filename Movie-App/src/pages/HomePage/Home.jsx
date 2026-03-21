import Label from "../../components/common/Label";
import { MdOutlineStar } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import FavoriteButton from "../../components/common/FavoriteButton";
import MovieSection from "./MovieSection";
const movies = [
  {
    id: "tt2705436",
    title: "Italian Spiderman",
    year: "2007",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BYWNiMmNlNmQtZTI2MS00MzAxLTgxM2QtNDY3ZGQxNDMwZDgzXkEyXkFqcGc@._V1_SX300.jpg",
    rating: 8.5,
    genres: ["Action", "Comedy"]
  },
  {
    id: "tt18351128",
    title: "The Amazing Spiderman 2",
    year: "2021",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BNzI0MmQyMzYtZDAzNi00ZWZiLWFjMTgtNzQwOTRjYTFlM2Y3XkEyXkFqcGc@._V1_SX300.jpg",
    rating: 7.9,
    genres: ["Sci-Fi", "Action"]
  },
  {
    id: "tt12122034",
    title: "Spiderman the Verse",
    year: "2019",
    type: "series",
    poster: "https://m.media-amazon.com/images/M/MV5BNDBjNWY3OWYtMjk2ZS00NjA2LWE0NzAtOWQxNzBhNjZlMGYyXkEyXkFqcGc@._V1_SX300.jpg",
    rating: 9.2,
    genres: ["Animation", "Sci-Fi"]
  },
  {
    id: "tt5978586",
    title: "Spiderman in Cannes",
    year: "2016",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BZjc4MDYyMWQtNjM5MS00NzQxLTg5MTktMjI1MTVmNDNmNTA4XkEyXkFqcGc@._V1_SX300.jpg",
    rating: 7.2,
    genres: ["Documentary"]
  },
  {
    id: "tt1433184",
    title: "Spiderman and Grandma",
    year: "2009",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BMjE3Mzg0MjAxMl5BMl5BanBnXkFtZTcwNjIyODg5Mg@@._V1_SX300.jpg",
    rating: 6.8,
    genres: ["Comedy", "Family"]
  },
  {
    id: "tt1132238",
    title: "The Stunts of Spiderman 3",
    year: "2007",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BNTI3NDE1ZmEtMTRiMS00YTY4LTk0OGItNjY4YmI0MDM4OGM4XkEyXkFqcGdeQXVyODE2NDgwMzM@._V1_SX300.jpg",
    rating: 8.0,
    genres: ["Action", "Behind the Scenes"]
  },
  {
    id: "tt9146610",
    title: "Discount Spiderman 2",
    year: "2018",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BY2U4NjY2YTQtZDFiYS00YTk2LTk5NDItMWVlNmIwZjYyZmE5XkEyXkFqcGc@._V1_SX300.jpg",
    rating: 5.5,
    genres: ["Comedy", "Parody"]
  },
  {
    id: "tt0100669",
    title: "Spiderman (1990)",
    year: "1990",
    type: "movie",
    poster: "https://via.placeholder.com/300x450?text=No+Poster",
    rating: 6.1,
    genres: ["Action", "Adventure"]
  },
  {
    id: "tt2084949",
    title: "Superman, Spiderman or Batman",
    year: "2011",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BMjQ4MzcxNDU3N15BMl5BanBnXkFtZTgwOTE1MzMxNzE@._V1_SX300.jpg",
    rating: 8.8,
    genres: ["Short", "Drama"]
  },
  {
    id: "tt1785572",
    title: "Spiderman 2010",
    year: "2010",
    type: "movie",
    poster: "https://via.placeholder.com/300x450?text=Spiderman+2010",
    rating: 7.0,
    genres: ["Action"]
  },
  {
    id: "tt0076752",
    title: "The Amazing Spider-Man",
    year: "1977",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BMjA4MzM1NTY2OF5BMl5BanBnXkFtZTgwNjA3Njc2MjE@._V1_SX300.jpg",
    rating: 6.3,
    genres: ["Action", "Adventure"]
  },
  {
    id: "tt0078309",
    title: "Spider-Man Strikes Back",
    year: "1978",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BMjE1NzA5MTQyOV5BMl5BanBnXkFtZTYwNTI2OTg5._V1_SX300.jpg",
    rating: 5.9,
    genres: ["Action", "Fantasy"]
  },
  {
    id: "tt0081546",
    title: "Spider-Man: The Dragon's Challenge",
    year: "1981",
    type: "movie",
    poster: "https://m.media-amazon.com/images/M/MV5BMTM1NjEwNDA0NF5BMl5BanBnXkFtZTYwNTk1OTg5._V1_SX300.jpg",
    rating: 6.0,
    genres: ["Crime", "Action"]
  }
];
const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-10 w-full p-2">
        <div className="flex flex-col gap-3 max-w-100">
          <Label labelName="Featured" />
          <div className="text-6xl font-bold">Neon Nights</div>
          <div className="flex items-center gap-5 text-[15px]">
            <div className="flex items-center">
              < MdOutlineStar className="size-4 text-yellow-500" />
              <span>8.5</span>
            </div>
            <span>•</span>
            <span>2024</span>
            <span>•</span>
            <span>2h 18m</span>
            <span>•</span>
            <span>Sci-Fi Thriller</span>
          </div>
          <p className="text-slate-300">
            In a dystopian future, a lone hacker uncovers a conspiracy that
            could change the fate of humanity forever. With stunning visuals and
            an intense storyline, this sci-fi thriller keeps you on the edge of your seat.
          </p>
          <div className="flex gap-3 items-center">
            <button className="flex gap-3 items-center bg-white rounded-lg px-6 py-3
          cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-cine-red
          group active:scale-102
          ">
              <FaPlay className="size-5 text-black group-hover:text-white" />

              <span className="text-black text-md font-semibold group-hover:text-white" >Play Now</span>
            </button>
            <button className="flex gap-3 items-center bg-gray-500 rounded-lg px-6 py-3
          cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-cine-red
          group active:scale-102
          ">
              <IoInformationCircleOutline className="size-5 text-black group-hover:text-white" />

              <span className="text-black text-md font-semibold group-hover:text-white" >More Info</span>
            </button>
            <FavoriteButton />
          </div>
        </div>
        <MovieSection
          title="Trending Now"
          movieList={movies}
        />

        <MovieSection
          title="Popular on CineStream"
          movieList={movies}
        />
          <MovieSection
          title="Top Rated"
          movieList={movies}
        />
          <MovieSection
          title="New Release"
          movieList={movies}
        />
      </div>

    </>
  )
}
export default Home;