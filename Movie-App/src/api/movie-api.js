import axios from "axios";
class MovieApi {
    fetchMovie = async (keyword) => {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const url = `https://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`;
        const response = await axios.get(url);
        return response;
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
    searchMovies = async (query, year,currentPage) => {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}&y=${year}&page=${currentPage}`;
        const response = await axios.get(url);
        return response.data;
    }
}
export default new MovieApi;