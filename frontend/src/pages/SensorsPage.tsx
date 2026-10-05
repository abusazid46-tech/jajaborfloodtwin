import { MainLayout } from '../layouts/MainLayout';
import { SENSORS } from '../data/mockData';
import { sensorStatusColor } from '../utils/helpers';
import { clsx } from '../utils/helpers';
import { Cpu, Wifi, WifiOff, AlertTriangle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function SensorsPage() {
  const { liveWaterLevel } = useApp();
  const online = SENSORS.filter(s => s.status !== 'OFFLINE').length;
  const offline = SENSORS.filter(s => s.status === 'OFFLINE').length;
  const warning = SENSORS.filter(s => s.status === 'WARNING' || s.status === 'CRITICAL').length;

  return (
    <MainLayout title="Sensor Network" subtitle="IoT Water Level & Rainfall Monitoring — Demo Mode">
      <div className="space-y-5">

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Sensors', value: SENSORS.length, icon: Cpu, color: 'text-blue-400', bg: 'from-blue-900/30' },
            { label: 'Online', value: online, icon: CheckCircle, color: 'text-green-400', bg: 'from-green-900/30' },
            { label: 'Offline', value: offline, icon: WifiOff, color: 'text-slate-400', bg: 'from-slate-800/30' },
            { label: 'Warning / Critical', value: warning, icon: AlertTriangle, color: 'text-orange-400', bg: 'from-orange-900/30' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className={clsx('relative overflow-hidden rounded-xl border border-slate-700/40 p-5 bg-gradient-to-br to-transparent', bg)}>
              <div className={clsx('text-4xl font-bold font-mono mb-1', color)}>{value}</div>
              <div className="text-xs text-slate-500 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Sensor Table */}
        <div className="glass-card overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-blue-900/30">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">Sensor Status Board</span>
            <span className="ml-auto text-[10px] text-slate-600">DEMO MODE — SIMULATED DATA</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-blue-900/20">
                  {['Sensor ID', 'Name', 'Type', 'Water Level', 'Warning', 'Danger', 'Rainfall', 'Status', 'Trend', 'Battery', 'Quality'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SENSORS.map((s, i) => {
                  const isLive = s.sensor_id === 'JFT-001';
                  const level = isLive ? liveWaterLevel : s.water_level;
                  return (
                    <tr
                      key={s.sensor_id}
                      className={clsx(
                        'border-b border-slate-800/50 transition-colors hover:bg-white/[0.02]',
                        i % 2 === 0 ? 'bg-slate-900/20' : '',
                        s.status === 'OFFLINE' ? 'opacity-60' : '',
                      )}
                    >
                      <td className="px-4 py-3 font-mono font-semibold text-sky-400">{s.sensor_id}</td>
                      <td className="px-4 py-3 text-slate-300 max-w-[140px] truncate">{s.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                          {s.sensor_type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-sky-300">
                        {level !== undefined ? (
                          <span className="flex items-center gap-1">
                            {level.toFixed(2)} m
                            {isLive && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 font-mono text-yellow-400">{s.warning_level ? `${s.warning_level} m` : '—'}</td>
                      <td className="px-4 py-3 font-mono text-red-400">{s.danger_level ? `${s.danger_level} m` : '—'}</td>
                      <td className="px-4 py-3 font-mono text-blue-300">{s.rainfall !== undefined ? `${s.rainfall} mm` : '—'}</td>
                      <td className="px-4 py-3">
                        <span className={clsx('flex items-center gap-1.5 font-semibold text-xs', sensorStatusColor(s.status))}>
                          <span className={clsx('w-1.5 h-1.5 rounded-full bg-current', s.status !== 'OFFLINE' && s.status !== 'WARNING' ? 'animate-pulse' : '')} />
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={s.trend === 'RISING' ? 'text-red-400' : s.trend === 'FALLING' ? 'text-green-400' : 'text-slate-400'}>
                          {s.trend === 'RISING' ? '↑' : s.trend === 'FALLING' ? '↓' : '→'} {s.trend}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {s.battery !== undefined ? (
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={clsx('h-full rounded-full', s.battery < 20 ? 'bg-red-500' : s.battery < 50 ? 'bg-yellow-500' : 'bg-green-500')}
                                style={{ width: `${s.battery}%` }}
                              />
                            </div>
                            <span className={clsx('text-xs', s.battery < 20 ? 'text-red-400' : 'text-slate-400')}>{s.battery}%</span>
                          </div>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={clsx(
                          'px-2 py-0.5 rounded text-[10px] font-bold border',
                          s.quality === 'GOOD' ? 'bg-green-900/40 text-green-400 border-green-800/50' :
                          s.quality === 'FAIR' ? 'bg-yellow-900/40 text-yellow-400 border-yellow-800/50' :
                          'bg-red-900/40 text-red-400 border-red-800/50',
                        )}>
                          {s.quality}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Note */}
        <div className="text-[11px] text-slate-600 text-center">
          All sensor data is simulated for demonstration. In production deployment, sensors would be connected via LoRaWAN / GSM telemetry.
          JFT-001 shows live simulation (updates every 3 seconds in demo mode).
        </div>
      </div>
    </MainLayout>
  );
}
