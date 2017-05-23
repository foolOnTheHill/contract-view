import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import data from './assets/mock-data/contracts.json'; // Dados de contratos utilizados para testar o app

// Cria um ID para cada contrato para facilitar a persistência dos dados.
for (var i in data.contracts) {
  data.contracts[i].id = i;
}

// Renderiza o App principal
ReactDOM.render(
  <App contracts={data.contracts} />,
  document.getElementById('root')
);
