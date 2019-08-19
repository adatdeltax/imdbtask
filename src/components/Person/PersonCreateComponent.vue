<template>
  <div>
    <form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-xs-12 col-sm-12">
          <div class="form-group">
            <label for="personname">{{ childtype }} Name:</label>
            <input
              id="personname"
              v-model="personData.personname"
              v-validate="'required'"
              type="text"
              name="personname"
              class="form-control"
            />
            <span v-show="errors.has('personname')" class="error">{{ errors.first('personname') }}</span>
          </div>

          <div class="form-group">
            <label for="bio">{{ childtype }}'s gender: &nbsp;</label>
            <label for="male">
              <input
                id="male"
                v-model="personData.sex"
                v-validate="'required|included:Male,Female'"
                name="genderradiogroup"
                type="radio"
                value="Male"
              /> Male
            </label>
            &nbsp; &nbsp; &nbsp;
            <label for="female">
              <input
                id="female"
                v-model="personData.sex"
                name="genderradiogroup"
                type="radio"
                value="Female"
              /> Female
            </label>
            <br />
            <span
              v-show="errors.has('genderradiogroup')"
              class="error"
            >{{ errors.first('genderradiogroup') }}</span>
          </div>

          <div class="form-group">
            <label for="bio">{{ childtype }}'s bio:</label>
            <br />

            <textarea
              id="bio"
              v-model="personData.bio"
              v-validate="'required'"
              name="bio"
              rows="5"
              class="form-control"
            />
            <span v-show="errors.has('bio')" class="error">{{ errors.first('bio') }}</span>
          </div>

          <div class="form-group">
            <b-button variant="success" class="childbutton" @click="validateBeforeSubmit">Submit</b-button>
            <b-button variant="danger" class="childbutton" @click="closepersonmodal">Cancel</b-button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: { childtype: { type: String } },
  data: function() {
    return {
      //Normal person data
      personData: {
        personname: "",
        sex: "",
        bio: ""
      },
      //alert data
      childAlert: {
        variant: "",
        message: ""
      }
    };
  },
  methods: {
    //method used to get all fields that are entered in person modal
    async personsubmited() {
      //checks which modal(Actor/Producer) is selected and stores accordingly
      if (this.childtype == "Actor") {
        try {
          //adds new actor to actors
          let response = axios.post(
            "http://195.201.189.119:63790/actors",
            this.personData
          );

          //calls success alert
          this.callSuccessAlert();
          //calls closeActorModal in parent
          this.$emit("closeActorModal");
        } catch (error) {
          //displays error
          console.log(error);
          //calls danger alert
          this.callDangerAlert();
        }
      } else if (this.childtype == "Producer") {
        try {
          //adds producer to producers
          let response = axios.post(
            "http://195.201.189.119:63790/producers",
            this.personData
          );
          //calls success alert
          this.callSuccessAlert();
          //calls closeProducerModal in parent
          this.$emit("closeProducerModal");
        } catch (error) {
          //displays error
          console.log(error);
          //calls danger alert
          this.callDangerAlert();
        }
      }
    },

    //checks for the required condition
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.personsubmited();
          return;
        }
        alert("Please enter all the details!");
      });
    },
    //calls the success alert
    callSuccessAlert() {
      this.childAlert.variant = "success";
      this.childAlert.message = "Data Recorded Successfully!!";
      this.$emit("alertFromChild", this.childAlert);
    },
    //calls the danger alert
    callDangerAlert() {
      this.childAlert.variant = "danger";
      this.childAlert.message = "Something Went Wrong!!";
      this.$emit("alertFromChild", this.childAlert);
    },
    //calls Actor/Produce closemodal method whenever cancel button is pressed
    closepersonmodal() {
      this.$emit("close" + this.childtype + "Modal");
    }
  }
};
</script>

<style>
.error {
  color: red;
}
.childbutton {
  float: right;
  margin-left: 5px;
}
</style>
