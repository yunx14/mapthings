var map;
var infoWindow = new google.maps.InfoWindow({
	content: document.getElementById('info-content')
});
var center;
var bounds; // this gets updated whenever the map is moved
var markers = [];
var geocoder = new google.maps.Geocoder();
//var usersPosition;
var userSuppliedPosition;
var defaultPosition = {latitude: '37.760105876525735', longitude: '-122.47973245300295'}; //Random default center position
var defaultZoom = 11;

// Geolocate the user's position
/*
function getUserGeolocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
}
function showPosition(position) {
	usersPosition = position.coords;
	mapAddresses();
}
*/

// CREATE A MAP THAT DISPLAYS THE ADDRESSES
function mapAddresses(providers, position) {
	// This is just for when no location is supplied, it uses defaultPosition
	if (userSuppliedPosition === undefined) {
		position = defaultPosition;
	} else {
		position = userSuppliedPosition;
	}

	map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(position.latitude, position.longitude),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: defaultZoom,
		scrollwheel: false,
		disableDefaultUI: false,
		mapTypeControl: false,
		backgroundColor: '#fff'
	});

	markers = []; //reset markers
	bounds = new google.maps.LatLngBounds(); // reset bounds
	//TODO this should be moved out of the map module
	$('.provider-facility').not(':first').remove(); // reset list

	if (typeof providers !== 'undefined' && providers.length > 0) {
		//TODO this should be moved out of the map module
		$("#results-nav").show();
		$("#start-message").hide();
		//
		for (var i = 0; i < providers.length; i++) {
			markers[i] = new google.maps.Marker({
				position: new google.maps.LatLng(providers[i].addresses[0].lat, providers[i].addresses[0].lng),
				icon: purpleIcon,
				map: map
			});
			markers[i].placeResult = providers[i];
			markers[i].markerID = i;
			google.maps.event.addListener(markers[i], 'click', showInfoWindow);
			google.maps.event.addListener(markers[i], 'mouseover', highlightListItem);
			google.maps.event.addListener(markers[i], 'mouseout', unhighlightListItem);
			google.maps.event.addListener(markers[i], 'mouseover', mouseOverIcon);
			google.maps.event.addListener(markers[i], 'mouseout', mouseOutIcon);
			//TODO this should be moved out of the map module
			providerTemplate(providers[i], i);
		}
		//TODO this should be moved out of the map module
		handleLoadMoreButton();
		filterAmt();
	}
	//TODO this should be moved out of the map module
	allFilteredData = providers;

	navBar.writeResultsQty(navBar.getAllResultsQty(providers));
	//

	if (markers.length > 1) {
		for (var j = 0; j < markers.length; j++) {
			bounds.extend(markers[j].getPosition());
		}
		map.fitBounds(bounds);
	} else if (markers.length == 1){
		map.setCenter(new google.maps.LatLng(markers[0].position.lat(), markers[0].position.lng()));
	}

	var markerCluster = new MarkerClusterer(map, markers, {gridSize: 30, imagePath: "/images/m"});

	// On map move get the new center and bounds of the map
	google.maps.event.addListener(map, 'idle', function() {
		center = map.getCenter();
		bounds = map.getBounds();
	});
/*
	google.maps.event.addListener(map, 'dragend', function(){
		var center = map.getCenter();
		var ltln = map.getBounds();
		bounds = ltln;
		console.log(center.lat());
		console.log(center.lng());
		console.log(ltln.contains({lat: 37.78443480816532, lng: -122.41616952818606}));
	});

	google.maps.event.addListener(map, 'zoom_changed', function(){
		var center = map.getCenter();
		var ltln = map.getBounds();
		console.log('bounds changed '+ltln+' with center at '+center);
	});
	*/

	$(".provider-facility").click(function() {
		var id = this.dataset.resultIndex;
		google.maps.event.trigger(markers[id], 'click');
	});

	$(".provider-facility").hover(function() {
		var id = this.dataset.resultIndex;
		markers[id].setIcon("/images/hover-icon.png");
	}, function() {
		var id = this.dataset.resultIndex;
		markers[id].setIcon("/images/purple-icon.png");
	});

}

// Change Icon for hover
function mouseOverIcon() {
	var marker = this;
	marker.setIcon("/images/hover-icon.png");
}

function mouseOutIcon() {
	var marker = this;
	marker.setIcon("/images/purple-icon.png");
}

// When a user hovers over a map marker it should hightlight the corresponding list item
function highlightListItem() {
	$("#provider-facility-"+this.markerID).addClass('hover');
}

function unhighlightListItem() {
	$("#provider-facility-"+this.markerID).removeClass('hover');
}

// Populate the popup that shows when you click a marker
function showInfoWindow() {
	var marker = this;
	infoWindow.open(map, marker);
	buildIWContent(marker.placeResult);
}

function buildIWContent(place) {
	var infoWindowCont = $("#info-content");
	infoWindowCont.find('.place-name').text(place.name.first+" "+place.name.middle+" "+place.name.last);
	infoWindowCont.find('.place-street').text(place.addresses[0].address);
	infoWindowCont.find('.place-city').text(place.addresses[0].city);
	infoWindowCont.find('.place-state').text(place.addresses[0].state);
	infoWindowCont.find('.place-zip').text(place.addresses[0].zip);
	infoWindowCont.find('.place-tel').text(telFormatter(place.addresses[0].phone));
}



// ADD DISTANCE TO FOR EACH ADDRESS
function searchNearby(lat, lng) {
	for (var i = 0; i < allProviders.length; i++) {
		for (var j = 0; j < allProviders[i].addresses.length; j++) {
			allProviders[i].addresses[j].distanceFrom = distance(lat, lng, allProviders[i].addresses[j].lat, allProviders[i].addresses[j].lng);
		}
	}
	//console.log(allProviders);
}

//Places Autocomplete
function places(elementID) {
   	var autocomplete = new google.maps.places.Autocomplete(
   		(
          document.getElementById(elementID)), {
          types: ['(regions)'],
          componentRestrictions: {'country': 'us'}
        });


   	autocomplete.addListener('place_changed', function () {

		// Get the place details from the autocomplete object.
		var place = autocomplete.getPlace();
		//console.log(place.geometry.location.lat());
		//console.log(place.geometry.location.lng());

		// Send GeoCode to searchNearby
		//searchNearby(place.geometry.location.lat(), place.geometry.location.lng());

		// Save the lat/lng coordinates to userSuppliedPosition
		userSuppliedPosition = {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()};

		//console.log(place);

 	});

 return true;
}
