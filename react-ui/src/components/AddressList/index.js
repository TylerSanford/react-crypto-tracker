import React, { Component } from 'react';
import axios from 'axios';

import List from './List';

import './style.css';

// const btcAddress1 = '1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD';
// const btcAddress2 = '163LADv2vimpVVtcqAknm5mSym2YBBCvBM';
      // btcAddress3 = '1LnMVjzXL96FeGYqwNEocYqeQnudst8BAL'

class AddressList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // addresses: [{'address': '1DEP8i3QJCsomS4BSMY2RpU1upv62aGvhD', 'balance': 4449209, 'transactionCount': 9}, {'address': '1LnMVjzXL96FeGYqwNEocYqeQnudst8BAL', 'balance': 4449209, 'transactionCount': 2}],
      addresses: this.props.addresses,
      
    };

    // this.fetchBtcData = this.fetchBtcData.bind(this);
    // console.log("unset state addresses", this.state.addresses);
  }

  componentDidMount() {
    // this.setState({addresses: btcAddress2});

    // this.fetchBtcData(btcAddress2);
    // this.fetchBtcData(btcAddress1);

    
  }

  
  

  render() {
    let addresses = this.state.addresses;

    return (
      <div>
        {addresses.map((item) => 
          <List
            key={item.address}
            address={item.address}
            balance={item.balance}
            transactions={item.txrefs}
            unconfirmedTransactions={item.unconfirmed_txrefs}
            unconfirmed_n_tx={item.unconfirmed_n_tx}
            unconfirmed_balance={item.unconfirmed_balance}
            final_n_tx={item.final_n_tx}
            btcRate={this.props.btcRate}
          />
        )}
        </div>
    )
  }
}

export default AddressList;
