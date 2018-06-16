import React, { Component } from 'react';
import axios from 'axios';

import './style.css';

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    };

    this.addBtcAddress = this.props.addBtcAddress.bind(this);
    this.updateAddressObj = this.props.updateAddressObj.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.btcValidator = this.btcValidator.bind(this);
    this.fetchBtcData = this.fetchBtcData.bind(this);
    this.addAddressToDb = this.addAddressToDb.bind(this);
  }

  btcValidator(address) {
    if (/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/.test(address)) {
      return true;
    } else {
      return false;
    }
  }

  handleChange(event) {
    this.setState({ address: event.target.value });
  }

  handleSubmit(event) {
    // If address is valid bitcoin address
    if (this.btcValidator(this.state.address)) {
      // Alert Added
      alert('Bitcoin Address Added: ' + this.state.address);
      // Fetch Btc Data
      this.fetchBtcData(this.state.address);
      // Add Btc address to db history
      this.addAddressToDb(this.state.address);
      // Reset the address state
      this.setState({ address: '' });
      event.preventDefault();
    } else {
      alert('Invalid Bitcoin Address!');
      this.setState({ address: '' });
      event.preventDefault();
    }
  }

  fetchBtcData(btcAddress) {
    axios
      .get(`https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}`)
      .then(res => {
        this.updateAddressObj(res.data);
      })
      .catch(err => {
        console.log('FETCH ERROR!!! ', err);
      });
  }

  addAddressToDb(btcAddress) {
    axios
      .post(`http://localhost:5000/api/btcAddress/${btcAddress}`)
      .then(res => {
        console.log('addAddressToDB Address = ' + btcAddress);
        this.addBtcAddress(btcAddress);
      });
  }

  render() {
    return (
      <div className="add-address">
        Monitor a Bitcoin address!
        <form onSubmit={this.handleSubmit}>
          <input
            className="add-address-textbox"
            type="text"
            value={this.state.address}
            onChange={this.handleChange}
          /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddAddress;
