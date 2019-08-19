<template>
  <div>
    <form @submit.prevent="validateBeforeSubmit">
      <div class="row">
        <div class="col-xs-12 col-sm-12">
          <div class="form-group">
            <label for="personname">{{childtype}} Name:</label>
            <input
              id="personname"
              v-model="personData.personname"
              type="text"
              name="personname"
              class="form-control"
              v-validate="'required|alpha'"
            >
            <span class="error" v-show="errors.has('personname')">{{ errors.first('personname') }}</span>
          </div>

          <div class="form-group">
            <label for="bio">{{childtype}}'s gender: &nbsp;</label>
            <label for="male">
              <input
                id="male"
                v-model="personData.sex"
                name="genderradiogroup"
                v-validate="'required|included:Male,Female'"
                type="radio"
                value="Male"
              > Male
            </label>
            &nbsp; &nbsp; &nbsp;
            <label for="female">
              <input
                id="female"
                v-model="personData.sex"
                name="genderradiogroup"
                type="radio"
                value="Female"
              > Female
            </label>
            <br>
            <span
              class="error"
              v-show="errors.has('genderradiogroup')"
            >{{ errors.first('genderradiogroup') }}</span>
          </div>

          <div class="form-group">
            <label for="bio">{{childtype}}'s bio:</label>
            <br>

            <textarea
              id="bio"
              name="bio"
              v-validate="'required|alpha'"
              v-model="personData.bio"
              rows="5"
              class="form-control"
            />
            <span class="error" v-show="errors.has('bio')">{{ errors.first('bio') }}</span>
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
  data: function() {
    return {
      personData: {
        personname: "",
        sex: "",
        bio: ""
      },
      childAlert: {
        variant: "",
        message: ""
      },
      newActorNames:[],
      reloadActorMultiSelectAfterUpdate:Function,
    };
  },

  props: ["childtype"],
  methods: {
    //method used to get all fields that are entered in person modal
     personsubmited() {
      if (this.childtype == "Actor") {
        console.log(this.childtype);

         axios
          .post("http://195.201.189.119:63790/actors", this.personData)
          .then(res => {
            console.log(res.status);
          })
          .catch(error => {
            console.log(error);
            this.callDangerAlert();
          });


          axios
          .get("http://195.201.189.119:63790/actors").then(response=>{
            console.log(response.data)
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
        this.newActorNames = producerNamesOption;


          });
        //  this.reloadActorMultiSelectAfterUpdate();
        this.callSuccessAlert();
      } else if (this.childtype == "Producer") {
        console.log(this.childtype);
        axios
          .post("http://195.201.189.119:63790/producers", this.personData)
          .then(res => {
            console.log(res.status);
          })
          .catch(error => {
            console.log(error);
            this.callDangerAlert();
          });
        this.callSuccessAlert();
      }

      this.$emit("close" + this.childtype + "Modal",this.personData);
      
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.personsubmited();
          return;
        }
        alert("Please enter all the details!");
      });
    },
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
