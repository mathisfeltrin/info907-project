import { GameProvider } from './context/GameContext';
import { MatchingGame } from './components/game/MatchingGame';
import './App.css';

function App() {
  return (
    <GameProvider>
      <MatchingGame />
    </GameProvider>
  );
}

export default App;
