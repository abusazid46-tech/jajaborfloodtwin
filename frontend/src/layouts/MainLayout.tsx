import { ReactNode } from 'react';
import { Bell, Shield, Clock } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { DataModePill } from '../components/ui/DataModeSelector';
import { useApp } from '../context/AppContext';
import { formatTimestamp } from '../utils/helpers';
import { ALERTS } from '../data/mockData';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  const { dashboardData, isLive } = useApp();
  const unreadAlerts = ALERTS.filter(a => !a.acknowledged).length;

  return (
    <div className="min-h-screen flex" style={{ background: '#060c17' }}>
      {/* Scan line effect */}
      <div className="scan-line" />

      <Sidebar />

      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3"
          style={{
            background: 'rgba(6,12,23,0.95)',
            borderBottom: '1px solid rgba(59,130,246,0.12)',
            backdropFilter: 'blur(12px)',
          }}>
          <div>
            <h1 className="text-base font-bold text-white">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            {/* Demo Mode badge */}
            <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-900/40 border border-amber-700/50 text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Demo Mode
            </span>

            {/* Data mode */}
            <DataModePill />

            {/* Last updated */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              <span>Updated {formatTimestamp(dashboardData.last_updated)}</span>
            </div>

            {/* Live indicator */}
            {isLive && (
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="hidden sm:inline font-semibold">LIVE SIM</span>
              </div>
            )}

            {/* Alerts */}
            <button className="relative p-1.5 rounded-lg hover:bg-white/5 transition-colors">
              <Bell className="w-4 h-4 text-slate-400" />
              {unreadAlerts > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadAlerts}
                </span>
              )}
            </button>

            {/* User */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              DO
            </div>
          </div>
        </header>

        {/* Prototype Disclaimer */}
        <div className="mx-6 mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-950/40 border border-amber-800/30">
          <Shield className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <p className="text-[10px] text-amber-600 leading-snug">
            <strong className="text-amber-500">Prototype / Decision Support System</strong> — Not an Official Warning System.
            Jajabor FloodTwin is an experimental MVP. All data is simulated for demonstration purposes.
          </p>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 pt-4 grid-bg">
          {children}
        </main>
      </div>
    </div>
  );
}
