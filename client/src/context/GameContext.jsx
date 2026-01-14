import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useGameData } from '../hooks/useGameData';

const GameContext = createContext(null);

// Fonction pour sélectionner N éléments aléatoires d'un tableau
const getRandomItems = (array, count) => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
};

export function GameProvider({ children }) {
  const { data, loading, error } = useGameData();

  const [phase, setPhase] = useState('selection');
  const [availableDrivers, setAvailableDrivers] = useState(new Set());
  const [availableCars, setAvailableCars] = useState(new Set());
  const [availableCircuits, setAvailableCircuits] = useState(new Set());
  const [shuffledDrivers, setShuffledDrivers] = useState([]);
  const [shuffledCars, setShuffledCars] = useState([]);
  const [shuffledCircuits, setShuffledCircuits] = useState([]);
  const [currentTrio, setCurrentTrio] = useState({ driver: null, car: null, circuit: null });
  const [completedTrios, setCompletedTrios] = useState([]);
  const [trioScores, setTrioScores] = useState([]);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    if (data) {
      // Sélectionner 5 entités aléatoires de chaque type et les mélanger
      const randomDrivers = getRandomItems(Object.keys(data.drivers), 5);
      const randomCars = getRandomItems(Object.keys(data.cars), 5);
      const randomCircuits = getRandomItems(Object.keys(data.circuits), 5);

      setAvailableDrivers(new Set(randomDrivers));
      setAvailableCars(new Set(randomCars));
      setAvailableCircuits(new Set(randomCircuits));

      setShuffledDrivers(randomDrivers);
      setShuffledCars(randomCars);
      setShuffledCircuits(randomCircuits);
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

  // const goToReview = useCallback(() => {
  //   setPhase('review');
  // }, []);

  const setResults = useCallback((scores, final) => {
    setTrioScores(scores);
    setFinalScore(final);
    setPhase('results');
  }, []);

  const resetGame = useCallback(() => {
    if (data) {
      // Sélectionner de nouvelles entités aléatoires à chaque reset
      const randomDrivers = getRandomItems(Object.keys(data.drivers), 5);
      const randomCars = getRandomItems(Object.keys(data.cars), 5);
      const randomCircuits = getRandomItems(Object.keys(data.circuits), 5);

      setAvailableDrivers(new Set(randomDrivers));
      setAvailableCars(new Set(randomCars));
      setAvailableCircuits(new Set(randomCircuits));

      setShuffledDrivers(randomDrivers);
      setShuffledCars(randomCars);
      setShuffledCircuits(randomCircuits);
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
    shuffledDrivers,
    shuffledCars,
    shuffledCircuits,
    currentTrio,
    completedTrios,
    trioScores,
    finalScore,
    selectEntity,
    completeTrio,
    removeTrio,
    // goToReview,
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
