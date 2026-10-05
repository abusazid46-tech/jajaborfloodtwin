import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polygon, Polyline, Popup, LayersControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { SENSORS, VILLAGES } from '../../data/mockData';
import { sensorMarkerColor, formatTimestamp, riskColor } from '../../utils/helpers';
import type { SimulationResult } from '../../types';

// Fix default leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Demo flood polygon (represents flood extent around demo basin)
const FLOOD_POLYGON: [number, number][] = [
  [26.22, 91.62], [26.18, 91.64], [26.13, 91.67], [26.09, 91.70],
  [26.07, 91.74], [26.10, 91.79], [26.14, 91.83], [26.19, 91.84],
  [26.25, 91.80], [26.29, 91.74], [26.27, 91.68], [26.24, 91.64],
];

// Simulated extended flood polygon
function makeSimFloodPoly(factor: number): [number, number][] {
  return FLOOD_POLYGON.map(([lat, lng]) => [
    lat + (lat - 26.17) * factor * 0.18,
    lng + (lng - 91.73) * factor * 0.18,
  ] as [number, number]);
}

// Demo river line
const RIVER_LINE: [number, number][] = [
  [26.48, 91.52], [26.42, 91.56], [26.35, 91.61], [26.27, 91.66],
  [26.20, 91.70], [26.14, 91.74], [26.07, 91.78], [25.99, 91.84],
  [25.92, 91.89],
];

// Risk zone colors
const RISK_ZONES: { poly: [number, number][]; color: string; fill: string; label: string }[] = [
  {
    poly: [[26.15, 91.66], [26.12, 91.68], [26.10, 91.72], [26.13, 91.76], [26.17, 91.77], [26.20, 91.73], [26.18, 91.68]],
    color: '#ef4444', fill: 'rgba(239,68,68,0.18)', label: 'Critical Risk Zone',
  },
  {
    poly: [[26.20, 91.62], [26.15, 91.65], [26.12, 91.68], [26.18, 91.68], [26.20, 91.73], [26.25, 91.72], [26.28, 91.66], [26.24, 91.62]],
    color: '#f97316', fill: 'rgba(249,115,22,0.14)', label: 'High Risk Zone',
  },
  {
    poly: [[26.25, 91.72], [26.20, 91.73], [26.17, 91.77], [26.22, 91.82], [26.28, 91.80], [26.31, 91.75], [26.29, 91.71]],
    color: '#eab308', fill: 'rgba(234,179,8,0.12)', label: 'Moderate Risk Zone',
  },
];

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => { map.setView(center, zoom); }, [center, zoom]);
  return null;
}

interface FloodMapProps {
  center?: [number, number];
  zoom?: number;
  simulationResult?: SimulationResult | null;
  showSimLayer?: boolean;
  height?: string;
}

export function FloodMap({ center = [26.19, 91.73], zoom = 11, simulationResult, showSimLayer, height = '100%' }: FloodMapProps) {
  const [layers, setLayers] = useState({
    floodExtent: true,
    riskZones: true,
    rivers: true,
    sensors: true,
    villages: true,
    roads: false,
  });

  const simFactor = simulationResult ? (simulationResult.estimated_flood_extent_km2 / simulationResult.current_flood_extent_km2 - 1) * 5 : 0;

  return (
    <div style={{ height, position: 'relative' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <ChangeView center={center} zoom={zoom} />

        {/* Base tile */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
          maxZoom={20}
        />

        {/* Risk Zones */}
        {layers.riskZones && RISK_ZONES.map((zone, i) => (
          <Polygon key={i} positions={zone.poly}
            pathOptions={{ color: zone.color, fillColor: zone.fill, weight: 1.5, fillOpacity: 1 }}>
            <Popup><div className="text-sm font-semibold" style={{ color: zone.color }}>{zone.label}</div></Popup>
          </Polygon>
        ))}

        {/* Flood Extent */}
        {layers.floodExtent && (
          <Polygon
            positions={FLOOD_POLYGON}
            pathOptions={{ color: '#38bdf8', fillColor: 'rgba(56,189,248,0.22)', weight: 2, fillOpacity: 1, dashArray: '6 3' }}>
            <Popup>
              <div className="text-sm">
                <div className="font-bold text-sky-400 mb-1">Current Flood Extent</div>
                <div className="text-xs text-slate-400">Area: ~42.6 km² (Demo)</div>
                <div className="text-[10px] text-sky-600 mt-1">OBSERVED DATA — SIMULATED</div>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* Simulated Flood Extension */}
        {showSimLayer && simulationResult && (
          <Polygon
            positions={makeSimFloodPoly(simFactor)}
            pathOptions={{ color: '#fb923c', fillColor: 'rgba(251,146,60,0.2)', weight: 2.5, fillOpacity: 1, dashArray: '8 4' }}>
            <Popup>
              <div className="text-sm">
                <div className="font-bold text-orange-400 mb-1">⚠ SIMULATED Flood Extent</div>
                <div className="text-xs text-slate-400">Area: ~{simulationResult.estimated_flood_extent_km2} km²</div>
                <div className="text-[10px] text-orange-600 mt-1">SIMULATED RESULT — NOT REAL DATA</div>
              </div>
            </Popup>
          </Polygon>
        )}

        {/* River */}
        {layers.rivers && (
          <Polyline
            positions={RIVER_LINE}
            pathOptions={{ color: '#1d4ed8', weight: 3.5, opacity: 0.85 }}>
            <Popup>
              <div className="text-sm">
                <div className="font-bold text-blue-300">Brahmaputra (Demo)</div>
                <div className="text-xs text-slate-400 mt-1">Water Level: 10.24 m</div>
                <div className="text-xs text-yellow-400">⚠ Above Warning (9.50 m)</div>
              </div>
            </Popup>
          </Polyline>
        )}

        {/* Sensors */}
        {layers.sensors && SENSORS.map(sensor => {
          const color = sensorMarkerColor(sensor.status);
          const isOffline = sensor.status === 'OFFLINE';
          return (
            <CircleMarker
              key={sensor.sensor_id}
              center={[sensor.latitude, sensor.longitude]}
              radius={isOffline ? 6 : sensor.status === 'CRITICAL' ? 10 : 8}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: isOffline ? 0.4 : 0.85,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-sm min-w-[200px]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-base">{sensor.sensor_id}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase"
                      style={{ background: color + '22', color, border: `1px solid ${color}44` }}>
                      {sensor.status}
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs mb-2">{sensor.name}</div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Type</span>
                      <span className="text-slate-200">{sensor.sensor_type}</span>
                    </div>
                    {sensor.water_level !== undefined && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Water Level</span>
                          <span className="text-sky-300 font-mono font-bold">{sensor.water_level?.toFixed(2)} m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Warning Level</span>
                          <span className="text-yellow-400 font-mono">{sensor.warning_level} m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Danger Level</span>
                          <span className="text-red-400 font-mono">{sensor.danger_level} m</span>
                        </div>
                      </>
                    )}
                    {sensor.rainfall !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Rainfall (1h)</span>
                        <span className="text-sky-300 font-mono">{sensor.rainfall} mm</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-500">Last Updated</span>
                      <span className="text-slate-300">{formatTimestamp(sensor.timestamp)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Trend</span>
                      <span className={sensor.trend === 'RISING' ? 'text-red-400' : sensor.trend === 'FALLING' ? 'text-green-400' : 'text-slate-400'}>
                        {sensor.trend === 'RISING' ? '↑ Rising' : sensor.trend === 'FALLING' ? '↓ Falling' : '→ Stable'}
                      </span>
                    </div>
                    {sensor.battery !== undefined && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Battery</span>
                        <span className={sensor.battery < 20 ? 'text-red-400' : 'text-green-400'}>{sensor.battery}%</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 text-[9px] text-slate-600 border-t border-slate-800 pt-1.5">SIMULATED DATA — DEMO MODE</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}

        {/* Villages */}
        {layers.villages && VILLAGES.map(v => {
          const riskColors = { LOW: '#22c55e', MODERATE: '#eab308', HIGH: '#f97316', CRITICAL: '#ef4444' };
          const c = riskColors[v.risk_level];
          return (
            <CircleMarker
              key={v.id}
              center={[v.latitude, v.longitude]}
              radius={5}
              pathOptions={{ color: c, fillColor: c, fillOpacity: 0.6, weight: 1.5, dashArray: '3 2' }}
            >
              <Popup>
                <div className="text-sm min-w-[180px]">
                  <div className="font-bold text-white mb-1">📍 {v.name}</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Flood Risk</span>
                      <span style={{ color: c }} className="font-bold">{v.risk_level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Population</span>
                      <span className="text-slate-300">{v.population.toLocaleString()} (Demo)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Affected Area</span>
                      <span className="text-slate-300">{v.estimated_affected_area_km2} km²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Nearest Sensor</span>
                      <span className="text-sky-400">{v.nearest_sensor}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-[9px] text-slate-600 border-t border-slate-800 pt-1.5">DEMO DATA — NOT REAL VILLAGE DATA</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Layer Control Overlay */}
      <div className="absolute top-3 right-3 z-[1000] bg-slate-900/95 backdrop-blur-md border border-blue-900/50 rounded-xl p-3 text-xs shadow-xl">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2.5">Map Layers</div>
        {Object.entries(layers).map(([key, val]) => (
          <label key={key} className="flex items-center gap-2.5 cursor-pointer py-1 hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={val}
              onChange={e => setLayers(prev => ({ ...prev, [key]: e.target.checked }))}
              className="w-3 h-3 accent-blue-500"
            />
            <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
          </label>
        ))}
        {showSimLayer && (
          <div className="mt-2 pt-2 border-t border-orange-900/40">
            <div className="flex items-center gap-2 text-orange-400">
              <span className="w-3 h-3 rounded-sm bg-orange-400/30 border border-orange-400 flex-shrink-0" />
              <span className="text-[10px] font-semibold">SIMULATED Extent</span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/95 backdrop-blur-md border border-blue-900/50 rounded-xl p-3 text-xs shadow-xl">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Sensor Status</div>
        {[
          { color: '#22c55e', label: 'Normal' },
          { color: '#eab308', label: 'Warning' },
          { color: '#ef4444', label: 'Critical' },
          { color: '#64748b', label: 'Offline' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2 py-0.5">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-slate-400">{label}</span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-2 py-0.5">
            <span className="w-6 h-1.5 rounded" style={{ background: 'rgba(56,189,248,0.6)', border: '1px dashed #38bdf8' }} />
            <span className="text-slate-400">Flood Extent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
