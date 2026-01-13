const API_BASE = '/api';

export const api = {
  async getAllData() {
    const response = await fetch(`${API_BASE}/all`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
  },

  async calculateDistance(entity1, entity2) {
    const response = await fetch(`${API_BASE}/distance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entity1, entity2 })
    });
    if (!response.ok) throw new Error('Failed to calculate distance');
    return response.json();
  },

  async calculateTrioScore(driver, car, circuit, allData) {
    const [distDriverCar, distDriverCircuit, distCarCircuit] = await Promise.all([
      this.calculateDistance(allData.drivers[driver], allData.cars[car]),
      this.calculateDistance(allData.drivers[driver], allData.circuits[circuit]),
      this.calculateDistance(allData.cars[car], allData.circuits[circuit])
    ]);

    const average = (
      distDriverCar.distance +
      distDriverCircuit.distance +
      distCarCircuit.distance
    ) / 3;

    return {
      driverCar: distDriverCar.distance,
      driverCircuit: distDriverCircuit.distance,
      carCircuit: distCarCircuit.distance,
      average
    };
  }
};
