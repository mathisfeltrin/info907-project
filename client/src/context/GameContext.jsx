import { createContext, useContext, useState, useCallback, useEffect } from 'react';
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

  useEffect(() => {
    if (data) {
      setAvailableDrivers(new Set(Object.keys(data.drivers)));
      setAvailableCars(new Set(Object.keys(data.cars)));
      setAvailableCircuits(new Set(Object.keys(data.circuits)));
    }
  }, [data]);

  const selectEntity = useCallback((type, name) => {
    setCurrentTrio(prev => {
      // Si l'entité est déjà sélectionnée, on la désélectionne
      if (prev[type] === name) {
        return { ...prev, [type]: null };
      }
      // Sinon on la sélectionne
      return { ...prev, [type]: name };
    });
  }, []);

  const completeTrio = useCallback(() => {
    if (currentTrio.driver && currentTrio.car && currentTrio.circuit) {
      setCompletedTrios(trios => [...trios, currentTrio]);
      setAvailableDrivers(set => {
        const newSet = new Set(set);
        newSet.delete(currentTrio.driver);
        return newSet;
      });
      setAvailableCars(set => {
        const newSet = new Set(set);
        newSet.delete(currentTrio.car);
        return newSet;
      });
      setAvailableCircuits(set => {
        const newSet = new Set(set);
        newSet.delete(currentTrio.circuit);
        return newSet;
      });
      setCurrentTrio({ driver: null, car: null, circuit: null });
    }
  }, [currentTrio]);

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
    completeTrio,
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
