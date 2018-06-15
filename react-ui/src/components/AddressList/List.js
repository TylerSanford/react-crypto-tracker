import React from 'react';

const List = props => {
  const balSatoshi = props.balance;
  const balBtc = balSatoshi / 100000000;
  const balUSD = balBtc * props.btcRate;

  return (
    <div className="add-address">
      <h1>Bitcoin Address Info</h1>
      Address = {props.address}
      <br />
      Balance Btc = {balBtc}
      <br />
      <h1>Unconfirmed Info</h1>
      Unconfirmed Balance: {props.unconfirmed_balance}
      <br />
      Unconfirmed Transactions Count: {props.unconfirmed_n_tx}
      <br />
      <h3>Unconfirmed Transactions</h3>
      <ol>
      {props.unconfirmedTransactions.map((item, i) => (
        <li key={i}>
          {item.value}
        </li>
      ))}
      </ol>

      <h1>Confirmed Info</h1>
      Confirmed Balance USD - {balUSD}
      <br />
      Confirmed Transaction Count: {props.final_n_tx}
      <br />
      <h3>Confirmed Transactions</h3>
      <ol>
        Satoshi / Btc / USD
        {props.transactions.map((item, i) => (
          <li key={i}>
            {item.value} / {item.value / 100000000} /{' '}
            {'$' + (item.value / 100000000) * props.btcRate}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default List;
