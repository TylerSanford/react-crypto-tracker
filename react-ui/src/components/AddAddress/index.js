import React, { Component } from 'react';
import axios from 'axios';

import List from './List';

import './style.css';

class AddAddress extends Component {
  constructor() {
    super();
    this.state = {
      addresses: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // socket.on('FromAPI', data => this.setState({ response: data }));
    
    const btcAddress = '1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD';

    axios.get(`https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}`)
      .then(res => {
        this.setState({addresses: res.data});
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })

      
  }

  handleClick() {
    console.log("clicked");
  }

  render() {
    const response = this.state.addresses;
  return (
    <div className='add-address'>
    <h1>Bitcoin Address Info</h1>
    
    {console.log([this.state.addresses.txrefs])}
      {this.state.data}
      <List
      address={this.state.addresses.address}
      balance={this.state.addresses.balance}
      final_n_tx={this.state.addresses.final_n_tx}
      txrefs={this.state.addresses.txrefs}
      />
        
       <button onClick={this.handleClick}>Click Me</button>

    
    </div>
  )};
};


export default AddAddress;
