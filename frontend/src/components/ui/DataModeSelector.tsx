import { useApp } from '../../context/AppContext';
import type { DataMode } from '../../types';
import { clsx } from '../../utils/helpers';

const modes: { value: DataMode; label: string; description: string; color: string }[] = [
  { value: 'OBSERVED',  label: 'Observed',  description: 'Actual measured data',    color: 'border-sky-500 bg-sky-500/20 text-sky-300' },
  { value: 'FORECAST',  label: 'Forecast',  description: 'Model-based prediction',  color: 'border-violet-500 bg-violet-500/20 text-violet-300' },
  { value: 'SIMULATED', label: 'Simulated', description: 'Scenario-generated result', color: 'border-orange-500 bg-orange-500/20 text-orange-300' },
];

export function DataModeSelector() {
  const { dataMode, setDataMode } = useApp();

  return (
    <div className="glass-card p-4">
      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Data Mode</div>
      <div className="flex flex-col gap-2">
        {modes.map(m => (
          <button
            key={m.value}
            onClick={() => setDataMode(m.value)}
            className={clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all duration-200',
              dataMode === m.value
                ? m.color
                : 'border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-slate-300',
            )}
          >
            <span className={clsx(
              'w-3 h-3 rounded-full border-2 flex-shrink-0',
              dataMode === m.value ? 'border-current bg-current' : 'border-slate-600',
            )} />
            <div>
              <div className="text-xs font-semibold">{m.label}</div>
              <div className="text-[10px] opacity-70">{m.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function DataModePill() {
  const { dataMode } = useApp();
  const m = modes.find(x => x.value === dataMode)!;
  return (
    <span className={clsx(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border',
      m.color,
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {m.label}
    </span>
  );
}
