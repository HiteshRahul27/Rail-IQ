import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowDown } from 'lucide-react';
import IndiaMap from '../components/IndiaMap';
import { controlRoomKpis, modelPerformance, delayPropagation, networkTrains } from '../data/trains';

const PIPELINE = [
  'Historical Data', 'Training', 'Deployed Model', 'Real-Time Data', 'Feature Update',
  'Inference', 'Dynamic ETA', 'Actual Arrival', 'Prediction Error', 'Periodic Retraining',
];

export default function ControlRoom() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Rail IQ Control Room</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Real-time railway network intelligence (demo)</p>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-onTime/10 px-3 py-1.5 text-xs font-semibold text-onTime">
          <span className="h-2 w-2 rounded-full bg-onTime" /> All systems operational
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {[
          ['Active Trains', controlRoomKpis.activeTrains],
          ['Delayed Trains', controlRoomKpis.delayedTrains],
          ['Major Delays', controlRoomKpis.majorDelays],
          ['Predictions within ±5 min', `${controlRoomKpis.within5min}%`],
          ['Average ETA Error', `${controlRoomKpis.avgEtaErrorMin} min`],
        ].map(([label, val]) => (
          <div key={label} className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-card">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{val}</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card">
          <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Live network map</p>
          <IndiaMap height={340} otherTrains={networkTrains} />
        </div>

        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Delay Propagation</p>
          <p className="text-xs font-medium uppercase tracking-wide text-demo">Simulation</p>
          <div className="mt-4 flex flex-col gap-3">
            {delayPropagation.map((d, i) => (
              <div key={d.train}>
                <div className="rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{d.train}</p>
                  <p className="text-xs text-minorDelay">+{d.impactMin} min delay</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{d.note}</p>
                </div>
                {i < delayPropagation.length - 1 && (
                  <div className="flex justify-center py-1 text-gray-300">
                    <ArrowDown size={14} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Model Performance</p>
            <span className="rounded-full bg-gray-100 dark:bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Demo</span>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3 text-center">
            {[
              ['MAE', `${modelPerformance.mae} min`],
              ['RMSE', `${modelPerformance.rmse} min`],
              ['Within ±5 min', `${modelPerformance.within5min}%`],
              ['Within ±10 min', `${modelPerformance.within10min}%`],
            ].map(([label, val]) => (
              <div key={label} className="rounded-xl bg-gray-50 dark:bg-white/5 p-3">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{val}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelPerformance.predictedVsActual}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef0f5" />
                <XAxis dataKey="station" tick={{ fontSize: 11, fill: '#8b90a3' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8b90a3' }} axisLine={false} tickLine={false} unit=" min" />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="predicted" fill="#93bcfd" radius={[3, 3, 0, 0]} name="Predicted" />
                <Bar dataKey="actual" fill="#2554e8" radius={[3, 3, 0, 0]} name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Model Pipeline</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PIPELINE.map((step) => (
              <span key={step} className="rounded-full bg-rail-50 dark:bg-rail-500/10 px-3 py-1.5 text-xs font-medium text-rail-700">
                {step}
              </span>
            ))}
          </div>
          <p className="mt-5 rounded-lg bg-gray-50 dark:bg-white/5 px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
            Real-time updates trigger <span className="font-semibold text-gray-700 dark:text-gray-300">inference</span>, not retraining. The
            model retrains periodically on completed journeys with logged prediction error.
          </p>
        </div>
      </div>
    </div>
  );
}
