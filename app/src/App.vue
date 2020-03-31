<template>
  <div id="app">
    test
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",

  mounted() {
    // axios.get("http://127.0.0.1:5000").then(response => {
    //   console.log(response);
    // });

    // axios.get("http://127.0.0.1:5000/test").then(response => {
    //   console.log(response);
    // });

    const features = {};
    features['longitude'] = 0;
    features['latitude'] = 0;
    features['housing_median_age'] = 0;
    features['total_rooms'] = 0;
    features['total_bedrooms'] = 0;
    features['population'] = 0;
    features['households'] = 0;
    features['median_income'] = 0;
    features['rooms_per_household'] = 0;
    features['population_per_household'] = 0;
    features['bedrooms_per_room'] = 0;
    features['x0_<1H OCEAN'] = 0;
    features['x0_INLAND'] = 0;
    features['x0_ISLAND'] = 0;
    features['x0_NEAR BAY'] = 0;
    features['x0_NEAR OCEAN'] = 0;

    axios.post("http://127.0.0.1:5000/median-house-value", features)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  //   axios.post("http://127.0.0.1:5000/median-house-value", {
  //     longitude: 0,
  //     latitude: 0,
  //     housing_median_age: 0,
  //     total_rooms: 0,
  //     total_bedrooms: 0,
  //     population: 0,
  //     households: 0,
  //     median_income: 100000,
  //     rooms_per_household: 0,
  //     population_per_household: 0,
  //     bedrooms_per_room: 0,
  //     a: 0,
  //     b: 0,
  //     c: 0,
  //     d: 0,
  //     e: 0
  //   })
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }
};
</script>

<style lang="scss">
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
