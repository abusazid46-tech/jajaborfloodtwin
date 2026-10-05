import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { FLOOD_EVENTS } from '../data/mockData';
import { RiskBadge } from '../components/ui/Badge';
import { clsx, formatDate, riskColor } from '../utils/helpers';
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { BarChart3, Calendar } from 'lucide-react';

const YEARS = [2022, 2023, 2024, 2025];

export function HistoricalPage() {
  const [selectedYear, setSelectedYear] = useState<number | 'ALL'>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<typeof FLOOD_EVENTS[0] | null>(null);

  const filtered = selectedYear === 'ALL' ? FLOOD_EVENTS : FLOOD_EVENTS.filter(e => e.year === selectedYear);

  // Annual summary for chart
  const annualData = YEARS.map(yr => {
    const events = FLOOD_EVENTS.filter(e => e.year === yr);
    return {
      year: yr.toString(),
      max_extent: Math.max(...events.map(e => e.flood_extent_km2)),
      max_level: Math.max(...events.map(e => e.max_water_level)),
      events: events.length,
      total_affected: events.reduce((s, e) => s + e.affected_villages, 0),
    };
  });

  return (
    <MainLayout title="Historical Analysis" subtitle="Past Flood Events and Multi-Year Trend Analysis">
      <div className="space-y-5">

        {/* Year filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <Calendar className="w-4 h-4 text-slate-500" />
          <div className="flex gap-2">
            {(['ALL', ...YEARS] as const).map(y => (
              <button
                key={y}
                onClick={() => setSelectedYear(y as number | 'ALL')}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-semibold border transition-all',
                  selectedYear === y
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500',
                )}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Flood extent & level trend */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white">Annual Flood Extent & Peak Level</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={annualData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
                <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="extent" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${v}`} width={40} />
                <YAxis yAxisId="level" orientation="right" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false}
                  tickFormatter={v => `${v}m`} width={40} />
                <Tooltip
                  contentStyle={{ background: '#0f1e35', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '8px' }} />
                <Bar yAxisId="extent" dataKey="max_extent" name="Flood Extent (km²)" fill="rgba(56,189,248,0.6)" stroke="#38bdf8" strokeWidth={0.5} radius={[3, 3, 0, 0]} />
                <Line yAxisId="level" type="monotone" dataKey="max_level" name="Peak Level (m)" stroke="#f97316" strokeWidth={2.5} dot={{ fill: '#f97316', r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Affected villages */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-white">Affected Villages per Year</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={annualData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
                <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={35} />
                <Tooltip
                  contentStyle={{ background: '#0f1e35', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="total_affected" name="Affected Villages" fill="rgba(249,115,22,0.6)" stroke="#f97316" strokeWidth={0.5} radius={[3, 3, 0, 0]} />
                <Line type="monotone" dataKey="events" name="No. of Events" stroke="#a78bfa" strokeWidth={2} dot={{ fill: '#a78bfa', r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event list */}
        <div className="glass-card overflow-hidden">
          <div className="px-5 py-4 border-b border-blue-900/30 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">Flood Event Records</span>
            <span className="text-xs text-slate-500">{filtered.length} events</span>
          </div>
          <div className="divide-y divide-slate-800/50">
            {filtered.map(event => (
              <div
                key={event.event_id}
                className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] cursor-pointer transition-colors"
                onClick={() => setSelectedEvent(prev => prev?.event_id === event.event_id ? null : event)}
              >
                <div className="flex-shrink-0 text-center w-14">
                  <div className="text-2xl font-bold font-mono text-slate-300">{event.year}</div>
                  <div className="text-[10px] text-slate-600">{event.date.slice(5)}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-white">{event.location}</span>
                    <RiskBadge level={event.severity} />
                  </div>
                  <p className="text-xs text-slate-400">{event.description}</p>
                  {selectedEvent?.event_id === event.event_id && (
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in">
                      {[
                        { label: 'Flood Extent', value: `${event.flood_extent_km2} km²` },
                        { label: 'Duration', value: `${event.duration_days} days` },
                        { label: 'Affected Villages', value: event.affected_villages },
                        { label: 'Peak Water Level', value: `${event.max_water_level} m` },
                        { label: 'Max Rainfall', value: `${event.max_rainfall_mm} mm` },
                        { label: 'Population (Demo)', value: event.affected_population.toLocaleString() },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-slate-800/60 rounded-lg p-2.5">
                          <div className="text-[10px] text-slate-500 mb-1">{label}</div>
                          <div className="text-sm font-bold text-white">{value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 text-right">
                  <div className="text-sm font-bold font-mono text-sky-300">{event.flood_extent_km2} km²</div>
                  <div className="text-[10px] text-slate-500">Flood Extent</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-slate-600 text-center">
          Historical data is for demonstration only. Events, extents, and population figures are illustrative and based on simulated datasets.
        </div>
      </div>
    </MainLayout>
  );
}
