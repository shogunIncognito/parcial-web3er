<script setup>
import { ref } from 'vue';
import { getMovies } from './services/api';
import movies from './mocks/movies.json'

// const movies = ref([]);

// const fetchMovies = async (query) => {
//   movies.value = await getMovies(query);
// };
console.log(movies);
</script>

<template>
  <form class="flex justify-center m-2 gap-2">
    <input type="text" class="outline-none bg-transparent ring-indigo-400 ring-2 p-1 rounded w-1/6 focus:ring-indigo-700 hover:ring-indigo-500 transition-all duration-300">
    <button class="bg-indigo-500 rounded p-1 px-4">Buscar</button>
  </form>

  <div class="grid grid-cols-4 gap-4 m-5">
    <article v-for="movie in movies" class="bg-neutral-700 rounded flex flex-col">
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`" :alt="movie.title" class="rounded">
      <div class="p-3 shadow flex-1 flex flex-col gap-2">
        <header class="flex-1">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.overview }}</p>
        </header>
        <p>{{ movie.adult ? 'Adultos' : 'No adultos' }} - {{ movie.popularity }}</p>
      </div>
    </article>
  </div>
</template>

<style scoped></style>
