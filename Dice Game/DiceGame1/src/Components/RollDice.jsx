import React from 'react';
import styled from 'styled-components';

const RollDice = ({ rollDice, currentDice }) => {
  return (
    <DiceContainer>
      <div className='dice' onClick={rollDice}>
        <img src={`/Images/Dices/dice_${currentDice}.png`} alt={`dice${currentDice}`} />
      </div>
      <p>CLICK ON DICE TO ROLL</p>
    </DiceContainer>
  );
};

const DiceContainer = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .dice {
    cursor: pointer;
  }
`;

export default RollDice;
