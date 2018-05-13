<template>
  <div>
    <div>
      <h2>Search/Use Location And Find Nearby</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace"
          class='pac-input'
        >
        </gmap-autocomplete>
        <button v-if="!fetchingLocation" @click="geolocate" class="btn--location">Use My Location</button>
        <button v-else :disabled="fetchingLocation" class="btn--location">Fetching...</button>
        <button :disabled="fetchingLocation" @click="findNearby">Find Nearby</button>
      </label>
      <br/>
    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      class='map'
      id='map'
      ref='mapRef'
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
      ></gmap-marker>
    </gmap-map>
    <div class="results-panel">
      <h2>Results</h2>
      <ul class="results-panel__list">
        <li
          :key="index"
          v-for="(m, index) in nearbyPlaces"
        >{{ m.name }}</li>
      </ul>
      <button v-if="!fetchingMoreResults" class="btn--more" id="more" :disabled="!hasNextPage" @click="loadMoreResults">More results</button>
      <button v-else class="btn--more" id="more" :disabled="fetchingMoreResults">Fetching More...</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import * as types from '../store/mutationTypes';
import {gmapApi} from 'vue2-google-maps'

export default {
  name: "GoogleMap",
  data() {
    return {
      // change this to whatever makes sense
      center: { lat: 19.076, lng: 72.877 }
    };
  },

  mounted () {
    // At this point, the child GmapMap has been mounted, but
    // its map has not been initialized.
    // Therefore we need to write mapRef.$mapPromise.then(() => ...)
 
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo(this.center);
    })
  },

  computed: {
    ...mapGetters({
      fetchingLocation: 'fetchingLocation',
      getNextPage: 'getNextPage',
      hasNextPage: 'hasNextPage',
      markers: 'markers',
      nearbyPlaces: 'nearbyPlaces',
      fetchingMoreResults: 'fetchingMoreResults'
    }),
    google: gmapApi
  },

  methods: {
    // receives a place object via the auto-complete component
    setPlace(place) {
      const latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      this.center = latLng;
      this.resetResults();
    },
    findNearby() {
      // do relevant places finding here
      this.$store.dispatch('findNearby', this.center);
    },
    geolocate: function() {
      this.$store.commit(types.UPDATE_FETCHING_LOCATION, true);
      navigator.geolocation.getCurrentPosition(this.geoLocateSuccess, this.geoLocateError, { maximumAge: 60000, timeout: 10000, enableHighAccuracy: true });
    },
    geoLocateSuccess: function(position) {
      const latLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.center = latLng;
      this.resetResults();
      this.$store.commit(types.UPDATE_FETCHING_LOCATION, false);
    },
    geoLocateError: function(err) {
      alert(`ERROR(${err.code}): ${err.message}`);
      this.$store.commit(types.UPDATE_FETCHING_LOCATION, false);
    },
    resetResults: function() {
      this.$store.commit(types.RESET_MARKERS);
      this.$store.commit(types.RESET_NEARBY_PLACE);
      this.$store.commit(types.RESET_PAGINATION);
    },
    loadMoreResults() {
      this.$store.commit(types.UPDATE_FETCHING_MORE_RESULTS, true);
      this.getNextPage();
    }
  }
};
</script>

<style>
  .map {
    height: 400px;
    margin: 0 auto;
    width: 600px;
  }

  .pac-input {
    border-radius: 5px;
    border: 0;
    box-shadow: 0 3px 15px 0 rgba(123,123,123,0.5);
    height: 40px;
    padding: 0 15px;
    width: 340px;
  }

  input:focus {
    outline: none;
  }

  .results-panel {
    background: #fff;
    border: 1px solid #999;
    font-family: Arial, Helvetica, sans-serif;
    height: 330px;
    padding: 0 10px;
    position: fixed;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    z-index: 5;
  }

  h2 {
    font-size: 22px;
    margin: 0 0 5px 0;
  }

  .results-panel__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 271px;
    overflow-y: scroll;
  }

  li {
    background-color: #f1f1f1;
    padding: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  li:nth-child(odd) {
    background-color: #fcfcfc;
  }

  .btn--more {
    width: 100%;
    margin: 5px 0 0 0;
  }

  .btn--location {
    width: 120px;
  }
</style>