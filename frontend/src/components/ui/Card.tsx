import { ReactNode } from 'react';
import { clsx } from '../../utils/helpers';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: 'blue' | 'red' | 'orange' | 'green';
  onClick?: () => void;
}

export function Card({ children, className, glow, glowColor = 'blue', onClick }: CardProps) {
  const glowMap = {
    blue:   'shadow-[0_0_24px_rgba(59,130,246,0.2)]',
    red:    'shadow-[0_0_24px_rgba(239,68,68,0.25)]',
    orange: 'shadow-[0_0_24px_rgba(249,115,22,0.25)]',
    green:  'shadow-[0_0_24px_rgba(34,197,94,0.2)]',
  };
  return (
    <div
      onClick={onClick}
      className={clsx(
        'glass-card p-5 transition-all duration-300 animate-fade-in',
        glow && glowMap[glowColor],
        onClick && 'cursor-pointer hover:border-blue-500/40',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'INCREASING' | 'DECREASING' | 'STABLE' | 'RISING' | 'FALLING';
  color?: 'blue' | 'red' | 'orange' | 'green' | 'violet' | 'default';
  badge?: ReactNode;
  className?: string;
}

const colorMap = {
  blue:    { text: 'text-blue-400', bg: 'from-blue-900/30 to-transparent', border: 'border-blue-500/20' },
  red:     { text: 'text-red-400',    bg: 'from-red-900/30 to-transparent',    border: 'border-red-500/20' },
  orange:  { text: 'text-orange-400', bg: 'from-orange-900/30 to-transparent', border: 'border-orange-500/20' },
  green:   { text: 'text-green-400',  bg: 'from-green-900/30 to-transparent',  border: 'border-green-500/20' },
  violet:  { text: 'text-violet-400', bg: 'from-violet-900/30 to-transparent', border: 'border-violet-500/20' },
  default: { text: 'text-slate-200',  bg: 'from-slate-900/30 to-transparent',  border: 'border-slate-700/30' },
};

export function KpiCard({ title, value, unit, subtitle, icon, trend, color = 'default', badge, className }: KpiCardProps) {
  const c = colorMap[color];
  const trendIconMap = { INCREASING: '↑', DECREASING: '↓', STABLE: '→', RISING: '↑', FALLING: '↓' };
  const trendColorMap = { INCREASING: 'text-red-400', DECREASING: 'text-green-400', STABLE: 'text-slate-400', RISING: 'text-red-400', FALLING: 'text-green-400' };

  return (
    <div className={clsx(
      'relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 transition-all duration-300 hover:scale-[1.01]',
      c.bg, c.border,
      'backdrop-blur-sm',
      className,
    )}>
      {/* Background grid */}
      <div className="absolute inset-0 opacity-30 grid-bg pointer-events-none" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            {icon && <span className={clsx('text-lg', c.text)}>{icon}</span>}
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{title}</span>
          </div>
          <div className="flex items-baseline gap-1 mb-1">
            <span className={clsx('text-3xl font-bold font-mono count-animate', c.text)}>{value}</span>
            {unit && <span className="text-sm text-slate-400 font-medium">{unit}</span>}
          </div>
          {subtitle && (
            <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
          )}
          {trend && (
            <div className={clsx('text-xs font-semibold mt-2 flex items-center gap-1', trendColorMap[trend])}>
              <span>{trendIconMap[trend]}</span>
              <span>{trend.charAt(0) + trend.slice(1).toLowerCase()}</span>
            </div>
          )}
        </div>
        {badge && <div className="ml-2 flex-shrink-0">{badge}</div>}
      </div>
    </div>
  );
}
