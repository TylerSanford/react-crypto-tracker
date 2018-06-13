// import { subscribeToTimer } from './api';
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import './style.css';

class BtcRate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: false
    };
    this.bitcoinRate = this.bitcoinRate.bind(this);
  }

  bitcoinRate() {
    const socket = socketIOClient();
    
    socket.on('FromAPI', data => {
      this.setState({ response: data })
      return data;
    });
  }

  componentDidMount() {
    this.bitcoinRate();
  }

  render() {
    const { response } = this.state;
    console.log(response);
  return (
    <div className='btc-rate'>
      <h1>Bitcoin Rate</h1>
      {response
      ? <p>
          {response} 
        </p>
        : <p>Loading...</p>}
    </div>
  )};
};


export default BtcRate;
