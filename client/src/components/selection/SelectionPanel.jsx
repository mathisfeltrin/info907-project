import styled from "styled-components";
import { useGame } from "../../context/GameContext";
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
    currentTrio,
    completedTrios,
    selectEntity,
    goToReview,
  } = useGame();

  const canReview = completedTrios.length === 8;

  return (
    <Container>
      <GameProgress completed={completedTrios.length} total={8} />

      <TrioBuilder currentTrio={currentTrio} />

      <GridsContainer>
        <EntityGrid
          entities={drivers}
          type="driver"
          availableSet={availableDrivers}
          selectedEntity={currentTrio.driver}
          onSelect={selectEntity}
        />

        <EntityGrid
          entities={cars}
          type="car"
          availableSet={availableCars}
          selectedEntity={currentTrio.car}
          onSelect={selectEntity}
        />

        <EntityGrid
          entities={circuits}
          type="circuit"
          availableSet={availableCircuits}
          selectedEntity={currentTrio.circuit}
          onSelect={selectEntity}
        />
      </GridsContainer>

      <CompletedTrios trios={completedTrios} />

      <Actions>
        <Button onClick={goToReview} disabled={!canReview} size="large">
          Réviser et Soumettre ({completedTrios.length}/8)
        </Button>
      </Actions>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const GridsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
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
`;
