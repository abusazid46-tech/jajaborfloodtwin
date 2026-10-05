// ─── Data Mode ───────────────────────────────────────────────────────────────
export type DataMode = 'OBSERVED' | 'FORECAST' | 'SIMULATED';

// ─── Risk Level ───────────────────────────────────────────────────────────────
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

// ─── Alert Severity ───────────────────────────────────────────────────────────
export type AlertSeverity = 'INFO' | 'WARNING' | 'HIGH' | 'CRITICAL';

// ─── Sensor ───────────────────────────────────────────────────────────────────
export type SensorType = 'RIVER' | 'RAINFALL' | 'WEATHER' | 'GROUNDWATER';
export type SensorStatus = 'ONLINE' | 'OFFLINE' | 'WARNING' | 'CRITICAL';
export type SensorTrend = 'RISING' | 'STABLE' | 'FALLING';

export interface Sensor {
  sensor_id: string;
  name: string;
  sensor_type: SensorType;
  latitude: number;
  longitude: number;
  water_level?: number;
  rainfall?: number;
  warning_level?: number;
  danger_level?: number;
  status: SensorStatus;
  timestamp: string;
  quality: 'GOOD' | 'FAIR' | 'POOR';
  trend: SensorTrend;
  battery?: number;
}

// ─── River ────────────────────────────────────────────────────────────────────
export interface River {
  river_id: string;
  name: string;
  water_level: number;
  warning_level: number;
  danger_level: number;
  trend: SensorTrend;
  timestamp: string;
  station: string;
}

// ─── Flood Event ──────────────────────────────────────────────────────────────
export interface FloodEvent {
  event_id: string;
  year: number;
  date: string;
  location: string;
  flood_extent_km2: number;
  severity: RiskLevel;
  duration_days: number;
  affected_villages: number;
  affected_population: number;
  max_water_level: number;
  max_rainfall_mm: number;
  description: string;
}

// ─── Alert ────────────────────────────────────────────────────────────────────
export interface Alert {
  alert_id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  sensor_id?: string;
  timestamp: string;
  acknowledged: boolean;
  category: 'WATER_LEVEL' | 'RAINFALL' | 'SENSOR' | 'FORECAST' | 'SYSTEM';
}

export interface SimulationInput {
  water_level_change: number;
  rainfall_change: number;
  duration_hours: number;
  dam_discharge_cumecs?: number;
  embankment_breach?: boolean;
  breach_location?: string;
}

export interface SimulationResult {
  simulation_id: string;
  input: SimulationInput;
  risk_score: number;
  risk_level: RiskLevel;
  estimated_flood_extent_km2: number;
  current_flood_extent_km2: number;
  additional_extent_km2: number;
  affected_villages: number;
  affected_roads: number;
  affected_schools: number;
  affected_health_facilities: number;
  affected_population: number;
  evacuation_priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  simulation_type: 'SIMULATED';
  created_at: string;
  notes: string;
}

// ─── KPI / Dashboard ─────────────────────────────────────────────────────────
export interface DashboardData {
  current_risk_level: RiskLevel;
  risk_score: number;
  risk_trend: 'INCREASING' | 'STABLE' | 'DECREASING';
  river_level_m: number;
  river_status: string;
  rainfall_24h_mm: number;
  rainfall_7d_mm: number;
  flood_extent_km2: number;
  active_sensors: number;
  total_sensors: number;
  last_updated: string;
  data_mode: DataMode;
  pilot_area: string;
}

// ─── Water Level Time Series ──────────────────────────────────────────────────
export interface WaterLevelPoint {
  time: string;
  observed?: number;
  forecast?: number;
  warning: number;
  danger: number;
}

// ─── Rainfall Series ──────────────────────────────────────────────────────────
export interface RainfallPoint {
  date: string;
  rainfall_mm: number;
  type: 'OBSERVED' | 'FORECAST';
}

// ─── Village / Location ───────────────────────────────────────────────────────
export interface Village {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  population: number;
  risk_level: RiskLevel;
  flood_prone: boolean;
  nearest_sensor: string;
  estimated_affected_area_km2: number;
}

// ─── Data Source ──────────────────────────────────────────────────────────────
export interface DataSource {
  id: string;
  name: string;
  category: string;
  status: 'CONNECTED' | 'SIMULATED' | 'UNAVAILABLE';
  last_update: string;
  quality: 'GOOD' | 'FAIR' | 'POOR' | 'UNAVAILABLE';
  description: string;
  source_type: 'REAL' | 'SIMULATED' | 'HISTORICAL';
}

// ─── AI Insight ───────────────────────────────────────────────────────────────
export interface AIInsight {
  risk_score: number;
  risk_level: RiskLevel;
  data_confidence: number;
  summary: string;
  key_factors: {
    label: string;
    value: string;
    level: RiskLevel | 'MODERATE';
    weight: number;
  }[];
  recommendations: string[];
  generated_at: string;
}

// ─── Map Layer Config ─────────────────────────────────────────────────────────
export interface MapLayer {
  id: string;
  label: string;
  enabled: boolean;
  color?: string;
}

// ─── Pilot Basin ──────────────────────────────────────────────────────────────
export interface PilotBasin {
  id: string;
  name: string;
  center: [number, number];
  zoom: number;
  description: string;
}
