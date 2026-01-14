import styled from "styled-components";
import { useGame } from "../../context/GameContext";
import { Button } from "../shared/Button";
import { EntityCard } from "../shared/EntityCard";

const getIcon = (type) => {
  switch (type) {
    case "driver":
      return "👤";
    case "car":
      return "🏎️";
    case "circuit":
      return "🏁";
    default:
      return "❓";
  }
};

export function TrioBuilder({ currentTrio }) {
  const { completeTrio } = useGame();
  const isComplete =
    currentTrio.driver && currentTrio.car && currentTrio.circuit;

  return (
    <Container>
      <Title>Trio en construction</Title>
      <TrioContainer>
        <Slot $filled={!!currentTrio.driver}>
          {currentTrio.driver ? (
            <CardWrapper key={currentTrio.driver}>
              <EntityCard
                name={currentTrio.driver}
                type="driver"
                isSelected={true}
                disabled={true}
              />
            </CardWrapper>
          ) : (
            <EmptyContent>
              <SlotIcon>{getIcon("driver")}</SlotIcon>
              <SlotLabel>Pilote</SlotLabel>
              <SlotValue>?</SlotValue>
            </EmptyContent>
          )}
        </Slot>

        <Connector>+</Connector>

        <Slot $filled={!!currentTrio.car}>
          {currentTrio.car ? (
            <CardWrapper key={currentTrio.car}>
              <EntityCard
                name={currentTrio.car}
                type="car"
                isSelected={true}
                disabled={true}
              />
            </CardWrapper>
          ) : (
            <EmptyContent>
              <SlotIcon>{getIcon("car")}</SlotIcon>
              <SlotLabel>Voiture</SlotLabel>
              <SlotValue>?</SlotValue>
            </EmptyContent>
          )}
        </Slot>

        <Connector>+</Connector>

        <Slot $filled={!!currentTrio.circuit}>
          {currentTrio.circuit ? (
            <CardWrapper key={currentTrio.circuit}>
              <EntityCard
                name={currentTrio.circuit}
                type="circuit"
                isSelected={true}
                disabled={true}
              />
            </CardWrapper>
          ) : (
            <EmptyContent>
              <SlotIcon>{getIcon("circuit")}</SlotIcon>
              <SlotLabel>Circuit</SlotLabel>
              <SlotValue>?</SlotValue>
            </EmptyContent>
          )}
        </Slot>
      </TrioContainer>

      <Actions>
        <Button onClick={completeTrio} disabled={!isComplete}>
          Valider le trio
        </Button>
      </Actions>
    </Container>
  );
}

const Container = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea20 0%, #764ba220 100%);
  border: 2px dashed #667eea;
  border-radius: 12px;
  /* margin-bottom: 2rem; */
`;

const Title = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
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
  width: 200px;
  height: 150px;
  padding: ${(props) => (props.$filled ? "0" : "1rem")};
  border: ${(props) => (props.$filled ? "none" : "2px dashed #e5e7eb")};
  border-radius: 8px;
  background: ${(props) => (props.$filled ? "transparent" : "#ffffff")};
  transition: background 0.2s, border 0.2s;
  position: relative;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  animation: fadeIn 0.2s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
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
  font-size: 1.5rem;
  font-weight: 600;
  color: #9ca3af;
`;

const Connector = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #9ca3af;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;
