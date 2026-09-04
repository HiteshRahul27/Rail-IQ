import { ArrowRight } from 'lucide-react';

const SECTIONS = [
  {
    title: 'The Problem',
    body: 'Scheduled timetables rarely reflect what is actually happening on the network. Passengers are left guessing at real arrival times, and delay causes are opaque even when data to explain them already exists.',
  },
  {
    title: 'Our Solution',
    body: 'Rail IQ combines historical journey patterns with live train state to produce a running, explainable ETA for every train — and to make delay causes visible instead of hidden inside a single scheduled time.',
  },
  {
    title: 'How Dynamic ETA Works',
    body: 'A model trained on historical section travel times, festival and seasonal effects, and weather is combined at inference time with the train\u2019s current speed, position, and delay to produce a live, continuously updated ETA.',
  },
  {
    title: 'Historical Intelligence',
    body: 'Past journeys on the same route and section are used to establish a realistic baseline — what "normal" travel time looks like on a given day type, season, or festival period.',
  },
  {
    title: 'Real-Time Prediction',
    body: 'As new GPS, speed and signalling data arrives, Rail IQ re-runs inference on the existing model rather than retraining — keeping predictions current without the cost or instability of constant retraining.',
  },
  {
    title: 'Delay Intelligence',
    body: 'Rather than a bare number, Rail IQ surfaces the leading factors behind a delay — congestion, signal holds, dwell time — so passengers and control room staff understand why, not just when.',
  },
  {
    title: 'Future Scope',
    body: 'Coach-level crowding prediction, platform-change alerts tied to live yard data, and cross-train delay propagation modelling across a full division are natural next steps beyond this demo.',
  },
];

export default function About() {
  return (
    <div className="flex flex-col gap-10">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">About Rail IQ</h1>
        <p className="mt-3 text-gray-500 dark:text-gray-400">
          Rail IQ is a demo railway intelligence platform for dynamic ETA prediction, live tracking, and delay
          explanation, built around historical and real-time data working together.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <div key={s.title} className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{s.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
        <p className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Simplified architecture</p>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
          {['Historical Data', 'Trained Model', 'Real-Time Feed', 'Inference Engine', 'Dynamic ETA', 'Passenger & Control Room UI'].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-rail-50 dark:bg-rail-500/10 px-3 py-1.5 text-rail-700">{step}</span>
              {i < arr.length - 1 && <ArrowRight size={12} className="text-gray-300" />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
