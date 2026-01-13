import styled from 'styled-components';
import { TrioDisplay } from '../shared/TrioDisplay';

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
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  font-style: italic;
`;

export function CompletedTrios({ trios }) {
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
      <Title>Trios complétés ({trios.length}/8)</Title>
      <TrioList>
        {trios.map((trio, index) => (
          <TrioDisplay key={index} trio={trio} size="small" />
        ))}
      </TrioList>
    </Container>
  );
}
