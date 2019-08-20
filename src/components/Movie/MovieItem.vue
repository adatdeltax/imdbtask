<template>
  <div class="card mb-4 shadow-sm">
    <img class="card-img-top" height="320px" width="20px" :src="movie.poster" />
    <div class="card-body">
      <p class="card-text">
        <b>Movie:</b>
        &nbsp;&nbsp;&nbsp;{{ movie.name }}
      </p>
      <p class="card-text">
        <b>Plot:</b>
        &nbsp;&nbsp;&nbsp;{{ movie.plot }}
      </p>
      <p class="card-text">
        <b>Actors:</b>&nbsp;&nbsp;&nbsp;
        <i
          v-for="actor in movie.actors"
          :key="actor.id"
        >{{ (actor.name)?actor.name+",":actor+"," }}</i>
      </p>
      <p class="card-text">
        <b>Producers:</b>&nbsp;&nbsp;&nbsp;
        <i
          v-for="producer in movie.producers"
          :key="producer.id"
        >{{ (producer.name)?producer.name+",":producer+"," }}</i>
      </p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <router-link
            tag="button"
            class="btn btn-sm btn-outline-secondary"
            :to="{ name:'movieedit', params:{id:movie.id} }"
          >Edit</router-link>
        </div>
        <small class="text-muted">Year of release : {{ movie.yearOfRelease }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"]
};
</script>
