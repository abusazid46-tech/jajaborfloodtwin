import { MainLayout } from '../layouts/MainLayout';
import { DATA_SOURCES } from '../data/mockData';
import { clsx, formatTimestamp } from '../utils/helpers';
import { Database, CheckCircle, AlertCircle, Clock, Satellite, Droplets, Cloud, Cpu, BookOpen, Map } from 'lucide-react';

const categoryIcons: Record<string, any> = {
  Geospatial: Map,
  Hydrology: Droplets,
  Meteorology: Cloud,
  Telemetry: Cpu,
  Archive: BookOpen,
};

export function DataPage() {
  return (
    <MainLayout title="Data & Layers" subtitle="Data Source Status, Quality Monitor and Layer Management">
      <div className="space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Connected / Simulated', count: DATA_SOURCES.filter(d => d.status !== 'UNAVAILABLE').length, color: 'text-green-400', bg: 'from-green-900/30' },
            { label: 'Unavailable', count: DATA_SOURCES.filter(d => d.status === 'UNAVAILABLE').length, color: 'text-red-400', bg: 'from-red-900/30' },
            { label: 'Total Sources', count: DATA_SOURCES.length, color: 'text-blue-400', bg: 'from-blue-900/30' },
          ].map(({ label, count, color, bg }) => (
            <div key={label} className={clsx('rounded-xl border border-slate-700/40 p-4 bg-gradient-to-br to-transparent', bg)}>
              <div className={clsx('text-3xl font-bold font-mono mb-1', color)}>{count}</div>
              <div className="text-xs text-slate-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Data source cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DATA_SOURCES.map(ds => {
            const Icon = categoryIcons[ds.category] || Database;
            return (
              <div key={ds.id} className="glass-card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={clsx(
                      'w-9 h-9 rounded-xl flex items-center justify-center',
                      ds.status === 'UNAVAILABLE' ? 'bg-red-900/40' : 'bg-blue-900/40',
                    )}>
                      <Icon className={clsx('w-4 h-4', ds.status === 'UNAVAILABLE' ? 'text-red-400' : 'text-blue-400')} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{ds.name}</div>
                      <div className="text-[10px] text-slate-500">{ds.category}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={clsx(
                      'px-2 py-0.5 rounded text-[10px] font-bold border',
                      ds.status === 'CONNECTED' ? 'bg-green-900/40 text-green-400 border-green-800/50' :
                      ds.status === 'SIMULATED' ? 'bg-sky-900/40 text-sky-400 border-sky-800/50' :
                      'bg-red-900/40 text-red-400 border-red-800/50',
                    )}>
                      {ds.status}
                    </span>
                    <span className={clsx(
                      'px-2 py-0.5 rounded text-[10px] font-bold border',
                      ds.quality === 'GOOD' ? 'bg-green-900/40 text-green-400 border-green-800/50' :
                      ds.quality === 'FAIR' ? 'bg-yellow-900/40 text-yellow-400 border-yellow-800/50' :
                      'bg-red-900/40 text-red-400 border-red-800/50',
                    )}>
                      {ds.quality}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-3">{ds.description}</p>

                <div className="flex items-center justify-between text-[10px] text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated: {formatTimestamp(ds.last_update)}
                  </div>
                  <span className={clsx(
                    'px-1.5 py-0.5 rounded font-semibold',
                    ds.source_type === 'REAL' ? 'bg-green-950 text-green-600' :
                    ds.source_type === 'SIMULATED' ? 'bg-orange-950 text-orange-600' :
                    'bg-slate-800 text-slate-600',
                  )}>
                    {ds.source_type}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[11px] text-slate-600 text-center">
          In a production deployment, this page would show live API connection health, data latency, and ingestion pipeline status.
          For this MVP, all sources are simulated. Sources marked SIMULATED use realistic generated data.
        </div>
      </div>
    </MainLayout>
  );
}
