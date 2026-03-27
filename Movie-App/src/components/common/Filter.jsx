

const Filter = ({ title = "Genre", options = [] }) => {
  console.log(options)
  return (
    <div className="flex flex-col gap-2 w-64">
      <label for="genre-select" className="text-sm font-medium text-gray-500">{title}</label>
      <select
        id="genre-select"
        className="transition-all duration-300  cursor-pointer block w-full px-4 py-2 
        text-white bg-slate-900 border-cine-red rounded-md shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-cine-red focus:border-blue-500 
        appearance-none"
      >
        {
          options.map((item) => {
            return (
              <option value={item}>{item}</option>
            )
          })
        }
      </select>
    </div>
  )
}
export default Filter;