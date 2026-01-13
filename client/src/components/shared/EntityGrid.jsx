import styled from 'styled-components';
import { EntityCard } from './EntityCard';

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
`;

export function EntityGrid({
  entities,
  type,
  availableSet,
  selectedEntity,
  onSelect,
  disabled = false
}) {
  const entityNames = Object.keys(entities);

  return (
    <Container>
      <Title>{type}s</Title>
      <Grid>
        {entityNames.map(name => (
          <EntityCard
            key={name}
            name={name}
            type={type}
            isSelected={selectedEntity === name}
            isAvailable={availableSet.has(name)}
            onClick={() => onSelect(type, name)}
            disabled={disabled || !availableSet.has(name)}
          />
        ))}
      </Grid>
    </Container>
  );
}
