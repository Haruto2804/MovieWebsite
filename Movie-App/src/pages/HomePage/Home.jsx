import Label from "../../components/common/Label";
import { MdOutlineStar } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import FavoriteButton from "../../components/common/FavoriteButton";
import MovieSection from "./MovieSection";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
const Home = () => {
  const [sectionMovie, setSectionMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const genresToShow = useMemo(() => ["Anime", "Fantasy", "Isekai", "Marvel"], [])
  useEffect(() => {
    const fetchAllSection = async () => {
      setLoading(true);
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      try {
        const requests = genresToShow.map((genre) => {
          return axios.get(`https://www.omdbapi.com/?s=${genre}&apikey=${apiKey}`)
        })

        const results = await Promise.all(requests);
        console.log(requests)
        const dataMap = {};
        results.forEach((response, index) => {
           dataMap[genresToShow[index]] = response.data.Search || [];
        });
        setSectionMovie(dataMap);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false);
      }
    }
    fetchAllSection();
  }, [genresToShow])
  console.log(sectionMovie)
  return (
    <>
      <div className="flex flex-col gap-10 w-full p-2">

        <div className="relative p-4">
          <div className="rounded-lg absolute inset-0 bg-[url('../../../public/neon_night.png')] bg-cover"></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="mt-25 relative flex flex-col gap-3 max-w-100">

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
        </div>
        {/* Render nhiều Section dựa trên dữ liệu đã fetch */}
        {loading ? (
          <div className="text-white text-center">Đang tải phim...</div>
        ) : (
          genresToShow.map((genre) => (
            <MovieSection
              key={genre}
              title={genre}
              movieList={sectionMovie[genre] || []}
            />
          ))
        )}
      </div>

    </>
  )
}
export default Home;