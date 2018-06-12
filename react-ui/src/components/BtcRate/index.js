import React, { Component } from 'react';

import './style.css';

class BtcRate extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://localhost:5000/api'
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on('FromAPI', data => this.setState({ response: data }));
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