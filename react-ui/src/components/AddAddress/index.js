import React, { Component } from 'react';
import axios from 'axios';

import List from './List';

import './style.css';

class AddAddress extends Component {
  constructor() {
    super();
    this.state = {
      address: '',
      balance: 0,
      transactionCount: 0,
      transactions: []
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
        this.setState({address: res.data.address, balance: res.data.balance, transactionCount: res.data.final_n_tx, transactions: res.data.txrefs});
        // console.log(this.state.transactions);
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })

      
  }

  handleClick() {
    console.log("clicked");
  }

  render() {
  return (
    <div className='add-address'>
    <h1>Bitcoin Address Info</h1>
      <List
      address={this.state.address}
      balance={this.state.balance}
      final_n_tx={this.state.transactionCount}
      />
      <h2>Transactions</h2>
      <ul>
        {this.state.transactions.map((item, key) => <li>{(item.value/100000000)}</li>)}
      </ul>

        
       <button onClick={this.handleClick}>Click Me</button>

    
    </div>
  )};
};


export default AddAddress;
