/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles/custom.css';
import CompleteTimerModal from './CompleteTimerModal';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.countUp = this.countUp.bind(this);
    this.changeRunState = this.changeRunState.bind(this);
    this.stop = this.stop.bind(this);
    this.start = this.start.bind(this);
    this.delete = this.delete.bind(this);
    this.complete = this.complete.bind(this);

    this.state = {
      id: props.id,
      tick: 0,
      running: true,
    };
  }

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  changeRunState() {
    if (this.state.running) {
      this.stop();
    } else {
      this.start();
    }
  }

  start() {
    this.setState({
      running: true,
    });
    this.btn_text = 'Stop';
    this.interval = setInterval(this.countUp, this.props.delay);
  }

  stop() {
    this.setState({
      running: false,
    });
    this.btn_text = 'Start';
    clearInterval(this.interval);
  }

  delete() {
    this.props.delete(this.state.id);
  }

  complete() {
    this.stop();
  }

  countUp() {
    this.setState({
      tick: this.state.tick + 1,
    });
  }

  render() {
    return (
      <div className={styles.timerComponent}>
        <div className={styles.title}>{this.props.title}</div>
        <div className={styles.desc}>{this.props.desc}</div>
        <div className={styles.timer}>{this.state.tick}</div>
        <button onClick={this.changeRunState}>{this.btn_text}</button>
        <button onClick={this.delete}>Remove</button>
        <CompleteTimerModal complete={this.complete} />
      </div>
    );
  }
}

Timer.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
  delete: PropTypes.func.isRequired,
};

export default Timer;
