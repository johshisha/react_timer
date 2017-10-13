import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import Timer from './Timer';

const App = () => (
  <div>
    <Timer title="Test Timer" />
  </div>
);

ReactDOM.render(<App />, document.querySelector('.app'));
