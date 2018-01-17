import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import MemoryGame from './components/MemoryGame';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MemoryGame />, document.getElementById('root'));
registerServiceWorker();
