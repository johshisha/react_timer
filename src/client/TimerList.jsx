/* eslint-disable react/prefer-stateless-function */
/* eslint-disable arrow-body-style */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './styles/custom.css';
import Timer from './Timer';
import AddTimerModal from './AddTimerModal';

class TimerList extends Component {
  constructor(props) {
    super(props);
    this.addTimer = this.addTimer.bind(this);
    this.removeTimer = this.removeTimer.bind(this);
    this.state = {
      timerComponents: [],
      nextId: 1,
    };
  }

  addTimer(title, desc) {
    const { nextId } = this.state;
    this.setState({
      timerComponents: this.state.timerComponents.concat([{
        id: nextId,
        title: `#${nextId}: ${title}`,
        desc,
        delay: 1000,
      }]),
      nextId: nextId + 1,
    });
  }

  removeTimer(id) {
    const removedComponents = this.state.timerComponents.filter(timer => timer.id !== id);
    this.setState({
      timerComponents: removedComponents,
    });
  }

  renderList() {
    return this.state.timerComponents.map((info) => {
      return <Timer key={info.id} delete={this.removeTimer} {...info} />;
    });
  }

  render() {
    return (
      <div id="timer_wrapper">
        <AddTimerModal msg={this.props.msg} add={this.addTimer} />
        <div className={styles.timerComponentsList}>
          {this.renderList()}
        </div>
      </div>
    );
  }
}

TimerList.defaultProps = {
  msg: 'Add New Timer',
};

TimerList.propTypes = {
  msg: PropTypes.string,
};

export default TimerList;
