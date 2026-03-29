import { createContext, useState, useEffect, useContext } from "react";
import movieApi from "../api/movie-api";

// 1. Đặt tên PascalCase
// eslint-disable-next-line react-refresh/only-export-components
export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({ year: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const data = await movieApi.searchMovies(query, filter.year, currentPage);
        setResults(data);
      } catch (err) {
        console.error("Fetch movies error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timer);
  }, [query, filter, currentPage]);

  // 2. Dùng Object để truyền value
  const value = {
    query, setQuery,
    filter, setFilter,
    results,
    loading,
    currentPage, setCurrentPage
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

// 3. Tạo một Custom Hook để dùng cho tiện
// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};