<template>
  <div class="container">
    <br />
    <!-- Dynamic alert tag for displaying success and failure messages -->
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="alertVariant"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{alertMessage}}</b-alert>

    <div class="row">
      <!-- Actor modal button -->
      <b-button
        @click="showActorModal = !showActorModal"
        style="float:left"
        class="btn btn-info"
      >Add Actor</b-button>&nbsp;&nbsp;&nbsp;
      <!-- Actor modal -->
      <b-modal v-model="showActorModal" title="Add Actor" hide-footer>
        <!-- common component for actor/producer (actor) -->
        <app-person-create
          @closeActorModal="closeActorModal"
          childtype="Actor"
          @alertFromChild="showAlert"
        />
      </b-modal>

      <!-- Producer modal button -->
      <b-button
        @click="showProducerModal = !showProducerModal"
        style="float:right"
        class="btn btn-info"
      >Add Producer</b-button>&nbsp;&nbsp;&nbsp;
      <!-- Producer modal-->
      <b-modal v-model="showProducerModal" title="Add Producer" hide-footer>
        <!-- common component for actor/producer (producer) -->
        <app-person-create
          @closeProducerModal="closeProducerModal"
          childtype="Producer"
          @alertFromChild="showAlert"
        />
      </b-modal>
    </div>
    <br />

    <!-- form component -->
    <form>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-6">
          <!-- Movie name -->
          <div class="form-group">
            <label for="movieName">Movie Name:</label>
            <input
              id="movieName"
              name="movieName"
              v-validate="'required'"
              data-vv-validate-on="validateStep"
              v-model="movieData.name"
              type="text"
              class="form-control"
            />
            <span class="error" v-show="errors.has('movieName')">{{ errors.first('movieName') }}</span>
          </div>
          <!--Year Of Release -->
          <div class="form-group">
            <label for="yearOfRelease">Year Of Release:</label>
            <input
              id="yearOfRelease"
              name="yearofrelease"
              v-model="movieData.yearOfRelease"
              type="date"
              class="form-control"
              v-validate="'required'"
              data-vv-validate-on="validateStep"
            />
            <span
              class="error"
              v-show="errors.has('yearofrelease')"
            >{{ errors.first('yearofrelease') }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- Plot -->
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
          <label for="plot">Plot:</label>
          <br />

          <textarea
            id="plot"
            name="plot"
            v-validate="'required'"
            data-vv-validate-on="validateStep"
            v-model="movieData.plot"
            rows="5"
            class="form-control"
          />
          <span class="error" v-show="errors.has('plot')">{{ errors.first('plot') }}</span>
        </div>
      </div>
      <div class="row">
        <!-- Poster -->
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
          <label for="poster">Poster:</label>
          <br />
          <input
            id="poster"
            name="poster"
            v-model="movieData.poster"
            v-validate="'required'"
            data-vv-validate-on="validateStep"
            type="text"
            class="form-control"
          />
          <span class="error" v-show="errors.has('poster')">{{ errors.first('poster') }}</span>
        </div>
      </div>
      <div class="row">
        <!-- Actors -->
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
          <label for="actors">Actors:</label>
          <br />
          <multiselect
            v-model="movieData.actors"
            :options="actors"
            :multiple="true"
            label="name"
            track-by="id"
          />
        </div>
      </div>

      <div class="row">
        <!-- Producers -->
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
          <label for="actors">Producers:</label>

          <multiselect
            v-model="movieData.producers"
            :options="producers"
            :multiple="true"
            label="name"
            track-by="id"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <button class="btn btn-primary" @click.prevent="validateBeforeSubmit">Submit!</button>
        </div>
      </div>
    </form>
    <hr />
  </div>
</template>

<script>
import PersonCreate from "./Person/PersonCreateComponent";
import apiService from "./services/apiService";
export default {
  components: {
    "app-person-create": PersonCreate
  },
  data: function() {
    return {
      //used to reterive actor data for multiselect options
      actors: [],
      //used to reterive producer data for multiselect options
      producers: [],
      //objects for alerts
      dismissSecs: 5,
      dismissCountDown: 0,
      alertVariant: "",
      alertMessage: "",
      //objects used for modals
      showActorModal: false,
      showProducerModal: false,
      //objects used for all the inputs
      movieData: {
        id: 0,
        name: "",
        yearOfRelease: "",
        plot: "",
        poster: "",
        actors: [], //selected actors
        producers: [] //selected producers
      }
    };
  },

  async created() {
    if (this.$route.params.id) {
      this.movieData = await apiService.getMovieDetailsFromRoute(
        this.$route.params.id
      );
    }

    //populates actors multiselect initially
    this.actors = await apiService.getActors();
    //populates producers multiselect initially
    this.producers = await apiService.getProducers();
  },

  methods: {
    // clears the form
    clearform() {
      this.movieData.id = null;
      this.movieData.name = null;
      this.movieData.yearOfRelease = null;
      this.movieData.plot = null;
      this.movieData.poster = null;
      this.movieData.actors = null;
      this.movieData.producers = null;
    },

    //form submit
    async submited() {
      this.submitedform = true;
      // checks if the id is equal to initial value
      if (this.movieData.id == 0) {
        let response = await apiService.submitMovie(this.movieData);
        if (response === 201) {
          this.showAlert("success", "Data Recorded Successfully");
          this.clearform();
        } else {
          this.showAlert("danger", "Something went wrong");
        }
      }
      //if not then it will update the data
      else {
        let response = await apiService.updateMovie(
          this.movieData.id,
          this.movieData
        );
        if (response === 200) {
          this.showAlert("success", "Data Updated Successfully");
          this.clearform();
        } else {
          this.showAlert("danger", "Something went wrong");
        }
      }
    },

    // method to close producer modal from child button
    async closeProducerModal() {
      this.showProducerModal = false;
      //reloads producer multiselect
      this.producers = await apiService.getProducers();
    },

    // method to close actor modal from child button
    async closeActorModal() {
      this.showActorModal = false;
      // reloads actor multiselect
      this.actors = await apiService.getActors();
    },

    //setting countdown variables
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    //dynamic alert component for success and failure
    showAlert(alertDataFromchild) {
      this.alertVariant = alertDataFromchild.variant;
      this.alertMessage = alertDataFromchild.message;
      this.dismissCountDown = this.dismissSecs;
    },
    // validates for all the fields and calls submited method
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submited();
          return;
        }
        alert("Please enter all the details!");
      });
    }
  }
};
</script>
  <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
  <style>
.error {
  color: red;
}
.childbutton {
  float: right;
  margin-left: 5px;
}
</style>

