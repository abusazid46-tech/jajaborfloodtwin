import {
  ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import { WATER_LEVEL_SERIES } from '../../data/mockData';

export function WaterLevelChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-slate-900/95 border border-blue-900/60 rounded-lg p-3 text-xs shadow-xl">
        <div className="font-bold text-slate-300 mb-2">{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} className="flex justify-between gap-4" style={{ color: p.color }}>
            <span>{p.name}</span>
            <span className="font-mono font-bold">{p.value?.toFixed(2)} m</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={WATER_LEVEL_SERIES} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="observedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" />
        <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis
          domain={[8.5, 11.5]}
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => `${v}m`}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '8px' }} />

        <ReferenceLine y={9.50} stroke="#eab308" strokeDasharray="6 3" strokeWidth={1.5}
          label={{ value: 'Warning 9.50m', fill: '#eab308', fontSize: 9, position: 'insideBottomRight' }} />
        <ReferenceLine y={10.50} stroke="#ef4444" strokeDasharray="6 3" strokeWidth={1.5}
          label={{ value: 'Danger 10.50m', fill: '#ef4444', fontSize: 9, position: 'insideBottomRight' }} />

        <Area
          type="monotone"
          dataKey="observed"
          name="Observed"
          stroke="#38bdf8"
          strokeWidth={2.5}
          fill="url(#observedGrad)"
          connectNulls={false}
          dot={false}
          activeDot={{ r: 4, fill: '#38bdf8' }}
        />
        <Area
          type="monotone"
          dataKey="forecast"
          name="Forecast"
          stroke="#a78bfa"
          strokeWidth={2}
          strokeDasharray="6 3"
          fill="url(#forecastGrad)"
          connectNulls={false}
          dot={false}
          activeDot={{ r: 4, fill: '#a78bfa' }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
