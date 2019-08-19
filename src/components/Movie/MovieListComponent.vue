<template>
  <div>
    <br>
    <div class="album py-5 bg-light">
      <div class="container">
        <router-link to="/movies/create" tag="button" class="btn btn-info">Create Movie</router-link>
        <br>
        <br>
        <app-movie-item></app-movie-item>
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem";
export default {
  components: {
    "app-movie-item": MovieItem
  }
};
</script>
