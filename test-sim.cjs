// Test simulation calculation logic
function runSimulation(waterLevelChange, rainfallChange, durationHours) {
  const baseExtent = 42.6;
  const baseScore = 78;

  const extentMultiplier = 1 + (waterLevelChange * 0.5) + (rainfallChange / 200);
  const scoreIncrease = (waterLevelChange * 8) + (rainfallChange * 0.12) + (durationHours * 0.2);

  const estExtent = Math.min(Math.round(baseExtent * extentMultiplier * 10) / 10, 350);
  const estScore = Math.min(Math.round(baseScore + scoreIncrease), 100);

  let riskLevel = 'LOW';
  if (estScore >= 76) riskLevel = 'CRITICAL';
  else if (estScore >= 51) riskLevel = 'HIGH';
  else if (estScore >= 26) riskLevel = 'MODERATE';

  const addExtent = Math.round((estExtent - baseExtent) * 10) / 10;

  return {
    simulation_id: `SIM-${Date.now()}`,
    input: { water_level_change: waterLevelChange, rainfall_change: rainfallChange, duration_hours: durationHours },
    risk_score: estScore,
    risk_level: riskLevel,
    estimated_flood_extent_km2: estExtent,
    current_flood_extent_km2: baseExtent,
    additional_extent_km2: addExtent,
    affected_villages: Math.round(4 + waterLevelChange * 4 + rainfallChange * 0.08),
    affected_roads: Math.round(1 + waterLevelChange * 2),
    affected_schools: Math.round(waterLevelChange * 1.5),
    affected_health_facilities: Math.round(waterLevelChange * 0.8),
  };
}

console.log('--- TEST 1: Baseline Scenario (0m, 0%, 6h) ---');
console.log(runSimulation(0, 0, 6));

console.log('\n--- TEST 2: Moderate Scenario (1.0m, 25%, 24h) ---');
console.log(runSimulation(1.0, 25, 24));

console.log('\n--- TEST 3: Extreme Monsoon Breach (2.0m, 100%, 48h) ---');
console.log(runSimulation(2.0, 100, 48));
