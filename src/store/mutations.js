import * as types from './mutationTypes';

export default {
  [types.ADD_MARKER](state, marker) {
    state.markers.push(marker);
  },
  [types.RESET_MARKERS](state) {
    state.markers = [];
  },
  [types.RESET_NEARBY_PLACE](state) {
    state.nearbyPlaces = [];
  },
  [types.RESET_PAGINATION](state) {
  	state.pagination = {
  		getNextPage: null,
  		hasNextPage: false,
  		fetchingMoreResults: false
  	}
  },
  [types.UPDATE_NEXT_PAGE](state, getNextPage) {
    state.pagination.getNextPage = getNextPage;
  },
  [types.UPDATE_HAS_NEXT_PAGE](state, hasNextPage) {
    state.pagination.hasNextPage = hasNextPage;
  },
  [types.ADD_NEARBY_PLACE](state, place) {
    state.nearbyPlaces.push(place);
  },
  [types.UPDATE_FETCHING_LOCATION](state, value) {
    state.fetchingLocation = value;
  },
  [types.UPDATE_FETCHING_MORE_RESULTS](state, value) {
    state.pagination.fetchingMoreResults = value;
  }
};