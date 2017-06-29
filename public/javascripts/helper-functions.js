
var purpleIcon = '/images/purple-icon.png';
var blackIcon = '/images/black-icon.png';

function telFormatter (tel) {
    return tel.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

/* Haversine Formula*/
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;
  var km = 12742 * Math.asin(Math.sqrt(a));
  var miles = 0.62137119 * km;

  return miles;
}

function needleInHaystack(needle, haystack) {
	return haystack.some(function(v) {
		return needle.indexOf(v) >= 0;
	});
}

function reverseGeocode(lat, lng, elementID) {
    var latlng = new google.maps.LatLng(lat, lng);
    // This is making the Geocode request
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        // This is checking to see if the Geoeode Status is OK before proceeding
        if (status == google.maps.GeocoderStatus.OK) {
          var components=results[0].address_components,
              state,
              city;

          for (var component=0;component<(components.length);component++){
              if(components[component].types[0]=="administrative_area_level_1"){
                  state=components[component].long_name;
              }
              if(components[component].types[0]=="locality"){
                  city=components[component].long_name;
              }
          }

          elementID.val(city+", "+state);
        }
    });
}
