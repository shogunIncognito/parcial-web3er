<script setup>
import { ref } from 'vue';
import { getGenres, getMovies, getMoviesByGenre } from './services/api';
import { MagnifyingGlassCircleIcon, StarIcon } from '@heroicons/vue/16/solid';

const movies = ref([]);
const firstSearch = ref(true)
const search = ref('')
const loading = ref(false)
const genres = ref([])

const fetchMovies = async (query) => {
  firstSearch.value = false
  loading.value = true

  try {
    movies.value = await getMovies(query)
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
};

const handleGenreChange = async (e) => {
  firstSearch.value = false
  loading.value = true

  try {
    movies.value = await getMoviesByGenre(e.target.value)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

getGenres()
  .then(res => genres.value = res.genres)

</script>

<template>
  <h1 class="text-center text-3xl my-5 mb-10">Buscador de películas</h1>
  <form @submit.prevent="() => fetchMovies(search)" class="flex flex-col mx-10 sm:flex-row justify-center m-2 gap-2">
    <input v-model="search" type="text"
      class="outline-none bg-transparent ring-indigo-400 ring-2 p-1 rounded md:w-1/4 lg:w-1/6 focus:ring-indigo-700 hover:ring-indigo-500 transition-all duration-300">

    <button class="bg-indigo-500 rounded p-1 px-4 w-1/2 mx-auto sm:mx-0 sm:w-auto">Buscar</button>

    <select @change="handleGenreChange" class="flex rounded bg-neutral-700 p-1">
      <option value="">Selecciona una categoría</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
    </select>

  </form>


  <h2 v-if="loading" class="text-center w-10 mt-14 text-indigo-500 mx-auto">
    <MagnifyingGlassCircleIcon class="animate-spin w-10" />
  </h2>

  <h2 v-else-if="movies.length === 0 && !firstSearch" class="text-center text-xl mt-14">No hay resultados</h2>

  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 m-5 md:mx-10">
    <article v-for="movie in movies" class="bg-neutral-700 rounded flex flex-col">
      <div class="relative">
        <img :src="movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : 'https://via.placeholder.com/342x512'"
          :alt="movie.title" class="rounded w-full">
        <span class="absolute left-1 bottom-0 m-1 bg-black/75 p-1.5 rounded">{{ movie.release_date }}</span>
        <span class="absolute right-1 bottom-0 m-1 bg-black/75 p-1.5 rounded uppercase">
          {{ movie.original_language }}
        </span>
      </div>
      <div class="p-3 shadow flex-1 flex flex-col gap-2">

        <header class="flex-1">
          <h3>{{ movie.title }}</h3>
          <p class="line-clamp-6">{{ movie.overview }}</p>
        </header>

        <footer class="flex gap-2">
          <p>{{ movie.adult ? 'Adultos' : 'No adultos' }}</p>
          -
          <p class="flex gap-2">
            {{ movie.popularity }}
            <StarIcon class="w-5" />
          </p>
        </footer>

      </div>
    </article>
  </div>
</template>

<style scoped></style>
