import styled from "styled-components";
import { EntityCard } from "./EntityCard";
import { ScoreBadge } from "./ScoreBadge";

export function TrioDisplay({
  trio,
  scores = null,
  onRemove = null,
  size = "medium",
}) {
  return (
    <Container $size={size}>
      <EntityWrapper>
        <EntityCard
          name={trio.driver || "?"}
          type="driver"
          disabled
          isAvailable={false}
        />
      </EntityWrapper>
      <Connector>+</Connector>
      <EntityWrapper>
        <EntityCard
          name={trio.car || "?"}
          type="car"
          disabled
          isAvailable={false}
        />
      </EntityWrapper>
      <Connector>+</Connector>
      <EntityWrapper>
        <EntityCard
          name={trio.circuit || "?"}
          type="circuit"
          disabled
          isAvailable={false}
        />
      </EntityWrapper>

      {scores && (
        <ScoreWrapper>
          <ScoreBadge value={scores.average} size={size} />
        </ScoreWrapper>
      )}

      {onRemove && <RemoveButton onClick={onRemove}>×</RemoveButton>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: ${(props) => {
    switch (props.$size) {
      case "small":
        return "0.5rem";
      case "large":
        return "1.5rem";
      default:
        return "1rem";
    }
  }};
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #ffffff;
  position: relative;
`;

const Connector = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #9ca3af;
`;

const EntityWrapper = styled.div`
  flex: 1;
`;

const ScoreWrapper = styled.div`
  margin-left: auto;
  padding-left: 1rem;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  transition: background 0.2s;

  &:hover {
    background: #dc2626;
  }
`;
