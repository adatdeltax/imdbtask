import axios from "axios";
const apiService = {
  async getActors() {
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
      return actorNamesOption;
    } catch (error) {
      alert(
        '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
      );
    }
  },
  async getProducers() {
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
      return producerNamesOption;
    } catch (error) {
      alert(
        '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
      );
    }
  },
  async getMovieDetailsFromRoute(moveId) {
    try {
      let response = await axios.get(
        `http://195.201.189.119:63790/movies/` + moveId
      );
      return response.data;
    } catch (error) {
      alert(
        '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
      );
    }
  },
  async getAllMovies() {
    try {
      let response = await axios.get("http://195.201.189.119:63790/movies");
      return response.data;
    } catch (error) {
      alert(
        '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
      );
    }
  },
  async updateMovie(movieId, movieData) {
    try {
      let response = await axios.put(
        `http://195.201.189.119:63790/movies/` + movieId,
        movieData
      );
      return response.status;
    } catch (error) {
      alert(
        '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
      );
    }
  },
  async submitMovie(movieData) {
    try {
      let response = await axios.post(
        "http://195.201.189.119:63790/movies",
        movieData
      );
      return response.status;
    } catch (error) {
      alert(
        '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
      );
    }
  },
  async submitActor(actorData) {
    try {
      let response = await axios.post(
        "http://195.201.189.119:63790/actors",
        actorData
      );
      return response.status;
    } catch (error) {
      alert(
        '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
      );
    }
  },
  async submitProducer(producerData) {
    try {
      let response = await axios.post(
        "http://195.201.189.119:63790/producers",
        producerData
      );
      return response.status;
    } catch (error) {
      alert(
        '"Sorry. We are unable to fetch the data required. Please try again. If the problem persists contact support'
      );
    }
  }
};

export default apiService;
