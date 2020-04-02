<template>
  <div id="app">
    <form class="form" action="">
      <label for="longitude">Longitude</label>
      <input type="number" name="longitude" id="" v-model="longitude">
      <label for="latitude">Latitude</label>
      <input type="number" name="latitude" id="" v-model="latitude">
      <label for="housingMedianAge">Housing Median Age</label>
      <input type="number" name="housingMedianAge" id="" v-model="housingMedianAge">
      <label for="totalRooms">Total Rooms</label>
      <input type="number" name="totalRooms" id="" v-model="totalRooms">
      <label for="totalBedrooms">Total Bedrooms</label>
      <input type="number" name="totalBedrooms" id="" v-model="totalBedrooms">
      <label for="population">Population</label>
      <input type="number" name="population" id="" v-model="population">
      <label for="households">Households</label>
      <input type="number" name="households" id="" v-model="households">
      <label for="medianIncome">Median Income</label>
      <input type="number" name="medianIncome" id="" v-model="medianIncome">
      <label for="oceanProximity">Ocean Proximity</label>
      <select name="oceanProximity" id="" v-model="oceanProximity">
        <option value="lessThanHour">Under 1 Hour from Ocean</option>
        <option value="inland">Inland</option>
        <option value="island">Island</option>
        <option value="nearBay">Near Bay</option>
        <option value="nearOcean">Near Ocean</option>
      </select>
      <label for="medianHouseValue">Median House Value</label>
      <p name="medianHouseValue">{{ medianHouseValue }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const OceanProximity = Object.freeze({
  LESS_THAN_HOUR: "lessThanHour",
  INLAND: "inland",
  ISLAND: "island",
  NEAR_BAY: "nearBay",
  NEAR_OCEAN: "nearOcean"
});

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

export default {
  name: "App",

  data() {
    return {
      longitude: -118.39,
      latitude: 34.12,
      housingMedianAge: 29,
      totalRooms: 6447,
      totalBedrooms: 1012,
      population: 2184,
      households: 960,
      medianIncome: 8.2816,
      oceanProximity: OceanProximity.LESS_THAN_HOUR,
      medianHouseValue: 0
      // features['x0_<1H OCEAN'] = 1;
      // features['x0_INLAND'] = 0;
      // features['x0_ISLAND'] = 0;
      // features['x0_NEAR BAY'] = 0;
      // features['x0_NEAR OCEAN'] = 0;
    };
  },

  computed: {
    roomsPerHousehold() {
      return this.totalRooms / this.households;
    },

    populationPerHousehold() {
      return this.population / this.households;
    },

    bedroomsPerRoom() {
      return this.totalBedrooms / this.totalRooms;
    },

    oceanProximityVector() {
      return [
        this.oceanProximity === OceanProximity.LESS_THAN_HOUR ? 1 : 0,
        this.oceanProximity === OceanProximity.INLAND ? 1 : 0,
        this.oceanProximity === OceanProximity.ISLAND ? 1 : 0,
        this.oceanProximity === OceanProximity.NEAR_BAY ? 1 : 0,
        this.oceanProximity === OceanProximity.NEAR_OCEAN ? 1 : 0,
      ];
    }
  },

  watch: {
    longitude() {
      this.predict();
    },

    latitude() {
      this.predict();
    },

    housingMedianAge() {
      this.predict();
    },

    totalRooms() {
      this.predict();
    },

    totalBedrooms() {
      this.predict();
    },

    population() {
      this.predict();
    },

    households() {
      this.predict();
    },

    medianIncome() {
      this.predict();
    },

    oceanProximity() {
      this.predict();
    },

    roomsPerHousehold() {
      this.predict();
    },

    populationPerHousehold() {
      this.predict();
    },

    bedroomsPerRoom() {
      this.predict();
    }
  },

  methods: {
    predict() {
      const features = {};
      features['longitude'] = this.longitude;
      features['latitude'] = this.latitude;
      features['housing_median_age'] = this.housingMedianAge;
      features['total_rooms'] = this.totalRooms;
      features['total_bedrooms'] = this.totalBedrooms;
      features['population'] = this.population;
      features['households'] = this.households;
      features['median_income'] = this.medianIncome;
      features['rooms_per_household'] = this.roomsPerHousehold;
      features['population_per_household'] = this.populationPerHousehold;
      features['bedrooms_per_room'] = this.bedroomsPerRoom;
      features['x0_<1H OCEAN'] = this.oceanProximityVector[0];
      features['x0_INLAND'] = this.oceanProximityVector[1];
      features['x0_ISLAND'] = this.oceanProximityVector[2];
      features['x0_NEAR BAY'] = this.oceanProximityVector[3];
      features['x0_NEAR OCEAN'] = this.oceanProximityVector[4];

      axios.post("http://127.0.0.1:5000/median-house-value", features)
      .then(response => {
        // console.log(response);
        this.medianHouseValue = currency.format(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },

  mounted() {
    // axios.get("http://127.0.0.1:5000").then(response => {
    //   console.log(response);
    // });

    // axios.get("http://127.0.0.1:5000/test").then(response => {
    //   console.log(response);
    // });
    this.predict();
  }

};
</script>

<style lang="scss">
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.form {
  margin: 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
}
</style>
