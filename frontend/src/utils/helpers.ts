import type { RiskLevel, AlertSeverity, SensorStatus } from '../types';

export function riskColor(level: RiskLevel | string): string {
  switch (level) {
    case 'LOW':      return 'text-green-400';
    case 'MODERATE': return 'text-yellow-400';
    case 'HIGH':     return 'text-orange-400';
    case 'CRITICAL': return 'text-red-400';
    default:         return 'text-slate-400';
  }
}

export function riskBg(level: RiskLevel | string): string {
  switch (level) {
    case 'LOW':      return 'bg-green-500';
    case 'MODERATE': return 'bg-yellow-500';
    case 'HIGH':     return 'bg-orange-500';
    case 'CRITICAL': return 'bg-red-500';
    default:         return 'bg-slate-500';
  }
}

export function riskBorder(level: RiskLevel | string): string {
  switch (level) {
    case 'LOW':      return 'border-green-500/40';
    case 'MODERATE': return 'border-yellow-500/40';
    case 'HIGH':     return 'border-orange-500/40';
    case 'CRITICAL': return 'border-red-500/40';
    default:         return 'border-slate-500/40';
  }
}

export function riskGlow(level: RiskLevel | string): string {
  switch (level) {
    case 'LOW':      return 'shadow-[0_0_24px_rgba(34,197,94,0.25)]';
    case 'MODERATE': return 'shadow-[0_0_24px_rgba(234,179,8,0.25)]';
    case 'HIGH':     return 'shadow-[0_0_24px_rgba(249,115,22,0.3)]';
    case 'CRITICAL': return 'shadow-[0_0_24px_rgba(239,68,68,0.35)]';
    default:         return '';
  }
}

export function alertColor(severity: AlertSeverity): string {
  switch (severity) {
    case 'INFO':     return 'text-sky-400';
    case 'WARNING':  return 'text-yellow-400';
    case 'HIGH':     return 'text-orange-400';
    case 'CRITICAL': return 'text-red-400';
    default:         return 'text-slate-400';
  }
}

export function alertBg(severity: AlertSeverity): string {
  switch (severity) {
    case 'INFO':     return 'bg-sky-900/40 border-sky-700/40';
    case 'WARNING':  return 'bg-yellow-900/40 border-yellow-700/40';
    case 'HIGH':     return 'bg-orange-900/40 border-orange-700/40';
    case 'CRITICAL': return 'bg-red-900/40 border-red-700/40 critical-flash';
    default:         return 'bg-slate-900/40 border-slate-700/40';
  }
}

export function sensorStatusColor(status: SensorStatus): string {
  switch (status) {
    case 'ONLINE':   return 'text-green-400';
    case 'WARNING':  return 'text-yellow-400';
    case 'CRITICAL': return 'text-red-400';
    case 'OFFLINE':  return 'text-slate-500';
    default:         return 'text-slate-400';
  }
}

export function sensorMarkerColor(status: SensorStatus): string {
  switch (status) {
    case 'ONLINE':   return '#22c55e';
    case 'WARNING':  return '#eab308';
    case 'CRITICAL': return '#ef4444';
    case 'OFFLINE':  return '#64748b';
    default:         return '#94a3b8';
  }
}

export function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  } catch {
    return iso;
  }
}

export function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function clsx(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function riskScorePercent(score: number): number {
  return Math.min(Math.max(score, 0), 100);
}

export function trendIcon(trend: string): string {
  switch (trend) {
    case 'RISING':     return '↑';
    case 'FALLING':    return '↓';
    case 'INCREASING': return '↑';
    case 'DECREASING': return '↓';
    case 'STABLE':     return '→';
    default:           return '→';
  }
}

export function trendColor(trend: string): string {
  switch (trend) {
    case 'RISING':
    case 'INCREASING': return 'text-red-400';
    case 'FALLING':
    case 'DECREASING': return 'text-green-400';
    case 'STABLE':     return 'text-slate-400';
    default:           return 'text-slate-400';
  }
}
