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
        @click="actorModalShow = !actorModalShow"
        style="float:left"
        class="btn btn-info"
      >Add Actor</b-button>&nbsp;&nbsp;&nbsp;
      <!-- Actor modal -->
      <b-modal v-model="actorModalShow" title="Add Actor" hide-footer>
        <!-- common component for actor/producer (actor) -->
        <app-person-create
          @closeActorModal="closeActorModal"
          childtype="Actor"
          :reloadActorMultiSelectAfterUpdate="actorNameDataFromJson"
          @alertFromChild="showAlert"
        />
      </b-modal>

      <!-- Producer modal button -->
      <b-button
        @click="producerModalShow = !producerModalShow"
        style="float:right"
        class="btn btn-info"
      >Add Producer</b-button>&nbsp;&nbsp;&nbsp;
      <!-- Producer modal-->
      <b-modal v-model="producerModalShow" title="Add Producer" hide-footer>
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
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6">
          <!-- Movie name -->
          <div class="form-group">
            <label for="moviename">Movie Name:</label>
            <input
              id="moviename"
              name="moviename"
              v-validate="'required'"
              data-vv-validate-on="validateStep"
              v-model="movieData.name"
              type="text"
              class="form-control"
            />
            <span class="error" v-show="errors.has('moviename')">{{ errors.first('moviename') }}</span>
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
            :options="actorNameDataFromJson"
            :multiple="true"
            label="name"
            track-by="id"
          />
        </div>
      </div>

      <hr />
      <div class="row">
        <!-- Producers -->
        <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
          <label for="actors">Producers:</label>

          <multiselect
            v-model="movieData.producers"
            :options="producerNameDataFromJson"
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
import axios from "axios";
import PersonCreate from "../Person/PersonCreateComponent";

export default {
  components: {
    "app-person-create": PersonCreate
  },
  data: function() {
    return {
      //used to reterive actor data for multiselect options
      actorNameDataFromJson: [],
      //used to reterive producer data for multiselect options
      producerNameDataFromJson: [],
      //objects for alerts
      dismissSecs: 5,
      dismissCountDown: 0,
      alertVariant: "",
      alertMessage: "",
      //objects used for modals
      actorModalShow: false,
      producerModalShow: false,
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
  created() {
    //data for the edit part
    console.log("Created");
    if (this.$route.params.id) {
      axios
        .get(`http://195.201.189.119:63790/movies/` + this.$route.params.id)
        .then(res => {
          this.movieData = res.data;
        });
    }

    this.loadActorMultiselect();
    this.loadProducerMultiselect();
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
    submited() {
      this.submitedform = true;
      let data = this.movieData;
      // checks if the id is equal to initial value
      if (this.moviedata.id == 0) {
        axios
          .post("http://195.201.189.119:63790/movies", this.moviedata)
          .then(res => {
            console.log(res.status);

            this.clearform();
          })
          .catch(error => {
            console.log(error);
            this.callDangerAlert();
          });
        this.callSuccessAlert();
      }
      //if not then it will update the data
      else {
        axios
          .put(
            `http://195.201.189.119:63790/movies/` + this.moviedata.id,
            this.moviedata
          )
          .then(res => {
            console.log(res.status);
            this.clearform();
          })
          .catch(error => {
            console.log(error);
            this.callDangerAlert();
          });
        this.callSuccessAlert();
      }
      console.log(data, "Final form submitted data");
    },

    //methods for alerts
    callSuccessAlert() {
      console.log("I am here success");
      this.childAlert.variant = "success";
      this.childAlert.message = "Data Recorded Successfully!!";
      this.$emit("alertFromChild", this.childAlert);
      console.log();
    },
    callDangerAlert() {
      this.childAlert.variant = "danger";
      this.childAlert.message = "Something Went Wrong!!";
      this.$emit("alertFromChild", this.childAlert);
    },
    // method to close producer modal from child button
    closeProducerModal() {
      this.producerModalShow = false;

      //reloads producer multiselect
      this.loadProducerMultiselect();
    },

    // method to close actor modal from child button
    closeActorModal() {
      this.actorModalShow = false;
      // reloads actor multiselect
      this.loadActorMultiselect();
    },

    //Loads actor multiselect
    async loadActorMultiselect() {
      //gets all actor names from actor json and formats it as {id:,name:}

      try {
        let response = await axios.get("http://195.201.189.119:63790/actors");
        let data = response.data;
        let actorNamesOption = [];

        for (let i = 0; i < data.length; i++) {
          if ((data[i].id && data[i].name) || data[i].personname) {
            actorNamesOption.push({
              id: data[i].id,
              name: data[i].name || data[i].personname
            });
          }
        }
        this.actorNameDataFromJson = actorNamesOption;
      } catch (error) {
        console.log(error);
      }
    },
    async loadProducerMultiselect() {
      //gets all producers names from producers json and formats it as {id:,name:}
        try {
        let response = await axios.get("http://195.201.189.119:63790/producers");
        let data = response.data;
        let producerNamesOption = [];
        for (let row in data) {
          if ((data[row].id && data[row].name) || data[row].personname) {
            producerNamesOption.push({
              id: data[row].id,
              name: data[row].name || data[row].personname
            });
          }
        }
        this.producerNameDataFromJson = producerNamesOption;
      } catch (error) {
        console.log(error);
      }
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

