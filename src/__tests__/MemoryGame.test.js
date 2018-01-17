import React from 'react';
import ReactDOM from 'react-dom';
import MemoryGame from '../components/MemoryGame';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryGame />, div);
});
