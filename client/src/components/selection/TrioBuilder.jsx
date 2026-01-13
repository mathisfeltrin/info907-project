import styled from 'styled-components';

const Container = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
  border: 2px dashed #667eea;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  text-align: center;
`;

const TrioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const Slot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  min-height: 120px;
  padding: 1rem;
  border: 2px solid ${props => props.$filled ? '#667eea' : '#e5e7eb'};
  border-radius: 8px;
  background: ${props => props.$filled ? '#667eea10' : '#ffffff'};
  transition: all 0.2s;
`;

const SlotIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const SlotLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  text-transform: capitalize;
`;

const SlotValue = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${props => props.$filled ? '#667eea' : '#9ca3af'};
`;

const Connector = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #9ca3af;
`;

const getIcon = (type) => {
  switch (type) {
    case 'driver': return '👤';
    case 'car': return '🏎️';
    case 'circuit': return '🏁';
    default: return '❓';
  }
};

export function TrioBuilder({ currentTrio }) {
  return (
    <Container>
      <Title>Trio en construction</Title>
      <TrioContainer>
        <Slot $filled={!!currentTrio.driver}>
          <SlotIcon>{getIcon('driver')}</SlotIcon>
          <SlotLabel>Pilote</SlotLabel>
          <SlotValue $filled={!!currentTrio.driver}>
            {currentTrio.driver || '?'}
          </SlotValue>
        </Slot>

        <Connector>+</Connector>

        <Slot $filled={!!currentTrio.car}>
          <SlotIcon>{getIcon('car')}</SlotIcon>
          <SlotLabel>Voiture</SlotLabel>
          <SlotValue $filled={!!currentTrio.car}>
            {currentTrio.car || '?'}
          </SlotValue>
        </Slot>

        <Connector>+</Connector>

        <Slot $filled={!!currentTrio.circuit}>
          <SlotIcon>{getIcon('circuit')}</SlotIcon>
          <SlotLabel>Circuit</SlotLabel>
          <SlotValue $filled={!!currentTrio.circuit}>
            {currentTrio.circuit || '?'}
          </SlotValue>
        </Slot>
      </TrioContainer>
    </Container>
  );
}
