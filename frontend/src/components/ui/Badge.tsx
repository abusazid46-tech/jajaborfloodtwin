import { ReactNode } from 'react';
import { clsx } from '../../utils/helpers';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'low' | 'moderate' | 'high' | 'critical' | 'observed' | 'forecast' | 'simulated' | 'info' | 'warning' | 'online' | 'offline';
  size?: 'sm' | 'md';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default:    'bg-slate-800 text-slate-300 border border-slate-700',
  low:        'bg-green-900/60 text-green-300 border border-green-700/50',
  moderate:   'bg-yellow-900/60 text-yellow-300 border border-yellow-700/50',
  high:       'bg-orange-900/60 text-orange-300 border border-orange-700/50',
  critical:   'bg-red-900/60 text-red-300 border border-red-700/50',
  observed:   'bg-sky-900/60 text-sky-300 border border-sky-700/50',
  forecast:   'bg-violet-900/60 text-violet-300 border border-violet-700/50',
  simulated:  'bg-orange-900/60 text-orange-300 border border-orange-700/50',
  info:       'bg-sky-900/60 text-sky-300 border border-sky-700/50',
  warning:    'bg-yellow-900/60 text-yellow-300 border border-yellow-700/50',
  online:     'bg-green-900/60 text-green-300 border border-green-700/50',
  offline:    'bg-slate-800/80 text-slate-500 border border-slate-700/50',
};

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center font-semibold uppercase tracking-wider rounded',
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
      variantStyles[variant],
      className,
    )}>
      {children}
    </span>
  );
}

export function RiskBadge({ level, size }: { level: string; size?: 'sm' | 'md' }) {
  const v = level.toLowerCase() as 'low' | 'moderate' | 'high' | 'critical';
  return <Badge variant={v} size={size}>{level}</Badge>;
}

export function DataModeBadge({ mode }: { mode: 'OBSERVED' | 'FORECAST' | 'SIMULATED' }) {
  const v = mode.toLowerCase() as 'observed' | 'forecast' | 'simulated';
  const labels = { OBSERVED: 'Observed', FORECAST: 'Forecast', SIMULATED: 'Simulated' };
  return <Badge variant={v}>{labels[mode]}</Badge>;
}
