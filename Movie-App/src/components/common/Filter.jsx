

// const GENRE_MAP = {
//   28: "Action",
//   12: "Adventure",
//   16: "Animation",
//   35: "Comedy",
//   80: "Crime",
//   99: "Documentary",
//   18: "Drama",
//   10751: "Family",
//   14: "Fantasy",
//   36: "History",
//   27: "Horror",
//   10402: "Music",
//   9648: "Mystery",
//   10749: "Romance",
//   878: "Science Fiction",
//   10770: "TV Movie",
//   53: "Thriller",
//   10752: "War",
//   37: "Western"
// };
const Filter = ({ title = "Genre", options = [], setFilter,type }) => {
  return (
    <div className="flex flex-col gap-2 w-64">
      <label for="genre-select" className="text-sm font-medium text-gray-500">{title}</label>
      <select
        onChange={(e)=> {
          setFilter(prev => ({
            ...prev,
            [type]: e.target.value // 
          }));
        }}
        id="genre-select"
        className="transition-all duration-300  cursor-pointer block w-full px-4 py-2 
        text-white bg-slate-900 border-cine-red rounded-md shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-cine-red focus:border-blue-500 
        appearance-none"
      >
        {
          options.map((item) => {
            return (
              <option 
              key = {item.id || item}
              value={item.id || item}>{item.name || item}</option>
            )
          })
        }
      </select>
    </div>
  )
}
export default Filter;