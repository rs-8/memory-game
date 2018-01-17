import React from 'react';
import '../styles/StartPage.css';
import StartGame from '../images/StartGame.png';

const StartPage = (props) => {
  return (
    <div className="start-page">
      <div className="start-page-box">
        <img src={StartGame} alt="StartGame"/>
        <h1>Memory Game</h1>
        <button onClick={() => props.startGame()} className="button">Начать игру</button>
      </div>
    </div>
  );
};

export default StartPage;