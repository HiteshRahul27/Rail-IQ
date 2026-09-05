import { useState } from 'react';
import { coaches } from '../data/trains';
import { janmabhoomiTrain } from '../data/janmabhoomi';

const TYPE_STYLES = {
  engine: 'bg-gray-700 text-white',
  slrd: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20',
  general: 'bg-rail-50 text-rail-700 border border-rail-100 dark:bg-rail-500/10 dark:text-rail-300 dark:border-rail-500/20',
  seating: 'bg-seasonal/10 text-seasonal border border-seasonal/20',
  pantry: 'bg-demo/10 text-demo border border-demo/20',
  ac: 'bg-majorDelay/10 text-majorDelay border border-majorDelay/20',
  guard: 'bg-gray-200 text-gray-600 border border-gray-300 dark:bg-white/10 dark:text-gray-300 dark:border-gray-600',
};

const TYPE_LABELS = {
  general: 'General (unreserved)',
  seating: 'Second sitting (D-class)',
  pantry: 'Pantry / mail',
  ac: 'AC chair car',
  slrd: 'SLR + Divyangjan',
  guard: 'Guard / luggage (LPR)',
};

export default function CoachPosition() {
  const [selected, setSelected] = useState(8);
  const coach = coaches.find((c) => c.position === selected);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Coach Position</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {janmabhoomiTrain.number} {janmabhoomiTrain.name} · rake composition, {janmabhoomiTrain.fromCode} → {janmabhoomiTrain.toCode}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
        <p className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Train composition</p>
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
          {coaches.map((c, i) => (
            <div key={c.position} className="flex items-center">
              <button
                onClick={() => c.type !== 'engine' && setSelected(c.position)}
                className={`flex h-12 w-16 shrink-0 flex-col items-center justify-center rounded-lg text-xs font-semibold transition-transform ${TYPE_STYLES[c.type]} ${
                  selected === c.position ? 'scale-110 ring-2 ring-rail-500 ring-offset-2 dark:ring-offset-gray-800' : ''
                }`}
              >
                <span>{c.code}</span>
                {typeof c.position === 'number' && <span className="text-[9px] font-normal opacity-70">#{c.position}</span>}
              </button>
              {i < coaches.length - 1 && <span className="mx-1 h-0.5 w-3 bg-gray-200 dark:bg-gray-600" />}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <span key={type} className="flex items-center gap-1">
              <span className={`h-2.5 w-2.5 rounded ${TYPE_STYLES[type]}`} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">Selected coach</p>
          <p className="mt-1 text-3xl font-extrabold text-rail-700 dark:text-rail-300">
            {coach.code} <span className="text-base font-medium text-gray-400 dark:text-gray-500">· Position {coach.position}</span>
          </p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 dark:text-gray-500">Class</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{TYPE_LABELS[coach.type] || coach.type}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Direction</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Engine-end (front)</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Boarding Zone</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Zone {String.fromCharCode(65 + Math.floor((coach.position - 1) / 6))}</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Estimated Coach Position</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Marker C{coach.position}</p>
            </div>
          </div>
          <p className="mt-4 rounded-lg bg-gray-50 dark:bg-white/5 px-3 py-2 text-xs text-gray-400 dark:text-gray-500">
            Estimated coach position — does not imply exact railway operational data.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Platform layout</p>
          <div className="mt-4 flex h-40 items-center rounded-xl bg-gray-50 dark:bg-white/5 px-4">
            <div className="flex w-full items-center gap-1">
              {coaches.map((c) => (
                <div
                  key={c.position}
                  className={`flex h-8 flex-1 items-center justify-center rounded text-[9px] font-semibold ${
                    c.position === selected ? 'bg-rail-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-400 dark:text-gray-400 ring-1 ring-inset ring-gray-200 dark:ring-gray-600'
                  }`}
                >
                  {c.code}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">22 coaches · marker positions are approximate for the demo</p>
        </div>
      </div>
    </div>
  );
}
