import React, { Component } from 'react';
import axios from 'axios';

// import List from './List';

import './style.css';

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };

    this.addBtcAddress = this.props.addBtcAddress.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.btcValidator = this.btcValidator.bind(this);
    this.fetchBtcData = this.fetchBtcData.bind(this);
  }

  btcValidator(address) {
    // console.log(address);
    if (/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/.test(address)) {
      return true;
    } else {
      return false;
    }
  }

  handleChange(event) {
    this.setState({address: event.target.value});
  }

  handleSubmit(event) {
    // console.log(JSON.stringify(event.target));
    // console.log(event);
    
    if (this.btcValidator(this.state.address)) {
      alert('Bitcoin Address Added: ' + this.state.address);
      this.fetchBtcData(this.state.address);
      this.setState({address: ''});
      event.preventDefault();
    } else {
      alert("Invalid Bitcoin Address!");
      this.setState({address: ''});
      event.preventDefault();
    }
  }

  fetchBtcData(btcAddress) {
    console.log("fetching btc data...");
    axios
      .get(`https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}`)
      .then(res => {
        // const newObj = {
        //   address: res.data.address,
        //   balance: res.data.balance,
        //   transactionCount: res.data.final_n_tx,
        //   transactions: res.data.txrefs
        // };

        // return JSON.stringify(newObj);
        this.addBtcAddress(res.data);
        console.log(res.data);
        // this.state.addresses.push({addresses: res.data});
        // console.log("set state addresses", this.state.addresses);
        // console.log(this.state.transactions);
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });

      // console.log(this.state.addresses);
  }

  render() {

    return (
      <div className="add-address">
      Address State: {this.state.address}
        <form onSubmit={this.handleSubmit} >
          <input type="text" value={this.state.address} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddAddress;
