# 🌊 Jajabor FloodTwin
### AI-Enabled Digital Twin for Flood Management, Simulation & Early Warning
**Prototype Decision Support System for Assam State Space Applications Centre (ASSAC) & ASDMA**  
*Aligned with Challenge: NESFIC-D-18 — Digital Twin for Flood Management, Simulation and Early Warning Using Space Technology*

---

## 🌟 Executive Summary

**Jajabor FloodTwin** is a high-fidelity geospatial digital twin prototype engineered to address the recurrent flood dynamics of the Brahmaputra River Basin in Assam. It synthesizes remote sensing data (SAR/Optical Earth observation), hydrological simulation models, real-time IoT water-level telemetry, and machine-learning risk scoring into an intuitive Command & Decision Support Dashboard.

### Core Capabilities:
1. **Interactive Geospatial Digital Twin**: Mapbox/Leaflet-based multi-layer visualization displaying water bodies, flood extents, vulnerable infrastructure (embankments, hospitals, bridges), and IoT sensor locations.
2. **Predictive Scenario Simulator**: Interactive scenario modeling ("What-if" analysis) allowing users to adjust rainfall (mm/24h), upstream dam discharge (cumecs), and embankment breach conditions to project inundated area, at-risk populations, and evacuation needs.
3. **AI Risk Assessment & Early Warning**: Explainable risk indices combining river proximity, slope/DEM elevation, simulated soil saturation, and precipitation forecasts.
4. **IoT Telemetry & Gauge Network**: Real-time river stage monitoring across critical stations (Guwahati DC Court, Tezpur, Dibrugarh, Nematighat, Dhubri) with threshold alarms.
5. **Multi-Source Data Ingestion Registry**: Monitoring SAR (Sentinel-1), Optical (Sentinel-2, Landsat-8), GPM precipitation, CWC river gauge feeds, and DEM terrain data.
6. **Historical Flood Intelligence**: Analytical records and spatial comparisons with historical Assam flood events (2004, 2012, 2020, 2022).

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA INGESTION LAYER                            │
│  - Satellite EO (Sentinel-1 SAR / Sentinel-2 Optical / Landsat 8)      │
│  - Hydrometric Gauges (CWC / WRD Telemetry)                            │
│  - Meteorological Services (IMD / GPM Precipitation Feeds)            │
│  - Static Geospatial (ALOS PALSAR DEM, Land Cover, Infrastructure)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    DIGITAL TWIN PROCESSING CORE                         │
│  - Geospatial Preprocessor & GeoJSON Tile Generator                    │
│  - 2D Hydrodynamic Inundation Simulator (DEM + Roughness + Discharge)  │
│  - AI Flood Hazard Classifier (Multi-Criteria Decision Analysis)       │
│  - Automated Rule-Based Alert Engine (Warning / Danger / High Danger)  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST API / WebSocket
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   DECISION SUPPORT SYSTEM (FRONTEND)                   │
│  - Vite + React 18 + TypeScript + Modern Dark Theme UI                 │
│  - Leaflet GIS Interactive Map with Layer Switcher                     │
│  - Recharts Hydrograph & Parameter Curves                              │
│  - Role-Based Operational Views (Commander, Field Officer, Analyst)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18+ (tested on Node v20/v22)
- **npm** or **pnpm** / **yarn**
- *(Optional)* Python 3.10+ for the standalone FastAPI backend

### 1. Launching the Frontend Dashboard (Instant Demo)
The frontend includes a self-contained mock simulation engine and reactive store, allowing full demonstration without external dependencies:

```bash
cd frontend
npm install
npm run dev
```

Open your browser to: **`http://localhost:5173`**

### 2. (Optional) Running the FastAPI Backend
For backend API integration:

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation will be live at: **`http://localhost:8000/docs`**

---

## 🗺️ Key Application Pages

| Route | View | Description |
|---|---|---|
| `/` | **Command Dashboard** | Real-time situation report, key metrics, live alerts ticker, and mini-twin preview. |
| `/map` | **Geospatial Digital Twin** | Full-screen GIS viewer with layer controls (Satellite, Flood Extent, Embankments, Sensors). |
| `/simulation` | **Scenario Simulator** | Dynamic parameter controls (Rainfall, Dam Release, Breaches) with real-time recalculation. |
| `/ai-insights` | **AI Risk Matrix** | Composite vulnerability scoring, feature importances, and mitigation recommendations. |
| `/sensors` | **Sensor Network** | Live IoT telemetry, gauge health, battery status, and river stage trend lines. |
| `/data-sources` | **Data Ingestion** | Ingestion pipeline health, latency monitor, satellite coverage windows. |
| `/alerts` | **Alerts & Warnings** | Active alert dispatch log, severity filters, acknowledgment workflow. |
| `/historical` | **Historical Archive** | Longitudinal flood records, comparative inundated area metrics. |
| `/about` | **System & Architecture** | Project documentation, pipeline diagrams, and attribution. |

---

## 🛡️ Prototype Disclaimer
*This system is a functional prototype developed for demonstration, evaluation, and pilot validation under the NESFIC-D-18 initiative. Real-world flood management requires ground calibration, telemetry integration with Assam WRD/ASDMA, and official clearance prior to public dissemination.*
