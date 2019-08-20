<template>
  <div>
    <br />
    <div class="album py-5 bg-light">
      <div class="container">
        <router-link to="/movies/create" tag="button" class="btn btn-info">Create Movie</router-link>
        <br />
        <br />
        <div class="row">
          <div v-for="movie in moviesData" :key="movie.id" class="col-md-4">
            <app-movie-item :movie="movie" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem";
import apiService from './services/apiService';
export default {
  data: function() {
    return {
      moviesData: [],
    };
  },
  async created() {
   this.moviesData=await apiService.getAllMovies();
  },
  components: {
    "app-movie-item": MovieItem
  }
};
</script>
