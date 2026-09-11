import { useEffect, useState } from 'react';
import { stationInfo } from '../data/trains';
import { predictEta } from '../lib/api';
import { demoTrain } from '../data/trains';

const CURRENT_STATION_NO = 3; // Warangal, on the Andhra Express route

export default function StationDisplay() {
  const [now, setNow] = useState(new Date());
  const [livePrediction, setLivePrediction] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    predictEta({ trainId: demoTrain.number, currentStationNo: CURRENT_STATION_NO, currentDelay: demoTrain.delayMin })
      .then((res) => setLivePrediction(res?.predictions?.[0] || null));
  }, []);

  const rows = [
    ...stationInfo.arrivals.map((t) => ({ ...t, kind: 'Arrival', time: t.eta })),
    ...stationInfo.departures.map((t) => ({ ...t, kind: 'Departure', time: t.etd })),
  ].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="-m-6 min-h-[calc(100vh-8.5rem)] rounded-2xl bg-[#0b0f19] p-8 font-mono text-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <p className="text-3xl font-bold tracking-wide">{stationInfo.name}</p>
          <p className="text-sm text-white/50">Station code {stationInfo.code} · Departure &amp; Arrival Board</p>
        </div>
        <p className="text-3xl font-bold tabular-nums text-onTime">
          {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-2 border-b border-white/10 px-2 pb-2 text-sm uppercase tracking-widest text-white/40">
        <div className="col-span-2">Time</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-5">Train</div>
        <div className="col-span-1 text-center">Platform</div>
        <div className="col-span-2 text-right">Status</div>
      </div>

      {rows.map((r) => (
        <div key={r.train + r.kind} className="grid grid-cols-12 items-center gap-2 border-b border-white/5 px-2 py-4">
          <div className="col-span-2 text-3xl font-bold tabular-nums">{r.time}</div>
          <div className="col-span-2 text-lg text-white/60">{r.kind}</div>
          <div className="col-span-5 text-2xl font-semibold">{r.train}</div>
          <div className="col-span-1 text-center text-3xl font-bold text-rail-300">{r.platform}</div>
          <div className={`col-span-2 text-right text-xl font-bold ${r.status === 'onTime' ? 'text-onTime' : 'text-minorDelay'}`}>
            {r.status === 'onTime' ? 'ON TIME' : `+${r.delayMin} MIN`}
          </div>
        </div>
      ))}

      {livePrediction && (
        <div className="mt-6 rounded-xl bg-white/5 px-4 py-3 text-sm text-white/70">
          Live model: {demoTrain.number} {demoTrain.name} now predicted{' '}
          <span className="font-semibold text-white">+{livePrediction.predicted_delay_min} min</span> into {stationInfo.name}.
        </div>
      )}

      <p className="mt-6 text-center text-xs text-white/30">
        Demo station display — reuses the same /predict-eta backend as the passenger app, just a simpler board view.
      </p>
    </div>
  );
}
