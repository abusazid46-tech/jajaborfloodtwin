import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { DataMode, DashboardData, PilotBasin } from '../types';
import { DASHBOARD_DATA, PILOT_BASINS, SENSORS } from '../data/mockData';

interface AppContextType {
  dataMode: DataMode;
  setDataMode: (m: DataMode) => void;
  dashboardData: DashboardData;
  selectedBasin: PilotBasin;
  setSelectedBasin: (b: PilotBasin) => void;
  isLive: boolean;
  setIsLive: (v: boolean) => void;
  liveWaterLevel: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [dataMode, setDataMode] = useState<DataMode>('OBSERVED');
  const [selectedBasin, setSelectedBasin] = useState<PilotBasin>(PILOT_BASINS[0]);
  const [isLive, setIsLive] = useState(true);
  const [liveWaterLevel, setLiveWaterLevel] = useState(SENSORS[0].water_level ?? 10.24);

  // Simulate live updating water level
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setLiveWaterLevel(prev => {
        const delta = (Math.random() - 0.35) * 0.06;
        return Math.round((prev + delta) * 100) / 100;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <AppContext.Provider value={{
      dataMode, setDataMode,
      dashboardData: DASHBOARD_DATA,
      selectedBasin, setSelectedBasin,
      isLive, setIsLive,
      liveWaterLevel,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
