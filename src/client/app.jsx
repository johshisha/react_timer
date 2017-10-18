import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import TimerList from './TimerList';

const App = () => (
  <div>
    <TimerList />
  </div>
);

ReactDOM.render(<App />, document.querySelector('.app'));
