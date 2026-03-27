import { useState, useEffect } from 'react';
import movieApi from '../api/movie-api';

export const useMovieSearch = (initialQuery = "") => {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState({ year: '', genre: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Logic tìm kiếm & lọc
  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;

      setLoading(true);
      try {
        // Gọi API với query và filter
        const data = await movieApi.searchMovies(query, filter.year, filter.type);
        let finalData = data;
        if (filter.genre && filter.genre !== "All") {
          finalData = data.filter((movie) =>
            movie.Genre?.includes(filter.genre)
          );
        }
        setResults(finalData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // dùng debounce để tránh gọi api quá nhiều lần
    const timer = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timer);

  }, [query, filter]);

  // Trả về những thứ UI cần "móc" vào
  return {
    query, setQuery,
    filter, setFilter,
    results, setResults,
    loading
  };
};