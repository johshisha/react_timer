import React, { Component } from 'react';

class Count extends Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.handleChange = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <span>{this.state.count}</span>
        <button onClick={this.handleChange}>Count Up!</button>
      </div>
    );
  }
}

export default Count;
