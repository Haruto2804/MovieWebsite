import axios from "axios";
class MovieApi {
    fetchMovie = async (page) => {
        if (page) {
            const apiKey = import.meta.env.VITE_OMDB_API_KEY;
            // const url = `https://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`;
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=vi-VN?page=${page}`
            const response = await axios.get(url);
            return response;
        }
    }
    fetchDetailMovie = async (movieId) => {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
        const response = await axios.get(url);
        return response.data;
    }
    getSuggestedMovies = async (movie) => {
        if (!movie?.Title) return [];
        const keyword = movie.Title.split(' ')[0];
        const cacheKey = `suggested_${keyword}`;

        // 1. Kiểm tra Cache trong localStorage
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
            console.log("Lấy dữ liệu từ Cache!");
            console.log(cachedData)
            return JSON.parse(cachedData);
        }

        // 2. Nếu không có cache mới gọi API
        try {
            const apiKey = import.meta.env.VITE_OMDB_API_KEY;
            const url = `https://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`;
            const response = await axios.get(url);
            if (response.data.Response === "True") {
                const results = response.data.Search.slice(0, 4);

                // 3. Lưu vào Cache cho lần sau
                localStorage.setItem(cacheKey, JSON.stringify(results));
                return results;
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) { return []; }
    }
    searchMovies = async (query, year, currentPage) => {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}&y=${year}&page=${currentPage}`;
        const response = await axios.get(url);
        return response.data;
    }
    fetchGenres = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data;
    }
    getPlayingMovie = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data;
    }
    getPopularMovie = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data;
    }
    getTopRatedMovie = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data;
    }
    getUpcomingMovie = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data;
    }
    // Các hàm lấy thông tin phim
    //lấy chi tiết phim
    getDetailsMovie = async (movieId) => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data;
    }
    //hàm lấy chi tiết diễn viên phim theo id movie
    getCreditsMovie = async (movieId) => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data.cast;
    }
    //hàm lấy phim tuong tu theo movie id
    getSimilarMovie = async (movieId) => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data.results;
    }
    getMoreVideos = async (movieId) => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
        const response = await axios.get(url);
        return response.data.results;
    }
    getTrailerVideos = async (movieId) => {
        const videos = await this.getMoreVideos(movieId);
        const trailerVideos = videos.filter((item)=>item.type ==='Trailer');
        return trailerVideos;
    }


}
export default new MovieApi;