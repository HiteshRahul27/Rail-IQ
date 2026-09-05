// Mock / demo data for Rail IQ. All figures are illustrative, not real
// Indian Railways operational data.

export const trains = [
  {
    number: '12806',
    name: 'Andhra Express',
    from: 'Visakhapatnam Jn', fromCode: 'VSKP',
    to: 'New Delhi', toCode: 'NDLS',
    departure: '09:00 AM', scheduledArrival: '06:30 PM',
    predictedArrival: '06:42 PM', delayMin: 12,
    status: 'delayed',
  },
  {
    number: '12727',
    name: 'Godavari Express',
    from: 'Visakhapatnam Jn', fromCode: 'VSKP',
    to: 'Secunderabad Jn', toCode: 'SC',
    departure: '06:15 AM', scheduledArrival: '01:20 PM',
    predictedArrival: '01:18 PM', delayMin: 0,
    status: 'onTime',
  },
  {
    number: '12841',
    name: 'Coromandel Express',
    from: 'Chennai Central', fromCode: 'MAS',
    to: 'Howrah Jn', toCode: 'HWH',
    departure: '06:50 PM', scheduledArrival: '06:10 AM',
    predictedArrival: '06:35 AM', delayMin: 25,
    status: 'delayed',
  },
  {
    number: '20704',
    name: 'Vande Bharat Express',
    from: 'Secunderabad Jn', fromCode: 'SC',
    to: 'Visakhapatnam Jn', toCode: 'VSKP',
    departure: '05:45 AM', scheduledArrival: '12:10 PM',
    predictedArrival: '12:05 PM', delayMin: 0,
    status: 'onTime',
  },
  {
    number: '22691',
    name: 'Rajdhani Express',
    from: 'Bengaluru Cant', fromCode: 'BNC',
    to: 'New Delhi', toCode: 'NDLS',
    departure: '08:30 PM', scheduledArrival: '08:55 AM',
    predictedArrival: '09:10 AM', delayMin: 15,
    status: 'delayed',
  },
];

// Canonical demo train used across screens
export const demoTrain = {
  number: '12806',
  name: 'Andhra Express',
  from: 'Visakhapatnam Jn', fromCode: 'VSKP',
  to: 'New Delhi', toCode: 'NDLS',
  currentLocation: 'Near Kazipet Jn',
  currentSpeed: 64,
  delayMin: 12,
  nextStation: 'Warangal',
  nextStationCode: 'WL',
  predictedArrival: '12:48 PM',
  predictionWindow: '12:43 – 12:53 PM',
  status: 'delayed',
  distanceCoveredKm: 420,
  totalDistanceKm: 1670,
};

export const route = [
  { name: 'Visakhapatnam Jn', code: 'VSKP', state: 'departed', time: '09:00 AM', note: 'Platform 1' },
  { name: 'Vijayawada Jn', code: 'BZA', state: 'departed', time: '11:25 AM', note: 'Platform 4' },
  { name: 'Warangal', code: 'WL', state: 'current', time: '12:48 PM', note: 'Platform 2 · Next stop' },
  { name: 'Kazipet Jn', code: 'KZJ', state: 'upcoming', time: '01:10 PM', note: 'Upcoming' },
  { name: 'Nagpur', code: 'NGP', state: 'upcoming', time: '05:20 PM', note: 'Upcoming' },
  { name: 'Bhopal Jn', code: 'BPL', state: 'upcoming', time: '10:15 PM', note: 'Upcoming' },
  { name: 'New Delhi', code: 'NDLS', state: 'upcoming', time: '06:30 PM +1', note: 'Scheduled arrival' },
];

// Full per-train detail records, keyed by train number, used by the Train
// Details page. Each train gets its own route and live-position fields so
// opening a different train from search results actually shows that train.
export const trainDetails = {
  '12806': {
    ...demoTrain,
    route,
    progressLabel: 'Journey Progress',
  },
  '12727': {
    number: '12727', name: 'Godavari Express',
    from: 'Visakhapatnam Jn', fromCode: 'VSKP',
    to: 'Secunderabad Jn', toCode: 'SC',
    currentLocation: 'Near Khammam', currentSpeed: 82,
    delayMin: 0, status: 'onTime',
    nextStation: 'Khammam', nextStationCode: 'KMT',
    predictedArrival: '01:18 PM', predictionWindow: '01:14 – 01:22 PM',
    distanceCoveredKm: 260, totalDistanceKm: 500,
    route: [
      { name: 'Visakhapatnam Jn', code: 'VSKP', state: 'departed', time: '06:15 AM', note: 'Platform 1' },
      { name: 'Rajahmundry', code: 'RJY', state: 'departed', time: '07:55 AM', note: 'Platform 2' },
      { name: 'Khammam', code: 'KMT', state: 'current', time: '01:18 PM', note: 'Platform 1 · Next stop' },
      { name: 'Warangal', code: 'WL', state: 'upcoming', time: '02:05 PM', note: 'Upcoming' },
      { name: 'Secunderabad Jn', code: 'SC', state: 'upcoming', time: '01:20 PM', note: 'Scheduled arrival' },
    ],
  },
  '12841': {
    number: '12841', name: 'Coromandel Express',
    from: 'Chennai Central', fromCode: 'MAS',
    to: 'Howrah Jn', toCode: 'HWH',
    currentLocation: 'Near Bhubaneswar', currentSpeed: 58,
    delayMin: 25, status: 'major',
    nextStation: 'Bhubaneswar', nextStationCode: 'BBS',
    predictedArrival: '06:35 AM', predictionWindow: '06:28 – 06:42 AM',
    distanceCoveredKm: 900, totalDistanceKm: 1660,
    route: [
      { name: 'Chennai Central', code: 'MAS', state: 'departed', time: '06:50 PM', note: 'Platform 3' },
      { name: 'Visakhapatnam Jn', code: 'VSKP', state: 'departed', time: '04:10 AM', note: 'Platform 2' },
      { name: 'Bhubaneswar', code: 'BBS', state: 'current', time: '06:35 AM', note: 'Platform 1 · Next stop' },
      { name: 'Kharagpur Jn', code: 'KGP', state: 'upcoming', time: '09:20 AM', note: 'Upcoming' },
      { name: 'Howrah Jn', code: 'HWH', state: 'upcoming', time: '06:10 AM +1', note: 'Scheduled arrival' },
    ],
  },
  '20704': {
    number: '20704', name: 'Vande Bharat Express',
    from: 'Secunderabad Jn', fromCode: 'SC',
    to: 'Visakhapatnam Jn', toCode: 'VSKP',
    currentLocation: 'Near Rajahmundry', currentSpeed: 110,
    delayMin: 0, status: 'onTime',
    nextStation: 'Rajahmundry', nextStationCode: 'RJY',
    predictedArrival: '12:05 PM', predictionWindow: '12:02 – 12:08 PM',
    distanceCoveredKm: 400, totalDistanceKm: 500,
    route: [
      { name: 'Secunderabad Jn', code: 'SC', state: 'departed', time: '05:45 AM', note: 'Platform 1' },
      { name: 'Khammam', code: 'KMT', state: 'departed', time: '08:00 AM', note: 'Platform 1' },
      { name: 'Rajahmundry', code: 'RJY', state: 'current', time: '12:05 PM', note: 'Platform 1 · Next stop' },
      { name: 'Visakhapatnam Jn', code: 'VSKP', state: 'upcoming', time: '12:10 PM', note: 'Scheduled arrival' },
    ],
  },
  '22691': {
    number: '22691', name: 'Rajdhani Express',
    from: 'Bengaluru Cant', fromCode: 'BNC',
    to: 'New Delhi', toCode: 'NDLS',
    currentLocation: 'Near Guntakal', currentSpeed: 70,
    delayMin: 15, status: 'delayed',
    nextStation: 'Guntakal', nextStationCode: 'GTL',
    predictedArrival: '09:10 AM', predictionWindow: '09:02 – 09:18 AM',
    distanceCoveredKm: 350, totalDistanceKm: 2365,
    route: [
      { name: 'Bengaluru Cant', code: 'BNC', state: 'departed', time: '08:30 PM', note: 'Platform 4' },
      { name: 'Guntakal Jn', code: 'GTL', state: 'current', time: '09:10 AM', note: 'Platform 2 · Next stop' },
      { name: 'Bhopal Jn', code: 'BPL', state: 'upcoming', time: '10:40 PM', note: 'Upcoming' },
      { name: 'New Delhi', code: 'NDLS', state: 'upcoming', time: '08:55 AM +1', note: 'Scheduled arrival' },
    ],
  },
};

export const predictionFactors = [
  { label: 'Current speed', value: 35 },
  { label: 'Previous station delay', value: 25 },
  { label: 'Historical section travel time', value: 20 },
  { label: 'Train traffic', value: 12 },
  { label: 'Weather', value: 8 },
];

export const historicalIntel = {
  historicalAvgDelayMin: 14,
  normalAvgDelayMin: 6,
  sectionTravelTimeDeltaMin: 9,
  passengerDemand: 'High',
  festivalPeriod: 'Dussehra Dwell — Peak Travel Period',
  festivalDate: '22 October',
  festivalActive: true,
};

export const historicalJourneys = [
  { date: '18 Aug 2026', scheduled: '06:30 PM', actual: '06:44 PM', delayMin: 14, section: 'VSKP–NDLS' },
  { date: '11 Aug 2026', scheduled: '06:30 PM', actual: '06:33 PM', delayMin: 3, section: 'VSKP–NDLS' },
  { date: '04 Aug 2026', scheduled: '06:30 PM', actual: '07:02 PM', delayMin: 32, section: 'VSKP–NDLS' },
  { date: '28 Jul 2026', scheduled: '06:30 PM', actual: '06:30 PM', delayMin: 0, section: 'VSKP–NDLS' },
  { date: '21 Jul 2026', scheduled: '06:30 PM', actual: '06:41 PM', delayMin: 11, section: 'VSKP–NDLS' },
  { date: '14 Jul 2026', scheduled: '06:30 PM', actual: '06:52 PM', delayMin: 22, section: 'VSKP–NDLS' },
];

// Real rake composition for Janmabhoomi Express (12805/12806), as given.
export const coaches = [
  { position: 'Engine', code: 'ENG', type: 'engine' },
  { position: 1, code: 'SLRD', type: 'slrd' },
  { position: 2, code: 'GEN', type: 'general' },
  { position: 3, code: 'GEN', type: 'general' },
  { position: 4, code: 'GEN', type: 'general' },
  { position: 5, code: 'D11', type: 'seating' },
  { position: 6, code: 'D10', type: 'seating' },
  { position: 7, code: 'D9', type: 'seating' },
  { position: 8, code: 'D8', type: 'seating' },
  { position: 9, code: 'D7', type: 'seating' },
  { position: 10, code: 'D6', type: 'seating' },
  { position: 11, code: 'D5', type: 'seating' },
  { position: 12, code: 'D4', type: 'seating' },
  { position: 13, code: 'D3', type: 'seating' },
  { position: 14, code: 'D2', type: 'seating' },
  { position: 15, code: 'D1', type: 'seating' },
  { position: 16, code: 'M2', type: 'pantry' },
  { position: 17, code: 'M1', type: 'pantry' },
  { position: 18, code: 'C1', type: 'ac' },
  { position: 19, code: 'GEN', type: 'general' },
  { position: 20, code: 'GEN', type: 'general' },
  { position: 21, code: 'GEN', type: 'general' },
  { position: 22, code: 'LPR', type: 'guard' },
];

export const stationInfo = {
  name: 'Warangal Junction',
  code: 'WL',
  arrivals: [
    { train: '12806 Andhra Express', from: 'Visakhapatnam Jn', platform: 2, eta: '12:48 PM', status: 'delayed', delayMin: 12 },
    { train: '12727 Godavari Express', from: 'Visakhapatnam Jn', platform: 1, eta: '09:40 AM', status: 'onTime', delayMin: 0 },
    { train: '20704 Vande Bharat Express', from: 'Secunderabad Jn', platform: 3, eta: '08:05 AM', status: 'onTime', delayMin: 0 },
  ],
  departures: [
    { train: '12841 Coromandel Express', to: 'Howrah Jn', platform: 4, etd: '02:15 AM', status: 'delayed', delayMin: 25 },
    { train: '22691 Rajdhani Express', to: 'New Delhi', platform: 2, etd: '11:50 PM', status: 'delayed', delayMin: 15 },
  ],
};

export const controlRoomKpis = {
  activeTrains: 124,
  delayedTrains: 31,
  majorDelays: 8,
  within5min: 82,
  avgEtaErrorMin: 4.8,
};

export const modelPerformance = {
  mae: 4.8,
  rmse: 7.2,
  within5min: 82,
  within10min: 94,
  predictedVsActual: [
    { station: 'BZA', predicted: 4, actual: 5 },
    { station: 'WL', predicted: 9, actual: 12 },
    { station: 'KZJ', predicted: 11, actual: 10 },
    { station: 'NGP', predicted: 15, actual: 18 },
    { station: 'BPL', predicted: 20, actual: 19 },
    { station: 'NDLS', predicted: 22, actual: 26 },
  ],
};

export const delayPropagation = [
  { train: '12806 Andhra Express', impactMin: 10, note: 'Origin delay' },
  { train: '12727 Godavari Express', impactMin: 4, note: 'Shared section (Kazipet – Warangal)' },
  { train: '12841 Coromandel Express', impactMin: 2, note: 'Predicted downstream impact' },
];

export const networkTrains = [
  { id: 1, x: 22, y: 18, status: 'onTime' },
  { id: 2, x: 30, y: 32, status: 'onTime' },
  { id: 3, x: 38, y: 46, status: 'delayed' },
  { id: 4, x: 46, y: 58, status: 'delayed' },
  { id: 5, x: 52, y: 40, status: 'onTime' },
  { id: 6, x: 60, y: 24, status: 'major' },
  { id: 7, x: 34, y: 66, status: 'onTime' },
  { id: 8, x: 44, y: 74, status: 'onTime' },
  { id: 9, x: 58, y: 62, status: 'delayed' },
  { id: 10, x: 26, y: 50, status: 'onTime', selected: true },
];
