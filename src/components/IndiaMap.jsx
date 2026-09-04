import { INDIA_STATE_PATHS, INDIA_VIEWBOX } from '../data/indiaPaths';

// Station positions derived from the real state geometry (state bounding
// boxes from the India states dataset), not hand-placed guesses — so they
// sit in roughly the right place relative to the actual coastline/borders.
const STATIONS = {
  VSKP: { x: 330, y: 460 },
  BZA: { x: 272, y: 478 },
  WL: { x: 248, y: 440 },
  KZJ: { x: 243, y: 428 },
  NGP: { x: 238, y: 385 },
  BPL: { x: 205, y: 290 },
  NDLS: { x: 186, y: 210 },
};

const ROUTE = ['VSKP', 'BZA', 'WL', 'KZJ', 'NGP', 'BPL', 'NDLS'];

// Islands (Andaman & Nicobar, Lakshadweep) sit far from the route and just
// add visual noise at this scale — keep the map to the mainland.
const MAINLAND_PATHS = INDIA_STATE_PATHS.filter((p) => p.id !== 'an' && p.id !== 'ld');

export default function IndiaMap({
  height = 340,
  otherTrains = [],
  highlightUpTo = 'WL',
  showLegend = true,
  compact = false,
}) {
  const routePoints = ROUTE.map((k) => STATIONS[k]);
  const pathD = routePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const currentIdx = ROUTE.indexOf(highlightUpTo);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-rail-50/50 dark:bg-white/5" style={{ height }}>
      <svg viewBox={INDIA_VIEWBOX} className="h-full w-full">
        <g
          className="fill-rail-100 stroke-rail-200 dark:fill-gray-700 dark:stroke-gray-600"
          strokeWidth="0.6"
          strokeLinejoin="round"
        >
          {MAINLAND_PATHS.map((p) => (
            <path key={p.id} d={p.d} />
          ))}
        </g>

        {/* Full route */}
        <path d={pathD} fill="none" stroke="#93bcfd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Completed portion */}
        <path
          d={routePoints
            .slice(0, currentIdx + 1)
            .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
            .join(' ')}
          fill="none"
          stroke="#1a9e5c"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Station dots */}
        {ROUTE.map((k) => {
          const p = STATIONS[k];
          const isCurrent = k === highlightUpTo;
          return (
            <g key={k}>
              <circle cx={p.x} cy={p.y} r={isCurrent ? 6 : 3.5} fill={isCurrent ? '#2554e8' : '#5f97fa'} stroke="#fff" strokeWidth="1.5" />
              {!compact && (
                <text x={p.x + 8} y={p.y + 3} fontSize="11" fill="#3d4256" fontFamily="Inter, sans-serif" fontWeight="600">
                  {k}
                </text>
              )}
            </g>
          );
        })}

        {/* Other network trains, positioned as a % of the mainland bounding box */}
        {otherTrains.map((t) => {
          const colors = { onTime: '#1a9e5c', delayed: '#e08a1e', major: '#d8352f' };
          const x = 30 + (t.x / 100) * 480;
          const y = 60 + (t.y / 100) * 560;
          return (
            <circle
              key={t.id}
              cx={x}
              cy={y}
              r={t.selected ? 5 : 3}
              fill={colors[t.status] || '#5f97fa'}
              stroke="#fff"
              strokeWidth="1.2"
            />
          );
        })}
      </svg>
      {showLegend && (
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-lg bg-white/90 px-3 py-2 text-[11px] text-gray-600 shadow-sm dark:bg-gray-800/90 dark:text-gray-300">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-onTime" />On time</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-minorDelay" />Minor delay</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-majorDelay" />Major delay</span>
        </div>
      )}
    </div>
  );
}
