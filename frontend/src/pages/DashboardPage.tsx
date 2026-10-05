import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { KpiCard } from '../components/ui/Card';
import { WaterLevelChart } from '../components/charts/WaterLevelChart';
import { RainfallChart } from '../components/charts/RainfallChart';
import { FloodMap } from '../components/map/FloodMap';
import { DataModeSelector } from '../components/ui/DataModeSelector';
import { RiskBadge } from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { DASHBOARD_DATA, ALERTS, AI_INSIGHT } from '../data/mockData';
import { trendIcon, trendColor, riskColor, clsx } from '../utils/helpers';
import {
  Droplets, CloudRain, MapPin, Cpu, TrendingUp,
  AlertTriangle, Brain, Waves, Eye
} from 'lucide-react';

export function DashboardPage() {
  const { liveWaterLevel, dataMode } = useApp();
  const d = DASHBOARD_DATA;
  const unacked = ALERTS.filter(a => !a.acknowledged);

  return (
    <MainLayout title="Dashboard" subtitle="AI-Enabled Flood Digital Twin Command Center">
      <div className="space-y-5">

        {/* KPI Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <KpiCard
            title="Flood Risk"
            value={d.current_risk_level}
            subtitle={`Score: ${d.risk_score} / 100`}
            icon={<AlertTriangle className="w-4 h-4" />}
            color="orange"
            trend={d.risk_trend}
            badge={<RiskBadge level={d.current_risk_level} />}
          />
          <KpiCard
            title="River Level"
            value={liveWaterLevel.toFixed(2)}
            unit="m"
            subtitle={d.river_status}
            icon={<Waves className="w-4 h-4" />}
            color="red"
            trend="RISING"
          />
          <KpiCard
            title="Rainfall 24h"
            value={d.rainfall_24h_mm}
            unit="mm"
            subtitle={`7-day: ${d.rainfall_7d_mm} mm`}
            icon={<CloudRain className="w-4 h-4" />}
            color="blue"
            trend="INCREASING"
          />
          <KpiCard
            title="Flood Extent"
            value={d.flood_extent_km2}
            unit="km²"
            subtitle="Current estimate"
            icon={<MapPin className="w-4 h-4" />}
            color="orange"
          />
          <KpiCard
            title="Sensors"
            value={`${d.active_sensors}/${d.total_sensors}`}
            subtitle={`${d.total_sensors - d.active_sensors} offline`}
            icon={<Cpu className="w-4 h-4" />}
            color={d.active_sensors < d.total_sensors ? 'orange' : 'green'}
          />
          <KpiCard
            title="Risk Trend"
            value={trendIcon(d.risk_trend)}
            subtitle={d.risk_trend.charAt(0) + d.risk_trend.slice(1).toLowerCase()}
            icon={<TrendingUp className="w-4 h-4" />}
            color={d.risk_trend === 'INCREASING' ? 'red' : d.risk_trend === 'DECREASING' ? 'green' : 'default'}
          />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Map (2/3 width) */}
          <div className="lg:col-span-2 glass-card overflow-hidden" style={{ height: '460px' }}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-blue-900/30">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-white">Flood Map — Brahmaputra Demo Basin</span>
              </div>
              <RiskBadge level="HIGH" />
            </div>
            <div style={{ height: '412px' }}>
              <FloodMap />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <DataModeSelector />

            {/* AI Risk Score */}
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-white">AI Risk Indicator</span>
                <span className="ml-auto text-[10px] text-slate-500">Score</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl font-bold font-mono text-orange-400">{AI_INSIGHT.risk_score}</span>
                <span className="text-slate-500 text-sm">/ 100</span>
                <RiskBadge level={AI_INSIGHT.risk_level} size="md" />
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${AI_INSIGHT.risk_score}%`,
                    background: 'linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444)',
                  }}
                />
              </div>
              <div className="text-xs text-slate-400 mb-3">{AI_INSIGHT.summary.slice(0, 140)}...</div>
              <div className="space-y-1.5">
                {AI_INSIGHT.key_factors.slice(0, 3).map(f => (
                  <div key={f.label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{f.label}</span>
                    <span className={clsx('font-semibold', riskColor(f.level))}>{f.value.split('—')[0].trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-semibold text-white">Active Alerts</span>
                </div>
                <span className="text-xs text-red-400 font-bold">{unacked.length} unread</span>
              </div>
              <div className="space-y-2">
                {unacked.slice(0, 3).map(alert => (
                  <div
                    key={alert.alert_id}
                    className={clsx(
                      'flex items-start gap-2.5 p-2.5 rounded-lg border text-xs',
                      alert.severity === 'CRITICAL' ? 'bg-red-900/30 border-red-700/40' :
                      alert.severity === 'HIGH' ? 'bg-orange-900/30 border-orange-700/40' :
                      'bg-yellow-900/30 border-yellow-700/40',
                    )}
                  >
                    <span className={clsx(
                      'mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0',
                      alert.severity === 'CRITICAL' ? 'bg-red-400 animate-pulse' :
                      alert.severity === 'HIGH' ? 'bg-orange-400' : 'bg-yellow-400',
                    )} />
                    <div>
                      <div className="font-semibold text-white">{alert.title}</div>
                      <div className="text-slate-400 mt-0.5 line-clamp-1">{alert.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-semibold text-white">Water Level — 24h Trend</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded bg-sky-900/50 text-sky-400 border border-sky-800/50">JFT-001</span>
            </div>
            <WaterLevelChart />
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-4">
              <CloudRain className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white">Rainfall — 7-Day History + Forecast</span>
              <div className="ml-auto flex gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-sky-900/50 text-sky-400 border border-sky-800/50">Observed</span>
                <span className="px-2 py-0.5 rounded bg-violet-900/50 text-violet-400 border border-violet-800/50">Forecast</span>
              </div>
            </div>
            <RainfallChart />
            <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-blue-900/30">
              {[
                { label: '1h', value: '14 mm' },
                { label: '6h', value: '38 mm' },
                { label: '24h', value: '86 mm' },
              ].map(r => (
                <div key={r.label} className="text-center">
                  <div className="text-lg font-bold font-mono text-sky-300">{r.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">{r.label} Rain</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="glass-card px-5 py-3 flex flex-wrap items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-slate-400">Digital Twin Active</span>
          </div>
          <div className="text-slate-600">|</div>
          <div className="text-slate-400">
            <span className="text-slate-500">Mode:</span> <span className="text-white font-semibold">{dataMode}</span>
          </div>
          <div className="text-slate-600">|</div>
          <div className="text-slate-400">
            <span className="text-slate-500">Basin:</span> <span className="text-white font-semibold">Brahmaputra Demo</span>
          </div>
          <div className="text-slate-600">|</div>
          <div className="text-slate-400">
            FloodTwin provides a <span className="text-blue-300 font-semibold">common operational picture</span> for observed, forecast and simulated flood conditions.
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
