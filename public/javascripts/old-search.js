var data = oneHundredProviders; //sampleData or allProviders or sfProviders
var allFilteredData = oneHundredProviders; // cache a list of currently filtered providers
var autoFiltering = 'on'; // turn on and off the qty of providers per filterpr
var providersToShow = 10; // this sets how many providers show up
var smartSearchOptions = {
	caseSensitive : false,
	maxInsertions : 1
};
var inNetwork = true;
var selectedNetworks = [];
var selectedGenders = [];
var selectedSpecialties = [];
var selectedLanguages = [];

function loadMoreProviders() {
	if (allFilteredData.length > providersToShow) {
		providersToShow += 10;
		unHideProviders();
		if (allFilteredData.length <= providersToShow) {
			hideLoadMoreButton();
		}
	}
}

function handleLoadMoreButton() {
	if (allFilteredData.length > providersToShow) {
		hideProviders();
		showLoadMoreButton();
	} else {
		hideLoadMoreButton();
	}
}

function showLoadMoreButton() {
	$("#load-more").removeClass('hidden');
}

function hideLoadMoreButton() {
	$("#load-more").addClass('hidden');
}

function unHideProviders() {
	$("li.provider-facility:lt("+providersToShow+"):not(:first)").css("display", "block");
}

function hideProviders() {
	$("li.provider-facility:gt("+providersToShow+")").css("display", "none");
}

$('.collapsible-trigger').click(function() {
	$(this).closest(".collapsible").toggleClass('open');
});

$(".tel").click(function(e){
	e.preventDefault();
});

function locationInput() {
	$(".toggle-element").show();
}

$(".toggle-control").click(locationInput);
$(".toggle-search").click(toggleSearch);
$("#load-more").click(loadMoreProviders);

function toggleSearch(e) {
	e.preventDefault();
	if ($(this).hasClass('search-button') === true) {
		if($("section.search-adjustable").hasClass("unfocused") === false) {
			return;
		}
	}
	$(".search-adjustable").toggleClass("unfocused");
}

// Check if values in one array match any of the values in another array
function needleInHaystack(needle, haystack) {
	return haystack.some(function(v) {
		return needle.indexOf(v) >= 0;
	});
}

// Function to separate out the URL Parameters
function getURLParams() {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
				// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			if (pair[1].indexOf('|') > -1) {
				query_string[pair[0]] = [];
				var arrVals = pair[1].split('|');
				for (var j=0; j<arrVals.length; j++) {
					query_string[pair[0]].push(decodeURIComponent(arrVals[j]));
				}
			} else {
				query_string[pair[0]] = decodeURIComponent(pair[1]);
			}
				// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
			query_string[pair[0]] = arr;
				// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}

var advancedSearch = {
	getAllGenders : function(data) {
		var tmpValues = [];
		for (var i=0; i<data.length; i++) {
			if (tmpValues.indexOf(data[i].gender) === -1) {
				tmpValues.push(data[i].gender);
			}
		}
		advancedSearch.populateGenders(tmpValues);
	},

	getAllLanguages : function(data) {
		var tmpValues = [];
		for (var i=0; i<data.length; i++) {
			for (var j=0; j<data[i].languages.length; j++) {
				if (tmpValues.indexOf(data[i].languages[j]) === -1) {
					tmpValues.push(data[i].languages[j]);
				}
			}
		}
		tmpValues = advancedSearch.languageSortOrder(tmpValues);
		advancedSearch.populateLanguages(tmpValues);
	},

	languageSortOrder : function(tmpValues) {
		var sortLanguages = ["English", "Spanish", "Chinese", "French", "Japanese", "Korean", "Portuguese", "Mandarin", "Russian", "German", "Tagalog", "Urdu"];
		var result = [];
		sortLanguages.forEach(function(key) {
			var found = false;
			tmpValues = tmpValues.filter(function(val) {
				if (!found && val == key) {
					result.push(val);
					found = true;
					return false;
				} else {
					return true;
				}
			});
		});
		return result;
	},

	getAllSpecialities : function(data) {
		var tmpValues = [];
		for (var i=0; i<data.length; i++) {
			for (var j=0; j<data[i].specialty.length; j++) {
				if (tmpValues.indexOf(data[i].specialty[j]) === -1) {
					tmpValues.push(data[i].specialty[j]);
				}
			}
		}
		tmpValues.sort();
		advancedSearch.populateSpecialities(tmpValues);
	},

	populateGenders : function(allGenders) {
		var frag = "";
		for (var i=0; i<allGenders.length; i++) {
			frag += "<label for='gender-"+allGenders[i]+"'><input type='checkbox' class='filtering' id='gender-"+allGenders[i]+"' name='gender-"+allGenders[i]+"' value='"+allGenders[i]+"'>"+allGenders[i]+"<span class='qty-count'></span></label>";
		}
		$("#gender-filter").html(frag);
	},

	populateLanguages: function(allLanguages) {
		var frag = "";
		for (var i=0; i<allLanguages.length; i++) {
			frag += "<label for='language-"+allLanguages[i]+"'><input type='checkbox' class='filtering' id='languages-"+allLanguages[i]+"' name='languages-"+allLanguages[i]+"' value='"+allLanguages[i]+"'>"+allLanguages[i]+"<span class='qty-count'></span></label>";
		}
		$("#language-filter").html(frag);
	},

	populateSpecialities : function(allSpecialties) {
		var frag = "";
		for (var i=0; i<allSpecialties.length; i++) {
			frag += "<label for='specialty-"+allSpecialties[i]+"'><input type='checkbox' class='filtering' id='specialty-"+allSpecialties[i]+"' name='specialty-"+allSpecialties[i]+"' value='"+allSpecialties[i]+"'>"+allSpecialties[i]+"<span class='qty-count'></span></label>";
		}
		$('#specialty-filter').html(frag);
	},

	// Filter listings based on whether they are in-network
	filterInNetwork : function(data) {
		var filteredData = [];
		if (inNetwork === false) {
			return data;
		} else {
			for (var i=0; i<data.length; i++) {
				if (data[i].plans[0].in_network === true) {
					filteredData.push(data[i]);
				}
			}
			return  filteredData;
		}
	},

	// Create a function to filter genders selected based on list of providers
	filterGenders : function(genders, data) {
		var filteredData = [];
		for (var i=0; i<data.length; i++) {
			if (data[i].gender == genders) {
				filteredData.push(data[i]);
			}
		}
		return filteredData;
	},

	// Create a function to filter based on languages selected based on list of providers
	filterLanguages : function(languages, data) {
		var filteredData = [];
		for (var i=0; i<data.length; i++) {
			var exists = needleInHaystack(data[i].languages, languages);
			if(exists === true) {
				filteredData.push(data[i]);
			}
		}
		return filteredData;
	},

	// Create a function to filter based on specialities selected from a list of providers
	filterSpecialities : function(specialty, data) {
		var filteredData = [];
		for (var i=0; i<data.length; i++) {
			var exists = needleInHaystack(data[i].specialty, specialty);
			if(exists === true) {
				filteredData.push(data[i]);
			}
		}
		return filteredData;
	},

	// Create a function to filter based on networks selected from list of providers
	// THIS USES 'AND' LOGIC - so all selections must get matched to return a result.
	filterNetworks : function(networks, data) {
			var filteredData = [];
			for (var i=0; i<data.length; i++) {
				if (data[i].plans.length >= networks.length) {
					var planNames = [];
					var networksInPlanNames = 0;
					for (var j=0; j<data[i].plans.length; j++) {
						if (planNames.indexOf(data[i].plans[j].network_tier) === -1) {
							planNames.push(data[i].plans[j].network_tier);
						}
					}
					for (var k=0; k<networks.length; k++) {
						if ($.inArray(networks[k], planNames) !== -1) {
							networksInPlanNames++;
						}
					}
					if (networksInPlanNames === networks.length) {
						filteredData.push(data[i]);
					}
				}
			}
		return filteredData;
	}
};

var navBar = {
	getAllResultsQty : function(filteredData) {
		var resultsQty = 0;
		if(filteredData !== undefined && filteredData.length) {
			resultsQty = filteredData.length;
		} else {
			resultsQty = 0;
		}
		return resultsQty;
	},

	writeResultsQty : function(resultsQty) {
		if(resultsQty === 1) {
			$(".results-amount .results-qty").html(resultsQty+' result');
		} else {
			$(".results-amount .results-qty").html(resultsQty+' results');
		}
	},

	// writes how many filters are currently selected
	allFilterQty : function() {
		var filters = $('.filter-category .filters-amount');
		var qty = 0;
		for (var i=0; i<filters.length; i++) {
			qty += parseInt($(filters[i]).attr("data-amount"));
		}
		$(".results-amount .filter-qty").html("("+qty+" filters)");
	}
};

// Create a sorting order for listings
function sortListings(data, property) {
	if (property) {
		if (property == 'rating') {
			data.sort(function(a, b) {
				return b.fakescore - a.fakescore;
			});
		} else if (property == 'cost') {
			data.sort(function(a, b) {
				return a.cost - b.cost;
			});
		}
	} else { // sort by distance
		data.sort(function(a, b) {
			return a.addresses[0].distance - b.addresses[0].distance;
		});
	}
	allFilteredData = data;
	return data;
}

// Search function that uses livesearch and filters to return list of providers
function filterSearchProviders() {
	var patterns = $("#string-search").val().toLowerCase().trim().split(" ");
	var fields = {searchProp: true};
	var smartresults = smartSearch(data, patterns, fields, smartSearchOptions);
	var results = [];
	var sortedResults = [];
	$.each(smartresults, function(index, result) {
		results.push(result.entry);
	});
	results = advancedSearch.filterInNetwork(results);
	if (selectedGenders.length) {
		results = advancedSearch.filterGenders(selectedGenders, results);
	}
	if (selectedLanguages.length) {
		results = advancedSearch.filterLanguages(selectedLanguages, results);
	}
	if (selectedSpecialties.length) {
		results = advancedSearch.filterSpecialities(selectedSpecialties, results);
	}
	if (selectedNetworks.length) {
		results = advancedSearch.filterNetworks(selectedNetworks, results);
	}

	sortedResults = sortListings(results); // pass 'rating', 'cost', or nothing for distance sorting
	return sortedResults;
}


// // Search function that matches words returns array of providers
// function regexStringMatch(string, selectedLanguages, selectedSpecialties, selectedNetworks, selectedGenders) {
// 	var userInput = string.toLowerCase().trim().replace(/ /g," ");
// 	var regex = new RegExp(toRegex(userInput), 'g');
// 	var result = $(data).filter( function() {
// 		return this.searchProp.match(regex);
// 	});
//
// 	if (selectedGenders.length) {
// 		result = filterGenders(selectedGenders, result);
// 	}
//
// 	if (selectedLanguages.length) {
// 		result = filterLanguages(selectedLanguages, result);
// 	}
// 	if (selectedSpecialties.length) {
// 		result = filterSpecialities(selectedSpecialties, result);
// 	}
// 	if (selectedNetworks.length) {
// 		result = filterNetworks(selectedNetworks, result);
// 	}
//
// 	return result;
//
// }
//
// // Filter results as you type allows for 1 insertion
// function liveSearch(string) {
// 	var filteredData = [];
// 	var patterns = string.toLowerCase().trim().split(" ");
// 	var fields = 'searchProp';
// 	var results = smartSearch(data, patterns, fields, smartSearchOptions);
//
// 	$("#results-nav").show();
// 	$("#start-message").hide();
// 	$('.provider-facility').not(':first').remove(); // should be a call to new function
//
// 	$.each(results, function(index, result) {
// 		filteredData.push(result.entry);
// 		providerTemplate(result.entry);
// 	});
//
// 	allFilteredData = filteredData;
//
// 	writeResultsQty(getAllResultsQty(filteredData));
// 	FilterQty();
// 	filterAmt();
//
// }
//
// // Writes the regular expression for the regexStringMatch function
// function toRegex(str) {
//     var string =  str.replace(/\w\S*/g, function(txt){return '(?=.*'+txt+')';});
//     string += '.+';
//     return string.replace(/ /g,"");
// }
//
// // Search providers when search button is clicked
// function searchProviders() {
// 	var string = $('#string-search').val();
// 	var center = map.getCenter();
// 	center.latitude = center.lat();
// 	center.longitude = center.lng();
// 	var zoom = map.getZoom();
// 	var urlParams = "?string="+string+"&location="+center.latitude+","+center.longitude+"&selectedLanguages="+selectedLanguages.join('|')+"&selectedSpecialties="+selectedSpecialties.join('|')+"&selectedNetworks="+selectedNetworks.join('|')+"&selectedGenders="+selectedGenders.join('|')+"&inNetwork="+inNetwork;
// 	// Check if browser supports HTML5 History to use history.pushstate, otherwise reload the page with window.location
// 	if (window.history && window.history.pushState) {
// 		history.pushState(null, null, urlParams);
// 		var result = regexStringMatch(string, selectedLanguages, selectedSpecialties, selectedNetworks, selectedGenders);
// 		if (result.length === 0) {
// 			showEmptyResultsError();
// 		} else {
// 			hideErrorMessages();
// 		}
// 		var geolocatedResults = geofilter(result, center);
// 		mapAddresses(geolocatedResults, center);
// 	} else {
// 		window.location.href = window.location.origin + urlParams;
// 	}
// }

function newLiveSearch() {
	var string = $('#string-search').val();
	var center = {};
	if (userSuppliedPosition !== undefined) {
		center = {latitude: userSuppliedPosition.latitude, longitude: userSuppliedPosition.longitude};
	} else {
		center = map.getCenter();
		center.latitude = center.lat();
		center.longitude = center.lng();
	}
	var zoom = map.getZoom();
	var urlParams = "?string="+string+"&location="+center.latitude+","+center.longitude+"&selectedLanguages="+selectedLanguages.join('|')+"&selectedSpecialties="+selectedSpecialties.join('|')+"&selectedNetworks="+selectedNetworks.join('|')+"&selectedGenders="+selectedGenders.join('|')+"&inNetwork="+inNetwork;
	// Check if browser supports HTML5 History to use history.pushstate, otherwise reload the page with window.location
	if (window.history && window.history.pushState) {
		history.pushState(null, null, urlParams);
		var liveResults = filterSearchProviders();

		if (liveResults.length === 0) {
			showEmptyResultsError();
		} else {
			hideErrorMessages();
		}
		//providersToShow = 10; // reset providersToShow
		var geolocatedResults = geofilter(liveResults, center);
		mapAddresses(geolocatedResults, center);
	} else {
		window.location.href = window.location.origin + urlParams;
	}
}

// Geolocation function that takes an array of providers and filters them based on location proximity
function geofilter(results, position) {
	//return results; // TODO this is in place temporarily to show all the results for the prototype
	var dist = 12; // distance in miles used to measure proximity TODO should use zoom level
	var lat = position ? position.latitude : defaultPosition.latitude;
	var lng = position ? position.longitude : defaultPosition.longitude;
	var geolocatedResults = [];

	for (var i=0; i<results.length; i++) {
		for (var j = 0; j < results[i].addresses.length; j++) {
			if (distance(lat, lng, results[i].addresses[j].lat, results[i].addresses[j].lng) < dist) {
				geolocatedResults.push(results[i]);
				break;
			}
		}
	}
	return geolocatedResults;
}

function showEmptyResultsError() {
	$("#no-results").show();
}

function hideErrorMessages() {
	$(".error-message").hide();
}

$('.string-button').click(toggleSearch);
$('.string-button').click(newLiveSearch);

// fuzzy live search
$('#string-search').keyup(function(event) {
	providersToShow = 10;
	var string = $('#string-search').val();
	if (string.length == 1) {
		$("#loader").show();
	} else if (string.length > 1) { // Only do live search if string is at least 2 characters  long
		$("#loader").hide();
		newLiveSearch();
		if(autoFiltering === 'on') {
			FilterQty();
		}
	} else {
		$("#loader").hide();
	}
});

// writes the amount of selected filters beside each filter category
function filterAmt() {
	var filterCategories = $(".filter-category");
	for (var i=0; i<filterCategories.length; i++) {
		var filterqty = $(filterCategories[i]).find(".filters-amount");
		var filters = $(filterCategories[i]).find(".filtering:checked");
		filterqty.html("("+filters.length+" selected)");
		$(filterqty).attr("data-amount", filters.length);
	}
}

// updates the number of results in all available filters
function FilterQty() {
	var filters = $(".advanced-search .filtering");
	var patterns = $('#string-search').val().toLowerCase().trim().split(" ");
	var fields = {searchProp: true};
	var data = allFilteredData;
	for (var i=0; i<filters.length; i++) {
		var type = filters[i].name.substr(0, filters[i].name.indexOf('-'));
		var value = filters[i].value;
		var qty = '';
		var tmpres = [];
		res = smartSearch(data, patterns, fields, smartSearchOptions);
		$.each(res, function(index, result) {
			tmpres.push(result.entry);
		});
		if(type === "languages") {
			tmpres = advancedSearch.filterLanguages([value], tmpres);
		} else	if(type === "specialty") {
			tmpres = advancedSearch.filterSpecialities([value], tmpres);
		} else if(type === "gender") {
			tmpres = advancedSearch.filterGenders([value], tmpres);
		}
		qty = tmpres.length;
		$(filters[i]).siblings(".qty-count").html("("+qty+")");
	}
}

function selectInNetwork() {
	inNetwork = $("#in-network").is(':checked');

	newLiveSearch();
	navBar.allFilterQty();
}

function selectLanguages() {
	selectedLanguages = []; // reset selectedLanguages
	$("#language-filter input").each(function(index) {
		if(this.checked) {
			selectedLanguages.push(this.value);
		}
	});

	newLiveSearch();
	navBar.allFilterQty();
}

function selectSpecialties() {
	selectedSpecialties = []; // reset selectedSpecialties
	$("#specialty-filter input").each(function(index) {
		if(this.checked) {
			selectedSpecialties.push(this.value);
		}
	});

	newLiveSearch();
	navBar.allFilterQty();
}

function selectNetworks() {
	selectedNetworks = []; // reset selectedNetworks
	$("#network-filter input").each(function(index) {
		if(this.checked) {
			selectedNetworks.push(this.value);
		}
	});

	newLiveSearch();
	navBar.allFilterQty();
}

function selectGenders() {
	selectedGenders = []; // reset selectedGenders
	$("#gender-filter input").each(function(index) {
		if(this.checked) {
			selectedGenders.push(this.value);
		}
	});

	newLiveSearch();
	navBar.allFilterQty();
}

$('#in-network').change(selectInNetwork);
$('#language-filter').change(selectLanguages);
$('#specialty-filter').change(selectSpecialties);
$("#network-filter").change(selectNetworks);
$("#gender-filter").change(selectGenders);

function autoFillSearch(string) {
	$('#string-search').val(string);
	$("#in-network").prop('checked', inNetwork);

	if (Array.isArray(selectedGenders) === true) {
		for (var i=0; i< selectedGenders.length; i++) {
			$("#gender-filter input[type=checkbox]").filter(function() {
				return this.value == selectedGenders[i];
			}).prop("checked", true);
		}
	} else {
		$("#gender-filter input[type=checkbox]").filter(function() {
			return this.value == selectedGenders;
		}).prop("checked", true);
	}

	if (Array.isArray(selectedLanguages) === true) {
		for (var i=0; i< selectedLanguages.length; i++) {
			$("#language-filter input[type=checkbox]").filter(function() {
				return this.value == selectedLanguages[i];
			}).prop("checked", true);
		}
	} else {
		$("#language-filter input[type=checkbox]").filter(function() {
			return this.value == selectedLanguages;
		}).prop("checked", true);
	}

	if (Array.isArray(selectedSpecialties) === true) {
		for (var j=0; j< selectedSpecialties.length; j++) {
			$("#specialty-filter input[type=checkbox]").filter(function() {
				return this.value == selectedSpecialties[j];
			}).prop("checked", true);
		}
	} else {
		$("#specialty-filter input[type=checkbox]").filter(function() {
			return this.value == selectedSpecialties;
		}).prop("checked", true);
	}

	if (Array.isArray(selectedNetworks) === true) {
		for (var k = 0; k < selectedNetworks.length; k++) {
			$('#network-dropdown input[type=checkbox]').filter(function(){
				return this.value == selectedNetworks[k];
			}).prop('checked', true);
		}
	} else {
		$('#network-dropdown input[type=checkbox]').filter(function(){
			return this.value == selectedNetworks;
		}).prop('checked', true);
	}

}

// Click Handler for 'Search this Area' button
$("#map-header button").click(function() {
	var filteredData = [];
	for (var i = 0; i < data.length; i++) {
		for (var j=0; j<data[i].addresses.length; j++) {
			if (bounds.contains({lat: Number(data[i].addresses[j].lat), lng: Number(data[i].addresses[j].lng)})) {
				filteredData.push(data[i]);
				break;
			}
		}
	}

	// remove markers from map
	if(markers.length) {
		for (var l = 0; l < markers.length; l++) {
	    markers[l].setMap(null);
	  }
	}
	markers = []; //reset markers
	$('.provider-facility').not(':first').remove(); // reset list

	for (var k = 0; k < filteredData.length; k++) {
		markers[k] = new google.maps.Marker({
			position: new google.maps.LatLng(filteredData[k].addresses[0].lat, filteredData[k].addresses[0].lng),
			icon: purpleIcon,
			map: map
		});
		markers[k].placeResult = filteredData[k];
		markers[k].markerID = k;
		google.maps.event.addListener(markers[k], 'click', showInfoWindow);
		google.maps.event.addListener(markers[k], 'mouseover', showInfoWindow);
		providerTemplate(filteredData[k], k);
	}

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
});

// Popstate event listener
window.addEventListener('popstate', function(e) {
	if(window.location.search) {
		var query_string = getURLParams(); // gets object with search params
		var location = {};
		var result;
		var geolocatedResults;
		var string = query_string.string ? query_string.string : '';
		inNetwork = query_string.inNetwork == 'false' ? false: true;
		selectedLanguages = query_string.selectedLanguages ? query_string.selectedLanguages : [];
		selectedSpecialties = query_string.selectedSpecialties ? query_string.selectedSpecialties : [];
		selectedNetworks = query_string.selectedNetworks ? query_string.selectedNetworks : [];
		selectedGenders = query_string.selectedGenders ? query_string.selectedGenders : [];

		if (query_string.location) {
			var latlng = query_string.location.split(',');
			location.latitude = latlng[0];
			location.longitude = latlng[1];
		}
		userSuppliedPosition = location.hasOwnProperty('latitude') ? location : defaultPosition;
		autoFillSearch(string); // autofill search
		//result = regexStringMatch(string, selectedLanguages, selectedSpecialties, selectedNetworks, selectedGenders);
		result = filterSearchProviders();
		geolocatedResults = geofilter(result, userSuppliedPosition);
		mapAddresses(geolocatedResults, userSuppliedPosition);
	}	else {
		mapAddresses();
	}
});

// Create a new property for all objects in data array to search through
function createNewSearchableProp(data) {
	for (var i=0; i<data.length; i++) {
		var searchProp = '';
		/*for (var j=0; j<data[i].languages.length; j++) {
			searchProp += data[i].languages[j]+" ";
		}*/
		for (var k=0; k<data[i].specialty.length; k++) {
			searchProp += data[i].specialty[k]+" ";
		}
		searchProp += data[i].name.first+" "+data[i].name.last;
		searchProp = searchProp.toLowerCase();

		data[i].searchProp = searchProp;
	}
}

// These must get called after the data has loaded
createNewSearchableProp(data);
advancedSearch.getAllSpecialities(data);
advancedSearch.getAllLanguages(data);
advancedSearch.getAllGenders(data);
places("location-search");

$(function() {
	// If search params exist in the URL then apply those queries and return result
	if(window.location.search) {
		var query_string = getURLParams(); // gets object with search params
		var location = {};
		var result;
		var geolocatedResults;
		var string = query_string.string ? query_string.string : '';

		inNetwork = query_string.inNetwork == 'false' ? false: true;

		if (Array.isArray(query_string.selectedGenders)) {
			selectedGenders = query_string.selectedGenders;
		} else if (typeof query_string.selectedGenders === 'string' && query_string.selectedGenders !== '') {
			selectedGenders.push(query_string.selectedGenders);
		} else {
			selectedGenders =[];
		}

		if (Array.isArray(query_string.selectedLanguages)) {
			selectedLanguages = query_string.selectedLanguages;
		} else if (typeof query_string.selectedLanguages === 'string' && query_string.selectedLanguages !== '') {
			selectedLanguages.push(query_string.selectedLanguages);
		} else {
			selectedLanguages =[];
		}

		if (Array.isArray(query_string.selectedSpecialties)) {
			selectedSpecialties = query_string.selectedSpecialties;
		} else if (typeof query_string.selectedSpecialties === 'string' && query_string.selectedSpecialties !== '') {
			selectedSpecialties.push(query_string.selectedSpecialties);
		} else {
			selectedSpecialties =[];
		}

		if (Array.isArray(query_string.selectedNetworks)) {
			selectedNetworks = query_string.selectedNetworks;
		} else if (typeof query_string.selectedNetworks === 'string' && query_string.selectedNetworks !== '') {
			selectedNetworks.push(query_string.selectedNetworks);
		} else {
			selectedNetworks =[];
		}

		if (query_string.location) {
			var latlng = query_string.location.split(',');
			location.latitude = latlng[0];
			location.longitude = latlng[1];
		}
		userSuppliedPosition = location.hasOwnProperty('latitude') ? location : defaultPosition;
		autoFillSearch(string); // autofill search
		//result = regexStringMatch(string, selectedLanguages, selectedSpecialties, selectedNetworks, selectedGenders);
		result = filterSearchProviders();
		geolocatedResults = geofilter(result, userSuppliedPosition);
		mapAddresses(geolocatedResults, userSuppliedPosition);
	} else {
		mapAddresses();
	}
});
