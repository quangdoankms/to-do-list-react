import React, { Component } from 'react'

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }
  
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  // componentWillUnmount() {
  //   clearInterval(this.intervalID);
  // }

  tick() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }

  render() {
    return (
      <p>
        The time is {this.state.time}.
      </p>
    );
  }
}

export default Clock
