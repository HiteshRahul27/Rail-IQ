import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Gauge, Clock, TrainFront, Radar, History, LayoutGrid, BellRing } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { trainDetails } from '../data/trains';

const TABS = ['Route & Schedule', 'Live Status', 'Coach Composition', 'Alerts'];

export default function TrainDetails() {
  const { number } = useParams();
  const [tab, setTab] = useState(TABS[0]);
  const train = trainDetails[number] || trainDetails['12806'];
  const route = train.route;
  const progressPct = Math.round((train.distanceCoveredKm / train.totalDistanceKm) * 100);

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-gray-400 dark:text-gray-500">
        <Link to="/trains" className="hover:text-rail-600">Trains</Link> <span className="mx-1">›</span> {train.number}
      </p>

      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rail-50 dark:bg-rail-500/10 text-rail-600">
                <TrainFront size={20} />
              </span>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{train.number} {train.name}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{train.from} ({train.fromCode}) → {train.to} ({train.toCode})</p>
              </div>
            </div>
          </div>
          <StatusBadge status={train.status}>
            {train.delayMin > 0 ? `Delayed by ${train.delayMin} minutes` : 'Running on time'}
          </StatusBadge>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [MapPin, 'Current Location', train.currentLocation],
            [Gauge, 'Current Speed', `${train.currentSpeed} km/h`],
            [Radar, 'Next Station', `${train.nextStation} (${train.nextStationCode})`],
            [Clock, 'Predicted Arrival', `${train.predictedArrival}`, train.predictionWindow],
          ].map(([Icon, label, value, sub]) => (
            <div key={label} className="rounded-xl bg-gray-50 dark:bg-white/5 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-gray-800 text-rail-600 shadow-sm">
                <Icon size={16} />
              </span>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{label}</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{value}</p>
              {sub && <p className="text-xs text-gray-400 dark:text-gray-500">{sub}</p>}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/live-tracking" className="flex items-center gap-2 rounded-lg bg-rail-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rail-700">
            <Radar size={15} /> Track Live
          </Link>
          <Link to="/schedules" className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50">
            <History size={15} /> Previous Schedules
          </Link>
          <Link to="/coach-position" className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50">
            <LayoutGrid size={15} /> Coach Position
          </Link>
          <Link to="/notifications" className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50">
            <BellRing size={15} /> Get Notifications
          </Link>
        </div>
      </div>

      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 ${tab === t ? 'border-rail-600 text-rail-700' : 'border-transparent hover:text-gray-800'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Route & Schedule' && (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
            <ol className="relative ml-3 flex flex-col gap-6 border-l-2 border-gray-100 dark:border-gray-700 pl-6">
              {route.map((s) => (
                <li key={s.code} className="relative">
                  <span
                    className={`absolute -left-[31px] top-0.5 h-3 w-3 rounded-full border-2 border-white ${
                      s.state === 'departed' ? 'bg-onTime' : s.state === 'current' ? 'bg-rail-600 ring-4 ring-rail-100' : 'bg-gray-300'
                    }`}
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className={`text-sm font-semibold ${s.state === 'current' ? 'text-rail-700' : 'text-gray-900 dark:text-gray-100'}`}>{s.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{s.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.time}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{s.note}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Journey Progress</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                <div className="h-full rounded-full bg-rail-600" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {train.distanceCoveredKm} / {train.totalDistanceKm} km · {progressPct}% completed
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card">
              <img
                src="https://images.unsplash.com/photo-1596395463562-b13f2cabb1b8?w=600&auto=format&fit=crop&q=60"
                alt="Warangal station"
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Next stop: {train.nextStation}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Estimated time: 32 minutes</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'Live Status' && (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-sm text-gray-500 dark:text-gray-400 shadow-card">
          Open <Link to="/live-tracking" className="text-rail-600 underline">Live Tracking</Link> for the full real-time map, speed, and demo simulation controls for this train.
        </div>
      )}

      {tab === 'Coach Composition' && (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-sm text-gray-500 dark:text-gray-400 shadow-card">
          See the full coach layout and estimated platform position on the <Link to="/coach-position" className="text-rail-600 underline">Coach Position</Link> page.
        </div>
      )}

      {tab === 'Alerts' && (
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-sm text-gray-500 dark:text-gray-400 shadow-card">
          Manage delay and ETA-change alerts for this train from the <Link to="/notifications" className="text-rail-600 underline">Notifications</Link> page.
        </div>
      )}
    </div>
  );
}
