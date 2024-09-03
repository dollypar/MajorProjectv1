import React from 'react';
import styled from 'styled-components';

const TotalScore = ({ score }) => {
  return (
    <ScoreWrapper>
      <ScoreLabel>Total Score:</ScoreLabel>
      <ScoreValue>{score}</ScoreValue>
    </ScoreWrapper>
  );
};

const ScoreWrapper = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left; /* Align text to the left */
  margin-bottom: 20px; /* Add margin bottom for spacing */
`;

const ScoreLabel = styled.p`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #555; /* Subtle color for label */
`;

const ScoreValue = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

export default TotalScore;
