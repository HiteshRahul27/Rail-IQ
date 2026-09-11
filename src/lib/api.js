// Talks to the Rail IQ prediction backend (see /rail-iq-backend). The base
// URL is configurable via an env var so the same build works against a
// local backend (dev) or a deployed one (prod), and set in Vercel as
// VITE_API_BASE_URL.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Calls /predict-eta. Returns null (rather than throwing) on any failure —
 * network error, backend asleep, unknown train — so callers can fall back
 * to a cached/estimated figure instead of breaking the page. Callers should
 * show something like "estimated (model offline)" when this returns null.
 */
export async function predictEta({ trainId, currentStationNo = 1, currentDelay = 0 }) {
  try {
    const url = `${API_BASE}/predict-eta?train_id=${encodeURIComponent(trainId)}&current_station_no=${currentStationNo}&current_delay=${currentDelay}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function listTrains() {
  try {
    const res = await fetch(`${API_BASE}/trains`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export { API_BASE };
