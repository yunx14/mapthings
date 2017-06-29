var model = {
  providers : oneThousandProviders
};

var SearchController = function() {
  this.string = '';
  this.inNetwork = true;
  this.location = {latitude: 37.760105876525735, longitude: -122.47973245300295}; // SF default center position};
  this.genders = [];
  this.specialties = [];
  this.languages = [];
  this.networks = [];
	this.sortBy = 'distance';
  this.smartSearchOptions = {
  	caseSensitive : false,
  	maxInsertions : 1
  };
	this.results = [];
	this.resultsToShow = 10;
	this.start = 0;
	this.distanceToSearch = 7; // miles

	this.init = function() {
    // Add quicksearch property to each provider
    quickSearchProperty(model.providers);

    // get list of all languages, genders, and specialties
    var allGenders = getAllGenders(model.providers),
    		allLanguages = getAllLanguages(model.providers),
    		allSpecialties = getAllSpecialties(model.providers);

    // Check for URL params
    if(window.location.search) {
      var query_string = getURLParams();
      this.setSearchControllerProperties(query_string);
      this.results = this.filterSearchProviders();
      advancedSearchView.init(allGenders, allLanguages, allSpecialties, this);
      navBarView.render(this.results);
      listView.render(this.results);
			paginationView.render();
    } else {
      advancedSearchView.init(allGenders, allLanguages, allSpecialties, this);
    }

		listView.init();
    searchBarView.init();
    navBarView.init();
	};

  function quickSearchProperty(data) {
  	for (var i=0; i<data.length; i++) {
  		var quickSearch = '';

  		for (var k=0; k<data[i].specialty.length; k++) {
  			quickSearch += data[i].specialty[k]+" ";
  		}

  		quickSearch += data[i].name.first+" "+data[i].name.last;
  		quickSearch = quickSearch.toLowerCase();

  		data[i].quickSearch = quickSearch;
  	}
  }

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

  function getAllGenders(data) {
		var tmpValues = [];
		for (var i=0; i<data.length; i++) {
			if (tmpValues.indexOf(data[i].gender) === -1) {
				tmpValues.push(data[i].gender);
			}
		}
		return tmpValues;
	}

	function getAllLanguages(data) {
		var tmpValues = [];
		for (var i=0; i<data.length; i++) {
			for (var j=0; j<data[i].languages.length; j++) {
				if (tmpValues.indexOf(data[i].languages[j]) === -1) {
					tmpValues.push(data[i].languages[j]);
				}
			}
		}
		tmpValues = languageSortOrder(tmpValues);
		return tmpValues;
	}

	function languageSortOrder(tmpValues) {
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
	}

	function getAllSpecialties(data) {
		var tmpValues = [];
		for (var i=0; i<data.length; i++) {
			for (var j=0; j<data[i].specialty.length; j++) {
				if (tmpValues.indexOf(data[i].specialty[j]) === -1) {
					tmpValues.push(data[i].specialty[j]);
				}
			}
		}
		tmpValues.sort();
		return tmpValues;
	}

};

SearchController.prototype.setSearchControllerProperties = function(query_string) {

  //TODO inside the main loop, cross reference the query sting with the models property to find out what 'type' it should be to determine how to store the value

  for (var prop in query_string) {
    if( query_string.hasOwnProperty(prop) ) {
      if (prop == 'location') {
        var latlng = query_string.location.split(',');
  			this.location.latitude = latlng[0];
  			this.location.longitude = latlng[1];
      } else if (Array.isArray(query_string[prop])) {
        this[prop] = query_string[prop];
      } else if (typeof query_string[prop] === 'string' && query_string[prop] !== '') {
        if (Array.isArray(this[prop]) ) {
          this[prop].push(query_string[prop]);
        } else {
          this[prop] = query_string[prop];
        }
      } else {
        if (Array.isArray(this[prop]) && query_string[prop] === '') {
          this[prop] =[];
        } else {
          this[prop] = query_string[prop];
        }
      }
    }
  }

};

SearchController.prototype.showMoreProviders = function() {
	app.resultsToShow += 10;
	listView.renderMoreProviders();
};

SearchController.prototype.selectInNetwork = function() {
  // TODO: decide if app.inNetwork should be string or boolean and stick to that type
  app.inNetwork = $("#in-network").is(':checked');
  //TODO instead of setting start to 0 here, create a separate function that checks if pagination has gone too far and set it back to 0 then.
  // TODO consider stashing the changes and then waiting for them to click back to results to apply those stashed changes.
  app.start = 0;
  app.newLiveSearch();
};

// TODO try to standardize the id selector and property attributes so that these 4 functions can be consolidated into one using a parameter
SearchController.prototype.selectLanguages = function() {
  app.languages = [];
  $("#language-filter input").each(function(index) {
		if(this.checked) {
			app.languages.push(this.value);
		}
	});
	app.start = 0;
  app.newLiveSearch();
};

SearchController.prototype.selectGenders = function() {
  app.genders = [];
  $("#gender-filter input").each(function(index) {
		if(this.checked) {
			app.genders.push(this.value);
		}
	});
	app.start = 0;
  app.newLiveSearch();
};

SearchController.prototype.selectSpecialties = function() {
  app.specialties = [];
  $("#specialty-filter input").each(function(index) {
    if(this.checked) {
      app.specialties.push(this.value);
    }
  });
	app.start = 0;
  app.newLiveSearch();
};

SearchController.prototype.selectLocation = function(elementID) {
  var pac_input = document.getElementById(elementID);

  (function pacSelectFirst(input) {
    // store the original event binding function
    var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;

    function addEventListenerWrapper(type, listener) {
        // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
        // and then trigger the original listener.
        if (type == "keydown") {
            var orig_listener = listener;
            listener = function(event) {
                var suggestion_selected = $(".pac-item-selected").length > 0;
                if (event.which == 13 && !suggestion_selected) {
                    var simulated_downarrow = $.Event("keydown", {
                        keyCode: 40,
                        which: 40
                    });
                    orig_listener.apply(input, [simulated_downarrow]);
                }

                orig_listener.apply(input, [event]);
            };
        }

        _addEventListener.apply(input, [type, listener]);
    }

    input.addEventListener = addEventListenerWrapper;
    input.attachEvent = addEventListenerWrapper;

    var autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['(regions)'],
      componentRestrictions: {'country': 'us'}
    });

    autocomplete.addListener('place_changed', function () {
  		var place = autocomplete.getPlace();
  		app.location = {latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng()};
      app.start = 0;
      app.newLiveSearch();
   	});

  })(pac_input);
};

SearchController.prototype.filterInNetwork = function(data) {
  var filteredData = [];
  if (this.inNetwork === false || this.inNetwork === 'false') {
    return data;
  } else {
    for (var i=0; i<data.length; i++) {
      if (data[i].plans[0].in_network === true) {
        filteredData.push(data[i]);
      }
    }
    return  filteredData;
  }
};

//TODO consider makeing an AND+OR filtering functionality for all the filters
SearchController.prototype.filterGenders = function(genders, data) {
  var filteredData = [];
  for (var i=0; i<data.length; i++) {
    if (data[i].gender == genders) {
      filteredData.push(data[i]);
    }
  }
  return filteredData;
};

SearchController.prototype.filterLanguages = function(languages, data) {
  var filteredData = [];
  for (var i=0; i<data.length; i++) {
    var exists = needleInHaystack(data[i].languages, languages);
    //TODO does exist need a triple = since we set the variable right above
    if(exists === true) {
      filteredData.push(data[i]);
    }
  }
  return filteredData;
};

SearchController.prototype.filterSpecialities = function(specialty, data) {
  var filteredData = [];
  for (var i=0; i<data.length; i++) {
    var exists = needleInHaystack(data[i].specialty, specialty);
    if(exists === true) {
      filteredData.push(data[i]);
    }
  }
  return filteredData;
};

SearchController.prototype.filterGeographically = function(data) {
	var filteredData = [];
	var dist = this.distanceToSearch; // distance in miles used to measure proximity TODO should use zoom level
	var lat = app.location.latitude;
	var lng = app.location.longitude;

	for (var i=0; i<data.length; i++) {
		for (var j = 0; j < data[i].addresses.length; j++) {
			if (distance(lat, lng, data[i].addresses[j].lat, data[i].addresses[j].lng) < dist) {
				filteredData.push(data[i]);
				break;
			}
		}
	}
	return filteredData;
};

SearchController.prototype.sortResultsBy = function() {
	app.sortBy = $("#sortBy input:checked").val();
	app.newLiveSearch();
};

SearchController.prototype.sortListings = function(data, property) {
	if (property) {
		if (property == 'ratings') {
			data.sort(function(a, b) {
				return b.fakescore - a.fakescore;
			});
		} else if (property == 'cost') {
			data.sort(function(a, b) {
				return a.cost - b.cost;
			});
		} else if (property == 'distance') {
			data.sort(function(a, b) {
				return a.addresses[0].distance - b.addresses[0].distance;
			});
		}
	} else { // sort by distance
		data.sort(function(a, b) {
			return a.addresses[0].distance - b.addresses[0].distance;
		});
	}
	allFilteredData = data;
	return data;
};

SearchController.prototype.filterSearchProviders = function() {
  var patterns = this.string;
	var fields = {quickSearch: true};
  //TODO this doesnt work because all fields need to be strings
  // var fields = {name: {first: true, middle: true, last: true}, specialty: true};
	var smartresults = smartSearch(model.providers, patterns, fields, this.smartSearchOptions);
	var results = [];
	var sortedResults = [];
	$.each(smartresults, function(index, result) {
		results.push(result.entry);
	});
	results = this.filterGeographically(results);
	results = this.filterInNetwork(results);
	if (this.genders.length) {
		results = this.filterGenders(this.genders, results);
	}
	if (this.languages.length) {
		results = this.filterLanguages(this.languages, results);
	}
	if (this.specialties.length) {
		results = this.filterSpecialities(this.specialties, results);
	}

	sortedResults = this.sortListings(results, app.sortBy);
	return sortedResults;
};

SearchController.prototype.newLiveSearch = function() {
	app.string = $('#string-search').val();

	var urlParams = "?string="+app.string+"&location="+app.location.latitude+","+app.location.longitude+"&languages="+app.languages.join('|')+"&specialties="+app.specialties.join('|')+"&genders="+app.genders.join('|')+"&inNetwork="+app.inNetwork+"&sortBy="+app.sortBy+"&start="+app.start;

  // Check if browser supports HTML5 History to use history.pushstate, otherwise reload the page with window.location
	if (window.history && window.history.pushState) {
		history.pushState(null, null, urlParams);
    app.results = app.filterSearchProviders();
		advancedSearchView.render(app.results);
    navBarView.render(app.results);
    listView.render(app.results);
		paginationView.render();
	} else {
	  window.location.href = window.location.origin + urlParams;
  }
};

var searchBarView = {
  $stringField : $("#string-search"),

	init: function() {
    $('.string-button').click(app.newLiveSearch);
    $('.string-button').click(navBarView.toggleSearch);
    app.selectLocation("location-search");
    $("#location-search").keypress(function(e) {
      if(e.which == 13){
        e.preventDefault();
      }
    });
    // Check if browser supports HTML5 History to allow keyup search
  	if (window.history && window.history.pushState) {
      $('#string-search').keyup(function(){
				app.start = 0;
				app.newLiveSearch();
			});
    }
	},

	render: function() {

	}
};

var navBarView = {

  init: function() {
    $(".toggle-search").click(navBarView.toggleSearch);
  },

  render: function(results) {
    var totalFilters = $(".filter-category").find(".filtering:checked");

    if(totalFilters.length === 1) {
      $(".results-amount .filter-qty").html("("+totalFilters.length+" filter)");
    } else {
      $(".results-amount .filter-qty").html("("+totalFilters.length+" filters)");
    }

    if(results.length === 1) {
			$(".results-amount .results-qty").html(results.length+' result');
		} else {
			$(".results-amount .results-qty").html(results.length+' results');
		}
  },

  toggleSearch: function(e) {
    e.preventDefault();
  	if ($(this).hasClass('search-button') === true) {
  		if($("section.search-adjustable").hasClass("unfocused") === false) {
  			return;
  		}
  	}
  	$(".search-adjustable").toggleClass("unfocused");
  }
};

var advancedSearchView = {

  init: function(allGenders, allLanguages, allSpecialties, appStates) {
      var genderFrag = "";
      var languageFrag = "";
      var specialtyFrag = "";
      var exists = false;
      var check = '';
      var inNetworkBool = ('true' === appStates.inNetwork);
			var sortBy = appStates.sortBy;
      var $locationSearch = $("#location-search");

      $('#string-search').val(appStates.string);
      // TODO pass the latlng to a reverse Geocoder to get a location name
      reverseGeocode(appStates.location.latitude, appStates.location.longitude, $locationSearch);

    	$("#in-network").attr('checked', inNetworkBool);
			$("#sortBy input[value="+sortBy+"]").prop("checked", true);

      for (var i=0; i<allGenders.length; i++) {
        exists = appStates.genders.indexOf(allGenders[i]) > -1 ? true : false;
        check = exists === true ? 'checked' : '';
        genderFrag += "<label for='gender-"+allGenders[i]+"'><input type='checkbox' class='filtering' id='gender-"+allGenders[i]+"' name='gender-"+allGenders[i]+"' "+check+" value='"+allGenders[i]+"'>"+allGenders[i]+"<span class='qty-count'></span></label>";
        check = '';
        exists = false;
      }

      for (var j=0; j<allLanguages.length; j++) {
        exists = appStates.languages.indexOf(allLanguages[j]) > -1 ? true : false;
        check = exists === true ? 'checked' : '';
        languageFrag += "<label for='language-"+allLanguages[j]+"'><input type='checkbox' class='filtering' id='languages-"+allLanguages[j]+"' name='languages-"+allLanguages[j]+"' "+check+" value='"+allLanguages[j]+"'>"+allLanguages[j]+"<span class='qty-count'></span></label>";
        check = '';
        exists = false;
      }

      for (var k=0; k<allSpecialties.length; k++) {
        exists = appStates.specialties.indexOf(allSpecialties[k]) > -1 ? true : false;
        check = exists === true ? 'checked' : '';
        specialtyFrag += "<label for='specialty-"+allSpecialties[k]+"'><input type='checkbox' class='filtering' id='specialty-"+allSpecialties[k]+"' name='specialty-"+allSpecialties[k]+"' "+check+" value='"+allSpecialties[k]+"'>"+allSpecialties[k]+"<span class='qty-count'></span></label>";
        check = '';
        exists = false;
      }

      $("#gender-filter").html(genderFrag);
      $("#language-filter").html(languageFrag);
      $('#specialty-filter').html(specialtyFrag);

      // Set up onchange eventListeners to listen to filter selections
			$('#in-network').change(advancedSearchView.renderFilters);
      $('#language-filter').change(advancedSearchView.renderFilters);
      $('#specialty-filter').change(advancedSearchView.renderFilters);
      $("#gender-filter").change(advancedSearchView.renderFilters);
      $('#in-network').change(app.selectInNetwork);
      $('#language-filter').change(app.selectLanguages);
      $('#specialty-filter').change(app.selectSpecialties);
      $("#gender-filter").change(app.selectGenders);
			$("#sortBy").change(app.sortResultsBy);


      // Set up onclick event listener to open and close filter listings
      $('.collapsible-trigger').click(function() {
      	$(this).closest(".collapsible").toggleClass('open');
      });

			advancedSearchView.renderFilters();
  },

	renderFilters: function() {
		var filterCategories = $(".filter-category");
		var filterqty;
		var filters;

		for (var i=0; i<filterCategories.length; i++) {
			filterqty = $(filterCategories[i]).find(".filters-amount");
			filters = $(filterCategories[i]).find(".filtering:checked");
			filterqty.html("("+filters.length+" selected)");
			$(filterqty).attr("data-amount", filters.length);
		}
	},

	render: function(results) {
		var allFilters = $(".advanced-search .filtering");
		var patterns = app.string;
		var fields = {quickSearch: true};

		for (var i=0; i<allFilters.length; i++) {
			var type = allFilters[i].name.substr(0, allFilters[i].name.indexOf('-'));
			var value = allFilters[i].value;
			var qty = '';
			var tmpres = [];
			res = smartSearch(results, patterns, fields, app.smartSearchOptions);
			$.each(res, function(index, result) {
				tmpres.push(result.entry);
			});
			if(type === "languages") {
				tmpres = app.filterLanguages([value], tmpres);
			} else	if(type === "specialty") {
				tmpres = app.filterSpecialities([value], tmpres);
			} else if(type === "gender") {
				tmpres = app.filterGenders([value], tmpres);
			}
			qty = tmpres.length;
			$(allFilters[i]).siblings(".qty-count").html("("+qty+")");
		}
	}
};

var listView = {

	init: function() {
		 $("#load-more").click(app.showMoreProviders);
	},

	render: function(providers) {
		$('.provider-facility').not(':first').remove(); // reset list
		$("#no-results").hide();
		if(app.string !== '') {
			if(providers.length) {
				$("#results-nav").show();
				$("#start-message").hide();

        //TODO temp turn off pagination
				var start = parseInt(app.start);
				var end = (start+9);
				end = end > providers.length ? providers.length-1 : end;
				for (var i=start; i<= end; i++) {
					providerTemplate(providers[i], i);
				}

				// TODO this turns the map on
				gMap.providerMap(providers);

				//TODO This is for the load-more button
        // for (var i=0; i<providers.length; i++) {
        //   providerTemplate(providers[i], i);
        // }
				// if (providers.length > app.resultsToShow) {
				// 	$("li.provider-facility:lt("+app.resultsToShow+")").show();
				// 	$("li.provider-facility:first").hide();
				// 	$("li.provider-facility:gt("+app.resultsToShow+")").hide();
				// 	$("#load-more").removeClass('hidden');
				// } else {
				// 	$("li.provider-facility").not(':first').show();
				// 	$("#load-more").addClass('hidden');
				// }

			} else {
				$("#no-results").show();
				$("#load-more").addClass('hidden');
				$("#start-message").hide();
			}
		} else {
			$("#start-message").show();
			$("#results-nav").hide();
		}


    $(".tel").click(function(e){
    	e.preventDefault();
    });
	},

	renderMoreProviders: function() {
		if (app.results.length > app.resultsToShow) {
			$("li.provider-facility:lt("+app.resultsToShow+")").show();
			$("li.provider-facility:first").hide();
			$("li.provider-facility:gt("+app.resultsToShow+")").hide();
			$("#load-more").removeClass('hidden');
		} else {
			$("li.provider-facility").not(':first').show();
			$("#load-more").addClass('hidden');
		}
	}
};

var paginationController = {
	goTo: function(e, link) {
		e.preventDefault();
		app.start = link.dataset.start;
		app.newLiveSearch();
	}
};

var paginationView = {

  render: function() {
    $(".pagination").pagination({
        items: app.results.length,
        itemsOnPage: app.resultsToShow,
        currentPage: app.start/app.resultsToShow
    });
  }

};

//TODO give this a more descriptive namespace like provdirectory
var app = new SearchController();
app.init();
