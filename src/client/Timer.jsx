/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles/custom.css';

class Timer extends Component {
  render() {
    return (
      <div className={styles.timerComponent}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.timer}>00:00:00</div>
        <button>Stop</button>
      </div>
    );
  }
}

Timer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Timer;
