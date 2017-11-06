import { Component } from 'react';

export default class Ticker extends Component {
  timer = 0;

  tick = () => {
    this.timer++;
    if (this.props.onTick) {
      this.props.onTick(this.timer);
    }
  };

  componentDidMount() {
    this.interval = window.setInterval(this.tick, 500);
  }

  componentWillUnmount() {
    if (this.interval !== undefined) {
      window.clearInterval(this.interval);
    }
  }

  render() {
    if (this.props.children && typeof this.props.children === 'function') {
      return this.props.children(this.timer);
    } else {
      return null;
    }
  }
}
