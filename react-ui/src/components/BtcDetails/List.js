import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import './style.css';

function toFixed(num) {
  return num.toLocaleString(
    'en-US',
    { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 }
  );
  // return Number(outNumber.substring(0,(outNumber.indexOf('.') + 3)));
}

const cardStyle = {
  marginBottom: 10,
  paddingBottom: 10
};

const List = props => {
  const balSatoshi = props.balance;
  const balBtc = balSatoshi / 100000000;
  const balUSD = balBtc * props.btcRate;
  const balUSDFixed = toFixed(balUSD);

  return (
    <div>
      <Card style={cardStyle}>
        <div className="close-box-container">
          <div
            className="close-box"
            onClick={() => props.updateAddressObj({})}
          />
        </div>
        <CardHeader
          className="card-header"
          title="Bitcoin Address Information"
        />

        <div className="address-information-address">{props.address}</div>
        <br />
        <div>
          Balance <br />
          <div className="address-information-address">₿ {balBtc} </div>
          <br />
          <div className="address-information-address">$ {balUSDFixed} </div>
          <br />
        </div>
      </Card>

      <Card style={cardStyle}>
        <CardHeader
          title={props.unconfirmed_n_tx + ' Unconfirmed Transactions'}
        />
        {props.unconfirmed_n_tx > 0 && (
          <table className="transaction-table">
            <tbody>
              <tr className="transaction-table-row-header">
                <th>#</th>
                <th>Bitcoin</th>
                <th>USD</th>
              </tr>
              {props.unconfirmedTransactions.map((item, i) => {
                return (
                  <tr key={i + 1} className="transaction-table-row">
                    <th>{i + 1}</th>
                    <th>{item.value / 100000000}</th>
                    <th>
                      {'$' + toFixed((item.value / 100000000) * props.btcRate)}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>

      <Card style={cardStyle}>
        <CardHeader title={props.n_tx + ' Confirmed Transactions'} />
        {props.n_tx > 0 && (
          <table className="transaction-table">
            <tbody>
              <tr className="transaction-table-row-header">
                <th>#</th>
                <th>Bitcoin</th>
                <th>USD</th>
                <th>Confirmations</th>
              </tr>
              {props.transactions.map((item, i) => {
                return (
                  <tr key={i + 1} className="transaction-table-row">
                    <th>{i + 1}</th>
                    <th>{item.value / 100000000}</th>
                    <th>
                      {'$' + toFixed((item.value / 100000000) * props.btcRate)}
                    </th>
                    <th>{item.confirmations}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default List;
