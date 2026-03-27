const SearchInput = ({placeholder = "Default"}) => {
  return (
    <>
      <input 
      placeholder={placeholder}
      type="text" className="text-cine-red placeholder:text-white/50 border focus:border-0 caret-slate-900 bg-slate-900 rounded-md border-gray-500 h-12 px-7 focus:ring-cine-red
      focus:outline-none focus:ring-2 transition-all duration-300
      "/>
    </>
  )
}
export default SearchInput;