jasmine.getFixtures().fixturesPath = 'base/spec/javascripts/fixtures';

describe("advancedSearch", function() {
  describe("getAllGenders", function() {
    it("should get all the genders in the data and call populateGenders with male and female", function() {
      var genderdata = [{"gender": "male"},{"gender": "female"}];
      spyOn(advancedSearch, "populateGenders");
      advancedSearch.getAllGenders(genderdata);
      expect(advancedSearch.populateGenders).toHaveBeenCalledWith(['male', 'female']);
    });
  });

  describe("getAllLanguages", function() {
    it("should get all the languages in the data and call populateLanguages with them", function() {
      var languagedata = [{"languages": ["Spanish"]},{"languages": ["Spanish", "Chinese"]},{"languages": ["French"]}];
      spyOn(advancedSearch, "populateLanguages");
      advancedSearch.getAllLanguages(languagedata);
      expect(advancedSearch.populateLanguages).toHaveBeenCalledWith(['Spanish', 'Chinese', 'French']);
    });

    it("should get all the languages in the data and call populateLanguages with them", function() {
      var languagedata = [{}];
      spyOn(advancedSearch, "populateLanguages");
      advancedSearch.getAllLanguages(languagedata);
      expect(advancedSearch.populateLanguages).toHaveBeenCalledWith(['Spanish']);
    });

  });

  describe("languageSortOrder", function() {
    it("should sort an array of languages based on the sortLanguages array and return an array", function() {
      var result = advancedSearch.languageSortOrder(["Chinese", "Spanish", "English"]);
      expect(result).toEqual(["English", "Spanish", "Chinese"]);
    });
  });

  describe("getAllSpecialities", function() {
    it("should get all specialities in the data and call populateSpecialities with them", function() {
      var specialtydata = [{"specialty": ["Endodontist"]},{"specialty": ["General Dentist", "Endodontist"]},{"specialty": ["Endodontist"]}];
      spyOn(advancedSearch, "populateSpecialities");
      advancedSearch.getAllSpecialities(specialtydata);
      expect(advancedSearch.populateSpecialities).toHaveBeenCalledWith(['Endodontist', 'General Dentist']);
    });
  });

  describe("populateGenders", function() {
    it("should populate gender-filter with all genders", function() {
      loadFixtures('fixture.html');
      advancedSearch.populateGenders(['male ', 'female']);
      expect($("#gender-filter").text()).toEqual("male female");
    });
  });

  describe("populateLanguages", function() {
    it("should populate language-filter with all languages", function() {
      loadFixtures('fixture.html');
      advancedSearch.populateLanguages(['myMadeUpLanguage ', 'french']);
      expect($("#language-filter").text()).toEqual("myMadeUpLanguage french");
    });
  });

  describe("populateSpecialities", function() {
    it("should populate specialty-filter with all specialties", function() {
      loadFixtures('fixture.html');
      advancedSearch.populateSpecialities(['masterOfTerror ', 'generalToothPuller ', 'painInflictor']);
      expect($("#specialty-filter").text()).toEqual("masterOfTerror generalToothPuller painInflictor");
    });
  });

  describe("filterInNetwork", function() {
    var providers = [{"plans":[{"in_network": false}]},{"plans":[{"in_network": true}]},{"plans":[{"in_network": true}]}];

    describe("when global variable inNetwork is set to true", function() {
      it("should take 3 providers and filter them based on the in-network property and return 2", function() {
        var result = advancedSearch.filterInNetwork(providers);
        expect(result.length).toEqual(2);
      });
    });

    describe("when global variable inNetwork is set to false", function() {
      it("should take 3 providers and return all 3, regardless of in-network properties", function() {
        inNetwork = false;
        var result = advancedSearch.filterInNetwork(providers);
        expect(result.length).toEqual(3);
      });
    });
  });

  describe("filterGenders", function() {
    var genderdata = [{"gender": "male"},{"gender": "female"}, {"gender": "male"}];

    describe("when passing in a gender of male", function() {
      it("should take 3 providers (2 males, 1 female) and filter out all the females and return the 2 male providers", function() {
        var gender = 'male';
        var result = advancedSearch.filterGenders(gender, genderdata);
        expect(result.length).toEqual(2);
      });
    });

    describe("when passing in a gender of female", function() {
      it("should filter out all the male providers and return the 1 female provider", function() {
        var gender = 'female';
        var result = advancedSearch.filterGenders(gender, genderdata);
        expect(result.length).toEqual(1);
      });
    });
  });

  describe("filterLanguages", function() {
    var languagedata = [{"languages": ["Spanish"]},{"languages": ["Spanish", "Chinese"]},{"languages": ["French"]}];

    describe("when passing in a language of English", function() {
      it("should take 3 providers in testingdata and return 0 for english", function() {
        var languages = ["English"];
        var result = advancedSearch.filterLanguages(languages, languagedata);
        expect(result.length).toEqual(0);
      });
    });

    describe("when passing in a language of Chinese", function() {
      it("should take 3 providers in testingdata and return the 1 that speaks chinese", function() {
        var languages = ["Chinese"];
        var result = advancedSearch.filterLanguages(languages, languagedata);
        expect(result.length).toEqual(1);
      });
    });
  });

  describe("filterSpecialities", function() {
    var specialtydata = [{"specialty": ["Endodontist"]},{"specialty": ["General Dentist", "Endodontist"]},{"specialty": ["Endodontist"]}];

    describe("when passing in a language of English", function() {
      it("should take 3 providers in testingdata and return 1 for General Dentist", function() {
        var specialty = ["General Dentist"];
        var result = advancedSearch.filterSpecialities(specialty, specialtydata);
        expect(result.length).toEqual(1);
      });
    });

    describe("when passing in a language of Chinese", function() {
      it("should take 3 providers in testingdata and return 0 for Orthodontist", function() {
        var specialty = ["Orthodontist"];
        var result = advancedSearch.filterSpecialities(specialty, specialtydata);
        expect(result.length).toEqual(0);
      });
    });
  });

  describe("filterNetworks", function() {
    it("should take the 3 providers in testingdata and networks = ['Delta Dental'] and return 2 for Delta Dental", function() {
      var networkdata = [{"plans": [{"network_tier": "Delta Dental"}]}, {"plans": [{"network_tier": "PPO"}]}, {"plans": [{"network_tier": "Delta Dental"}]}];
      var networks = ["Delta Dental"];
      var result = advancedSearch.filterNetworks(networks, networkdata);
      expect(result.length).toEqual(2);
    });
  });
});

describe("navBar", function() {

  describe("getAllResultsQty", function() {
    describe("when 3 objects are passed in as a param", function() {
      it("it should return the number of providers", function() {
        var allProviders = [{},{},{}];
        var result = navBar.getAllResultsQty(allProviders);
        expect(result).toEqual(3);
      });
    });

    describe("when no providers are passed in to the params", function() {
      it("it should return 0 providers", function() {
        var result = navBar.getAllResultsQty([]);
        expect(result).toEqual(0);
      });
    });
  });

  describe("writeResultsQty", function() {
    describe("when the paramater passed to it is equal to 1", function() {
      it("should append the word 'result' after the number", function() {
        loadFixtures('fixture.html');
        navBar.writeResultsQty(1);
        expect($(".results-qty").text()).toEqual('1 result');
      });
    });

    describe("when the paramater passed to it is not equal to 1", function() {
      it("should append the word 'results' after the number", function() {
        loadFixtures('fixture.html');
        navBar.writeResultsQty(21);
        expect($(".results-qty").text()).toEqual('21 results');
      });
    });
  });
});

describe("sortListings", function() {
  describe("when no sorting paramater is passed", function() {
    it("it should sort allFilteredData by distance", function() {
      var distancedata = [{"addresses": [{"distance": "5.2"}]},{"addresses": [{"distance": "3.2"}]},{"addresses": [{"distance": "5.9"}]}];
      var result = sortListings(distancedata);
      expect(result[0].addresses[0].distance).toEqual('3.2');
      expect(result[1].addresses[0].distance).toEqual('5.2');
      expect(result[2].addresses[0].distance).toEqual('5.9');
    });
  });

  describe("when 'rating' paramater is passed", function() {
    it("should sort allFilteredData by rating", function() {
      var ratingdata = [{"fakescore": "9.5"}, {"fakescore": "7.7"}, {"fakescore": "8.4"}];
      var result = sortListings(ratingdata, 'rating');
      expect(result[0].fakescore).toEqual('9.5');
      expect(result[1].fakescore).toEqual('8.4');
      expect(result[2].fakescore).toEqual('7.7');
    });
  });

  describe("when 'cost' paramater is passed", function() {
    it("should sort allFilteredData by cost", function() {
      var costdata = [{"cost": "90"}, {"cost": "100"}, {"cost": "60"}];
      var result = sortListings(costdata, 'cost');
      expect(result[0].cost).toEqual('60');
      expect(result[1].cost).toEqual('90');
      expect(result[2].cost).toEqual('100');
    });
  });
});
