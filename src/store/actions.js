import * as types from './mutationTypes';

export default {
  findNearby({ commit }, center) {
    const map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 15
    });

    const request = {
      location: center,
      radius: '8047',
      type: ['bank', 'atm', 'pharmacy', 'hospital', 'airport', 'local_government_office', 'train_station', 'bus_station']
    };

    const callback = (results, status, pagination) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK) return;

      for (let i = 0; i < results.length; i++) {
        let place = results[i];
        const getNextPage = pagination.hasNextPage && function() {
          pagination.nextPage();
        };
        addMarker(place);
        commit(types.UPDATE_HAS_NEXT_PAGE, pagination.hasNextPage);
        commit(types.UPDATE_NEXT_PAGE, getNextPage);
        commit(types.ADD_NEARBY_PLACE, place);
      }

      commit(types.UPDATE_FETCHING_MORE_RESULTS, false);
    };

    const addMarker = (place) => {
      var marker = new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      });

      commit(types.ADD_MARKER, marker);
    }

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
}