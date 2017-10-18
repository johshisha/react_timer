/* eslint max-len: ["error", 140] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import styles from './styles/AddTimerModal.css';

class CompleteTimerModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      completed: false,
      link: '',
      memo: '',
    };

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
    this.setState({
      showModal: false,
      link,
      memo,
    });
  }

  complete(link, memo) {
    console.log(link, memo);
    this.setState({ completed: true });
    this.props.complete();
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
};

export default CompleteTimerModal;
