import { createContext, useState, useEffect, useContext, useCallback } from "react";
import movieApi from "../api/movie-api";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState({ year: '' });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [homeMovies, setHomeMovies] = useState({
    playing: [],
    upcoming: [],
    topRated: [],
    popular: [],
    isLoading: true
  });

  // 1. Fetch Genres
  const fetchGenres = useCallback(async () => {
    try {
      const response = await movieApi.fetchGenres();
      setGenres(response?.genres || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thể loại:", error);
    }
  }, []);

  // 2. Load trang chủ (Chạy 1 lần duy nhất)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log('Đang load dữ liệu trang chủ...');
        const [playingRes, upcomingRes, topRatedRes, popularRes] = await Promise.all([
          movieApi.getPlayingMovie(), // THÊM DẤU ()
          movieApi.getUpcomingMovie(), // THÊM DẤU ()
          movieApi.getTopRatedMovie(), // THÊM DẤU ()
          movieApi.getPopularMovie()  // THÊM DẤU ()
        ]);

        setHomeMovies({
          playing: playingRes.results || [],
          upcoming: upcomingRes.results || [],
          topRated: topRatedRes.results || [],
          popular: popularRes.results || [],
          isLoading: false
        });

        // chọn phim ngẫu nhiên từ top rated
        const topRatedMovie = topRatedRes.results;
        if (topRatedMovie.length > 0) {
          const random = topRatedMovie[Math.floor(Math.random() * topRatedMovie.length)];
          setFeaturedMovie(random);
        }
      } catch (err) {
        console.error("Lỗi load trang chủ:", err);
        setHomeMovies(prev => ({ ...prev, isLoading: false }));
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchMovies = async () => {
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
  }, [query, filter.year, currentPage]); 

  const value = {
    query, setQuery,
    filter, setFilter,
    results,
    loading,
    currentPage, setCurrentPage,
    fetchGenres, genres,
    homeMovies,
    featuredMovie
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};