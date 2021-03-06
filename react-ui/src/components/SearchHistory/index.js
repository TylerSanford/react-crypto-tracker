import React, { Component } from 'react';
import axios from 'axios';

import './style.css';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

class SearchHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressesArr: this.props.addressArr
    };

    this.updateAddressArr = this.props.updateAddressArr.bind(this);
    this.updateAddressObj = this.props.updateAddressObj.bind(this);

    this.fetchBtcData = this.fetchBtcData.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({ addressesArr: props.addressesArr });
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
        <Card>
          <CardHeader title="Search History" />
          {this.state.addressesArr &&
            this.state.addressesArr.map((item, i) => {
              return (
                <span key={item}>
                  {i % 2 === 0 ? (
                    <div
                      className="history-item"
                      onClick={() => this.fetchBtcData(item)}
                    >
                      {item}
                    </div>
                  ) : (
                    <div
                      className="history-item-odd"
                      onClick={() => this.fetchBtcData(item)}
                    >
                      {item}
                    </div>
                  )}
                </span>
              );
            })}
        </Card>
      </div>
    );
  }
}

export default SearchHistory;
