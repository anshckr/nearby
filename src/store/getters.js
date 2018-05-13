export default {
  markers(state) {
    return state.markers;
  },
  nearbyPlaces(state) {
    return state.nearbyPlaces;
  },
  getNextPage(state) {
  	return state.pagination.getNextPage;
  },
  hasNextPage(state) {
  	return state.pagination.hasNextPage;
  },
  fetchingMoreResults(state) {
  	return state.pagination.fetchingMoreResults;
  },
  fetchingLocation(state) {
  	return state.fetchingLocation;
  }
};