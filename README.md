# Rail IQ — Frontend

A React + Vite + Tailwind implementation of the Rail IQ railway intelligence
concept: dynamic ETA prediction, live tracking, delay intelligence, coach
position, notifications, and a control-room dashboard.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Structure

- `src/components/` — shared Layout (top nav), StatusBadge, TrainCard, IndiaMap (stylized SVG route map)
- `src/pages/` — one file per screen (Home, Trains, TrainDetails, LiveTracking, EtaInsights, Schedules, Notifications, CoachPosition, Stations, ControlRoom, About)
- `src/data/trains.js` — all mock/demo data in one place (trains, routes, historical journeys, KPIs)
- Routing via `react-router-dom`, charts via `recharts`, icons via `lucide-react`

## Notes

- `12806 Andhra Express` is the canonical demo train, used consistently across screens per the brief.
- All data is mock/demo data for presentation purposes — not real Indian Railways data.
- The Live Tracking page's "Demo Simulation" panel is a working state switcher: change scenario → speed, delay, ETA and status update together.
- Colors: green = on time, amber = minor delay, red = major delay, purple = demo/simulation, teal = seasonal/festival.
