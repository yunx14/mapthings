var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var providers = [
    {
    "npi": "1992852081",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Mae",
      "middle": "T",
      "last": "White",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "2291 Fairburn Rd SW",
        "address_2": "",
        "city": "Atlanta",
        "state": "GA",
        "zip": "30331",
        "phone": "4043494343",
        "lat": "33.69212",
        "lng": "-84.51178199999998"
      }
    ],
    "speciality": [
      "General Dentist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Female",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1093881021",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Jonathan",
      "middle": "Maxwell",
      "last": "Threadgill",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "55 Whitcher St NE Ste 140",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30060",
        "phone": "7704227630",
        "lat": "33.9668922",
        "lng": "-84.55127529999999"
      },
      {
        "address": "21 Kimberly Ln # A",
        "address_2": " ",
        "city": "Blue Ridge",
        "state": "GA",
        "zip": "30513",
        "phone": "7066327801"
      },
      {
        "address": "85 Golf Crest Dr Ste 209",
        "address_2": " ",
        "city": "Acworth",
        "state": "GA",
        "zip": "30101",
        "phone": "7704292326"
      },
      {
        "address": "2230 Towne Lake Pkwy Bldg 1000",
        "address_2": " ",
        "city": "Woodstock",
        "state": "GA",
        "zip": "30189",
        "phone": "7709241083"
      },
      {
        "address": "6043 Prestley Mill Rd Ste A",
        "address_2": " ",
        "city": "Douglasville",
        "state": "GA",
        "zip": "30134",
        "phone": "7709493797"
      },
      {
        "address": "5041 Dallas Hwy Ste A",
        "address_2": " ",
        "city": "Powder Springs",
        "state": "GA",
        "zip": "30127",
        "phone": "7704295507"
      }
    ],
    "speciality": [
      "Oral Surgeon"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1003916578",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Lawrence",
      "middle": "P",
      "last": "Husney",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "2663 Sandy Plains Rd",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30066",
        "phone": "7709770827",
        "lat": "34.0153788",
        "lng": "-84.4944941"
      }
    ],
    "speciality": [
      "General Dentist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1598989741",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Mehron",
      "middle": " ",
      "last": "Haidari",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "3960 Shallowford Rd Ste B",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30062",
        "phone": "7702180218",
        "lat": "34.030427",
        "lng": "-84.43535659999998"
      },
      {
        "address": "3652 Chamblee Dunwoody Rd",
        "address_2": "",
        "city": "Atlanta",
        "state": "GA",
        "zip": "30341",
        "phone": "7709360833"
      }
    ],
    "speciality": [
      "General Dentist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English",
      "Persian",
      "Spanish"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1497812937",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Richard",
      "middle": "A",
      "last": "Hull",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "135 Vann St NE",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30060",
        "phone": "7704289083",
        "lat": "33.972761",
        "lng": "-84.5495401"
      }
    ],
    "speciality": [
      "General Dentist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1184771198",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Inessa",
      "middle": "L",
      "last": "Plavnik",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "2468 Windy Hill Rd SE Ste 400",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30067",
        "phone": "7709849000",
        "lat": "33.9026258",
        "lng": "-84.48172199999999"
      }
    ],
    "speciality": [
      "General Dentist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English",
      "Russian",
      "Spanish"
    ],
    "gender": "Female",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1053325795",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Lee",
      "middle": "C",
      "last": "Vandewater",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "55 Whitcher St NE Ste 140",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30060",
        "phone": "7704227630",
        "lat": "33.9668922",
        "lng": "-84.55127529999999"
      },
      {
        "address": "21 Kimberly Ln # A",
        "address_2": " ",
        "city": "Blue Ridge",
        "state": "GA",
        "zip": "30513",
        "phone": "7066327801"
      },
      {
        "address": "85 Golf Crest Dr Ste 209",
        "address_2": " ",
        "city": "Acworth",
        "state": "GA",
        "zip": "30101",
        "phone": "7704292326"
      },
      {
        "address": "2230 Towne Lake Pkwy Bldg 1000",
        "address_2": " ",
        "city": "Woodstock",
        "state": "GA",
        "zip": "30189",
        "phone": "7709241083"
      },
      {
        "address": "6043 Prestley Mill Rd Ste A",
        "address_2": " ",
        "city": "Douglasville",
        "state": "GA",
        "zip": "30134",
        "phone": "7709493797"
      },
      {
        "address": "5041 Dallas Hwy Ste A",
        "address_2": " ",
        "city": "Powder Springs",
        "state": "GA",
        "zip": "30127",
        "phone": "7704295507"
      }
    ],
    "speciality": [
      "Oral Surgeon"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1649486028",
    "type": "INDIVIDUAL",
    "name": {
      "first": "George",
      "middle": "N",
      "last": "Goolsby",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "3515 Dallas Hwy SW Ste B",
        "address_2": " ",
        "city": "Marietta",
        "state": "GA",
        "zip": "30064",
        "phone": "7704997005",
        "lat": "33.952109",
        "lng": "-84.65452900000003"
      }
    ],
    "speciality": [
      "General Dentist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1073729422",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Scott",
      "middle": "P",
      "last": "Rose",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "55 Whitcher St NE Ste 140",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30060",
        "phone": "7704227630",
        "lat": "33.9668922",
        "lng": "-84.55127529999999"
      },
      {
        "address": "21 Kimberly Ln # A",
        "address_2": " ",
        "city": "Blue Ridge",
        "state": "GA",
        "zip": "30513",
        "phone": "7066327801"
      },
      {
        "address": "85 Golf Crest Dr Ste 209",
        "address_2": " ",
        "city": "Acworth",
        "state": "GA",
        "zip": "30101",
        "phone": "7704292326"
      },
      {
        "address": "2230 Towne Lake Pkwy Bldg 1000",
        "address_2": " ",
        "city": "Woodstock",
        "state": "GA",
        "zip": "30189",
        "phone": "7709241083"
      },
      {
        "address": "6043 Prestley Mill Rd Ste A",
        "address_2": " ",
        "city": "Douglasville",
        "state": "GA",
        "zip": "30134",
        "phone": "7709493797"
      },
      {
        "address": "5041 Dallas Hwy Ste A",
        "address_2": " ",
        "city": "Powder Springs",
        "state": "GA",
        "zip": "30127",
        "phone": "7704295507"
      }
    ],
    "speciality": [
      "Oral Surgeon"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": null,
    "type": "INDIVIDUAL",
    "name": {
      "first": "Jeffrey",
      "middle": "R",
      "last": "Prinsell",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "1950 Spectrum Cir SE Ste B300",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30067",
        "phone": "7709569856",
        "lat": "33.905892",
        "lng": "-84.46768199999997"
      }
    ],
    "speciality": [
      "Oral Surgeon"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1760496210",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Manuel",
      "middle": "A",
      "last": "Davila",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "55 Whitcher St NE Ste 140",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30060",
        "phone": "7704227630",
        "lat": "33.9668922",
        "lng": "-84.55127529999999"
      },
      {
        "address": "21 Kimberly Ln # A",
        "address_2": " ",
        "city": "Blue Ridge",
        "state": "GA",
        "zip": "30513",
        "phone": "7066327801"
      },
      {
        "address": "85 Golf Crest Dr Ste 209",
        "address_2": " ",
        "city": "Acworth",
        "state": "GA",
        "zip": "30101",
        "phone": "7704292326"
      },
      {
        "address": "2230 Towne Lake Pkwy Bldg 1000",
        "address_2": " ",
        "city": "Woodstock",
        "state": "GA",
        "zip": "30189",
        "phone": "7709241083"
      },
      {
        "address": "6043 Prestley Mill Rd Ste A",
        "address_2": " ",
        "city": "Douglasville",
        "state": "GA",
        "zip": "30134",
        "phone": "7709493797"
      },
      {
        "address": "5041 Dallas Hwy Ste A",
        "address_2": " ",
        "city": "Powder Springs",
        "state": "GA",
        "zip": "30127",
        "phone": "7704295507"
      }
    ],
    "speciality": [
      "Oral Surgeon"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1598828063",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Richard",
      "middle": "W",
      "last": "Kinsey",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "55 Whitcher St NE Ste 140",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30060",
        "phone": "7704227630",
        "lat": "33.9668922",
        "lng": "-84.55127529999999"
      },
      {
        "address": "117 First National Dr",
        "address_2": " ",
        "city": "Dallas",
        "state": "GA",
        "zip": "30157",
        "phone": "7705059100"
      },
      {
        "address": "21 Kimberly Ln # A",
        "address_2": " ",
        "city": "Blue Ridge",
        "state": "GA",
        "zip": "30513",
        "phone": "7066327801"
      },
      {
        "address": "85 Golf Crest Dr Ste 209",
        "address_2": " ",
        "city": "Acworth",
        "state": "GA",
        "zip": "30101",
        "phone": "7704292326"
      },
      {
        "address": "2230 Towne Lake Pkwy Bldg 1000",
        "address_2": " ",
        "city": "Woodstock",
        "state": "GA",
        "zip": "30189",
        "phone": "7709241083"
      },
      {
        "address": "6043 Prestley Mill Rd Ste A",
        "address_2": " ",
        "city": "Douglasville",
        "state": "GA",
        "zip": "30134",
        "phone": "7709493797"
      },
      {
        "address": "5041 Dallas Hwy Ste A",
        "address_2": " ",
        "city": "Powder Springs",
        "state": "GA",
        "zip": "30127",
        "phone": "7704295507"
      }
    ],
    "speciality": [
      "Oral Surgeon"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1699810424",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Robert",
      "middle": "Arthur",
      "last": "Pearson",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "141 Banks Sta # 121-122",
        "address_2": "",
        "city": "Fayetteville",
        "state": "GA",
        "zip": "30214",
        "phone": "7707169778",
        "lat": "33.466094",
        "lng": "-84.444853"
      },
      {
        "address": "4930 Governors Dr Ste 405",
        "address_2": "",
        "city": "Forest Park",
        "state": "GA",
        "zip": "30297",
        "phone": "4043631700"
      },
      {
        "address": "1699 Duluth Hwy",
        "address_2": "",
        "city": "Lawrenceville",
        "state": "GA",
        "zip": "30043",
        "phone": "7703381963"
      },
      {
        "address": "1545 Powers Ferry Rd #220",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30067",
        "phone": "7709809404"
      },
      {
        "address": "1301 Shiloh Rd NW Ste 660B100",
        "address_2": "NW",
        "city": "Kennesaw",
        "state": "GA",
        "zip": "30144",
        "phone": "7704239699"
      },
      {
        "address": "330 Corporate Center Ct",
        "address_2": "",
        "city": "Stockbridge",
        "state": "GA",
        "zip": "30281",
        "phone": "6782896707"
      },
      {
        "address": "12220 Birmingham Hwy Bldg 100",
        "address_2": " ",
        "city": "Milton",
        "state": "GA",
        "zip": "30004",
        "phone": "7704759095"
      }
    ],
    "speciality": [
      "Periodontist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": null,
    "type": "INDIVIDUAL",
    "name": {
      "first": "Michael",
      "middle": "M",
      "last": "Demo",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "55 Whitcher St NE Ste 140",
        "address_2": "",
        "city": "Marietta",
        "state": "GA",
        "zip": "30060",
        "phone": "7704227630",
        "lat": "33.9668922",
        "lng": "-84.55127529999999"
      },
      {
        "address": "21 Kimberly Ln # A",
        "address_2": " ",
        "city": "Blue Ridge",
        "state": "GA",
        "zip": "30513",
        "phone": "7066327801"
      },
      {
        "address": "85 Golf Crest Dr Ste 209",
        "address_2": " ",
        "city": "Acworth",
        "state": "GA",
        "zip": "30101",
        "phone": "7704292326"
      },
      {
        "address": "2230 Towne Lake Pkwy Bldg 1000",
        "address_2": " ",
        "city": "Woodstock",
        "state": "GA",
        "zip": "30189",
        "phone": "7709241083"
      },
      {
        "address": "6043 Prestley Mill Rd Ste A",
        "address_2": " ",
        "city": "Douglasville",
        "state": "GA",
        "zip": "30134",
        "phone": "7709493797"
      },
      {
        "address": "5041 Dallas Hwy Ste A",
        "address_2": " ",
        "city": "Powder Springs",
        "state": "GA",
        "zip": "30127",
        "phone": "7704295507"
      }
    ],
    "speciality": [
      "Oral Surgeon"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1699055608",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Leia",
      "middle": " ",
      "last": "Porcaro",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "2000 Powers Ferry Rd SE Ste 1-6",
        "address_2": " ",
        "city": "Marietta",
        "state": "GA",
        "zip": "30067",
        "phone": "6785932979",
        "lat": "33.906085",
        "lng": "-84.465366"
      }
    ],
    "speciality": [
      "General Dentist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English",
      "Portuguese"
    ],
    "gender": "Female",
    "last_updated_on": "2016-09-30"
  },
  {
    "npi": "1891129524",
    "type": "INDIVIDUAL",
    "name": {
      "first": "Daniel",
      "middle": "A",
      "last": "Workie",
      "suffix": ""
    },
    "addresses": [
      {
        "address": "1090 Northchase Pkwy SE Ste 90",
        "address_2": " ",
        "city": "Marietta",
        "state": "GA",
        "zip": "30067",
        "phone": "7705416299",
        "lat": " 33.927644",
        "lng": "-84.482308"
      }
    ],
    "speciality": [
      "General Dentist"
    ],
    "accepting": "accepting",
    "plans": [
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0010006",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020004",
        "network_tier": "PPO"
      },
      {
        "plan_id_type": "HIOS-PLAN-ID",
        "plan_id": "28167GA0020006",
        "network_tier": "PPO"
      }
    ],
    "languages": [
      "English",
      "Spanish"
    ],
    "gender": "Male",
    "last_updated_on": "2016-09-30"
  }
];
  res.render('index', {
    providers: providers
  });
});

router.get('/location/:npi', function(req, res, next) {
  var providerID = req.params.npi;
  res.render('location', {
    providerID : providerID
  });
});

module.exports = router;
