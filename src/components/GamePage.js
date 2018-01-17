import React, {Component} from 'react';
import Card from './Card';
import _ from 'lodash';
import '../styles/GamePage.css';

const uniqueCards = ['0C', '0D', '0H', '0S',
                     '2C', '2D', '2H', '2S',
                     '3C', '3D', '3H', '3S',
                     '4C', '4D', '4H', '4S',
                     '5C', '5D', '5H', '5S',
                     '6C', '6D', '6H', '6S',
                     '7C', '7D', '7H', '7S',
                     '8C', '8D', '8H', '8S',
                     '9C', '9D', '9H', '9S',
                     'AC', 'AD', 'AH', 'AS',
                     'JC', 'JD', 'JH', 'JS',
                     'KC', 'KD', 'KH', 'KS',
                     'QC', 'QD', 'QH', 'QS'
                    ];

const numCardsToMatch = 2;

class GamePage extends Component {
  constructor(props) {
    super(props);   
    this.cardClick = this.cardClick.bind(this);
    this.timerId = 0;

    this.state = {
      cards: [],
      selectedCards : [],
      removedCards : [],
      score : 0 
    }
  }

  componentDidMount() {
    this.startGame();
  }

  getFirstNine(cards) {
    return cards.slice(0, 9);
  }

  multiplyCards(cards, multiplier) {
    let loopTimes = multiplier - 1;
    let multiplied = cards;
    for (var i = 0; i < loopTimes; i++) {
      multiplied = _.concat(multiplied, cards);
    } 
    multiplied = _.shuffle(multiplied);
    return multiplied;
  }

  startGame() {
    let shuffledCards = _.shuffle(uniqueCards);
    let firstNineCards = this.getFirstNine(shuffledCards);
    let multipliedCards = this.multiplyCards(firstNineCards, numCardsToMatch);
    let cardIndex = 0;
    let cards = multipliedCards.map((cardName) => {
      return {
        cardName: cardName,
        cardIndex: cardIndex++,
        status: 'default'
      };
    });

    this.setState({
      cards: cards,
      selectedCards : [],
      removedCards : [],
      score: 0
    }, () => this.turnOverCards());   
  }

  turnOverCards() {
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      let unselectedCards = this.state.cards.map((card) => {
        card.status = 'unselected';
        return card;
      });
      this.setState({
        cards: unselectedCards
      });
    }, 5000);
  }

  recountPointsForPair() {
    this.setState((prevState) => {
      return {score: prevState.score + (9 - this.state.removedCards.length / 2) * 42};
    })
  }

  recountPointsForNotPair() {
    this.setState((prevState) => {
      return {score: prevState.score - (this.state.removedCards.length / 2) * 42};
    })
  }

  checkToWin() {
    if(this.state.removedCards.length === 18) {
      this.props.setScore(this.state.score);
      this.props.endGame();
    }
  }

  changeToUnselected() {
    this.state.selectedCards.map((card) => {
      card.status = 'unselected';
      return card;
    });  
  }
  
  setSelectedCardsToEmpty() {
    this.setState({
      selectedCards : []
    });
  }

  isChosenEqual() {
    let isSameCards = true;
    let firstCard = this.state.selectedCards[0];
    for (const card of this.state.selectedCards) {
      if(card.cardName !== firstCard.cardName) {
        isSameCards = false;
        break;
      }         
    }
    return isSameCards;
  }

  addToRemovedCards() {
    let removedCards = this.state.selectedCards.map((card) => {
      card.status = 'removed';
      return card;
    });
    this.setState((prevState) => {
      let newRemovedCards = _.concat(prevState.removedCards, removedCards);
      return {removedCards: newRemovedCards};
    });
  }

  checkForPair() {
    if(this.state.selectedCards.length === numCardsToMatch) {
      if(this.isChosenEqual()) {
        setTimeout(() => {
          this.addToRemovedCards();
          this.recountPointsForPair();
          this.setSelectedCardsToEmpty();
          setTimeout(() => {
            this.checkToWin();
          }, 200)     
        }, 750);  
      }
      else {
        setTimeout(() => {
          this.changeToUnselected();
          this.recountPointsForNotPair();
          this.setSelectedCardsToEmpty();
        }, 1000)
      } 
    }
  }

  addToSelectedCards(card) {
    if(this.state.selectedCards.length < numCardsToMatch) {
      card.status = 'selected';
      this.setState((prevState) => {
        let nextselectedCards = _.clone(prevState.selectedCards)
        nextselectedCards.push(card);
        return {selectedCards: nextselectedCards};
      }, () => this.checkForPair()); 
    }
  }

  cardClick(cardIndex) {
    let currentCard = _.find(this.state.cards, (card) => { return card.cardIndex === cardIndex; });
    this.addToSelectedCards(currentCard); 
  }

  render() {
    return (
      <div className="game-page">
        <div className="game-page-box">
          <div className="top">
            <div className="restart-button" onClick={() => this.startGame()}>Начать заново</div>
            <div className="score">
              Очки: {this.state.score}
            </div>
          </div>
          <div className="cards">
            {this.state.cards.map((card) => {
              return <Card key={card.cardIndex} cardName={card.cardName} status={card.status} 
                           onCardClick={this.cardClick} cardIndex={card.cardIndex} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default GamePage;