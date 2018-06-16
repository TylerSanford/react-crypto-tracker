import React, { Component } from 'react';
import logo from './assets/images/logo/lemonade.png';
import './App.css';
import axios from 'axios';

import BtcRate from './components/BtcRate';
import AddAddress from './components/AddAddress';
import BtcDetails from './components/BtcDetails';

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
      res.data.map(item => this.state.addressesArr.push(item.address));
    });
  }

  // Callback function socket.oi update "global" state
  updateBtcRate(rate) {
    this.setState({ btcRate: rate });
  }

  updateAddressObj(obj) {
    this.setState({ addressObj: obj });
    console.log(this.state.addressObj);
  }

  // Callback function push added addresses to "global" state
  addBtcAddress(address) {
    this.state.addressesArr.push(address);
  }

  render() {\
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

          {this.state.addressObj ? (
              <BtcDetails
                addressObj={this.state.addressObj}
                btcRate={this.state.btcRate}
              />
          ) : (
            console.log('DONT display details')
          )}

          <div className="btc-search-history">
            <h2>Bitcoin Search History</h2>
            <ul>
              {this.state.addressesArr.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
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
            target="_blank"
          >
            CC 3.0 BY
          </a>
        </div>
      </div>
    );
  }
}

export default App;
