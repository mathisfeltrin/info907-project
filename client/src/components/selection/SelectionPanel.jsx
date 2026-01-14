import { useState } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";
import { useScoreCalculation } from "../../hooks/useScoreCalculation";
import { EntityGrid } from "../shared/EntityGrid";
import { Button } from "../shared/Button";
import { GameProgress } from "../game/GameProgress";
import { TrioBuilder } from "./TrioBuilder";
import { CompletedTrios } from "./CompletedTrios";

export function SelectionPanel() {
  const {
    drivers,
    cars,
    circuits,
    availableDrivers,
    availableCars,
    availableCircuits,
    shuffledDrivers,
    shuffledCars,
    shuffledCircuits,
    currentTrio,
    completedTrios,
    selectEntity,
    setResults,
    // goToReview,
  } = useGame();

  const { calculateScores, calculating } = useScoreCalculation();
  const [error, setError] = useState(null);

  const canSubmit = completedTrios.length === 5;

  const handleSubmit = async () => {
    try {
      setError(null);
      const { trioScores, finalScore } = await calculateScores(completedTrios, {
        drivers,
        cars,
        circuits,
      });
      setResults(trioScores, finalScore);
    } catch (err) {
      setError("Erreur lors du calcul des scores: " + err.message);
    }
  };

  if (calculating) {
    return (
      <Container>
        <LoadingMessage>Calcul des scores en cours... ⏳</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <GameProgress completed={completedTrios.length} total={5} />

      <TrioBuilder currentTrio={currentTrio} />

      <GridsContainer>
        <EntityGrid
          entities={drivers}
          type="driver"
          availableSet={availableDrivers}
          selectedEntity={currentTrio.driver}
          onSelect={selectEntity}
          orderedNames={shuffledDrivers}
        />

        <EntityGrid
          entities={cars}
          type="car"
          availableSet={availableCars}
          selectedEntity={currentTrio.car}
          onSelect={selectEntity}
          orderedNames={shuffledCars}
        />

        <EntityGrid
          entities={circuits}
          type="circuit"
          availableSet={availableCircuits}
          selectedEntity={currentTrio.circuit}
          onSelect={selectEntity}
          orderedNames={shuffledCircuits}
        />
      </GridsContainer>

      <CompletedTrios trios={completedTrios} />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Actions>
        <Button onClick={handleSubmit} disabled={!canSubmit} size="large">
          Calculer le Score ({completedTrios.length}/5)
        </Button>
      </Actions>
    </Container>
  );
}

const Container = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const GridsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.125rem;
  color: #667eea;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  text-align: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #fee2e2;
  border-radius: 8px;
`;
