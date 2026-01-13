import styled from "styled-components";
import { useGame } from "../../context/GameContext";
import { Button } from "../shared/Button";
import { ScoreDisplay } from "./ScoreDisplay";
import { TrioScoreBreakdown } from "./TrioScoreBreakdown";

export function ResultsPanel() {
  const { trioScores, finalScore, resetGame } = useGame();

  return (
    <Container>
      <ScoreDisplay finalScore={finalScore} />
      <TrioScoreBreakdown trioScores={trioScores} />

      <Actions>
        <Button onClick={resetGame} size="large">
          Rejouer
        </Button>
      </Actions>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;
