import React, { Component } from 'react';

import List from './List';

import './style.css';

class BtcDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressObj: this.props.addressObj
    }
  }

  componentWillReceiveProps(props) {
    this.setState({addressObj: props.addressObj});
  }

  render() {
    return (
      <div className="btc-details">
          <List
            key={this.state.addressObj.address}
            address={this.state.addressObj.address}
            balance={this.state.addressObj.balance}
            transactions={this.state.addressObj.txrefs}
            unconfirmedTransactions={this.state.addressObj.unconfirmed_txrefs}
            unconfirmed_n_tx={this.state.addressObj.unconfirmed_n_tx}
            unconfirmed_balance={this.state.addressObj.unconfirmed_balance}
            n_tx={this.state.addressObj.n_tx}
            btcRate={this.props.btcRate}
          />
        </div>
    )
  }
}

export default BtcDetails;
