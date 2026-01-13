import styled from "styled-components";

const getScoreColor = (distance) => {
  if (distance <= 0.3) return "#10b981"; // green
  if (distance <= 0.6) return "#f59e0b"; // yellow/orange
  return "#ef4444"; // red
};

export function ScoreBadge({ value, label = null, size = "medium" }) {
  const percentage = ((1 - value) * 100).toFixed(1);
  const color = getScoreColor(value);

  return (
    <Badge $color={color} $size={size}>
      {label && <Label>{label}</Label>}
      <Value $color={color} $size={size}>
        {percentage}%
      </Value>
    </Badge>
  );
}

const Badge = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) =>
    props.$size === "small" ? "0.25rem 0.5rem" : "0.5rem 1rem"};
  border: 2px solid ${(props) => props.$color};
  border-radius: 8px;
  background: ${(props) => `${props.$color}10`};
`;

const Label = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const Value = styled.span`
  font-size: ${(props) => (props.$size === "small" ? "1rem" : "1.5rem")};
  font-weight: 700;
  color: ${(props) => props.$color};
`;
