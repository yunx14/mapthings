function getProviderDetails(providerID) {
  var provider = getProvider(providerID);
  var providerContainer = $('#detail-content');

  providerContainer.find(".distance").text(provider.addresses[0].distance+" mi");

  providerContainer.find('.first').text(provider.name.first);
  providerContainer.find('.middle').text(provider.name.middle);
  providerContainer.find('.last').text(provider.name.last);

  providerContainer.find('.street-address').text(provider.addresses[0].address);
  providerContainer.find('.city').text(provider.addresses[0].city);
  providerContainer.find('.state').text(provider.addresses[0].state);
  providerContainer.find('.zip').text(provider.addresses[0].zip);

  providerContainer.find('.tel').text(telFormatter(provider.addresses[0].phone));

  providerContainer.find('.npi').text(provider.npi);

  if(provider.accepting == 'accepting') {
    providerContainer.find('.accepting').text("Accepting new patients");
    providerContainer.find('.accepting').addClass('active');
  }

  for(var k=0; k<provider.specialty.length; k++) {
    providerContainer.find(".provider-specialty").append("<li class='specialty'>" + provider.specialty[k] + "</li>");
  }

  for(var j=0; j<provider.languages.length; j++) {
    providerContainer.find(".provider-language").append("<li class='language'>" + provider.languages[j] + "</li>");
  }

  for (var l=0; l<provider.plans.length; l++) {
    providerContainer.find('.provider-networks').append("<li class='network'>" + provider.plans[l].network_tier + "</li>");
  }

  providerContainer.find('.hours').text(provider.hours);

  providerContainer.find('.gender').text(telFormatter(provider.gender));

  for (var m=0; m<provider.addresses.length; m++) {
    providerContainer.find(".provider-address-other").append("<li class='other-address'><span class='street-address'>"+provider.addresses[m].address+"</span><span class='city'>"+provider.addresses[m].city+"</span><span class='state'>"+provider.addresses[m].state+"</span><span class='zip'>"+provider.addresses[m].zip+"</span></li>");
  }

   mapLocation(provider.addresses[0]);
}

function getProvider(providerID) {
  for (var i = 0; i < oneThousandProviders.length; i++) {
    if (oneThousandProviders[i].npi === providerID) {
      return oneThousandProviders[i];
    }
  }
  return null;
}

function mapLocation(providerAddress) {
  var map = new google.maps.Map(document.getElementById('map-location'), {
		center: new google.maps.LatLng(providerAddress.lat, providerAddress.lng),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 14,
		scrollwheel: false,
		disableDefaultUI: false,
		mapTypeControl: false,
    zoomControl: true,
		backgroundColor: '#fff'
	});

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(providerAddress.lat, providerAddress.lng),
    icon: purpleIcon,
    map: map
  });
}
