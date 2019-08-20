<template>
      
  <div>
<p>This is dummy component (for deleting) </p>
    <input
              id="moviename"
              name="moviename"
              v-model="id"
              type="number"
              class="form-control"
              disabled
            />
        <button class="btn btn-primary" @click.prevent="deleteElement" disabled>Submit!</button>
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
         axios.delete('http://195.201.189.119:63790/producers/' + this.id)
      .then(response => {
        console.log("Deleted");
        this.id=parseInt(this.id)+1;
      });
      }
    }
}
</script>
