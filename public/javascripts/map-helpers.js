/* CONVERTS ADDRESSES TO GEOCODES FROM '.provider-address' */
var addressWithGeo = [];

function geocodeEverything() {
	$('.provider-address').each(function(index) {
		var addressObj = {};
		addressObj.address = $.trim($(this).text().replace(/\r?\n|\r/g, ""));
		addressObj.geocode = getGeoCode(addressObj.address, index);
		addressWithGeo.push(addressObj);
	});
}

function getGeoCode(address, index) {
	geocoder.geocode({'address' : address}, function(results, status) {
		if( status == google.maps.GeocoderStatus.OK) {
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
			addressWithGeo[index].geocode = {lat: lat, lng: lng};
		} else {
	        alert('Geocode was not successful for the following reason: ' + status);
	    }
	});
}

// CREATES A MAP OBJECT FOR THE N'TH $('.PROVIDER-ADDRESS')
function codeAddress(num) {
  var address = $(".provider-address").eq(num).text();

  geocoder.geocode( { 'address' : address }, function( results, status ) {
      if( status == google.maps.GeocoderStatus.OK ) {

          //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
          map = new google.maps.Map(document.getElementById('map'), {
          	center: results[0].geometry.location,
          	zoom: 12
          });
          var marker = new google.maps.Marker( {
              map     : map,
              position: results[0].geometry.location
          } );
      } else {
          alert( 'Geocode was not successful for the following reason: ' + status );
      }
  });
}

// Add the geocode property to addresses in array of objects
function addGeocodeToAddress(array) {
	for (var i=0; i<array.length; i++) {
		var address = array[i].addresses[0].address+" "+array[i].addresses[0].city+" "+array[i].addresses[0].state;
		array[0].addresses[0].lat = getLtnLng(address);
	}
}

// Pass in an address and recieve a Maps Api Lat/Lng object
function getLtnLng(address) {
	geocoder.geocode({'address' : address}, function(results, status) {
		if( status == google.maps.GeocoderStatus.OK) {
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
			return {lat: lat, lng: lng};
		} else {
			alert('Geocode was not successful for the following reason: ' + status);
		}
	});
}
