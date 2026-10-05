import { MainLayout } from '../layouts/MainLayout';
import { Droplets, ArrowDown, Shield, BookOpen, ExternalLink } from 'lucide-react';

const PIPELINE_STEPS = [
  { label: 'Real World', items: ['Satellite / SAR', 'IoT River Sensors', 'Rainfall Gauges', 'Weather Stations'], color: 'text-sky-400', border: 'border-sky-700/40', bg: 'bg-sky-900/20' },
  { label: 'Data Ingestion', items: ['LoRaWAN / GSM Telemetry', 'API Integration', 'File Ingestion (CSV/GeoJSON)'], color: 'text-violet-400', border: 'border-violet-700/40', bg: 'bg-violet-900/20' },
  { label: 'Digital Twin Core', items: ['GIS / PostGIS Database', 'DEM Integration', 'River Network Model', 'Administrative Layers'], color: 'text-blue-400', border: 'border-blue-700/40', bg: 'bg-blue-900/20' },
  { label: 'AI / ML Engine', items: ['Risk Scoring Algorithm', 'Pattern Recognition', 'Threshold Detection', 'Confidence Estimation'], color: 'text-orange-400', border: 'border-orange-700/40', bg: 'bg-orange-900/20' },
  { label: 'Scenario Engine', items: ['What-if Simulation', 'Hydrological Model', 'Flood Extent Estimation'], color: 'text-pink-400', border: 'border-pink-700/40', bg: 'bg-pink-900/20' },
  { label: 'Decision Support', items: ['Command Center Dashboard', 'Alerts & Notifications', 'GIS Visualization', 'Reporting'], color: 'text-green-400', border: 'border-green-700/40', bg: 'bg-green-900/20' },
];

export function AboutPage() {
  return (
    <MainLayout title="System / About" subtitle="Prototype Status, Architecture and Methodology">
      <div className="space-y-6 max-w-5xl">

        {/* About */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Jajabor FloodTwin</h2>
              <div className="text-xs text-blue-400">AI-Enabled Digital Twin for Flood Management</div>
            </div>
            <div className="ml-auto px-3 py-1.5 rounded-lg bg-amber-900/30 border border-amber-700/50 text-amber-400 text-xs font-bold">
              MVP PROTOTYPE
            </div>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Jajabor FloodTwin is an AI-enabled digital twin prototype being developed as part of{' '}
            <strong className="text-white">NESFIC-D-18</strong> — Digital Twin for Flood Management, Simulation and Early Warning Using Space Technology, for the Government of Assam / ASSAC.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            The system integrates satellite remote sensing, GIS, IoT sensor data, rainfall, weather, river levels and historical flood information into a unified digital twin — providing operators with a common operational picture of observed, forecast and simulated flood conditions.
          </p>
          <div className="px-4 py-3 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-start gap-3">
            <Shield className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300 leading-relaxed">
              <strong>Important Disclaimer:</strong> Jajabor FloodTwin is an experimental decision-support prototype. Flood-risk indicators and simulated scenarios are intended for demonstration and analytical support and should not be treated as official emergency warnings or guaranteed predictions. All data shown in this MVP is simulated.
            </p>
          </div>
        </div>

        {/* Digital Twin Pipeline */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-white mb-5">Digital Twin Architecture Pipeline</h3>
          <div className="flex flex-col items-center gap-0">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.label} className="w-full max-w-lg flex flex-col items-center">
                <div className={`w-full rounded-xl border p-4 ${step.border} ${step.bg}`}>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${step.color}`}>{step.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {step.items.map(item => (
                      <span key={item} className="text-[10px] px-2 py-0.5 bg-black/30 rounded text-slate-400 border border-slate-800">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="flex flex-col items-center py-2">
                    <div className="w-px h-4 bg-slate-700" />
                    <ArrowDown className="w-4 h-4 text-slate-600" />
                    <div className="w-px h-4 bg-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="glass-card p-6">
          <h3 className="text-sm font-bold text-white mb-4">Technology Stack</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {[
              { cat: 'Frontend', items: ['React + TypeScript', 'Vite', 'Tailwind CSS', 'Recharts', 'Leaflet / OpenStreetMap'] },
              { cat: 'Backend (Planned)', items: ['Python 3.11+', 'FastAPI', 'PostgreSQL + PostGIS', 'SQLAlchemy', 'Pydantic v2'] },
              { cat: 'Geospatial', items: ['Leaflet.js', 'GeoJSON', 'OpenStreetMap (CARTO)', 'CartoDB Dark', 'PostGIS (Production)'] },
              { cat: 'AI / ML', items: ['Rule-based Risk Engine (MVP)', 'Scikit-learn (Planned)', 'LSTM / RF (Planned)', 'Historical Pattern Analysis'] },
              { cat: 'Data Sources (MVP)', items: ['Simulated IoT', 'Simulated Rainfall', 'Historical Records', 'GeoJSON Demo Layers'] },
              { cat: 'Production Planned', items: ['ISRO Bhuvan / SAR', 'IMD Weather API', 'CWC River Data', 'LoRaWAN Sensors'] },
            ].map(({ cat, items }) => (
              <div key={cat} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/40">
                <div className="font-semibold text-slate-300 mb-2">{cat}</div>
                <ul className="space-y-1">
                  {items.map(item => (
                    <li key={item} className="text-[10px] text-slate-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Project info */}
        <div className="glass-card p-5 flex flex-wrap gap-6 text-xs text-slate-500">
          <div><span className="text-slate-400 font-semibold">Project:</span> NESFIC-D-18</div>
          <div><span className="text-slate-400 font-semibold">Organization:</span> Jajabor AI</div>
          <div><span className="text-slate-400 font-semibold">Version:</span> 0.1-MVP</div>
          <div><span className="text-slate-400 font-semibold">Status:</span> <span className="text-amber-400">Prototype</span></div>
          <div><span className="text-slate-400 font-semibold">Tagline:</span> <span className="text-blue-300 italic">See. Simulate. Prepare.</span></div>
        </div>
      </div>
    </MainLayout>
  );
}
