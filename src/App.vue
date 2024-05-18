<script setup>
import { ref } from 'vue';
import { getMovies } from './services/api';
import { StarIcon } from '@heroicons/vue/16/solid';

const movies = ref([]);
const firstSearch = ref(true)
const search = ref('')
const loading = ref(false)

const fetchMovies = async (query) => {
  firstSearch.value = false
  loading.value = true
  movies.value = await getMovies(query)
  loading.value = false
};
</script>

<template>
  <h1 class="text-center text-3xl my-5 mb-10">Buscador de películas</h1>
  <form @submit.prevent="() => fetchMovies(search)" class="flex justify-center m-2 gap-2">
    <input v-model="search" type="text"
      class="outline-none bg-transparent ring-indigo-400 ring-2 p-1 rounded w-1/6 focus:ring-indigo-700 hover:ring-indigo-500 transition-all duration-300">
    <button class="bg-indigo-500 rounded p-1 px-4">Buscar</button>
  </form>

  <h2 v-if="movies.length === 0 && !firstSearch" class="text-center text-xl mt-14">No hay resultados</h2>
  <div v-else class="grid grid-cols-5 gap-4 m-5 md:mx-10">
    <article v-for="movie in movies" class="bg-neutral-700 rounded flex flex-col">
      <div class="relative">
        <img :src="`https://image.tmdb.org/t/p/w342/${movie.poster_path}`" :alt="movie.title" class="rounded">
        <span class="absolute left-1 bottom-0 m-1 bg-black/75 p-1.5 rounded">{{ movie.release_date }}</span>
        <span class="absolute right-1 bottom-0 m-1 bg-black/75 p-1.5 rounded uppercase">{{ movie.original_language
          }}</span>
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
