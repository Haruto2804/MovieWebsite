import axios from "axios";
class MovieApi {
   fetchMovie = async (keyword) => {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const url = `https://www.omdbapi.com/?s=${keyword}&apikey=${apiKey}`;
      const response = await axios.get(url);
      return response;
  }
}
export default new MovieApi;