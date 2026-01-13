import styled from 'styled-components';

const Card = styled.div`
  padding: 1rem;
  border: 2px solid ${props => {
    if (props.$isSelected) return '#3b82f6';
    if (!props.$isAvailable) return '#9ca3af';
    return '#e5e7eb';
  }};
  border-radius: 8px;
  background: ${props => props.$isAvailable ? '#ffffff' : '#f3f4f6'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  text-align: center;
  opacity: ${props => props.$isAvailable ? 1 : 0.6};
  box-shadow: ${props => props.$isSelected ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'};

  &:hover {
    ${props => !props.$disabled && props.$isAvailable && `
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `}
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Name = styled.div`
  font-weight: 600;
  color: #1f2937;
  margin-bottom: ${props => props.$showDetails ? '0.25rem' : 0};
`;

const Type = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: capitalize;
`;

const getIcon = (type) => {
  switch (type) {
    case 'driver': return '👤';
    case 'car': return '🏎️';
    case 'circuit': return '🏁';
    default: return '❓';
  }
};

export function EntityCard({
  name,
  type,
  isSelected = false,
  isAvailable = true,
  onClick,
  disabled = false,
  showDetails = false
}) {
  return (
    <Card
      $isSelected={isSelected}
      $isAvailable={isAvailable}
      $disabled={disabled}
      onClick={disabled ? null : onClick}
    >
      <Icon>{getIcon(type)}</Icon>
      <Name $showDetails={showDetails}>{name}</Name>
      {showDetails && <Type>{type}</Type>}
    </Card>
  );
}
