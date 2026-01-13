import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 2rem;
`;

const Label = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const Score = styled.div`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
`;

const Message = styled.div`
  font-size: 1.125rem;
  opacity: 0.9;
`;

const getScoreMessage = (percentage) => {
  if (percentage >= 90) return 'Parfait! 🏆';
  if (percentage >= 80) return 'Excellent! 🎉';
  if (percentage >= 70) return 'Très bien! 👍';
  if (percentage >= 60) return 'Bien! 👌';
  if (percentage >= 50) return 'Pas mal! 🙂';
  return 'À améliorer! 💪';
};

export function ScoreDisplay({ finalScore }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const targetPercentage = ((1 - finalScore) * 100);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = targetPercentage / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPercentage) {
        setAnimatedScore(targetPercentage);
        clearInterval(timer);
      } else {
        setAnimatedScore(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [targetPercentage]);

  return (
    <Container>
      <Label>Score de Similarité Global</Label>
      <Score>{animatedScore.toFixed(1)}%</Score>
      <Message>{getScoreMessage(animatedScore)}</Message>
    </Container>
  );
}
