import styled from "styled-components";
import { TrioDisplay } from "../shared/TrioDisplay";
import { useGame } from "../../context/GameContext";

export function CompletedTrios({ trios }) {
  const { removeTrio } = useGame();

  if (trios.length === 0) {
    return (
      <Container>
        <Title>Trios complétés</Title>
        <EmptyState>Aucun trio complété pour le moment</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Trios complétés ({trios.length}/5)</Title>
      <TrioList>
        {trios.map((trio, index) => (
          <TrioDisplay
            key={index}
            trio={trio}
            size="small"
            onRemove={() => removeTrio(index)}
          />
        ))}
      </TrioList>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const TrioList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  font-style: italic;
`;
