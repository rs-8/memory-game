import React from 'react';
import '../styles/EndPage.css';
import EndGame from '../images/EndGame.png';

const EndPage = (props) => {
  return (
    <div className="end-page">
      <div className="end-page-box">
        <img src={EndGame} alt="EndGame"/>
        <h1>Поздравляем!</h1>
        <h1>Ваш итоговый счет: {props.score}</h1>
        <button className="button" onClick={() => props.startGame()}>Еще раз</button>
      </div>
    </div>
  );
};

export default EndPage;