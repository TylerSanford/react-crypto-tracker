import React, { Component } from 'react';
import logo from './assets/images/logo/lemonade.png';
import './App.css';

import BtcRate from './components/BtcRate';
import AddAddress from './components/AddAddress';
import AddressList from './components/AddressList';

class App extends Component {
  constructor(props) {
    super(props);
    // Global State
    this.state = {
      btcRate: 'Loading...',
      addresses: []
    };

  this.updateBtcRate = this.updateBtcRate.bind(this);
  this.addBtcAddress = this.addBtcAddress.bind(this);
  }

  // Callback function socket.oi update "global" state
  updateBtcRate(rate) {
    this.setState({btcRate: rate});
  }

  // Callback function push added addresses to "global" state
  addBtcAddress(addressObj) {
    this.state.addresses.push(addressObj);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sam's Lemonade: Bitcoin Validator</h1>
        </header>
        <div className="body-container">
        <BtcRate updateBtcRate={this.updateBtcRate} />
        <AddressList addresses={this.state.addresses} btcRate={this.state.btcRate} />
        <AddAddress addBtcAddress={this.addBtcAddress} />
        <p>Global BTC Rate - {this.state.btcRate}</p>
        
        <h2>Global Btc Addresses</h2>
        <ul>
        {this.state.addresses.map((item) => <li key={item.address}>{item.address}</li>)}
        </ul>
        </div>
        <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
          
      </div>
    );
  }
}

export default App;
