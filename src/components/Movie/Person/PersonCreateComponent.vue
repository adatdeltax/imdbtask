<template>
  <div>
    <form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-xs-12 col-sm-12">
          <div class="form-group">
            <label for="personName">{{ childtype }} Name:</label>
            <input
              id="personName"
              v-model="personData.personName"
              v-validate="'required'"
              type="text"
              name="personName"
              class="form-control"
            />
            <span v-show="errors.has('personName')" class="error">{{ errors.first('personName') }}</span>
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
            <b-button variant="danger" class="childbutton" @click="closePersonModal">Cancel</b-button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import apiService from "../services/apiService";
export default {
  props: { childtype: { type: String } },
  data: function() {
    return {
      //Normal person data
      personData: {
        personName: "",
        sex: "",
        bio: ""
      },
      //alert data
      alert: {
        variant: "",
        message: ""
      }
    };
  },
  methods: {
    //method used to get all fields that are entered in person modal
    async personSubmited() {
      //checks which modal(Actor/Producer) is selected and stores accordingly
      if (this.childtype == "Actor") {
        let response = await apiService.submitActor(this.personData);
        if (response == 201) {
          //calls success alert
          this.callSuccessAlert();
          //calls closeActorModal in parent
          this.$emit("closeActorModal");
        } else {
          //displays error
          alert(
            '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
          );
          //calls danger alert
          this.callDangerAlert();
        }
      } else if (this.childtype == "Producer") {
        let response = await apiService.submitProducer(this.personData);
        if (response == 201) {
          //calls success alert
          this.callSuccessAlert();
          //calls closeActorModal in parent
          this.$emit("closeProducerModal");
        } else {
          //displays error
          alert(
            '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
          );
          //calls danger alert
          this.callDangerAlert();
        }
      }
    },

    //checks for the required condition
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.personSubmited();
          return;
        }
        alert("Please enter all the details!");
      });
    },
    //calls the success alert
    callSuccessAlert() {
      this.alert.variant = "success";
      this.alert.message = "Data Recorded Successfully!!";
      this.$emit("alertFromChild", this.alert);
    },
    //calls the danger alert
    callDangerAlert() {
      this.alert.variant = "danger";
      this.alert.message = "Something Went Wrong!!";
      this.$emit("alertFromChild", this.alert);
    },
    //calls Actor/Produce closemodal method whenever cancel button is pressed
    closePersonModal() {
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
