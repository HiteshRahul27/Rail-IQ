import { useState } from 'react';
import { MapPin } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { stationInfo } from '../data/trains';

export default function Stations() {
  const [tab, setTab] = useState('arrivals');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rail-50 dark:bg-rail-500/10 text-rail-600">
          <MapPin size={20} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stationInfo.name}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Station code: {stationInfo.code} · 4 platforms</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
        {[
          ['Live arrivals', stationInfo.arrivals.length],
          ['Live departures', stationInfo.departures.length],
          ['Delayed trains', [...stationInfo.arrivals, ...stationInfo.departures].filter((t) => t.status === 'delayed').length],
          ['Platforms', 4],
        ].map(([label, val]) => (
          <div key={label} className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-center shadow-card">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{val}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
        {['arrivals', 'departures'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 capitalize ${tab === t ? 'border-rail-600 text-rail-700' : 'border-transparent hover:text-gray-800'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
            <tr>
              <th className="px-5 py-3 font-medium">Train</th>
              <th className="px-5 py-3 font-medium">{tab === 'arrivals' ? 'From' : 'To'}</th>
              <th className="px-5 py-3 font-medium">Platform</th>
              <th className="px-5 py-3 font-medium">{tab === 'arrivals' ? 'Expected Arrival' : 'Expected Departure'}</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {(tab === 'arrivals' ? stationInfo.arrivals : stationInfo.departures).map((t) => (
              <tr key={t.train}>
                <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-200">{t.train}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{tab === 'arrivals' ? t.from : t.to}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">Platform {t.platform}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{tab === 'arrivals' ? t.eta : t.etd}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={t.status}>{t.status === 'delayed' ? `+${t.delayMin} min` : 'On time'}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
