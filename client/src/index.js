import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.css';
import './styles/new.css';

import { Provider } from './Context';
import App from './components/App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
