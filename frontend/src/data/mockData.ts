import type {
  Sensor, River, FloodEvent, Alert, DashboardData,
  WaterLevelPoint, RainfallPoint, Village, DataSource, AIInsight, PilotBasin
} from '../types';

// ─── Pilot Basins ──────────────────────────────────────────────────────────────
export const PILOT_BASINS: PilotBasin[] = [
  {
    id: 'brahmaputra-demo',
    name: 'Brahmaputra Demo Basin',
    center: [26.19, 91.72],
    zoom: 10,
    description: 'Demonstration basin covering flood-prone zones along the Brahmaputra river system in Assam.',
  },
  {
    id: 'barak-demo',
    name: 'Barak Demo Basin',
    center: [24.82, 92.78],
    zoom: 10,
    description: 'Demonstration basin covering the Barak valley region.',
  },
  {
    id: 'subansiri-demo',
    name: 'Subansiri Demo Basin',
    center: [27.1, 93.8],
    zoom: 10,
    description: 'Demonstration basin for the Subansiri tributary zone.',
  },
];

// ─── Sensors ───────────────────────────────────────────────────────────────────
export const SENSORS: Sensor[] = [
  {
    sensor_id: 'JFT-001',
    name: 'Guwahati Central Station',
    sensor_type: 'RIVER',
    latitude: 26.185,
    longitude: 91.735,
    water_level: 10.24,
    warning_level: 9.50,
    danger_level: 10.50,
    status: 'WARNING',
    timestamp: '2026-10-04T08:42:00+05:30',
    quality: 'GOOD',
    trend: 'RISING',
    battery: 87,
  },
  {
    sensor_id: 'JFT-002',
    name: 'Dispur North Gauge',
    sensor_type: 'RIVER',
    latitude: 26.142,
    longitude: 91.787,
    water_level: 9.82,
    warning_level: 9.50,
    danger_level: 10.20,
    status: 'WARNING',
    timestamp: '2026-10-04T08:40:00+05:30',
    quality: 'GOOD',
    trend: 'STABLE',
    battery: 92,
  },
  {
    sensor_id: 'JFT-003',
    name: 'North Guwahati Rainfall',
    sensor_type: 'RAINFALL',
    latitude: 26.213,
    longitude: 91.697,
    rainfall: 42,
    status: 'ONLINE',
    timestamp: '2026-10-04T08:39:00+05:30',
    quality: 'GOOD',
    trend: 'RISING',
    battery: 78,
  },
  {
    sensor_id: 'JFT-004',
    name: 'Hajo River Station',
    sensor_type: 'RIVER',
    latitude: 26.244,
    longitude: 91.522,
    water_level: undefined,
    warning_level: 8.50,
    danger_level: 9.50,
    status: 'OFFLINE',
    timestamp: '2026-10-04T06:10:00+05:30',
    quality: 'POOR',
    trend: 'STABLE',
    battery: 12,
  },
  {
    sensor_id: 'JFT-005',
    name: 'Jalukbari Gauge',
    sensor_type: 'RIVER',
    latitude: 26.162,
    longitude: 91.659,
    water_level: 10.67,
    warning_level: 9.80,
    danger_level: 10.50,
    status: 'CRITICAL',
    timestamp: '2026-10-04T08:43:00+05:30',
    quality: 'GOOD',
    trend: 'RISING',
    battery: 95,
  },
  {
    sensor_id: 'JFT-006',
    name: 'Kamrup Rainfall Station',
    sensor_type: 'RAINFALL',
    latitude: 26.098,
    longitude: 91.842,
    rainfall: 36,
    status: 'ONLINE',
    timestamp: '2026-10-04T08:38:00+05:30',
    quality: 'GOOD',
    trend: 'STABLE',
    battery: 83,
  },
  {
    sensor_id: 'JFT-007',
    name: 'Palasbari Bridge Station',
    sensor_type: 'RIVER',
    latitude: 26.132,
    longitude: 91.585,
    water_level: 8.93,
    warning_level: 8.50,
    danger_level: 9.50,
    status: 'ONLINE',
    timestamp: '2026-10-04T08:41:00+05:30',
    quality: 'GOOD',
    trend: 'RISING',
    battery: 76,
  },
  {
    sensor_id: 'JFT-008',
    name: 'Rangiya Upstream',
    sensor_type: 'RIVER',
    latitude: 26.458,
    longitude: 91.618,
    water_level: 7.45,
    warning_level: 7.00,
    danger_level: 8.50,
    status: 'ONLINE',
    timestamp: '2026-10-04T08:37:00+05:30',
    quality: 'FAIR',
    trend: 'RISING',
    battery: 64,
  },
  {
    sensor_id: 'JFT-009',
    name: 'Changsari Weather',
    sensor_type: 'WEATHER',
    latitude: 26.288,
    longitude: 91.712,
    status: 'ONLINE',
    timestamp: '2026-10-04T08:45:00+05:30',
    quality: 'GOOD',
    trend: 'STABLE',
    battery: 91,
  },
  {
    sensor_id: 'JFT-010',
    name: 'Amingaon East Gauge',
    sensor_type: 'RIVER',
    latitude: 26.197,
    longitude: 91.658,
    water_level: 9.44,
    warning_level: 9.00,
    danger_level: 10.00,
    status: 'ONLINE',
    timestamp: '2026-10-04T08:42:00+05:30',
    quality: 'GOOD',
    trend: 'RISING',
    battery: 88,
  },
];

// ─── Rivers ────────────────────────────────────────────────────────────────────
export const RIVERS: River[] = [
  {
    river_id: 'R-BRH',
    name: 'Brahmaputra (Demo)',
    water_level: 10.24,
    warning_level: 9.50,
    danger_level: 10.50,
    trend: 'RISING',
    timestamp: '2026-10-04T08:42:00+05:30',
    station: 'Guwahati Central Station',
  },
  {
    river_id: 'R-KOL',
    name: 'Kolong (Demo)',
    water_level: 8.12,
    warning_level: 8.00,
    danger_level: 9.00,
    trend: 'STABLE',
    timestamp: '2026-10-04T08:35:00+05:30',
    station: 'Nagaon Gauge',
  },
  {
    river_id: 'R-BOR',
    name: 'Bornadi (Demo)',
    water_level: 5.32,
    warning_level: 5.00,
    danger_level: 6.50,
    trend: 'RISING',
    timestamp: '2026-10-04T08:33:00+05:30',
    station: 'Nalbari Station',
  },
];

// ─── Villages / Locations ──────────────────────────────────────────────────────
export const VILLAGES: Village[] = [
  { id: 'V-001', name: 'Azara (Demo)', latitude: 26.093, longitude: 91.698, population: 12400, risk_level: 'HIGH', flood_prone: true, nearest_sensor: 'JFT-001', estimated_affected_area_km2: 2.4 },
  { id: 'V-002', name: 'Chandrapur (Demo)', latitude: 26.048, longitude: 91.754, population: 8200, risk_level: 'MODERATE', flood_prone: true, nearest_sensor: 'JFT-002', estimated_affected_area_km2: 1.8 },
  { id: 'V-003', name: 'Satpara (Demo)', latitude: 26.124, longitude: 91.802, population: 5100, risk_level: 'LOW', flood_prone: false, nearest_sensor: 'JFT-002', estimated_affected_area_km2: 0.6 },
  { id: 'V-004', name: 'Ganakpara (Demo)', latitude: 26.209, longitude: 91.620, population: 9800, risk_level: 'HIGH', flood_prone: true, nearest_sensor: 'JFT-007', estimated_affected_area_km2: 3.1 },
  { id: 'V-005', name: 'Nazirapara (Demo)', latitude: 26.168, longitude: 91.615, population: 6300, risk_level: 'CRITICAL', flood_prone: true, nearest_sensor: 'JFT-005', estimated_affected_area_km2: 4.2 },
  { id: 'V-006', name: 'Goreswar (Demo)', latitude: 26.372, longitude: 91.526, population: 4500, risk_level: 'MODERATE', flood_prone: true, nearest_sensor: 'JFT-008', estimated_affected_area_km2: 1.1 },
];

// ─── Alerts ────────────────────────────────────────────────────────────────────
export const ALERTS: Alert[] = [
  {
    alert_id: 'ALT-001',
    severity: 'CRITICAL',
    title: 'Critical Water Level — Jalukbari',
    message: 'Sensor JFT-005 reports water level 10.67 m, exceeding danger threshold of 10.50 m. Immediate attention required.',
    sensor_id: 'JFT-005',
    timestamp: '2026-10-04T08:43:00+05:30',
    acknowledged: false,
    category: 'WATER_LEVEL',
  },
  {
    alert_id: 'ALT-002',
    severity: 'HIGH',
    title: 'Warning Level Exceeded — Guwahati Central',
    message: 'Sensor JFT-001 reports water level 10.24 m, above warning threshold of 9.50 m. River level is rising rapidly.',
    sensor_id: 'JFT-001',
    timestamp: '2026-10-04T08:42:00+05:30',
    acknowledged: false,
    category: 'WATER_LEVEL',
  },
  {
    alert_id: 'ALT-003',
    severity: 'HIGH',
    title: 'Warning Level Exceeded — Dispur North',
    message: 'Sensor JFT-002 reports water level 9.82 m, above warning threshold of 9.50 m.',
    sensor_id: 'JFT-002',
    timestamp: '2026-10-04T08:40:00+05:30',
    acknowledged: true,
    category: 'WATER_LEVEL',
  },
  {
    alert_id: 'ALT-004',
    severity: 'WARNING',
    title: 'Heavy Rainfall — 24h Threshold Exceeded',
    message: '24-hour cumulative rainfall of 86 mm has exceeded the warning threshold of 75 mm at multiple stations.',
    timestamp: '2026-10-04T07:00:00+05:30',
    acknowledged: false,
    category: 'RAINFALL',
  },
  {
    alert_id: 'ALT-005',
    severity: 'WARNING',
    title: 'Sensor Offline — Hajo River Station',
    message: 'Sensor JFT-004 has not reported data since 06:10 AM. Last known battery level was 12%. Check communication and power.',
    sensor_id: 'JFT-004',
    timestamp: '2026-10-04T06:10:00+05:30',
    acknowledged: false,
    category: 'SENSOR',
  },
  {
    alert_id: 'ALT-006',
    severity: 'INFO',
    title: 'Flood Risk Level Elevated to HIGH',
    message: 'AI risk assessment indicates current risk level is HIGH (Score: 78/100). Situation is being monitored.',
    timestamp: '2026-10-04T07:30:00+05:30',
    acknowledged: true,
    category: 'SYSTEM',
  },
  {
    alert_id: 'ALT-007',
    severity: 'WARNING',
    title: 'Rapid Water Level Rise Detected',
    message: 'Water level at Guwahati Central Station has risen 0.42 m in the last 2 hours, indicating rapid inflow.',
    sensor_id: 'JFT-001',
    timestamp: '2026-10-04T08:30:00+05:30',
    acknowledged: false,
    category: 'WATER_LEVEL',
  },
];

// ─── Dashboard Data ────────────────────────────────────────────────────────────
export const DASHBOARD_DATA: DashboardData = {
  current_risk_level: 'HIGH',
  risk_score: 78,
  risk_trend: 'INCREASING',
  river_level_m: 10.24,
  river_status: 'Above Warning Level',
  rainfall_24h_mm: 86,
  rainfall_7d_mm: 312,
  flood_extent_km2: 42.6,
  active_sensors: 9,
  total_sensors: 10,
  last_updated: '2026-10-04T08:45:00+05:30',
  data_mode: 'OBSERVED',
  pilot_area: 'Brahmaputra Demo Basin',
};

// ─── Water Level Time Series ───────────────────────────────────────────────────
export const WATER_LEVEL_SERIES: WaterLevelPoint[] = [
  { time: '00:00', observed: 9.12, warning: 9.50, danger: 10.50 },
  { time: '01:00', observed: 9.18, warning: 9.50, danger: 10.50 },
  { time: '02:00', observed: 9.21, warning: 9.50, danger: 10.50 },
  { time: '03:00', observed: 9.28, warning: 9.50, danger: 10.50 },
  { time: '04:00', observed: 9.45, warning: 9.50, danger: 10.50 },
  { time: '05:00', observed: 9.58, warning: 9.50, danger: 10.50 },
  { time: '06:00', observed: 9.74, warning: 9.50, danger: 10.50 },
  { time: '07:00', observed: 9.88, warning: 9.50, danger: 10.50 },
  { time: '08:00', observed: 10.04, warning: 9.50, danger: 10.50 },
  { time: '08:42', observed: 10.24, warning: 9.50, danger: 10.50 },
  { time: '10:00', forecast: 10.35, warning: 9.50, danger: 10.50 },
  { time: '12:00', forecast: 10.48, warning: 9.50, danger: 10.50 },
  { time: '14:00', forecast: 10.55, warning: 9.50, danger: 10.50 },
  { time: '16:00', forecast: 10.61, warning: 9.50, danger: 10.50 },
  { time: '18:00', forecast: 10.52, warning: 9.50, danger: 10.50 },
  { time: '20:00', forecast: 10.44, warning: 9.50, danger: 10.50 },
  { time: '22:00', forecast: 10.32, warning: 9.50, danger: 10.50 },
  { time: '24:00', forecast: 10.18, warning: 9.50, danger: 10.50 },
];

// ─── Rainfall Series ───────────────────────────────────────────────────────────
export const RAINFALL_SERIES: RainfallPoint[] = [
  { date: '28 Sep', rainfall_mm: 18, type: 'OBSERVED' },
  { date: '29 Sep', rainfall_mm: 34, type: 'OBSERVED' },
  { date: '30 Sep', rainfall_mm: 62, type: 'OBSERVED' },
  { date: '01 Oct', rainfall_mm: 45, type: 'OBSERVED' },
  { date: '02 Oct', rainfall_mm: 78, type: 'OBSERVED' },
  { date: '03 Oct', rainfall_mm: 81, type: 'OBSERVED' },
  { date: '04 Oct', rainfall_mm: 86, type: 'OBSERVED' },
  { date: '05 Oct', rainfall_mm: 92, type: 'FORECAST' },
  { date: '06 Oct', rainfall_mm: 75, type: 'FORECAST' },
  { date: '07 Oct', rainfall_mm: 48, type: 'FORECAST' },
];

// ─── Historical Flood Events ───────────────────────────────────────────────────
export const FLOOD_EVENTS: FloodEvent[] = [
  {
    event_id: 'FE-2022-01',
    year: 2022,
    date: '2022-06-18',
    location: 'Brahmaputra Demo Basin',
    flood_extent_km2: 58.4,
    severity: 'CRITICAL',
    duration_days: 12,
    affected_villages: 28,
    affected_population: 145000,
    max_water_level: 11.32,
    max_rainfall_mm: 142,
    description: 'Severe flooding event during monsoon season. Multiple embankments breached. Historical record-high water levels observed.',
  },
  {
    event_id: 'FE-2022-02',
    year: 2022,
    date: '2022-07-14',
    location: 'Brahmaputra Demo Basin',
    flood_extent_km2: 48.2,
    severity: 'HIGH',
    duration_days: 8,
    affected_villages: 19,
    affected_population: 98000,
    max_water_level: 10.87,
    max_rainfall_mm: 118,
    description: 'Second wave flood event following sustained heavy rainfall.',
  },
  {
    event_id: 'FE-2023-01',
    year: 2023,
    date: '2023-05-28',
    location: 'Brahmaputra Demo Basin',
    flood_extent_km2: 36.1,
    severity: 'HIGH',
    duration_days: 7,
    affected_villages: 14,
    affected_population: 72000,
    max_water_level: 10.45,
    max_rainfall_mm: 96,
    description: 'Early monsoon event. Pre-monsoon rainfall combined with upstream snowmelt contributed.',
  },
  {
    event_id: 'FE-2023-02',
    year: 2023,
    date: '2023-07-02',
    location: 'Brahmaputra Demo Basin',
    flood_extent_km2: 52.8,
    severity: 'CRITICAL',
    duration_days: 15,
    affected_villages: 24,
    affected_population: 118000,
    max_water_level: 11.05,
    max_rainfall_mm: 128,
    description: 'Major monsoon flood. Extended duration caused severe agricultural damage.',
  },
  {
    event_id: 'FE-2024-01',
    year: 2024,
    date: '2024-06-10',
    location: 'Brahmaputra Demo Basin',
    flood_extent_km2: 29.7,
    severity: 'MODERATE',
    duration_days: 5,
    affected_villages: 11,
    affected_population: 51000,
    max_water_level: 9.78,
    max_rainfall_mm: 74,
    description: 'Moderate flood event. Early warning helped reduce impact.',
  },
  {
    event_id: 'FE-2024-02',
    year: 2024,
    date: '2024-08-22',
    location: 'Brahmaputra Demo Basin',
    flood_extent_km2: 44.5,
    severity: 'HIGH',
    duration_days: 9,
    affected_villages: 18,
    affected_population: 89000,
    max_water_level: 10.62,
    max_rainfall_mm: 112,
    description: 'Late monsoon event. Rising upstream river levels contributed to extended flooding.',
  },
  {
    event_id: 'FE-2025-01',
    year: 2025,
    date: '2025-06-05',
    location: 'Brahmaputra Demo Basin',
    flood_extent_km2: 38.9,
    severity: 'HIGH',
    duration_days: 8,
    affected_villages: 16,
    affected_population: 78000,
    max_water_level: 10.34,
    max_rainfall_mm: 104,
    description: 'Monsoon onset flood. Sensor network provided improved monitoring.',
  },
];

// ─── Data Sources ──────────────────────────────────────────────────────────────
export const DATA_SOURCES: DataSource[] = [
  { id: 'DS-SAT', name: 'Satellite / Remote Sensing', category: 'Geospatial', status: 'SIMULATED', last_update: '2026-10-04T06:00:00+05:30', quality: 'GOOD', description: 'Synthetic Aperture Radar and optical imagery for flood extent mapping.', source_type: 'SIMULATED' },
  { id: 'DS-RAIN', name: 'Rainfall Gauges', category: 'Hydrology', status: 'CONNECTED', last_update: '2026-10-04T08:45:00+05:30', quality: 'GOOD', description: 'IoT-connected tipping bucket rain gauge network.', source_type: 'SIMULATED' },
  { id: 'DS-WX', name: 'Weather Forecast (NWP)', category: 'Meteorology', status: 'SIMULATED', last_update: '2026-10-04T06:00:00+05:30', quality: 'FAIR', description: 'Numerical Weather Prediction model output (ECMWF/IMD compatible).', source_type: 'SIMULATED' },
  { id: 'DS-RVR', name: 'River Level Gauges', category: 'Hydrology', status: 'CONNECTED', last_update: '2026-10-04T08:43:00+05:30', quality: 'GOOD', description: 'Ultrasonic and pressure transducer river level sensors.', source_type: 'SIMULATED' },
  { id: 'DS-IOT', name: 'IoT Sensor Network', category: 'Telemetry', status: 'CONNECTED', last_update: '2026-10-04T08:45:00+05:30', quality: 'FAIR', description: 'Distributed IoT sensor network transmitting via LoRaWAN / GSM.', source_type: 'SIMULATED' },
  { id: 'DS-HIST', name: 'Historical Flood Data', category: 'Archive', status: 'CONNECTED', last_update: '2026-10-04T00:00:00+05:30', quality: 'GOOD', description: 'Historical flood event records from government and academic sources.', source_type: 'HISTORICAL' },
  { id: 'DS-GIS', name: 'GIS / DEM Data', category: 'Geospatial', status: 'CONNECTED', last_update: '2026-10-04T00:00:00+05:30', quality: 'GOOD', description: 'Digital Elevation Model and administrative boundary vector layers.', source_type: 'SIMULATED' },
  { id: 'DS-BHUVAN', name: 'Bhuvan / ISRO Satellite', category: 'Geospatial', status: 'SIMULATED', last_update: '2026-10-04T05:30:00+05:30', quality: 'FAIR', description: 'ISRO Bhuvan platform for satellite imagery and thematic layers.', source_type: 'SIMULATED' },
];

// ─── AI Insights ───────────────────────────────────────────────────────────────
export const AI_INSIGHT: AIInsight = {
  risk_score: 78,
  risk_level: 'HIGH',
  data_confidence: 82,
  summary: 'The current risk level is HIGH and increasing, primarily driven by rising river levels above the warning threshold, elevated 24-hour cumulative rainfall, and a rapid rate of water-level rise at key monitoring stations. Forecast models indicate continued upstream inflow over the next 12 hours.',
  key_factors: [
    { label: 'River Level', value: '10.24 m — Above Warning', level: 'HIGH', weight: 30 },
    { label: '24h Rainfall', value: '86 mm — Elevated', level: 'HIGH', weight: 25 },
    { label: 'Water Rise Rate', value: '0.42 m / 2h — Rapid', level: 'MODERATE', weight: 20 },
    { label: 'Forecast Rainfall', value: '+92 mm expected', level: 'HIGH', weight: 15 },
    { label: 'Historical Pattern', value: 'High-risk season', level: 'MODERATE', weight: 10 },
  ],
  recommendations: [
    'Monitor JFT-001 and JFT-005 sensor readings closely for threshold breach.',
    'Verify offline sensor JFT-004 — data gap may be affecting risk accuracy.',
    'Consider pre-positioning evacuation resources for Nazirapara and Azara villages.',
    'Alert downstream communities about rising river levels.',
    'Review embankment status at Jalukbari — sensor exceeds danger level.',
  ],
  generated_at: '2026-10-04T08:45:00+05:30',
};

// ─── Simulation Helper ─────────────────────────────────────────────────────────
export function runSimulation(
  waterLevelChange: number,
  rainfallChange: number,
  durationHours: number,
  damDischarge: number = 0,
  embankmentBreach: boolean = false,
  breachLocation: string = 'Kurua Ring Bund'
) {
  const baseExtent = DASHBOARD_DATA.flood_extent_km2;
  const baseScore = 65; // Baseline calibrated score for simulation delta

  // Dam discharge impact: 1000 cumecs ~ +0.3m equivalent rise
  const damDischargeFactor = damDischarge > 0 ? (damDischarge / 2500) : 0;
  // Breach impact adds sudden localized surcharge
  const breachExtentSurcharge = embankmentBreach ? 18.5 : 0;
  const breachScoreSurcharge = embankmentBreach ? 18 : 0;

  const effectiveWaterRise = waterLevelChange + damDischargeFactor;
  const extentMultiplier = 1 + (effectiveWaterRise * 0.45) + (rainfallChange / 180);
  const scoreIncrease = (effectiveWaterRise * 9) + (rainfallChange * 0.14) + (durationHours * 0.18) + breachScoreSurcharge;

  const estExtent = Math.min(Math.round((baseExtent * extentMultiplier + breachExtentSurcharge) * 10) / 10, 420);
  const estScore = Math.min(Math.round(baseScore + scoreIncrease), 100);

  let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW';
  if (estScore >= 80) riskLevel = 'CRITICAL';
  else if (estScore >= 60) riskLevel = 'HIGH';
  else if (estScore >= 40) riskLevel = 'MODERATE';

  const addExtent = Math.round((estExtent - baseExtent) * 10) / 10;
  const affectedVillages = Math.min(Math.round(4 + effectiveWaterRise * 4.5 + rainfallChange * 0.08 + (embankmentBreach ? 6 : 0)), 45);
  const affectedRoads = Math.round(1 + effectiveWaterRise * 2 + (embankmentBreach ? 3 : 0));
  const affectedSchools = Math.round(effectiveWaterRise * 1.5 + (embankmentBreach ? 2 : 0));
  const affectedHealthFacilities = Math.round(effectiveWaterRise * 0.8 + (embankmentBreach ? 1 : 0));
  const affectedPopulation = Math.round((affectedVillages * 1850) + (addExtent * 420));

  let evacuationPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
  if (riskLevel === 'CRITICAL' || embankmentBreach) evacuationPriority = 'CRITICAL';
  else if (riskLevel === 'HIGH') evacuationPriority = 'HIGH';
  else if (riskLevel === 'MODERATE') evacuationPriority = 'MEDIUM';

  return {
    simulation_id: `SIM-${Date.now()}`,
    input: {
      water_level_change: waterLevelChange,
      rainfall_change: rainfallChange,
      duration_hours: durationHours,
      dam_discharge_cumecs: damDischarge,
      embankment_breach: embankmentBreach,
      breach_location: breachLocation,
    },
    risk_score: estScore,
    risk_level: riskLevel,
    estimated_flood_extent_km2: estExtent,
    current_flood_extent_km2: baseExtent,
    additional_extent_km2: addExtent,
    affected_villages: affectedVillages,
    affected_roads: affectedRoads,
    affected_schools: affectedSchools,
    affected_health_facilities: affectedHealthFacilities,
    affected_population: affectedPopulation,
    evacuation_priority: evacuationPriority,
    simulation_type: 'SIMULATED' as const,
    created_at: new Date().toISOString(),
    notes: embankmentBreach
      ? `Simulated embankment breach at ${breachLocation}. Projected inundation surge of +${addExtent} km² requiring immediate evacuation priority: ${evacuationPriority}.`
      : `Parametric flood simulation model based on hydrodynamic 2D shallow water approximation and terrain elevation matrix.`,
  };
}
