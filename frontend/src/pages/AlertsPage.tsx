import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { ALERTS } from '../data/mockData';
import { alertBg, alertColor, formatTimestamp, clsx } from '../utils/helpers';
import { Bell, CheckCheck, Filter } from 'lucide-react';
import type { AlertSeverity } from '../types';

export function AlertsPage() {
  const [filter, setFilter] = useState<AlertSeverity | 'ALL'>('ALL');
  const [alerts, setAlerts] = useState(ALERTS);

  const filtered = filter === 'ALL' ? alerts : alerts.filter(a => a.severity === filter);
  const unacked = alerts.filter(a => !a.acknowledged).length;

  const ackAll = () => setAlerts(prev => prev.map(a => ({ ...a, acknowledged: true })));
  const ack = (id: string) => setAlerts(prev => prev.map(a => a.alert_id === id ? { ...a, acknowledged: true } : a));

  const severityIcon: Record<AlertSeverity, string> = {
    CRITICAL: '🔴',
    HIGH: '🟠',
    WARNING: '🟡',
    INFO: '🔵',
  };

  return (
    <MainLayout title="Alert System" subtitle="Rule-based Threshold Alerts and System Notifications">
      <div className="space-y-5">

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'Total', count: alerts.length, color: 'text-blue-400' },
            { label: 'Unread', count: unacked, color: 'text-red-400' },
            { label: 'Critical', count: alerts.filter(a => a.severity === 'CRITICAL').length, color: 'text-red-400' },
            { label: 'High', count: alerts.filter(a => a.severity === 'HIGH').length, color: 'text-orange-400' },
            { label: 'Warning', count: alerts.filter(a => a.severity === 'WARNING').length, color: 'text-yellow-400' },
          ].map(({ label, count, color }) => (
            <div key={label} className="glass-card px-4 py-3 text-center">
              <div className={clsx('text-2xl font-bold font-mono', color)}>{count}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-slate-500" />
            {(['ALL', 'CRITICAL', 'HIGH', 'WARNING', 'INFO'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                  filter === f
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500',
                )}
              >
                {f}
              </button>
            ))}
          </div>
          {unacked > 0 && (
            <button
              onClick={ackAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-900/30 border border-green-700/50 text-green-400 hover:bg-green-900/50 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark All Read
            </button>
          )}
        </div>

        {/* Alert list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="glass-card p-12 text-center">
              <Bell className="w-12 h-12 text-slate-700 mx-auto mb-3" />
              <div className="text-slate-500">No alerts match the current filter</div>
            </div>
          )}
          {filtered.map(alert => (
            <div
              key={alert.alert_id}
              className={clsx(
                'relative flex items-start gap-4 p-4 rounded-xl border transition-all animate-fade-in',
                alertBg(alert.severity),
                alert.acknowledged ? 'opacity-60' : '',
              )}
            >
              {/* Severity indicator */}
              <div className="flex-shrink-0 mt-0.5 text-base">{severityIcon[alert.severity]}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={clsx('text-sm font-bold', alertColor(alert.severity))}>
                    {alert.title}
                  </span>
                  <span className={clsx(
                    'text-[10px] px-2 py-0.5 rounded font-bold uppercase border',
                    alert.severity === 'CRITICAL' ? 'bg-red-900/60 border-red-700/50 text-red-400' :
                    alert.severity === 'HIGH' ? 'bg-orange-900/60 border-orange-700/50 text-orange-400' :
                    alert.severity === 'WARNING' ? 'bg-yellow-900/60 border-yellow-700/50 text-yellow-400' :
                    'bg-sky-900/60 border-sky-700/50 text-sky-400',
                  )}>
                    {alert.severity}
                  </span>
                  {alert.acknowledged && (
                    <span className="text-[10px] text-green-500 flex items-center gap-1">
                      <CheckCheck className="w-3 h-3" /> Acknowledged
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mb-2">{alert.message}</p>

                <div className="flex items-center gap-4 text-[10px] text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Bell className="w-3 h-3" />
                    {formatTimestamp(alert.timestamp)}
                  </span>
                  {alert.sensor_id && (
                    <span className="text-sky-500 font-mono">{alert.sensor_id}</span>
                  )}
                  <span className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-600 uppercase">{alert.category}</span>
                </div>
              </div>

              {!alert.acknowledged && (
                <button
                  onClick={() => ack(alert.alert_id)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-semibold bg-slate-800/70 border border-slate-700 text-slate-400 hover:border-green-600 hover:text-green-400 transition-colors"
                >
                  Acknowledge
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="text-[11px] text-slate-600 text-center">
          Alert thresholds: Water Level ≥ warning_level → WARNING; ≥ danger_level → HIGH; danger + heavy rain → CRITICAL.
          In production, alerts would be delivered via SMS, email, and dashboard notifications.
        </div>
      </div>
    </MainLayout>
  );
}
