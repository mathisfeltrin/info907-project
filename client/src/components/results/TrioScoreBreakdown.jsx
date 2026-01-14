import styled from "styled-components";
import { TrioDisplay } from "../shared/TrioDisplay";
import { ScoreBadge } from "../shared/ScoreBadge";

export function TrioScoreBreakdown({ trioScores }) {
  return (
    <Container>
      <Title>Détails par Trio</Title>
      <TrioList>
        {trioScores.map((item, index) => (
          <TrioCard key={index}>
            <TrioHeader>
              <TrioDisplay trio={item.trio} scores={item} />
            </TrioHeader>
            <Details>
              <DetailItem>
                <DetailLabel>Pilote - Voiture</DetailLabel>
                <ScoreBadge value={item.distances.driverCar} size="small" />
              </DetailItem>
              <DetailItem>
                <DetailLabel>Pilote - Circuit</DetailLabel>
                <ScoreBadge value={item.distances.driverCircuit} size="small" />
              </DetailItem>
              <DetailItem>
                <DetailLabel>Voiture - Circuit</DetailLabel>
                <ScoreBadge value={item.distances.carCircuit} size="small" />
              </DetailItem>
            </Details>
          </TrioCard>
        ))}
      </TrioList>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const TrioList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const TrioCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
`;

const TrioHeader = styled.div`
  margin-bottom: 1rem;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
`;

const DetailItem = styled.div`
  text-align: center;
`;

const DetailLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;
