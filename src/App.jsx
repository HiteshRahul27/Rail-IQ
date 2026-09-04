import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Trains from './pages/Trains';
import TrainDetails from './pages/TrainDetails';
import LiveTracking from './pages/LiveTracking';
import Stations from './pages/Stations';
import Schedules from './pages/Schedules';
import CoachPosition from './pages/CoachPosition';
import Notifications from './pages/Notifications';
import EtaInsights from './pages/EtaInsights';
import ControlRoom from './pages/ControlRoom';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/trains/:number" element={<TrainDetails />} />
          <Route path="/live-tracking" element={<LiveTracking />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/coach-position" element={<CoachPosition />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/eta-insights" element={<EtaInsights />} />
          <Route path="/control-room" element={<ControlRoom />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
