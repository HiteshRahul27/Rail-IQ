import { Link } from 'react-router-dom';
import { TrainFront } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function TrainCard({ train }) {
  const delayed = train.delayMin > 0;
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rail-50 dark:bg-rail-500/10 text-rail-600">
          <TrainFront size={18} />
        </span>
        <div>
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {train.number} {train.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {train.from} → {train.to}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:gap-8">
        <div className="text-sm">
          <p className="text-gray-400 dark:text-gray-500">Departure</p>
          <p className="font-medium text-gray-800 dark:text-gray-200">{train.departure}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">{train.fromCode}</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-400 dark:text-gray-500">Scheduled Arrival</p>
          <p className="font-medium text-gray-800 dark:text-gray-200">{train.scheduledArrival}</p>
        </div>
        <div className="text-sm">
          <p className="text-gray-400 dark:text-gray-500">Predicted Arrival</p>
          <p className="font-medium text-gray-800 dark:text-gray-200">{train.predictedArrival}</p>
          {delayed && <p className="text-xs font-medium text-minorDelay">+{train.delayMin} min delay</p>}
        </div>
        <StatusBadge status={train.status} />
      </div>

      <div className="flex gap-2">
        <Link
          to={`/trains/${train.number}`}
          className="rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50"
        >
          View Train
        </Link>
        <Link
          to="/live-tracking"
          className="rounded-lg bg-rail-600 px-4 py-2 text-sm font-medium text-white hover:bg-rail-700"
        >
          Track Live
        </Link>
      </div>
    </div>
  );
}
