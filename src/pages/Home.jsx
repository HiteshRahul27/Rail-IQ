import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gauge, Radar, AlertTriangle, History, LayoutGrid, BellRing, TrainFront } from 'lucide-react';
import IndiaMap from '../components/IndiaMap';
import { demoTrain } from '../data/trains';

const FEATURES = [
  { icon: Gauge, title: 'Accurate ETA', desc: 'Predicted using historical and real-time data' },
  { icon: Radar, title: 'Live Tracking', desc: 'Track location, speed and journey progress' },
  { icon: AlertTriangle, title: 'Delay Intelligence', desc: 'Know why your train is delayed' },
  { icon: History, title: 'Historical Insights', desc: 'Explore previous journeys and seasonal patterns' },
  { icon: LayoutGrid, title: 'Coach Position', desc: 'Find your platform and coach zone' },
  { icon: BellRing, title: 'Smart Notifications', desc: 'Get alerts the moment your ETA changes' },
];

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col gap-14">
      {/* Hero */}
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Smarter journeys,
            <br />
            better connections.
          </h1>
          <p className="mt-4 max-w-xl text-gray-500 dark:text-gray-400">
            Real-time train tracking, intelligent ETA prediction, delay explanations and
            historical railway insights — all in one place.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(query.trim() ? `/trains?q=${encodeURIComponent(query.trim())}` : '/trains');
            }}
            className="mt-8 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Train Name / Number
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. 12806 or Andhra Express"
                  className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-900 outline-none focus:border-rail-400"
                />
              </label>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                Journey Date
                <input type="date" className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-900 outline-none focus:border-rail-400" />
              </label>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                From
                <input defaultValue="Visakhapatnam Jn (VSKP)" className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-900 outline-none focus:border-rail-400" />
              </label>
              <label className="text-sm text-gray-500 dark:text-gray-400">
                To
                <input defaultValue="New Delhi (NDLS)" className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-900 outline-none focus:border-rail-400" />
              </label>
            </div>
            <button className="mt-4 w-full rounded-lg bg-rail-600 py-2.5 text-sm font-semibold text-white hover:bg-rail-700 sm:w-auto sm:px-6">
              Search Trains
            </button>
          </form>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rail-700 to-rail-900 text-white shadow-card">
          <div className="p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-rail-200">Tracking now</p>
            <p className="mt-1 text-lg font-semibold">{demoTrain.number} {demoTrain.name}</p>
            <p className="text-sm text-rail-200">{demoTrain.from} → {demoTrain.to}</p>
            <div className="mt-5 flex items-center gap-6 text-sm">
              <div>
                <p className="text-rail-300">Speed</p>
                <p className="font-semibold">{demoTrain.currentSpeed} km/h</p>
              </div>
              <div>
                <p className="text-rail-300">Next stop</p>
                <p className="font-semibold">{demoTrain.nextStation}</p>
              </div>
              <div>
                <p className="text-rail-300">ETA</p>
                <p className="font-semibold">{demoTrain.predictedArrival}</p>
              </div>
            </div>
          </div>
          <IndiaMap height={260} showLegend={false} compact />
        </div>
      </section>

      {/* Feature cards */}
      <section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-card">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rail-50 dark:bg-rail-500/10 text-rail-600">
                <f.icon size={18} />
              </span>
              <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{f.title}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map + stats */}
      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card">
          <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Live network — {demoTrain.number} {demoTrain.name}</p>
          <IndiaMap height={360} />
        </div>
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Powering journeys for a stronger India</p>
          <div className="mt-5 grid grid-cols-2 gap-5">
            {[
              ['10,000+', 'Trains tracked (demo)'],
              ['7,000+', 'Stations covered'],
              ['AI-powered', 'ETAs & delay insights'],
              ['Built for a connected India', ''],
            ].map(([big, small]) => (
              <div key={big}>
                <p className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
                  <TrainFront size={16} className="text-rail-500" /> {big}
                </p>
                {small && <p className="text-xs text-gray-500 dark:text-gray-400">{small}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
