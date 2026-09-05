import { useState } from 'react';
import { Radar, Gauge, MapPin, Clock } from 'lucide-react';
import IndiaMap from '../components/IndiaMap';
import StatusBadge from '../components/StatusBadge';
import JanmabhoomiPanel from '../components/JanmabhoomiPanel';
import { demoTrain, networkTrains } from '../data/trains';

const SCENARIOS = {
  normal: { label: 'Normal Running', speed: 78, delayMin: 4, status: 'onTime', reason: 'Running close to schedule.' },
  congestion: { label: 'Congestion Ahead', speed: 64, delayMin: 12, status: 'delayed', reason: 'Traffic ahead on the Kazipet–Warangal section.' },
  signal: { label: 'Signal Hold', speed: 18, delayMin: 21, status: 'delayed', reason: 'Held at outer signal near Warangal.' },
  dwell: { label: 'Extended Station Dwell', speed: 0, delayMin: 27, status: 'major', reason: 'Extended halt at Warangal for platform clearance.' },
};

export default function LiveTracking() {
  const [scenario, setScenario] = useState('congestion');
  const s = SCENARIOS[scenario];
  const eta = new Date();
  eta.setMinutes(eta.getMinutes() + 40 - s.delayMin);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Live Train Tracking</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Track the real-time location, speed and predicted arrival of your train.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-card">
          <IndiaMap height={440} otherTrains={networkTrains} />
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{demoTrain.number} {demoTrain.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{demoTrain.from} → {demoTrain.to}</p>
              </div>
              <StatusBadge status={s.status}>
                {s.delayMin > 0 ? `Delayed by ${s.delayMin} min` : 'On time'}
              </StatusBadge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 text-rail-500" />
                <div>
                  <p className="text-gray-400 dark:text-gray-500">Current Location</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{demoTrain.currentLocation}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Gauge size={15} className="mt-0.5 text-rail-500" />
                <div>
                  <p className="text-gray-400 dark:text-gray-500">Speed</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{s.speed} km/h</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Radar size={15} className="mt-0.5 text-rail-500" />
                <div>
                  <p className="text-gray-400 dark:text-gray-500">Next Station</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{demoTrain.nextStation}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={15} className="mt-0.5 text-rail-500" />
                <div>
                  <p className="text-gray-400 dark:text-gray-500">Predicted ETA</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {eta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-gray-50 dark:bg-white/5 px-3 py-2 text-xs text-gray-500 dark:text-gray-400">{s.reason}</p>
          </div>

          <div className="rounded-2xl border border-demo/30 bg-demo/5 p-5">
            <p className="text-sm font-semibold text-demo">DEMO SIMULATION</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Trigger different scenarios to see real-time ETA updates. Changing a scenario updates speed → delay → ETA → status → reason.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {Object.entries(SCENARIOS).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setScenario(key)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    scenario === key
                      ? 'bg-demo text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 ring-1 ring-inset ring-demo/20 hover:bg-demo/10'
                  }`}
                >
                  {val.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <JanmabhoomiPanel />
    </div>
  );
}
