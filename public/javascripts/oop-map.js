var gMap = {
  map : {},
  markers : [],
  infoWindow : new google.maps.InfoWindow({
  	content: document.getElementById('info-content')
  }),
  zoom : 11,
  bounds : {},

  providerMap: function() {
    var start = parseInt(app.start),
        end = (start+9);
    end = end > app.results.length ? app.results.length-1 : end;

    gMap.map = new google.maps.Map(document.getElementById('map'), {
  		center: new google.maps.LatLng(app.location.latitude, app.location.longitude),
  		mapTypeId: google.maps.MapTypeId.ROADMAP,
  		zoom: gMap.zoom,
  		scrollwheel: false,
  		disableDefaultUI: false,
  		mapTypeControl: false,
  		backgroundColor: '#fff'
  	});

    gMap.markers = []; //reset markers
  	gMap.bounds = new google.maps.LatLngBounds(); // reset bounds

    for (var i = start, h=0; i <= end; i++, h++) { // make h more understandable
			gMap.markers[h] = new google.maps.Marker({
				position: new google.maps.LatLng(app.results[i].addresses[0].lat, app.results[i].addresses[0].lng),
				map: gMap.map,
        placeResult : app.results[i],
        markerID : i
			});
      attachClickInfo(gMap.markers[h]);
		}

    function attachClickInfo(marker) {
      marker.addListener('click', function() {
        gMap.infoWindow.open(gMap.map, marker);
      	gMap.buildIWContent(marker.placeResult);
      });
    }

    //TODO this miscalculates the markers array length
    if ((end-start) === 0) {
      gMap.map.setCenter(new google.maps.LatLng(gMap.markers[0].position.lat(), gMap.markers[0].position.lng()));
      // TODO set a default zoom level
    } else {
      for (var j = 0; j < gMap.markers.length; j++) {
  			gMap.bounds.extend(gMap.markers[j].getPosition());
  		}
  		gMap.map.fitBounds(gMap.bounds);
    }

    // if (gMap.markers.length > 1) {
  	// 	for (var j = 0; j < gMap.markers.length; j++) {
  	// 		gMap.bounds.extend(gMap.markers[j].getPosition());
  	// 	}
  	// 	gMap.map.fitBounds(gMap.bounds);
  	// } else if (gMap.markers.length == 1){
  	// 	gMap.map.setCenter(new google.maps.LatLng(gMap.markers[0].position.lat(), gMap.markers[0].position.lng()));
  	// }
  },

  buildIWContent : function(place) {
  	var infoWindowCont = $("#info-content");
  	infoWindowCont.find('.place-name').text(place.name.first+" "+place.name.middle+" "+place.name.last);
  	infoWindowCont.find('.place-street').text(place.addresses[0].address);
  	infoWindowCont.find('.place-city').text(place.addresses[0].city);
  	infoWindowCont.find('.place-state').text(place.addresses[0].state);
  	infoWindowCont.find('.place-zip').text(place.addresses[0].zip);
  	//infoWindowCont.find('.place-tel').text(telFormatter(place.addresses[0].phone));
  }
};
