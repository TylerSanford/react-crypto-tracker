import React, { Component } from 'react';
import logo from './assets/images/logo/lemonade.png';
import './App.css';
import axios from 'axios';

import BtcRate from './components/BtcRate';
import AddAddress from './components/AddAddress';
import BtcDetails from './components/BtcDetails';
import AddressHistoryList from './components/AddressHistoryList';

class App extends Component {
  constructor(props) {
    super(props);
    // Global State
    this.state = {
      btcRate: 'Loading...',
      addressesArr: [],
      addressObj: {}
    };

    this.updateBtcRate = this.updateBtcRate.bind(this);
    this.addBtcAddress = this.addBtcAddress.bind(this);
    this.updateAddressObj = this.updateAddressObj.bind(this);
  }

  componentDidMount() {
    // Fill Bitcoin Search History
    axios.get(`/api/btcAddress`).then(res => {
    // axios.get(`http://localhost:5000/api/btcAddress`).then(res => {
      const addressesArr = [];
      res.data.map(item => addressesArr.push(item.address));

      // Callback update global state
      this.setState({ addressesArr: addressesArr.reverse() });
    });
  }

  // Callback function to update "global" state of Address Search History
  updateAddressArr(array) {
    this.setState({ addressesArr: array });
  }

  // Callback function socket.oi update "global" state
  updateBtcRate(rate) {
    this.setState({ btcRate: rate });
  }

  // Callback function update "global" state of address details object.
  updateAddressObj(obj) {
    this.setState({ addressObj: obj });
    console.log(this.state.addressObj);
  }

  // Callback function push added addresses to "global" state
  addBtcAddress(address) {
    this.state.addressesArr.unshift(address);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sam's Lemonade: Bitcoin Validator</h1>
          <p>Global BTC Rate - {this.state.btcRate}</p>
        </header>
        <div className="body-container">
          <BtcRate updateBtcRate={this.updateBtcRate} />
          <AddAddress
            updateAddressObj={this.updateAddressObj}
            addBtcAddress={this.addBtcAddress}
          />
          {/* If Object is not empty show details */}
          {Object.keys(this.state.addressObj).length > 0 && (
            <BtcDetails
              addressObj={this.state.addressObj}
              btcRate={this.state.btcRate}
            />
          )}
          <AddressHistoryList
            updateAddressArr={this.updateAddressArr}
            updateAddressObj={this.updateAddressObj}
            addressesArr={this.state.addressesArr}
          />
        </div>
        <div>
          Icons made by{' '}
          <a href="http://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{' '}
          is licensed by{' '}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
          >
            CC 3.0 BY
          </a>
        </div>
      </div>
    );
  }
}

export default App;
