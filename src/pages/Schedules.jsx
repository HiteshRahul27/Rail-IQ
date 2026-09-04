import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { demoTrain, historicalJourneys } from '../data/trains';

export default function Schedules() {
  const chartData = historicalJourneys
    .slice()
    .reverse()
    .map((j) => ({ date: j.date.slice(0, 6), Delay: j.delayMin }));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Historical Journey</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {demoTrain.number} {demoTrain.name} · {demoTrain.from} → {demoTrain.to}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-card">
        <p className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Delay trend (last 6 journeys)</p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eef0f5" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#8b90a3' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8b90a3' }} axisLine={false} tickLine={false} unit=" min" />
              <Tooltip formatter={(v) => [`${v} min`, 'Delay']} />
              <Line type="monotone" dataKey="Delay" stroke="#2554e8" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-white/5 text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
            <tr>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Scheduled Arrival</th>
              <th className="px-5 py-3 font-medium">Actual Arrival</th>
              <th className="px-5 py-3 font-medium">Delay</th>
              <th className="px-5 py-3 font-medium">Section</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {historicalJourneys.map((j) => (
              <tr key={j.date}>
                <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-200">{j.date}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{j.scheduled}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{j.actual}</td>
                <td className={`px-5 py-3 font-medium ${j.delayMin === 0 ? 'text-onTime' : j.delayMin > 20 ? 'text-majorDelay' : 'text-minorDelay'}`}>
                  {j.delayMin === 0 ? 'On time' : `+${j.delayMin} min`}
                </td>
                <td className="px-5 py-3 text-gray-500 dark:text-gray-400">{j.section}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
