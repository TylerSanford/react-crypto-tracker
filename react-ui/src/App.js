import React, { Component } from 'react';
import logo from './assets/images/logo/lemonade.png';
import bitcoinLogo from './assets/images/bitcoin-logo.png';
import './App.css';
import axios from 'axios';

import BtcRate from './components/BtcRate';
import AddAddress from './components/AddAddress';
import BtcDetails from './components/BtcDetails';
import AddressHistoryList from './components/AddressHistoryList';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class App extends Component {
  constructor(props) {
    super(props);
    // Global State
    this.state = {
      btcRate: 'Loading...',
      addressesArr: [],
      addressObj: {
        address: '1NArHAFLdfQmq17P6Usyr2myD6eYoX4Rw',
        total_received: 300591167555,
        total_sent: 50000000,
        balance: 300541167555,
        unconfirmed_balance: 0,
        final_balance: 300541167555,
        n_tx: 3,
        unconfirmed_n_tx: 0,
        final_n_tx: 3,
        txrefs: [
          {
            tx_hash:
              '6b6015a413f43b41cd3de3b2b81e92613134e735826ef45c638a4be882e572b2',
            block_height: 511403,
            tx_input_n: -1,
            tx_output_n: 0,
            value: 300541167555,
            ref_balance: 300541167555,
            spent: false,
            confirmations: 16384,
            confirmed: '2018-03-01T02:23:10Z',
            double_spend: false
          },
          {
            tx_hash:
              'eb97c8854d1ea7102948312514054e03b2f824e2bbcf39cb135b49efa1ea2b68',
            block_height: 511402,
            tx_input_n: 0,
            tx_output_n: -1,
            value: 50000000,
            ref_balance: 0,
            confirmations: 16385,
            confirmed: '2018-03-01T02:03:42Z',
            double_spend: false
          },
          {
            tx_hash:
              '6121784a0638c344f0a24c60f7bba743ca573baceb30a4c22eeb5235f9a6f654',
            block_height: 511402,
            tx_input_n: -1,
            tx_output_n: 0,
            value: 50000000,
            ref_balance: 50000000,
            spent: true,
            spent_by:
              'eb97c8854d1ea7102948312514054e03b2f824e2bbcf39cb135b49efa1ea2b68',
            confirmations: 16385,
            confirmed: '2018-03-01T02:03:42Z',
            double_spend: false
          }
        ],
        tx_url: 'https://api.blockcypher.com/v1/btc/main/txs/'
      }
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

    axios
      .get(`https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`)
      .then(res => {
        this.setState({ btcRate: res.data.USD });
      })
      .catch(err => {
        console.log(err);
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
        </header>
        <AppBar
          style={{ backgroundColor: 'rgb(245,205,79)' }}
          position="static"
        >
          <Toolbar>
            <AddAddress
              updateAddressObj={this.updateAddressObj}
              addBtcAddress={this.addBtcAddress}
            />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <img src={bitcoinLogo} height="24" width="24" />
              {' ' + this.state.btcRate}
            </div>
          </Toolbar>
        </AppBar>

        <div className="body-container">
          <BtcRate updateBtcRate={this.updateBtcRate} />

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
