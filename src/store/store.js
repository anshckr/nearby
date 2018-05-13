import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    markers: [],
    nearbyPlaces: [],
    fetchingLocation: false,
    pagination: {
      hasNextPage: false,
      getNextPage: null,
      fetchingMoreResults: false
    }
  },
  getters,
  mutations,
  actions
});
