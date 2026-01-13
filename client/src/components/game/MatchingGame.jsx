import { useGame } from '../../context/GameContext';
import { GameHeader } from './GameHeader';
import { SelectionPanel } from '../selection/SelectionPanel';
import { ReviewPanel } from '../review/ReviewPanel';
import { ResultsPanel } from '../results/ResultsPanel';

export function MatchingGame() {
  const { phase, loading, error } = useGame();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', fontSize: '1.25rem' }}>
        Chargement des données... ⏳
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: '#ef4444' }}>
        Erreur: {error}
      </div>
    );
  }

  return (
    <div>
      <GameHeader />

      {phase === 'selection' && <SelectionPanel />}
      {phase === 'review' && <ReviewPanel />}
      {phase === 'results' && <ResultsPanel />}
    </div>
  );
}
