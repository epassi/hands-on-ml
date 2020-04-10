<template>
  <div id="app">
    <form class="form" action="">
      <label for="latitude">Latitude</label>
      <input type="number" name="latitude" id="" v-model="latitude">
      <label for="longitude">Longitude</label>
      <input type="number" name="longitude" id="" v-model="longitude">
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

const Stats = Object.freeze({
  longitude: {
    mean: -119.57583393895324,
    std: 2.0018602443854547
  },
  latitude: {
    mean: 35.63957727713184,
    std: 2.1380575446331753
  },
  housingMedianAge: {
    mean: 28.6531007751938,
    std: 12.574725974901003
  },
  totalRooms: {
    mean: 2622.7283187984494,
    std: 2138.4584192430398
  },
  totalBedrooms: {
    mean: 534.9738901797725,
    std: 412.69904106103536
  },
  population: {
    mean: 1419.7908187984497,
    std: 1115.6862406181137
  },
  households: {
    mean: 497.06038032945736,
    std: 375.7208452055105
  },
  medianIncome: {
    mean: 3.8755893653100983,
    std: 1.9049495984468043
  },
  roomsPerHousehold: {
    mean: 5.4403405264058895,
    std: 2.6117118136335082,
  },
  populationPerHousehold: {
    mean: 3.0964373824861813,
    std: 11.584825942269669
  },
  bedroomsPerRoom: {
    mean: 0.21287796917099294,
    std: 0.05737925003136537
  }
});

// standardScore = (featureValue - meanAttributeValue) / stdDevAttributeValue
// standardScore * stdDevAttributeValue = featureValue - meanAttributeValue
// standardScore * stdDevAttributeValue + meanAttributeValue = featureValue
const standardScore = (feature, stats) => (feature - stats.mean) / stats.std;

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
      housingMedianAge: 29.0,
      totalRooms: 6447.0,
      totalBedrooms: 1012.0,
      population: 2184.0,
      households: 960.0,
      medianIncome: 8.2816,
      oceanProximity: OceanProximity.LESS_THAN_HOUR,
      medianHouseValue: 0

      // longitude: -117.86,
      // latitude: 33.77,
      // housingMedianAge: 39.0,
      // totalRooms: 4159.0,
      // totalBedrooms: 655.0,
      // population: 1669.0,
      // households: 651.0,
      // medianIncome: 4.6111,
      // oceanProximity: OceanProximity.LESS_THAN_HOUR,
      // medianHouseValue: 0

      // longitude: -119.05,
      // latitude: 34.21,
      // housingMedianAge: 27.0,
      // totalRooms: 4357.0,
      // totalBedrooms: 926.0,
      // population: 2110.0,
      // households: 876.0,
      // medianIncome: 3.0119,
      // oceanProximity: OceanProximity.LESS_THAN_HOUR,
      // medianHouseValue: 0
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
      features['longitude'] = standardScore(this.longitude, Stats.longitude);
      features['latitude'] = standardScore(this.latitude, Stats.latitude);
      features['housing_median_age'] = standardScore(this.housingMedianAge, Stats.housingMedianAge);
      features['total_rooms'] = standardScore(this.totalRooms, Stats.totalRooms);
      features['total_bedrooms'] = standardScore(this.totalBedrooms, Stats.totalBedrooms);
      features['population'] = standardScore(this.population, Stats.population);
      features['households'] = standardScore(this.households, Stats.households);
      features['median_income'] = standardScore(this.medianIncome, Stats.medianIncome);
      features['rooms_per_household'] = standardScore(this.roomsPerHousehold, Stats.roomsPerHousehold);
      features['population_per_household'] = standardScore(this.populationPerHousehold, Stats.populationPerHousehold);
      features['bedrooms_per_room'] = standardScore(this.bedroomsPerRoom, Stats.bedroomsPerRoom);
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
