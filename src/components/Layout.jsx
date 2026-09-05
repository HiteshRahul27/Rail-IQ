import { NavLink, Outlet } from 'react-router-dom';
import { TrainFront, Bell, Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/live-tracking', label: 'Live Tracking' },
  { to: '/trains', label: 'Trains' },
  { to: '/stations', label: 'Stations' },
  { to: '/schedules', label: 'Schedules' },
  { to: '/coach-position', label: 'Coach Position' },
  { to: '/notifications', label: 'Notifications' },
  { to: '/eta-insights', label: 'ETA Insights' },
  { to: '/control-room', label: 'Control Room' },
  { to: '/about', label: 'About' },
];

export default function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-[#0b0f19]">
      <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-[#0f1420]/95">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-6">
          <NavLink to="/" className="flex shrink-0 items-center gap-2 text-rail-700">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rail-600 text-white">
              <TrainFront size={18} />
            </span>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">Rail IQ</span>
          </NavLink>

          <nav className="hidden flex-1 items-center gap-1 overflow-x-auto text-sm font-medium text-gray-600 dark:text-gray-400 xl:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-md px-3 py-2 transition-colors ${
                    isActive
                      ? 'bg-rail-50 text-rail-700 dark:bg-rail-500/10 dark:text-rail-300'
                      : 'hover:bg-gray-50 hover:text-gray-900 dark:hover:bg-white/5 dark:hover:text-gray-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 text-gray-500 dark:text-gray-400">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 hover:bg-gray-50 dark:hover:bg-white/5"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="relative rounded-full p-2 hover:bg-gray-50 dark:hover:bg-white/5" aria-label="Notifications">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-majorDelay" />
            </button>
          </div>
        </div>
        {/* Mobile / narrow nav scroll row */}
        <div className="flex gap-1 overflow-x-auto border-t border-gray-100 px-4 py-2 text-sm font-medium text-gray-600 dark:border-gray-800 dark:text-gray-400 xl:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-md px-3 py-1.5 ${
                  isActive ? 'bg-rail-50 text-rail-700 dark:bg-rail-500/10 dark:text-rail-300' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-400 dark:border-gray-800 dark:bg-[#0f1420] dark:text-gray-500">
        Rail IQ · Smarter journeys, powered by real-time and historical intelligence — demo build
      </footer>
    </div>
  );
}
