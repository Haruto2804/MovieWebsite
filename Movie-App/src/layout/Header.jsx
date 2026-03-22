import { GoSearch } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { RiMovie2AiFill } from "react-icons/ri";
const Header = () => {
  return (
    <header className="bg-blur flex justify-between items-center px-5 py-3 z-1000 
    sticky top-0 border-white/10 bg-black/60 backdrop-blur-md">
      <div className="flex gap-4 items-center">
        <div className="bg-cine-gradient p-2 rounded-lg">
          <RiMovie2AiFill className="size-6 text-white" />
        </div>
        <p className="text-2xl font-bold bg-cine-gradient bg-clip-text text-transparent"
        >CineStream
        </p>
      </div>
      <ul className="text-gray-400 gap-4 md:flex hidden">
        <li className="cursor-pointer hover:text-gray-300 transition-all duration-300">Home</li>
        <li className="cursor-pointer hover:text-gray-300 transition-all duration-300">TV Shows</li>
        <li className="cursor-pointer hover:text-gray-300 transition-all duration-300">Movies</li>
        <li className="cursor-pointer hover:text-gray-300 transition-all duration-300">Genres</li>

      </ul>
      <div className="flex gap-3">
        <div className="rounded-full 
        flex items-center p-2 cursor-pointer
        hover:bg-slate-800 transition-all duration-300
        ">
          <GoSearch className="size-5 text-slate-300" />
        </div>
        <div className="rounded-full 
        flex items-center p-2 cursor-pointer
        hover:bg-slate-800 transition-all duration-300
        ">
          <FiUser className="size-5 text-slate-300" />
        </div>

      </div>
    </header>
  )
}
export default Header;