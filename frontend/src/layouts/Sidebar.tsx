import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, Zap, Brain, Cpu, Database,
  Bell, BarChart3, Info, LogOut, Droplets, ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clsx } from '../utils/helpers';
import { ALERTS } from '../data/mockData';

const navItems = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/map',        icon: Map,              label: 'Flood Map' },
  { to: '/simulation', icon: Zap,              label: 'Scenario Simulator' },
  { to: '/ai',         icon: Brain,            label: 'AI Insights' },
  { to: '/sensors',    icon: Cpu,              label: 'Sensors' },
  { to: '/data',       icon: Database,         label: 'Data & Layers' },
  { to: '/alerts',     icon: Bell,             label: 'Alerts', badge: ALERTS.filter(a => !a.acknowledged).length },
  { to: '/historical', icon: BarChart3,        label: 'Historical Analysis' },
  { to: '/about',      icon: Info,             label: 'System / About' },
];

export function Sidebar() {
  const { selectedBasin, setSelectedBasin, isLive, setIsLive } = useApp();
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] flex flex-col z-50"
      style={{ background: 'linear-gradient(180deg, #060c17 0%, #0a1628 100%)', borderRight: '1px solid rgba(59,130,246,0.12)' }}>
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-blue-900/30">
        <div className="relative">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#060c17] animate-pulse" />
        </div>
        <div>
          <div className="text-sm font-bold text-white leading-tight">Jajabor</div>
          <div className="text-[10px] font-semibold text-blue-400 uppercase tracking-widest">FloodTwin</div>
        </div>
      </div>

      {/* Basin selector */}
      <div className="px-4 pt-4 pb-2">
        <div className="text-[9px] font-bold uppercase tracking-widest text-slate-600 mb-2">Pilot Area</div>
        <select
          value={selectedBasin.id}
          onChange={e => {
            const basins = [
              { id: 'brahmaputra-demo', name: 'Brahmaputra Demo Basin', center: [26.19, 91.72] as [number, number], zoom: 10, description: '' },
              { id: 'barak-demo', name: 'Barak Demo Basin', center: [24.82, 92.78] as [number, number], zoom: 10, description: '' },
              { id: 'subansiri-demo', name: 'Subansiri Demo Basin', center: [27.1, 93.8] as [number, number], zoom: 10, description: '' },
            ];
            const b = basins.find(b => b.id === e.target.value);
            if (b) setSelectedBasin(b);
          }}
          className="w-full bg-slate-900/80 border border-blue-900/40 text-slate-300 text-xs rounded-lg px-3 py-2 outline-none focus:border-blue-500/60 cursor-pointer"
        >
          <option value="brahmaputra-demo">Brahmaputra Demo</option>
          <option value="barak-demo">Barak Demo</option>
          <option value="subansiri-demo">Subansiri Demo</option>
        </select>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => clsx(
              'sidebar-item',
              isActive && 'active',
            )}
          >
            <item.icon className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
              <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {item.badge}
              </span>
            ) : (
              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-50" />
            )}
          </NavLink>
        ))}
      </nav>

      {/* Live Mode toggle */}
      <div className="px-4 py-3 border-t border-blue-900/30">
        <button
          onClick={() => setIsLive(!isLive)}
          className={clsx(
            'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200',
            isLive
              ? 'bg-green-900/30 border border-green-700/40 text-green-400'
              : 'bg-slate-800/50 border border-slate-700/40 text-slate-500',
          )}
        >
          <div className="flex items-center gap-2">
            <span className={clsx('w-2 h-2 rounded-full', isLive ? 'bg-green-400 animate-pulse' : 'bg-slate-600')} />
            {isLive ? 'Live Simulation' : 'Paused'}
          </div>
          <span className="text-[10px] opacity-60">{isLive ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-blue-900/30">
        <button
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
        <div className="mt-2 text-[9px] text-slate-700 leading-tight">
          Prototype · NESFIC-D-18<br />
          Jajabor AI · v0.1-MVP
        </div>
      </div>
    </aside>
  );
}
