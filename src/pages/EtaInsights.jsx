import { demoTrain, predictionFactors, historicalIntel } from '../data/trains';
import { ArrowRight } from 'lucide-react';

export default function EtaInsights() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">ETA Intelligence</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Understand how historical patterns and current conditions influence the predicted arrival time.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Current Prediction</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 dark:text-gray-500">Train</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{demoTrain.number} {demoTrain.name}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Next Station</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{demoTrain.nextStation}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Current ETA</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{demoTrain.predictedArrival}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Historical Expected ETA</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">12:39 PM</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Predicted Delay</p>
              <p className="font-medium text-minorDelay">+{demoTrain.delayMin} minutes</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Prediction Factors</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Demo model explanation</p>
          <div className="mt-4 flex flex-col gap-3">
            {predictionFactors.map((f) => (
              <div key={f.label}>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{f.label}</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{f.value}%</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
                  <div className="h-full rounded-full bg-rail-500" style={{ width: `${f.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Historical Travel Intelligence</p>
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 dark:text-gray-500">Historical Average Delay</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{historicalIntel.historicalAvgDelayMin} min</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Normal Average Delay</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{historicalIntel.normalAvgDelayMin} min</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Section Travel Time (vs normal)</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">+{historicalIntel.sectionTravelTimeDeltaMin} min</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Passenger Demand</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{historicalIntel.passengerDemand}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg bg-seasonal/10 px-3 py-2 text-xs">
            <span className="font-medium text-seasonal">{historicalIntel.festivalDate} · Festival period</span>
            <span className="text-seasonal">{historicalIntel.festivalPeriod}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Model Context</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Simplified view</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
            {['Historical Data', 'Schedules', 'Festivals', 'Weather', 'Current Train State'].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-gray-100 dark:bg-white/10 px-3 py-1.5">{step}</span>
                {i < arr.length - 1 && <ArrowRight size={12} className="text-gray-300" />}
              </span>
            ))}
          </div>
          <div className="my-3 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <ArrowRight size={14} className="rotate-90" />
            <span>ETA Inference</span>
            <ArrowRight size={14} />
          </div>
          <div className="rounded-lg bg-rail-50 dark:bg-rail-500/10 px-4 py-3 text-center text-sm font-semibold text-rail-700">
            Predicted Remaining Travel Time: 27 minutes
          </div>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
            Real-time updates trigger model <span className="font-medium text-gray-600 dark:text-gray-400">inference</span>, not model retraining.
          </p>
        </div>
      </div>
    </div>
  );
}
