import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Count from './Count';
import Message from './Message';

const App = () => (
  <div>
    <Message />
    <Count />
  </div>
);

ReactDOM.render(<App />, document.querySelector('.app'));
