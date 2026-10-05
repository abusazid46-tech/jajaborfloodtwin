import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { FloodMap } from '../components/map/FloodMap';
import { useApp } from '../context/AppContext';
import { SENSORS, VILLAGES } from '../data/mockData';
import { sensorStatusColor, riskColor } from '../utils/helpers';
import { Layers, Info } from 'lucide-react';

export function MapPage() {
  const { selectedBasin } = useApp();
  const [activeTab, setActiveTab] = useState<'info' | 'sensors' | 'villages'>('info');

  return (
    <MainLayout title="Flood Map" subtitle="Interactive GIS Digital Twin Visualization">
      <div className="flex gap-5" style={{ height: 'calc(100vh - 180px)' }}>
        {/* Map */}
        <div className="flex-1 glass-card overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-blue-900/30">
            <Layers className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">
              GIS Map — {selectedBasin.name}
            </span>
            <span className="ml-auto text-[10px] text-slate-500">
              Dark basemap + flood layers | Click markers for details
            </span>
          </div>
          <div style={{ height: 'calc(100% - 49px)' }}>
            <FloodMap center={selectedBasin.center} zoom={selectedBasin.zoom} />
          </div>
        </div>

        {/* Side panel */}
        <div className="w-72 flex flex-col gap-4 overflow-y-auto">
          {/* Basin info */}
          <div className="glass-card p-4">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Pilot Basin</div>
            <div className="text-sm font-semibold text-white">{selectedBasin.name}</div>
            <div className="text-xs text-slate-400 mt-1">{selectedBasin.description || 'Demo area for prototype evaluation.'}</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-800/60 rounded-lg p-2">
                <div className="text-slate-500 mb-1">Flood Extent</div>
                <div className="text-sky-400 font-bold font-mono">42.6 km²</div>
              </div>
              <div className="bg-slate-800/60 rounded-lg p-2">
                <div className="text-slate-500 mb-1">Risk Level</div>
                <div className="text-orange-400 font-bold">HIGH</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="glass-card overflow-hidden flex flex-col flex-1">
            <div className="flex border-b border-blue-900/30">
              {(['info', 'sensors', 'villages'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-xs font-semibold capitalize transition-colors ${
                    activeTab === tab
                      ? 'text-blue-400 bg-blue-900/20 border-b-2 border-blue-500'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {activeTab === 'info' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-slate-300 font-semibold">Map Layer Description</span>
                  </div>
                  {[
                    { color: 'rgba(56,189,248,0.6)', label: 'Flood Extent', desc: 'Current estimated inundated area' },
                    { color: '#ef4444', label: 'Critical Risk Zone', desc: 'Highest flood risk areas' },
                    { color: '#f97316', label: 'High Risk Zone', desc: 'High probability of flooding' },
                    { color: '#eab308', label: 'Moderate Risk Zone', desc: 'Moderate flood exposure' },
                    { color: '#1d4ed8', label: 'River Channel', desc: 'Brahmaputra main channel' },
                    { color: '#22c55e', label: 'Normal Sensor', desc: 'Sensor within safe range' },
                    { color: '#eab308', label: 'Warning Sensor', desc: 'Sensor above warning level' },
                    { color: '#ef4444', label: 'Critical Sensor', desc: 'Sensor above danger level' },
                    { color: '#64748b', label: 'Offline Sensor', desc: 'No data received' },
                  ].map(({ color, label, desc }) => (
                    <div key={label} className="flex items-start gap-2.5 py-1">
                      <span className="w-3 h-3 rounded-sm mt-0.5 flex-shrink-0" style={{ background: color, border: `1px solid ${color}` }} />
                      <div>
                        <div className="text-xs font-semibold text-slate-300">{label}</div>
                        <div className="text-[10px] text-slate-500">{desc}</div>
                      </div>
                    </div>
                  ))}
                  <div className="text-[10px] text-slate-600 mt-3 p-2 bg-slate-900/50 rounded-lg border border-slate-800">
                    All map data is simulated for demonstration purposes. GIS boundaries are illustrative only.
                  </div>
                </div>
              )}

              {activeTab === 'sensors' && (
                <div className="space-y-2">
                  {SENSORS.map(s => (
                    <div key={s.sensor_id} className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white">{s.sensor_id}</span>
                        <span className={`font-semibold ${sensorStatusColor(s.status)}`}>{s.status}</span>
                      </div>
                      <div className="text-slate-500 text-[10px] mb-1.5">{s.name}</div>
                      {s.water_level !== undefined && (
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-500">Level</span>
                          <span className="text-sky-300 font-mono">{s.water_level.toFixed(2)} m</span>
                        </div>
                      )}
                      {s.rainfall !== undefined && (
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-500">Rainfall</span>
                          <span className="text-sky-300 font-mono">{s.rainfall} mm/h</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'villages' && (
                <div className="space-y-2">
                  {VILLAGES.map(v => (
                    <div key={v.id} className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/40 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-white">{v.name}</span>
                        <span className={`font-semibold ${riskColor(v.risk_level)}`}>{v.risk_level}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Pop: {v.population.toLocaleString()}</span>
                        <span>Area: {v.estimated_affected_area_km2} km²</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
