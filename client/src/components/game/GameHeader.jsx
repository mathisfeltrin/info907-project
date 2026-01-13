import styled from 'styled-components';

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
`;

export function GameHeader() {
  return (
    <Header>
      <Title>🏁 Jeu de Matching Racing 🏎️</Title>
      <Subtitle>Associez les pilotes, voitures et circuits pour obtenir le meilleur score!</Subtitle>
    </Header>
  );
}
