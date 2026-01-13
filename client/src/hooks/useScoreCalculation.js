import { useState } from 'react';
import { api } from '../services/api';

export function useScoreCalculation() {
  const [calculating, setCalculating] = useState(false);

  const calculateScores = async (completedTrios, allData) => {
    setCalculating(true);

    try {
      const trioScores = await Promise.all(
        completedTrios.map(async (trio) => {
          const scores = await api.calculateTrioScore(
            trio.driver,
            trio.car,
            trio.circuit,
            allData
          );

          return {
            trio,
            distances: {
              driverCar: scores.driverCar,
              driverCircuit: scores.driverCircuit,
              carCircuit: scores.carCircuit
            },
            average: scores.average
          };
        })
      );

      const finalScore = trioScores.reduce((sum, ts) => sum + ts.average, 0) / trioScores.length;

      return { trioScores, finalScore };
    } finally {
      setCalculating(false);
    }
  };

  return { calculateScores, calculating };
}
