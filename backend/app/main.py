"""
Jajabor FloodTwin — FastAPI Backend
NESFIC-D-18 Prototype

This backend serves realistic simulated data for the FloodTwin MVP.
In production, replace simulated data with real API connections.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json
import math
import random
from datetime import datetime, timedelta
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="Jajabor FloodTwin API",
    description="AI-Enabled Digital Twin for Flood Management — NESFIC-D-18 Prototype",
    version="0.1.0-MVP",
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Simulated Data ─────────────────────────────────────────────────────────────

SENSORS = [
    {"sensor_id": "JFT-001", "name": "Guwahati Central Station", "sensor_type": "RIVER",
     "latitude": 26.185, "longitude": 91.735, "water_level": 10.24, "warning_level": 9.50,
     "danger_level": 10.50, "status": "WARNING", "timestamp": "2026-10-04T08:42:00+05:30",
     "quality": "GOOD", "trend": "RISING", "battery": 87},
    {"sensor_id": "JFT-002", "name": "Dispur North Gauge", "sensor_type": "RIVER",
     "latitude": 26.142, "longitude": 91.787, "water_level": 9.82, "warning_level": 9.50,
     "danger_level": 10.20, "status": "WARNING", "timestamp": "2026-10-04T08:40:00+05:30",
     "quality": "GOOD", "trend": "STABLE", "battery": 92},
    {"sensor_id": "JFT-003", "name": "North Guwahati Rainfall", "sensor_type": "RAINFALL",
     "latitude": 26.213, "longitude": 91.697, "rainfall": 42,
     "status": "ONLINE", "timestamp": "2026-10-04T08:39:00+05:30",
     "quality": "GOOD", "trend": "RISING", "battery": 78},
    {"sensor_id": "JFT-004", "name": "Hajo River Station", "sensor_type": "RIVER",
     "latitude": 26.244, "longitude": 91.522, "water_level": None,
     "warning_level": 8.50, "danger_level": 9.50, "status": "OFFLINE",
     "timestamp": "2026-10-04T06:10:00+05:30", "quality": "POOR", "trend": "STABLE", "battery": 12},
    {"sensor_id": "JFT-005", "name": "Jalukbari Gauge", "sensor_type": "RIVER",
     "latitude": 26.162, "longitude": 91.659, "water_level": 10.67, "warning_level": 9.80,
     "danger_level": 10.50, "status": "CRITICAL", "timestamp": "2026-10-04T08:43:00+05:30",
     "quality": "GOOD", "trend": "RISING", "battery": 95},
]

RIVERS = [
    {"river_id": "R-BRH", "name": "Brahmaputra (Demo)", "water_level": 10.24,
     "warning_level": 9.50, "danger_level": 10.50, "trend": "RISING",
     "timestamp": "2026-10-04T08:42:00+05:30", "station": "Guwahati Central"},
    {"river_id": "R-KOL", "name": "Kolong (Demo)", "water_level": 8.12,
     "warning_level": 8.00, "danger_level": 9.00, "trend": "STABLE",
     "timestamp": "2026-10-04T08:35:00+05:30", "station": "Nagaon Gauge"},
]

FLOOD_EVENTS = [
    {"event_id": "FE-2022-01", "year": 2022, "date": "2022-06-18",
     "location": "Brahmaputra Demo Basin", "flood_extent_km2": 58.4,
     "severity": "CRITICAL", "duration_days": 12, "affected_villages": 28,
     "max_water_level": 11.32, "max_rainfall_mm": 142},
    {"event_id": "FE-2023-01", "year": 2023, "date": "2023-07-02",
     "location": "Brahmaputra Demo Basin", "flood_extent_km2": 52.8,
     "severity": "CRITICAL", "duration_days": 15, "affected_villages": 24,
     "max_water_level": 11.05, "max_rainfall_mm": 128},
    {"event_id": "FE-2024-01", "year": 2024, "date": "2024-08-22",
     "location": "Brahmaputra Demo Basin", "flood_extent_km2": 44.5,
     "severity": "HIGH", "duration_days": 9, "affected_villages": 18,
     "max_water_level": 10.62, "max_rainfall_mm": 112},
]

ALERTS = [
    {"alert_id": "ALT-001", "severity": "CRITICAL", "title": "Critical Water Level — Jalukbari",
     "message": "Water level 10.67m exceeds danger threshold 10.50m", "sensor_id": "JFT-005",
     "timestamp": "2026-10-04T08:43:00+05:30", "acknowledged": False, "category": "WATER_LEVEL"},
    {"alert_id": "ALT-002", "severity": "HIGH", "title": "Warning Level Exceeded — Guwahati Central",
     "message": "Water level 10.24m above warning threshold 9.50m", "sensor_id": "JFT-001",
     "timestamp": "2026-10-04T08:42:00+05:30", "acknowledged": False, "category": "WATER_LEVEL"},
    {"alert_id": "ALT-005", "severity": "WARNING", "title": "Sensor Offline — Hajo",
     "message": "Sensor JFT-004 has not reported data since 06:10.", "sensor_id": "JFT-004",
     "timestamp": "2026-10-04T06:10:00+05:30", "acknowledged": False, "category": "SENSOR"},
]

# ── API Endpoints ──────────────────────────────────────────────────────────────

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "FloodTwin API", "version": "0.1.0-MVP", "mode": "DEMO"}


@app.get("/api/dashboard")
def get_dashboard():
    return {
        "current_risk_level": "HIGH",
        "risk_score": 78,
        "risk_trend": "INCREASING",
        "river_level_m": 10.24,
        "river_status": "Above Warning Level",
        "rainfall_24h_mm": 86,
        "rainfall_7d_mm": 312,
        "flood_extent_km2": 42.6,
        "active_sensors": 9,
        "total_sensors": len(SENSORS),
        "last_updated": datetime.now().isoformat(),
        "data_mode": "OBSERVED",
        "pilot_area": "Brahmaputra Demo Basin",
        "_note": "SIMULATED DATA — PROTOTYPE"
    }


@app.get("/api/sensors")
def get_sensors():
    return {"sensors": SENSORS, "_note": "SIMULATED DATA"}


@app.get("/api/sensors/{sensor_id}")
def get_sensor(sensor_id: str):
    s = next((x for x in SENSORS if x["sensor_id"] == sensor_id), None)
    if not s:
        return JSONResponse(status_code=404, content={"error": "Sensor not found"})
    return s


@app.get("/api/rivers")
def get_rivers():
    return {"rivers": RIVERS, "_note": "SIMULATED DATA"}


@app.get("/api/flood-events")
def get_flood_events(year: Optional[int] = None):
    events = FLOOD_EVENTS
    if year:
        events = [e for e in events if e["year"] == year]
    return {"events": events, "_note": "HISTORICAL/SIMULATED DATA"}


@app.get("/api/risk")
def get_risk():
    return {
        "risk_score": 78,
        "risk_level": "HIGH",
        "data_confidence": 82,
        "summary": "Risk is HIGH and increasing due to elevated river levels and rainfall.",
        "key_factors": [
            {"label": "River Level", "value": "Above Warning", "level": "HIGH", "weight": 30},
            {"label": "24h Rainfall", "value": "86mm Elevated", "level": "HIGH", "weight": 25},
            {"label": "Rise Rate", "value": "Rapid", "level": "MODERATE", "weight": 20},
        ],
        "generated_at": datetime.now().isoformat(),
        "_note": "RULE-BASED INDICATOR — NOT A TRAINED ML MODEL"
    }


@app.get("/api/alerts")
def get_alerts():
    return {"alerts": ALERTS, "unacknowledged": sum(1 for a in ALERTS if not a["acknowledged"])}


@app.get("/api/historical")
def get_historical():
    return {"events": FLOOD_EVENTS, "_note": "HISTORICAL/SIMULATED DATA"}


@app.get("/api/data-sources")
def get_data_sources():
    return {
        "sources": [
            {"id": "DS-SAT", "name": "Satellite / Remote Sensing", "status": "SIMULATED", "quality": "GOOD"},
            {"id": "DS-IOT", "name": "IoT Sensor Network", "status": "CONNECTED", "quality": "FAIR"},
            {"id": "DS-RVR", "name": "River Level Gauges", "status": "CONNECTED", "quality": "GOOD"},
            {"id": "DS-HIST", "name": "Historical Flood Data", "status": "CONNECTED", "quality": "GOOD"},
        ],
        "_note": "MVP DEMO — Most sources are simulated"
    }


class SimulationInput(BaseModel):
    water_level_change: float
    rainfall_change: float
    duration_hours: int


@app.post("/api/simulation")
def run_simulation(body: SimulationInput):
    base_extent = 42.6
    base_score = 78

    extent_mult = 1 + (body.water_level_change * 0.5) + (body.rainfall_change / 200)
    score_inc = (body.water_level_change * 8) + (body.rainfall_change * 0.12) + (body.duration_hours * 0.2)

    est_extent = min(round(base_extent * extent_mult, 1), 350)
    est_score = min(int(base_score + score_inc), 100)

    risk_level = "LOW"
    if est_score >= 76: risk_level = "CRITICAL"
    elif est_score >= 51: risk_level = "HIGH"
    elif est_score >= 26: risk_level = "MODERATE"

    return {
        "simulation_id": f"SIM-{int(datetime.now().timestamp())}",
        "input": body.dict(),
        "risk_score": est_score,
        "risk_level": risk_level,
        "estimated_flood_extent_km2": est_extent,
        "current_flood_extent_km2": base_extent,
        "additional_extent_km2": round(est_extent - base_extent, 1),
        "affected_villages": int(4 + body.water_level_change * 4 + body.rainfall_change * 0.08),
        "affected_roads": int(1 + body.water_level_change * 2),
        "affected_schools": int(body.water_level_change * 1.5),
        "affected_health_facilities": int(body.water_level_change * 0.8),
        "simulation_type": "SIMULATED",
        "created_at": datetime.now().isoformat(),
        "notes": "SIMULATED RESULT — NOT A REAL PREDICTION. For demonstration purposes only.",
        "_disclaimer": "Prototype / Decision Support System — Not an Official Warning System"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
