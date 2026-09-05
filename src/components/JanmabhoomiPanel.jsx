import { useState } from 'react';
import { Calendar, TrainFront, X } from 'lucide-react';
import {
  janmabhoomiTrain,
  janmabhoomiStations,
  janmabhoomiCalendar,
  janmabhoomiStats,
  janmabhoomiDailyDetail,
} from '../data/janmabhoomi';

function dayStatus(delayMin) {
  if (delayMin === null || delayMin === undefined) return 'noData';
  if (delayMin <= 5) return 'onTime';
  if (delayMin <= 30) return 'minor';
  return 'major';
}

const CELL_STYLES = {
  onTime: 'bg-onTime/15 text-onTime hover:bg-onTime hover:text-white',
  minor: 'bg-minorDelay/15 text-minorDelay hover:bg-minorDelay hover:text-white',
  major: 'bg-majorDelay/15 text-majorDelay hover:bg-majorDelay hover:text-white',
  noData: 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-500 dark:hover:bg-white/10',
};

const SELECTED_STYLES = {
  onTime: 'bg-onTime text-white',
  minor: 'bg-minorDelay text-white',
  major: 'bg-majorDelay text-white',
  noData: 'bg-gray-300 text-gray-700 dark:bg-white/20 dark:text-gray-200',
};

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function JanmabhoomiPanel() {
  const [selectedDate, setSelectedDate] = useState(null);

  // Pad the front of the grid so the 1st of the month lands in the right weekday column.
  const firstDow = new Date(janmabhoomiCalendar[0].date + 'T00:00:00').getDay();
  const cells = [...Array(firstDow).fill(null), ...janmabhoomiCalendar];
  const detailRows = selectedDate ? janmabhoomiDailyDetail[selectedDate] : null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-card dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rail-50 text-rail-600 dark:bg-rail-500/10">
            <TrainFront size={20} />
          </span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {janmabhoomiTrain.number} {janmabhoomiTrain.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {janmabhoomiTrain.from} ({janmabhoomiTrain.fromCode}) → {janmabhoomiTrain.to} ({janmabhoomiTrain.toCode})
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-seasonal/10 px-3 py-1 text-xs font-semibold text-seasonal">
          <Calendar size={13} /> Daily performance · Aug – Sep 2026
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['Days tracked', janmabhoomiStats.totalDaysTracked],
          ['Avg. delay (with data)', `${janmabhoomiStats.avgDelayMin} min`],
          ['On-time days', janmabhoomiStats.onTimeDays],
          ['Worst delay', `${janmabhoomiStats.worstDelayMin} min`],
        ].map(([label, val]) => (
          <div key={label} className="rounded-xl bg-gray-50 p-3 text-center dark:bg-white/5">
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{val}</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Arrival delay at Lingampalli, by date <span className="font-normal text-gray-400 dark:text-gray-500">· click a date for the full log</span>
        </p>
        <div className="grid grid-cols-7 gap-1.5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="text-center text-[10px] font-medium text-gray-400 dark:text-gray-500">
              {d}
            </div>
          ))}
          {cells.map((c, i) =>
            c === null ? (
              <div key={i} />
            ) : (
              <button
                key={c.date}
                onClick={() => setSelectedDate(c.date === selectedDate ? null : c.date)}
                title={c.date}
                className={`flex aspect-square items-center justify-center rounded-md text-[12px] font-semibold transition-colors ${
                  selectedDate === c.date ? SELECTED_STYLES[dayStatus(c.delayMin)] : CELL_STYLES[dayStatus(c.delayMin)]
                }`}
              >
                {new Date(c.date + 'T00:00:00').getDate()}
              </button>
            )
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-onTime" />On time (≤5 min)</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-minorDelay" />Delayed (6–30 min)</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-majorDelay" />Major delay (30+ min)</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-gray-100 dark:bg-white/10" />No verified data</span>
        </div>
      </div>

      {selectedDate && detailRows && (
        <div className="mt-6 rounded-xl border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 px-4 py-3">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{formatDate(selectedDate)}</p>
            <button onClick={() => setSelectedDate(null)} className="rounded p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10" aria-label="Close">
              <X size={16} />
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-gray-50 text-[10px] uppercase tracking-wide text-gray-400 dark:bg-gray-900 dark:text-gray-500">
                <tr>
                  <th className="px-3 py-2 font-medium">#</th>
                  <th className="px-3 py-2 font-medium">Station</th>
                  <th className="px-3 py-2 font-medium">Sched. Arr.</th>
                  <th className="px-3 py-2 font-medium">Actual Arr.</th>
                  <th className="px-3 py-2 font-medium">Delay</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {detailRows.map((s) => (
                  <tr key={s.no}>
                    <td className="px-3 py-1.5 text-gray-400 dark:text-gray-500">{s.no}</td>
                    <td className="px-3 py-1.5 font-medium text-gray-800 dark:text-gray-200">
                      {s.name} <span className="text-gray-400 dark:text-gray-500">({s.code})</span>
                    </td>
                    <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">{s.schedArr || '—'}</td>
                    <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">{s.actualArr || '—'}</td>
                    <td className={`px-3 py-1.5 font-medium ${
                      s.arrDelay === null ? 'text-gray-400 dark:text-gray-500'
                        : s.arrDelay <= 5 ? 'text-onTime'
                        : s.arrDelay <= 30 ? 'text-minorDelay' : 'text-majorDelay'
                    }`}>
                      {s.arrDelay === null ? '—' : s.arrDelay <= 0 ? `${-s.arrDelay} min early` : `+${s.arrDelay} min`}
                    </td>
                    <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">{s.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Full route — {janmabhoomiStations.length} stops · {janmabhoomiTrain.totalDistanceKm} km</p>
        <div className="max-h-72 overflow-y-auto rounded-xl border border-gray-100 dark:border-gray-700">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-gray-50 text-[10px] uppercase tracking-wide text-gray-400 dark:bg-gray-900 dark:text-gray-500">
              <tr>
                <th className="px-3 py-2 font-medium">#</th>
                <th className="px-3 py-2 font-medium">Station</th>
                <th className="px-3 py-2 font-medium">Dist. (km)</th>
                <th className="px-3 py-2 font-medium">Sched. Arr.</th>
                <th className="px-3 py-2 font-medium">Sched. Dep.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {janmabhoomiStations.map((s) => (
                <tr key={s.code}>
                  <td className="px-3 py-1.5 text-gray-400 dark:text-gray-500">{s.no}</td>
                  <td className="px-3 py-1.5 font-medium text-gray-800 dark:text-gray-200">{s.name} <span className="text-gray-400 dark:text-gray-500">({s.code})</span></td>
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">{s.distanceKm}</td>
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">{s.schedArr || '—'}</td>
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">{s.schedDep || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-gray-400 dark:text-gray-500">
          Schedule and delay data sourced from the published station-level export — demo dataset, not a live feed.
        </p>
      </div>
    </div>
  );
}
