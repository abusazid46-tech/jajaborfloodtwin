import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell, ReferenceLine,
} from 'recharts';
import { RAINFALL_SERIES } from '../../data/mockData';

export function RainfallChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const type = payload[0]?.payload?.type;
    return (
      <div className="bg-slate-900/95 border border-blue-900/60 rounded-lg p-3 text-xs shadow-xl">
        <div className="font-bold text-slate-300 mb-1">{label}</div>
        <div style={{ color: type === 'FORECAST' ? '#a78bfa' : '#38bdf8' }} className="flex justify-between gap-4">
          <span>{type === 'FORECAST' ? 'Forecast' : 'Observed'}</span>
          <span className="font-mono font-bold">{payload[0]?.value} mm</span>
        </div>
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={RAINFALL_SERIES} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(59,130,246,0.08)" vertical={false} />
        <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false}
          tickFormatter={v => `${v}`} width={35} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={75} stroke="#eab308" strokeDasharray="4 2" strokeWidth={1}
          label={{ value: 'Threshold 75mm', fill: '#eab308', fontSize: 9, position: 'insideTopRight' }} />
        <Bar dataKey="rainfall_mm" name="Rainfall" radius={[3, 3, 0, 0]}>
          {RAINFALL_SERIES.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.type === 'FORECAST' ? 'rgba(167,139,250,0.7)' : 'rgba(56,189,248,0.8)'}
              stroke={entry.type === 'FORECAST' ? '#a78bfa' : '#38bdf8'}
              strokeWidth={0.5}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
