import React from 'react';

function toFixed(num) {
    let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
    return num.toString().match(re);
    // let parts = match.toString().split(".");
    // return match[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return match.join(".");
}

const List = props => {
  const balSatoshi = props.balance;
  const balBtc = balSatoshi / 100000000;
  const balUSD = balBtc * props.btcRate;
  const balUSDFixed = toFixed(balUSD);

  return (
    <div className="btc-details">
      <h1>Bitcoin Address Info</h1>
      Address = {props.address}
      <br />
      Balance Btc = {balBtc}
      <br />
      Balance USD - {balUSDFixed}
      <br />





      <h1>Unconfirmed Info</h1>
      Unconfirmed Balance: {props.unconfirmed_balance}
      <br />
      Unconfirmed Transactions Count: {props.unconfirmed_n_tx}
      <br />
      {/* <h3>Unconfirmed Transactions</h3>
      <ol>
      {props.unconfirmedTransactions.map((item, i) => (
        <li key={i}>
          {item.value}
        </li>
      ))}
      </ol> */}

      <h1>Confirmed Info</h1>
      <br />
      Confirmed Transaction Count: {props.final_n_tx}
      <br />
      <h3>Confirmed Transactions</h3>
      {/* <ol>
        Satoshi / Btc / USD
        {props.transactions.map((item, i) => (
          <li key={i}>
            {item.value} / {item.value / 100000000} /{' '}
            {'$' + toFixed((item.value / 100000000) * props.btcRate)}
          </li>
        ))}
      </ol> */}
    </div>
  );
};

export default List;
