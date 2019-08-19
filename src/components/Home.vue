<template>
      
  <div>

    <input
              id="moviename"
              name="moviename"
              v-model="id"
              type="number"
              class="form-control"
            />
        <button class="btn btn-primary" @click.prevent="deleteElement">Submit!</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    
    data:function(){
      return{
          id:0
      }
    },
    methods:{
      deleteElement(){
         axios.delete('http://195.201.189.119:63790/movies/' + this.id)
      .then(response => {
        console.log("Deleted");
      });
      }
    }
}
</script>

<style>

</style>
