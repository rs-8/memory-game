import React, { Component } from 'react';
import StartPage from './StartPage';
import GamePage from './GamePage';
import EndPage from './EndPage';
import '../styles/MemoryGame.css';

class MemoryGame extends Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.setScore = this.setScore.bind(this);

    this.state = {
      gameDontStarted: true,
      gameStarted: false,
      gameEnded: false,
      score: 0
    }
  }

  startGame() {
    this.setState({
      gameStarted: true,
      gameDontStarted: false,
      gameEnded: false
    });
  }

  endGame() {
    this.setState({
      gameEnded: true,
      gameDontStarted: false,
      gameStarted: false
    });
  }

  setScore(score) {
    this.setState({
      score: score
    });
  }

  render() {
    return (
      <div className="memory-game">
      {this.state.gameDontStarted && !this.state.gameStarted && !this.state.gameEnded &&
        <StartPage startGame={this.startGame} />}
      {this.state.gameStarted && !this.state.gameDontStarted && !this.state.gameEnded &&
        <GamePage startGame={this.startGame} endGame={this.endGame} setScore={this.setScore} />}  
      {this.state.gameEnded && !this.state.gameDontStarted && !this.state.gameStarted &&
        <EndPage startGame={this.startGame} score={this.state.score}/>}        
      </div>
    );
  }
}

export default MemoryGame;
