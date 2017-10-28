/* eslint max-len: ["error", 140] */
/* eslint-disable arrow-parens */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import request from 'superagent';

import styles from './styles/AddTimerModal.css';

class CompleteTimerModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      completed: false,
    };

    this.postToSlack = this.postToSlack.bind(this);
    this.complete = this.complete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    const link = e.target.link.value;
    const memo = e.target.memo.value;
    this.complete(link, memo);
    this.setState({ showModal: false });
  }

  complete(link, memo) {
    this.setState({ completed: true });
    const tick = this.props.complete();
    this.postToSlack(tick, link, memo);
  }

  postToSlack(tick, link, memo) {
    const { title, desc } = this.props;
    const ret = {};
    window.location.search.slice(1).split('&').forEach(query => {
      const r = query.split('=');
      if (r.length === 2) {
        ret[r[0].trim()] = r[1].trim();
      }
    });
    const payload = {
      username: 'ReactTimer',
      text: ret.username,
      icon_emoji: ':alarm_clock:',
      attachments: [{
        title: `${title} is completed!!`,
        text: `Description: ${desc}\nElapsed time: ${tick}\nProduct: ${link}\nMemo: ${memo}`,
        color: '#59ff00',
      }],
    };
    if (ret.url) {
      request
        .post(ret.url)
        // .set('Content-Type', 'application/x-www-form-urlencoded')
        // .set('Content-Type', 'application/json')
        .send(JSON.stringify(payload))
        .end((err, res) => {
          console.log(res.text);
        });
    }
  }

  renderState() {
    let ret = '';
    if (this.state.completed) {
      ret = <h2>Completed</h2>;
    } else {
      ret = <button onClick={this.handleOpenModal} className={styles.newButton}>Complete</button>;
    }
    return ret;
  }

  render() {
    return (
      <div>
        {this.renderState()}
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className={styles.modal}
        >
          <div className={styles.modalWrapper}>
            <h2>Complete Timer</h2>
            <form onSubmit={this.handleSubmit} className={styles.modalForm}>
              <input className={styles.formInput} name="link" type="text" placeholder="成果物のリンク" defaultValue={this.state.link} />
              <textarea className={styles.formTextArea} name="memo" placeholder="メモ" cols="30" rows="5" defaultValue={this.state.memo} />
              <button className={styles.formButton} type="submit">Complete!</button>
            </form>
            <div className={styles.cancelArea}>
              <button onClick={this.handleCloseModal} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

CompleteTimerModal.propTypes = {
  complete: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default CompleteTimerModal;
