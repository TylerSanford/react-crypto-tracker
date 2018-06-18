import { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './style.css';

class BtcRate extends Component {
  constructor(props) {
    super(props);
    
    this.updateBtcRate = this.props.updateBtcRate.bind(this);
  }

  bitcoinRate() {
    const socket = socketIOClient();

    // Send BTC Rate to parent state
    socket.on('FromAPI2', data => this.updateBtcRate(data));
  }

  componentDidMount() {
    this.bitcoinRate();
  }

  render() {
    return false;
  }
}

export default BtcRate;
