import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import data from './assets/mock-data/contracts.json'; // Fake data to test the app

for (var i in data.contracts) {
  data.contracts[i].id = i;
}

ReactDOM.render(
  <App contracts={data.contracts} />,
  document.getElementById('root')
);
