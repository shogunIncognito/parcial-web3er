import axios from "axios";

const url = 'https://api.themoviedb.org/3/';

const api = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
    }
});

export const getMovies = async (query) => {
    const response = await api.get(`search/movie?include_adult=true&page=1&query=${query || ''}`);
    return response.data.results
}

export const getMoviesByGenre = async (genreId) => {
    const response = await api.get(`discover/movie?with_genres=${genreId}`);
    return response.data.results
}

export const getGenres = async () => {
    const response = await api.get('genre/tv/list?language=en')
    return response.data
}