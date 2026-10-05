import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { FloodMap } from '../components/map/FloodMap';
import { RiskBadge } from '../components/ui/Badge';
import { runSimulation } from '../data/mockData';
import type { SimulationResult } from '../types';
import { clsx, riskColor } from '../utils/helpers';
import {
  Zap,
  TriangleAlert,
  ArrowRight,
  Info,
  Play,
  Waves,
  CloudRain,
  Clock,
  ShieldAlert,
  Users,
  Building2,
  Ambulance,
  GraduationCap,
  Sparkles,
  MapPin,
  RefreshCw,
} from 'lucide-react';

const WATER_OPTIONS = [0, 0.5, 1.0, 1.5, 2.0];
const RAIN_OPTIONS = [0, 10, 25, 50, 100];
const DURATION_OPTIONS = [6, 12, 24, 48];
const DAM_DISCHARGE_OPTIONS = [0, 1200, 2500, 4500];

const PRESET_SCENARIOS = [
  {
    name: 'Normal Advisory',
    desc: 'Mild seasonal variation',
    water: 0.2,
    rain: 10,
    duration: 12,
    discharge: 0,
    breach: false,
    location: 'Kurua Ring Bund',
  },
  {
    name: 'Monsoon High Inflow',
    desc: 'Heavy localized catchment downpour',
    water: 1.0,
    rain: 40,
    duration: 24,
    discharge: 1200,
    breach: false,
    location: 'Kurua Ring Bund',
  },
  {
    name: 'Dam Gate Release',
    desc: 'Ranganadi / Subansiri surge discharge',
    water: 1.6,
    rain: 50,
    duration: 36,
    discharge: 3500,
    breach: false,
    location: 'Kurua Ring Bund',
  },
  {
    name: 'Catastrophic Breach',
    desc: 'Embankment breach under peak monsoon',
    water: 2.0,
    rain: 100,
    duration: 48,
    discharge: 4500,
    breach: true,
    location: 'Kurua Ring Bund',
  },
];

export function SimulationPage() {
  const [waterLevelChange, setWaterLevelChange] = useState(1.0);
  const [rainfallChange, setRainfallChange] = useState(25);
  const [durationHours, setDurationHours] = useState(24);
  const [damDischarge, setDamDischarge] = useState(0);
  const [embankmentBreach, setEmbankmentBreach] = useState(false);
  const [breachLocation, setBreachLocation] = useState('Kurua Ring Bund');

  const [result, setResult] = useState<SimulationResult | null>(() => runSimulation(1.0, 25, 24, 0, false));
  const [running, setRunning] = useState(false);
  const [showMap, setShowMap] = useState(true);

  const applyPreset = (preset: typeof PRESET_SCENARIOS[0]) => {
    setWaterLevelChange(preset.water);
    setRainfallChange(preset.rain);
    setDurationHours(preset.duration);
    setDamDischarge(preset.discharge);
    setEmbankmentBreach(preset.breach);
    setBreachLocation(preset.location);
    // Instant run for responsive UX
    const res = runSimulation(preset.water, preset.rain, preset.duration, preset.discharge, preset.breach, preset.location);
    setResult(res);
  };

  const handleRun = async () => {
    setRunning(true);
    // Simulated processing latency for realism
    await new Promise((r) => setTimeout(r, 700));
    const res = runSimulation(
      waterLevelChange,
      rainfallChange,
      durationHours,
      damDischarge,
      embankmentBreach,
      breachLocation
    );
    setResult(res);
    setRunning(false);
  };

  return (
    <MainLayout
      title="Scenario Simulator & Digital Twin"
      subtitle="Interactive hydrodynamic what-if modeling for flood forecasting, breach scenarios & evacuation planning"
    >
      <div className="space-y-6">
        {/* Top Notification / Verification Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-950/60 to-slate-900 border border-orange-800/40">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-orange-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-orange-200">
                <strong>NESFIC-D-18 Simulation Engine:</strong> Testing active parameterized 2D hydrodynamic inundation model.
                Adjust parameters below or pick a preset scenario to evaluate projected impacts.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Engine Online
            </span>
          </div>
        </div>

        {/* Quick Scenario Presets */}
        <div className="glass-card p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Presets / Benchmark Scenarios
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_SCENARIOS.map((p) => {
              const isActive =
                waterLevelChange === p.water &&
                rainfallChange === p.rain &&
                durationHours === p.duration &&
                embankmentBreach === p.breach;
              return (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className={clsx(
                    'p-3 rounded-xl border text-left transition-all duration-200',
                    isActive
                      ? 'bg-orange-500/15 border-orange-500/80 shadow-md shadow-orange-500/10'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={clsx('text-xs font-bold', isActive ? 'text-orange-300' : 'text-slate-200')}>
                      {p.name}
                    </span>
                    {p.breach && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 border border-red-700 text-red-300 font-bold">
                        Breach
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">{p.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="glass-card p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  <h2 className="text-base font-bold text-white">Scenario Parameters</h2>
                </div>
                <button
                  onClick={() => applyPreset(PRESET_SCENARIOS[0])}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* River Level Change */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-cyan-400" /> River Level Rise (ΔH)
                  </label>
                  <span className="text-orange-400 font-bold font-mono text-sm">+{waterLevelChange.toFixed(1)} m</span>
                </div>
                <div className="flex gap-1.5 mb-2">
                  {WATER_OPTIONS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setWaterLevelChange(v)}
                      className={clsx(
                        'flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150',
                        waterLevelChange === v
                          ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:border-slate-500'
                      )}
                    >
                      {v === 0 ? '0m' : `+${v}m`}
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="0"
                  max="2.5"
                  step="0.1"
                  value={waterLevelChange}
                  onChange={(e) => setWaterLevelChange(parseFloat(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
              </div>

              {/* Rainfall Change */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <CloudRain className="w-3.5 h-3.5 text-blue-400" /> Precipitation Surcharge (ΔP)
                  </label>
                  <span className="text-blue-400 font-bold font-mono text-sm">+{rainfallChange}%</span>
                </div>
                <div className="flex gap-1.5">
                  {RAIN_OPTIONS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setRainfallChange(v)}
                      className={clsx(
                        'flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150',
                        rainfallChange === v
                          ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:border-slate-500'
                      )}
                    >
                      {v === 0 ? '0%' : `+${v}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulation Duration */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-violet-400" /> Hydrodynamic Window (Hours)
                  </label>
                  <span className="text-violet-400 font-bold font-mono text-sm">{durationHours}h</span>
                </div>
                <div className="flex gap-1.5">
                  {DURATION_OPTIONS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setDurationHours(v)}
                      className={clsx(
                        'flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150',
                        durationHours === v
                          ? 'bg-violet-500/20 border-violet-500 text-violet-300'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:border-slate-500'
                      )}
                    >
                      {v}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Upstream Dam Discharge */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-teal-400" /> Upstream Dam Inflow (Cumecs)
                  </label>
                  <span className="text-teal-400 font-bold font-mono text-sm">{damDischarge} m³/s</span>
                </div>
                <div className="flex gap-1.5">
                  {DAM_DISCHARGE_OPTIONS.map((v) => (
                    <button
                      key={v}
                      onClick={() => setDamDischarge(v)}
                      className={clsx(
                        'flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150',
                        damDischarge === v
                          ? 'bg-teal-500/20 border-teal-500 text-teal-300'
                          : 'bg-slate-800/50 border-slate-700/60 text-slate-400 hover:border-slate-500'
                      )}
                    >
                      {v === 0 ? '0' : `${v}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Embankment Breach Toggle */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className={clsx('w-4 h-4', embankmentBreach ? 'text-red-400' : 'text-slate-500')} />
                    <div>
                      <div className="text-xs font-bold text-slate-200">Embankment Breach Modeling</div>
                      <div className="text-[10px] text-slate-400">Simulate dyke/bund structural failure</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={embankmentBreach}
                      onChange={(e) => setEmbankmentBreach(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                {embankmentBreach && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Breach Location:</span>
                    <select
                      value={breachLocation}
                      onChange={(e) => setBreachLocation(e.target.value)}
                      className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 text-xs"
                    >
                      <option value="Kurua Ring Bund">Kurua Ring Bund (Darrang)</option>
                      <option value="Majuli South Dyke">Majuli South Dyke (Majuli)</option>
                      <option value="Barpeta Polder">Barpeta Polder (Barpeta)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Run button */}
              <button
                onClick={handleRun}
                disabled={running}
                className={clsx(
                  'w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-bold transition-all duration-300',
                  running
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 text-white hover:brightness-110 shadow-lg shadow-orange-500/25 active:scale-[0.99]'
                )}
              >
                {running ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                    Running Digital Twin Simulation...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    Run Scenario Simulation
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {result && (
              <>
                {/* Result Status Banner */}
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-950/40 border border-orange-700/50">
                  <div className="flex items-center gap-2">
                    <TriangleAlert className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-bold text-orange-300 uppercase tracking-wide">
                      Simulation Output: {result.simulation_id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">Evacuation Priority:</span>
                    <span
                      className={clsx(
                        'text-[10px] px-2 py-0.5 rounded font-bold uppercase',
                        result.evacuation_priority === 'CRITICAL'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                          : result.evacuation_priority === 'HIGH'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                      )}
                    >
                      {result.evacuation_priority}
                    </span>
                  </div>
                </div>

                {/* KPI Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Risk Score */}
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-400">Simulated Risk</span>
                      <RiskBadge level={result.risk_level} size="sm" />
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={clsx('text-4xl font-extrabold font-mono', riskColor(result.risk_level))}>
                        {result.risk_score}
                      </span>
                      <span className="text-xs text-slate-500">/100</span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mt-3">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${result.risk_score}%`,
                          background: 'linear-gradient(90deg, #22c55e, #eab308, #f97316, #ef4444)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Flood Inundation Extent */}
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-400">Projected Area</span>
                      <span className="text-[10px] text-red-400 font-bold font-mono">
                        +{result.additional_extent_km2} km²
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl font-extrabold font-mono text-cyan-300">
                        {result.estimated_flood_extent_km2}
                      </span>
                      <span className="text-xs text-slate-500">km²</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-3">
                      Baseline: <strong className="text-slate-200">{result.current_flood_extent_km2} km²</strong>
                    </div>
                  </div>

                  {/* At-Risk Population */}
                  <div className="glass-card p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-slate-400">At-Risk Citizens</span>
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl font-extrabold font-mono text-amber-300">
                        {(result.affected_population / 1000).toFixed(1)}k
                      </span>
                      <span className="text-xs text-slate-500">persons</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-3">
                      Est. Total: <strong className="text-slate-200">{result.affected_population.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                {/* Infrastructure Impact Breakdown */}
                <div className="glass-card p-4 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                    <span>Critical Infrastructure Impact</span>
                    <span className="text-[10px] text-slate-400 lowercase">simulated downstream assets</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-400" /> Villages
                      </div>
                      <div className="text-xl font-bold font-mono text-orange-400">{result.affected_villages}</div>
                    </div>

                    <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <Building2 className="w-3.5 h-3.5 text-rose-400" /> Roads (Km)
                      </div>
                      <div className="text-xl font-bold font-mono text-rose-400">{(result.affected_roads * 4.2).toFixed(1)} km</div>
                    </div>

                    <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Schools
                      </div>
                      <div className="text-xl font-bold font-mono text-amber-400">{result.affected_schools}</div>
                    </div>

                    <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                        <Ambulance className="w-3.5 h-3.5 text-violet-400" /> Health Posts
                      </div>
                      <div className="text-xl font-bold font-mono text-violet-400">{result.affected_health_facilities}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/80">
                    {result.notes}
                  </p>
                </div>

                {/* Map Toggle Button */}
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-300">Digital Twin Geospatial Projection</div>
                  <button
                    onClick={() => setShowMap((v) => !v)}
                    className="px-3 py-1.5 text-xs rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all font-semibold"
                  >
                    {showMap ? 'Hide Scenario Map' : 'View Scenario on Map'}
                  </button>
                </div>

                {/* Interactive Map View */}
                {showMap && (
                  <div className="glass-card overflow-hidden rounded-xl border border-slate-800" style={{ height: '420px' }}>
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-950/70 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
                        <span className="font-semibold text-slate-200">
                          Interactive Brahmaputra Basin Twin — Scenario Inundation Layer
                        </span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-orange-950/60 border border-orange-700/60 text-orange-300 font-mono font-bold">
                        SIMULATED OVERLAY ACTIVE
                      </span>
                    </div>
                    <div style={{ height: 'calc(100% - 37px)' }}>
                      <FloodMap simulationResult={result} showSimLayer={true} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
