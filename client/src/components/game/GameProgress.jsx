import styled from "styled-components";

export function GameProgress({ completed, total }) {
  const progress = (completed / total) * 100;

  return (
    <Container>
      <ProgressText>Trios complétés</ProgressText>
      <ProgressBar>
        <ProgressFill $progress={progress} />
      </ProgressBar>
      <ProgressLabel>
        {completed} / {total}
      </ProgressLabel>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const ProgressText = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  margin: 0 1rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
`;

const ProgressLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;
