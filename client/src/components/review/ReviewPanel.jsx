import { useState } from "react";
import styled from "styled-components";
import { useGame } from "../../context/GameContext";
import { useScoreCalculation } from "../../hooks/useScoreCalculation";
import { TrioDisplay } from "../shared/TrioDisplay";
import { Button } from "../shared/Button";

export function ReviewPanel() {
  const { completedTrios, removeTrio, setResults, drivers, cars, circuits } =
    useGame();
  const { calculateScores, calculating } = useScoreCalculation();
  const [error, setError] = useState(null);

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
      <Header>
        <Title>Révision de vos associations</Title>
        <Subtitle>
          Vérifiez vos {completedTrios.length} trios avant de calculer le score
        </Subtitle>
      </Header>

      <TrioList>
        {completedTrios.map((trio, index) => (
          <TrioDisplay
            key={index}
            trio={trio}
            onRemove={() => removeTrio(index)}
            size="medium"
          />
        ))}
      </TrioList>

      {error && (
        <div
          style={{
            color: "#ef4444",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      <Actions>
        <Button onClick={handleSubmit} size="large">
          Calculer le Score
        </Button>
      </Actions>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
`;

const TrioList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.125rem;
  color: #667eea;
`;
