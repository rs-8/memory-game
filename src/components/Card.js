import React from 'react';
import '../styles/Card.css';

const Card = (props) => {
  const cardClick = () => {
    if(props.status === 'unselected') {
      props.onCardClick(props.cardIndex);
    }
  };
  return (
    <div className={`card card-${props.cardName} card-${props.status}`} onClick={cardClick}>
      <div className="card-inner">
        <div className="card-face card-front"></div> 
        <div className="card-face card-back"></div>
      </div>
    </div>
  );
}

export default Card;