import { createContext, useContext, useState, useCallback } from 'react';
import { useGameData } from '../hooks/useGameData';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const { data, loading, error } = useGameData();

  const [phase, setPhase] = useState('selection');
  const [availableDrivers, setAvailableDrivers] = useState(new Set());
  const [availableCars, setAvailableCars] = useState(new Set());
  const [availableCircuits, setAvailableCircuits] = useState(new Set());
  const [currentTrio, setCurrentTrio] = useState({ driver: null, car: null, circuit: null });
  const [completedTrios, setCompletedTrios] = useState([]);
  const [trioScores, setTrioScores] = useState([]);
  const [finalScore, setFinalScore] = useState(null);

  useState(() => {
    if (data) {
      setAvailableDrivers(new Set(Object.keys(data.drivers)));
      setAvailableCars(new Set(Object.keys(data.cars)));
      setAvailableCircuits(new Set(Object.keys(data.circuits)));
    }
  }, [data]);

  const selectEntity = useCallback((type, name) => {
    setCurrentTrio(prev => {
      const updated = { ...prev, [type]: name };

      if (updated.driver && updated.car && updated.circuit) {
        setCompletedTrios(trios => [...trios, updated]);
        setAvailableDrivers(set => {
          const newSet = new Set(set);
          newSet.delete(updated.driver);
          return newSet;
        });
        setAvailableCars(set => {
          const newSet = new Set(set);
          newSet.delete(updated.car);
          return newSet;
        });
        setAvailableCircuits(set => {
          const newSet = new Set(set);
          newSet.delete(updated.circuit);
          return newSet;
        });
        return { driver: null, car: null, circuit: null };
      }

      return updated;
    });
  }, []);

  const removeTrio = useCallback((index) => {
    const trio = completedTrios[index];
    setCompletedTrios(trios => trios.filter((_, i) => i !== index));
    setAvailableDrivers(set => new Set([...set, trio.driver]));
    setAvailableCars(set => new Set([...set, trio.car]));
    setAvailableCircuits(set => new Set([...set, trio.circuit]));
    setPhase('selection');
  }, [completedTrios]);

  const goToReview = useCallback(() => {
    setPhase('review');
  }, []);

  const setResults = useCallback((scores, final) => {
    setTrioScores(scores);
    setFinalScore(final);
    setPhase('results');
  }, []);

  const resetGame = useCallback(() => {
    if (data) {
      setAvailableDrivers(new Set(Object.keys(data.drivers)));
      setAvailableCars(new Set(Object.keys(data.cars)));
      setAvailableCircuits(new Set(Object.keys(data.circuits)));
    }
    setCurrentTrio({ driver: null, car: null, circuit: null });
    setCompletedTrios([]);
    setTrioScores([]);
    setFinalScore(null);
    setPhase('selection');
  }, [data]);

  const value = {
    drivers: data?.drivers || {},
    cars: data?.cars || {},
    circuits: data?.circuits || {},
    differences: data?.differences || [],
    loading,
    error,
    phase,
    availableDrivers,
    availableCars,
    availableCircuits,
    currentTrio,
    completedTrios,
    trioScores,
    finalScore,
    selectEntity,
    removeTrio,
    goToReview,
    setResults,
    resetGame
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
