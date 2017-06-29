function providerTemplate(provider, i) {
		var providerContainer = $('#provider-facility-template').first().clone().appendTo("#provider-list");
		providerContainer.attr("id","provider-facility-"+i);
		providerContainer.attr("data-result-index", i);
		providerContainer.find('.provider-link').attr("href", "/location/"+provider.npi);
		providerContainer.find('.first').text(provider.name.first);
		providerContainer.find('.middle').text(provider.name.middle);
		providerContainer.find('.last').text(provider.name.last);
		providerContainer.find('.street-address').text(provider.addresses[0].address);
		providerContainer.find('.city').text(provider.addresses[0].city);
		providerContainer.find('.state').text(provider.addresses[0].state);
		providerContainer.find('.zip').text(provider.addresses[0].zip);
		providerContainer.find('.tel').text(telFormatter(provider.addresses[0].phone));
		providerContainer.find('.distance').text(provider.addresses[0].distance+" mi"); // TODO temp data
		providerContainer.find('.provider-distance').prepend("<div class='provider-score'><span class='score'>"+provider.fakescore+"</span>/10</div>");
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

}
