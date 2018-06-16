import React, { Component } from 'react';
import axios from 'axios';

import './style.css';

class AddressHistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressesArr: this.props.addressArr
    };

    this.updateAddressArr = this.props.updateAddressArr.bind(this);
    this.updateAddressObj = this.props.updateAddressObj.bind(this);

    this.fetchBtcData = this.fetchBtcData.bind(this);
    // this.getDetailsFromHistory = this.getDetailsFromHistory.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({addressesArr: props.addressesArr})
  }

  fetchBtcData(btcAddress) {
    axios
      .get(`https://api.blockcypher.com/v1/btc/main/addrs/${btcAddress}`)
      .then(res => {
        this.updateAddressObj(res.data);
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.log('FETCH ERROR!!! ', err);
      });
  }

  render() {
    return (
      <div className="search-history-container">
        <h2>Bitcoin Search History</h2>
        <ul>
          {this.state.addressesArr &&
            this.state.addressesArr.map(item => <li key={item}><div className="history-item" onClick={() => this.fetchBtcData(item) }>{item}</div></li>)}
        </ul>
      </div>
    );
  }
}

export default AddressHistoryList;
