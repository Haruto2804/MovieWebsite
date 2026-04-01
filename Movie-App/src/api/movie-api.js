import axios from "axios";

class MovieApi {
    constructor() {
        this.tmdbKey = import.meta.env.VITE_TMDB_API_KEY;
        this.baseUrl = "https://api.themoviedb.org/3";
        this.lang = "vi-VN";
    }

    // Lấy phim mặc định (Discover)
    fetchMovie = async (page = 1) => {
        const url = `${this.baseUrl}/discover/movie?api_key=${this.tmdbKey}&language=${this.lang}&page=${page}&sort_by=popularity.desc`;
        return await axios.get(url);
    }

    // Lấy danh sách thể loại
    fetchGenres = async () => {
        const url = `${this.baseUrl}/genre/movie/list?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        return response.data;
    }

    // Phim đang chiếu
    getPlayingMovie = async () => {
        const url = `${this.baseUrl}/movie/now_playing?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        return response.data;
    }

    // Phim phổ biến
    getPopularMovie = async () => {
        const url = `${this.baseUrl}/movie/popular?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        return response.data;
    }

    // Phim đánh giá cao
    getTopRatedMovie = async () => {
        const url = `${this.baseUrl}/movie/top_rated?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        return response.data;
    }

    // Phim sắp chiếu
    getUpcomingMovie = async () => {
        const url = `${this.baseUrl}/movie/upcoming?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        return response.data;
    }

    // Chi tiết phim (Nội dung, tiêu đề tiếng Việt)
    getDetailsMovie = async (movieId) => {
        const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        return response.data;
    }

    // Diễn viên (Thông tin diễn viên thường là tiếng Anh, nhưng bio có thể có tiếng Việt)
    getCreditsMovie = async (movieId) => {
        const url = `${this.baseUrl}/movie/${movieId}/credits?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        return response.data.cast;
    }

    // Phim tương tự
    getSimilarMovie = async (movieId) => {
        const url = `${this.baseUrl}/movie/${movieId}/similar?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        return response.data.results;
    }

    // Tìm kiếm phim (Tiếng Việt)
    getMoviesBySearch = async (keyword, year, page = 1) => {
        let url = `${this.baseUrl}/search/movie?api_key=${this.tmdbKey}&query=${keyword}&language=${this.lang}&page=${page}`;
        if (year) url += `&primary_release_year=${year}`;
        
        const response = await axios.get(url);
        return response.data;
    }

    // Yêu thích
    getFavoriteMovie = async (accountId) => {
        const session_id = localStorage.getItem('tmdb_session_id');
        const url = `${this.baseUrl}/account/${accountId}/favorite/movies?api_key=${this.tmdbKey}&session_id=${session_id}&language=${this.lang}&sort_by=created_at.desc`;
        const response = await axios.get(url);
        return response.data;
    }

    // Watchlist
    getWatchlist = async (accountId, page = 1) => {
        const session_id = localStorage.getItem('tmdb_session_id');
        const url = `${this.baseUrl}/account/${accountId}/watchlist/movies?api_key=${this.tmdbKey}&session_id=${session_id}&language=${this.lang}&sort_by=created_at.desc&page=${page}`;
        const response = await axios.get(url);
        return response.data;
    }

    // Các hàm POST (Thêm/Xóa) không cần language vì nó chỉ gửi ID
    addFavorite = async (accountId, movieId) => {
        const session_id = localStorage.getItem('tmdb_session_id');
        const url = `${this.baseUrl}/account/${accountId}/favorite?api_key=${this.tmdbKey}&session_id=${session_id}`;
        return await axios.post(url, { media_type: "movie", media_id: movieId, favorite: true });
    };

    removeFavorite = async (accountId, movieId) => {
        const session_id = localStorage.getItem('tmdb_session_id');
        const url = `${this.baseUrl}/account/${accountId}/favorite?api_key=${this.tmdbKey}&session_id=${session_id}`;
        return await axios.post(url, { media_type: "movie", media_id: movieId, favorite: false });
    };

    addToWatchlist = async (accountId, movieId) => {
        const session_id = localStorage.getItem('tmdb_session_id');
        const url = `${this.baseUrl}/account/${accountId}/watchlist?api_key=${this.tmdbKey}&session_id=${session_id}`;
        return await axios.post(url, { media_type: "movie", media_id: movieId, watchlist: true });
    };

    removeFromWatchlist = async (accountId, movieId) => {
        const session_id = localStorage.getItem('tmdb_session_id');
        const url = `${this.baseUrl}/account/${accountId}/watchlist?api_key=${this.tmdbKey}&session_id=${session_id}`;
        return await axios.post(url, { media_type: "movie", media_id: movieId, watchlist: false });
    };

    getMoreVideos = async (movieId) => {
        const url = `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.tmdbKey}&language=${this.lang}`;
        const response = await axios.get(url);
        // Nếu không có video tiếng Việt, gọi lại bản tiếng Anh
        if (response.data.results.length === 0) {
            const engUrl = `${this.baseUrl}/movie/${movieId}/videos?api_key=${this.tmdbKey}`;
            const engRes = await axios.get(engUrl);
            return engRes.data.results;
        }
        return response.data.results;
    }

    getTrailerVideos = async (movieId) => {
        const videos = await this.getMoreVideos(movieId);
        return videos.filter((item) => item.type === 'Trailer');
    }
}

export default new MovieApi();