import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TrainCard from '../components/TrainCard';
import { trains } from '../data/trains';

export default function Trains() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  // Keep the input in sync if the query changes via the URL (e.g. coming
  // back from Home with a new search).
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleQueryChange = (value) => {
    setQuery(value);
    setSearchParams(value.trim() ? { q: value.trim() } : {}, { replace: true });
  };

  const results = useMemo(() => {
    if (!query.trim()) return trains;
    const q = query.toLowerCase();
    return trains.filter(
      (t) => t.number.includes(q) || t.name.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Find Your Train</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Search any train to get real-time status, predicted arrival and more.</p>
      </div>

      <div className="grid gap-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-card sm:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <label className="text-sm text-gray-500 dark:text-gray-400">
          Train Number / Name
          <input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="e.g. 12806"
            className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-900 outline-none focus:border-rail-400"
          />
        </label>
        <label className="text-sm text-gray-500 dark:text-gray-400">
          From
          <input placeholder="Visakhapatnam Jn" className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-900 outline-none focus:border-rail-400" />
        </label>
        <label className="text-sm text-gray-500 dark:text-gray-400">
          To
          <input placeholder="New Delhi" className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-900 outline-none focus:border-rail-400" />
        </label>
        <label className="text-sm text-gray-500 dark:text-gray-400">
          Journey Date
          <input type="date" className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-900 outline-none focus:border-rail-400" />
        </label>
        <button className="self-end rounded-lg bg-rail-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rail-700">
          Search
        </button>
      </div>

      <p className="text-sm text-gray-400 dark:text-gray-500">Showing {results.length} results · Sort by Relevance</p>

      <div className="flex flex-col gap-4">
        {results.map((t) => (
          <TrainCard key={t.number} train={t} />
        ))}
        {results.length === 0 && (
          <p className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-8 text-center text-sm text-gray-400 dark:text-gray-500">
            No trains match "{query}". Try a different number or name.
          </p>
        )}
      </div>
    </div>
  );
}
