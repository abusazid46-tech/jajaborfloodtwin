import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { MapPage } from './pages/MapPage';
import { SimulationPage } from './pages/SimulationPage';
import { AIPage } from './pages/AIPage';
import { SensorsPage } from './pages/SensorsPage';
import { DataPage } from './pages/DataPage';
import { AlertsPage } from './pages/AlertsPage';
import { HistoricalPage } from './pages/HistoricalPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/sensors" element={<SensorsPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/historical" element={<HistoricalPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
