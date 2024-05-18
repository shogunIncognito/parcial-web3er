import axios from "axios";

const url = 'https://api.themoviedb.org/3/search/movie?&page=1';

const api = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
});

export const getMovies = async (query) => {
    const response = await api.get(`&query=${query || ''}`);
    return response.data.results
}

