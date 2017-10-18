/* eslint max-len: ["error", 120] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import styles from './styles/AddTimerModal.css';

class AddTimerModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.add = this.add.bind(this);
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
    const title = e.target.title.value;
    const desc = e.target.desc.value;
    this.add(title, desc);
    this.setState({ showModal: false });
  }

  add(title, desc) {
    this.props.add(title, desc);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOpenModal} className={styles.newButton}>{this.props.msg}</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          className={styles.modal}
        >
          <div className={styles.modalWrapper}>
            <h2>Add New Timer</h2>
            <form onSubmit={this.handleSubmit} className={styles.modalForm}>
              <input className={styles.formInput} name="title" type="text" placeholder="タイトル" />
              <textarea className={styles.formTextArea} name="desc" placeholder="説明を入力" cols="30" rows="5" />
              <button className={styles.formButton} type="submit">Add Timer</button>
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

AddTimerModal.propTypes = {
  msg: PropTypes.string.isRequired,
  add: PropTypes.func.isRequired,
};

export default AddTimerModal;
