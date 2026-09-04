import { useState } from 'react';
import { Smartphone, MessageSquare, Bell, TrainFront } from 'lucide-react';

const ALERT_TYPES = [
  { key: 'delay', label: 'Delay alerts', desc: 'Notify me when delay changes by more than 5 minutes' },
  { key: 'eta', label: 'ETA change alerts', desc: 'Notify me when the predicted arrival shifts' },
  { key: 'platform', label: 'Platform updates', desc: 'Notify me if the platform number changes' },
  { key: 'arrival', label: 'Station arrival alerts', desc: 'Notify me when the train reaches a station' },
  { key: 'reminder', label: 'Journey reminders', desc: 'Remind me a day before departure' },
];

const CHANNELS = [
  { key: 'app', label: 'App', icon: Bell, enabled: true },
  { key: 'sms', label: 'SMS', icon: MessageSquare, enabled: true },
  { key: 'whatsapp', label: 'WhatsApp', icon: Smartphone, enabled: false },
];

export default function Notifications() {
  const [prefs, setPrefs] = useState(() => Object.fromEntries(ALERT_TYPES.map((a) => [a.key, true])));
  const [channels, setChannels] = useState(() => Object.fromEntries(CHANNELS.map((c) => [c.key, c.enabled])));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Notifications</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage alerts for your tracked trains.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Alert preferences</p>
            <div className="mt-3 flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
              {ALERT_TYPES.map((a) => (
                <label key={a.key} className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{a.label}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{a.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={prefs[a.key]}
                    onChange={() => setPrefs((p) => ({ ...p, [a.key]: !p[a.key] }))}
                    className="h-5 w-9 shrink-0 cursor-pointer appearance-none rounded-full bg-gray-200 transition-colors checked:bg-rail-600 relative before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Notification channels</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {CHANNELS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setChannels((s) => ({ ...s, [c.key]: !s[c.key] }))}
                  className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-colors ${
                    channels[c.key] ? 'border-rail-200 bg-rail-50 dark:bg-rail-500/10 text-rail-700' : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <c.icon size={18} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Recent notifications</p>

          {[
            {
              text: 'Your predicted arrival at Warangal has changed by 9 minutes due to congestion ahead.',
              time: '2 min ago',
            },
            {
              text: 'Platform for arrival at Warangal Junction changed to Platform 2.',
              time: '18 min ago',
            },
            {
              text: 'Reminder: your journey departs tomorrow at 09:00 AM from Visakhapatnam Jn.',
              time: '1 hr ago',
            },
          ].map((n, i) => (
            <div key={i} className="flex gap-3 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-card">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rail-50 dark:bg-rail-500/10 text-rail-600">
                <TrainFront size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">12806 Andhra Express</p>
                <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{n.text}</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
