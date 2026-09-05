// Real running data for Janmabhoomi Express (12805), Visakhapatnam Jn -> Lingampalli,
// sourced from the uploaded schedule/actuals export (Aug 1 - Sep 4, 2026).

export const janmabhoomiTrain = {
  number: '12805', name: 'Janmabhoomi Express',
  from: 'Visakhapatnam Jn', fromCode: 'VSKP',
  to: 'Lingampalli', toCode: 'LPI',
  totalDistanceKm: 711,
};

// Static station list for the route (25 stops)
export const janmabhoomiStations = [
  {
    "no": 1,
    "name": "Visakhapatnam Jn",
    "code": "VSKP",
    "distanceKm": 0,
    "schedArr": null,
    "schedDep": "06:20 AM"
  },
  {
    "no": 2,
    "name": "Duvvada",
    "code": "DVD",
    "distanceKm": 18,
    "schedArr": "06:43 AM",
    "schedDep": "06:45 AM"
  },
  {
    "no": 3,
    "name": "Anakapalle",
    "code": "AKP",
    "distanceKm": 33,
    "schedArr": "06:58 AM",
    "schedDep": "07:00 AM"
  },
  {
    "no": 4,
    "name": "Elamanchili",
    "code": "YLM",
    "distanceKm": 57,
    "schedArr": "07:13 AM",
    "schedDep": "07:15 AM"
  },
  {
    "no": 5,
    "name": "Tuni",
    "code": "TUNI",
    "distanceKm": 97,
    "schedArr": "07:38 AM",
    "schedDep": "07:40 AM"
  },
  {
    "no": 6,
    "name": "Annavaram",
    "code": "ANV",
    "distanceKm": 114,
    "schedArr": "07:58 AM",
    "schedDep": "08:00 AM"
  },
  {
    "no": 7,
    "name": "Samalkot Jn",
    "code": "SLO",
    "distanceKm": 151,
    "schedArr": "08:33 AM",
    "schedDep": "08:35 AM"
  },
  {
    "no": 8,
    "name": "Anaparti",
    "code": "APT",
    "distanceKm": 177,
    "schedArr": "08:49 AM",
    "schedDep": "08:50 AM"
  },
  {
    "no": 9,
    "name": "Rajahmundry",
    "code": "RJY",
    "distanceKm": 201,
    "schedArr": "09:18 AM",
    "schedDep": "09:20 AM"
  },
  {
    "no": 10,
    "name": "Tadepalligudem",
    "code": "TDD",
    "distanceKm": 243,
    "schedArr": "10:03 AM",
    "schedDep": "10:05 AM"
  },
  {
    "no": 11,
    "name": "Eluru",
    "code": "EE",
    "distanceKm": 291,
    "schedArr": "10:43 AM",
    "schedDep": "10:45 AM"
  },
  {
    "no": 12,
    "name": "Nuzvid",
    "code": "NZD",
    "distanceKm": 309,
    "schedArr": "11:03 AM",
    "schedDep": "11:05 AM"
  },
  {
    "no": 13,
    "name": "Vijayawada Jn",
    "code": "BZA",
    "distanceKm": 350,
    "schedArr": "12:02 PM",
    "schedDep": "12:12 PM"
  },
  {
    "no": 14,
    "name": "Tenali Jn",
    "code": "TEL",
    "distanceKm": 382,
    "schedArr": "12:45 PM",
    "schedDep": "12:55 PM"
  },
  {
    "no": 15,
    "name": "Guntur Jn",
    "code": "GNT",
    "distanceKm": 407,
    "schedArr": "01:10 PM",
    "schedDep": "01:15 PM"
  },
  {
    "no": 16,
    "name": "Sattenapalle",
    "code": "SAP",
    "distanceKm": 450,
    "schedArr": "01:56 PM",
    "schedDep": "01:57 PM"
  },
  {
    "no": 17,
    "name": "Piduguralla",
    "code": "PGRL",
    "distanceKm": 480,
    "schedArr": "02:22 PM",
    "schedDep": "02:23 PM"
  },
  {
    "no": 18,
    "name": "Nadikode",
    "code": "NDKD",
    "distanceKm": 502,
    "schedArr": "02:43 PM",
    "schedDep": "02:44 PM"
  },
  {
    "no": 19,
    "name": "Miryalaguda",
    "code": "MRGA",
    "distanceKm": 541,
    "schedArr": "03:12 PM",
    "schedDep": "03:13 PM"
  },
  {
    "no": 20,
    "name": "Nalgonda",
    "code": "NLDA",
    "distanceKm": 578,
    "schedArr": "03:42 PM",
    "schedDep": "03:43 PM"
  },
  {
    "no": 21,
    "name": "Ramannapet",
    "code": "RMNP",
    "distanceKm": 613,
    "schedArr": "04:14 PM",
    "schedDep": "04:15 PM"
  },
  {
    "no": 22,
    "name": "Charlapalli",
    "code": "CHZ",
    "distanceKm": 676,
    "schedArr": "06:05 PM",
    "schedDep": "06:07 PM"
  },
  {
    "no": 23,
    "name": "Secunderabad Jn",
    "code": "SC",
    "distanceKm": 688,
    "schedArr": "06:25 PM",
    "schedDep": "06:30 PM"
  },
  {
    "no": 24,
    "name": "Begumpet",
    "code": "BMT",
    "distanceKm": 693,
    "schedArr": "06:41 PM",
    "schedDep": "06:42 PM"
  },
  {
    "no": 25,
    "name": "Lingampalli",
    "code": "LPI",
    "distanceKm": 711,
    "schedArr": "07:15 PM",
    "schedDep": null
  }
];

// One entry per tracked journey date — delayMin is the arrival delay (minutes)
// recorded at Lingampalli, the destination. null = no verified data for that date.
export const janmabhoomiCalendar = [
  {
    "date": "2026-08-01",
    "delayMin": -8
  },
  {
    "date": "2026-08-02",
    "delayMin": 11
  },
  {
    "date": "2026-08-03",
    "delayMin": 14
  },
  {
    "date": "2026-08-04",
    "delayMin": 40
  },
  {
    "date": "2026-08-05",
    "delayMin": -25
  },
  {
    "date": "2026-08-06",
    "delayMin": 13
  },
  {
    "date": "2026-08-07",
    "delayMin": null
  },
  {
    "date": "2026-08-08",
    "delayMin": null
  },
  {
    "date": "2026-08-09",
    "delayMin": null
  },
  {
    "date": "2026-08-10",
    "delayMin": null
  },
  {
    "date": "2026-08-11",
    "delayMin": null
  },
  {
    "date": "2026-08-12",
    "delayMin": null
  },
  {
    "date": "2026-08-13",
    "delayMin": null
  },
  {
    "date": "2026-08-14",
    "delayMin": null
  },
  {
    "date": "2026-08-15",
    "delayMin": null
  },
  {
    "date": "2026-08-16",
    "delayMin": null
  },
  {
    "date": "2026-08-17",
    "delayMin": null
  },
  {
    "date": "2026-08-18",
    "delayMin": null
  },
  {
    "date": "2026-08-19",
    "delayMin": null
  },
  {
    "date": "2026-08-20",
    "delayMin": null
  },
  {
    "date": "2026-08-21",
    "delayMin": null
  },
  {
    "date": "2026-08-22",
    "delayMin": null
  },
  {
    "date": "2026-08-23",
    "delayMin": null
  },
  {
    "date": "2026-08-24",
    "delayMin": null
  },
  {
    "date": "2026-08-25",
    "delayMin": null
  },
  {
    "date": "2026-08-26",
    "delayMin": null
  },
  {
    "date": "2026-08-27",
    "delayMin": 0
  },
  {
    "date": "2026-08-28",
    "delayMin": 0
  },
  {
    "date": "2026-08-29",
    "delayMin": 0
  },
  {
    "date": "2026-08-30",
    "delayMin": 11
  },
  {
    "date": "2026-08-31",
    "delayMin": 214
  },
  {
    "date": "2026-09-01",
    "delayMin": 15
  },
  {
    "date": "2026-09-02",
    "delayMin": 7
  },
  {
    "date": "2026-09-03",
    "delayMin": 7
  },
  {
    "date": "2026-09-04",
    "delayMin": null
  }
];

export const janmabhoomiStats = {
  "totalDaysTracked": 35,
  "daysWithData": 14,
  "onTimeDays": 5,
  "minorDelayDays": 7,
  "majorDelayDays": 2,
  "avgDelayMin": 21.4,
  "bestDelayMin": -25,
  "worstDelayMin": 214
};
