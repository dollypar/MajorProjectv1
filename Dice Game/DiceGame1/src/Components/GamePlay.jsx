import React, { useState } from 'react';
import styled from 'styled-components';
import TotalScore from './TotalScore';
import NumberSelector from './NumberSelector';
import RollDice from './RollDice';

const GamePlay = () => {
  const [score, setScore] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null); 
  const [currentDice, setCurrentDice] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const rollDice = () => {
    if (selectedNumber === null) {
     
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); 
      return;
    }

    const randomNumber = generateRandomNumber(1, 6);
    setCurrentDice(randomNumber);

    
    if (selectedNumber === randomNumber) {
      setScore((prevScore) => prevScore + randomNumber);
    } else {
      setScore((prevScore) => prevScore - 2); 
    }


    setSelectedNumber(null);
  };

  const handleNumberChange = (number) => {
    setSelectedNumber(number); 
  };

  return (
    <MainContainer>
      <TotalScoreContainer>
        <TotalScore score={score} />
      </TotalScoreContainer>
      <ContentContainer>
        <NumberSelector selectedNumber={selectedNumber} setSelectedNumber={handleNumberChange} />
        <RollDice currentDice={currentDice} rollDice={rollDice} />
      </ContentContainer>
      {showAlert && <AlertPopup>Please select a number before rolling the dice.</AlertPopup>}
    </MainContainer>
  );
};

const MainContainer = styled.main`
  padding-top: 20px; /* Adjust top padding for spacing */
`;

const TotalScoreContainer = styled.div`
  position: absolute;
  top: 20px; /* Adjust top position */
  left: 20px; /* Adjust left position */
`;

const ContentContainer = styled.div`
  margin-top: 20px; /* Adjust top margin for spacing */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AlertPopup = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff6b6b;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export default GamePlay;
