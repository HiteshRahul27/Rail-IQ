import { useState } from 'react';
import { coaches, demoTrain } from '../data/trains';

const TYPE_STYLES = {
  engine: 'bg-gray-700 text-white',
  sleeper: 'bg-rail-50 dark:bg-rail-500/10 text-rail-700 border border-rail-100',
  ac3: 'bg-seasonal/10 text-seasonal border border-seasonal/20',
  ac2: 'bg-demo/10 text-demo border border-demo/20',
  pantry: 'bg-amber-50 text-amber-700 border border-amber-200',
};

export default function CoachPosition() {
  const [selected, setSelected] = useState('S4');
  const coach = coaches.find((c) => c.code === selected);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Coach Position</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {demoTrain.number} {demoTrain.name} · estimated coach position at {demoTrain.nextStation} Junction
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
        <p className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Train composition</p>
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
          {coaches.map((c, i) => (
            <div key={c.code} className="flex items-center">
              <button
                onClick={() => c.type !== 'engine' && setSelected(c.code)}
                className={`flex h-12 w-16 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-transform ${TYPE_STYLES[c.type]} ${
                  selected === c.code ? 'scale-110 ring-2 ring-rail-500 ring-offset-2' : ''
                }`}
              >
                {c.code}
              </button>
              {i < coaches.length - 1 && <span className="mx-1 h-0.5 w-3 bg-gray-200" />}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-rail-50 dark:bg-rail-500/10 border border-rail-100" />Sleeper</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-seasonal/10 border border-seasonal/20" />AC 3-tier</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-demo/10 border border-demo/20" />AC 2-tier</span>
          <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-amber-50 border border-amber-200" />Pantry</span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">Selected coach</p>
          <p className="mt-1 text-3xl font-extrabold text-rail-700">Coach: {coach.code}</p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 dark:text-gray-500">Platform</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Platform 2</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Direction</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Engine-end (front)</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Boarding Zone</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Zone C, near foot-over bridge</p>
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Estimated Coach Position</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">Marker C4</p>
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
                  key={c.code}
                  className={`flex h-8 flex-1 items-center justify-center rounded text-[10px] font-semibold ${
                    c.code === selected ? 'bg-rail-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 ring-1 ring-inset ring-gray-200'
                  }`}
                >
                  {c.code}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-gray-400 dark:text-gray-500">Platform 2 · marker positions are approximate for the demo train</p>
        </div>
      </div>
    </div>
  );
}
