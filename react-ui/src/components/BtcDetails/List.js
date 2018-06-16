import React from 'react';

function toFixed(num) {
    let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
    return num.toString().match(re);
}

const List = props => {
  const balSatoshi = props.balance;
  const balBtc = balSatoshi / 100000000;
  const balUSD = balBtc * props.btcRate;
  const balUSDFixed = Number(toFixed(balUSD)).toLocaleString('en');

  return (
    <div className="btc-details">
      <h1>Bitcoin Address Info</h1>
      Address = {props.address}
      <br />
      Balance Btc = {balBtc}
      <br />
      Balance USD - {'$' + balUSDFixed}
      <br />





      <h1>Unconfirmed Info</h1>
      Unconfirmed Balance: {props.unconfirmed_balance}
      <br />
      Unconfirmed Transactions Count: {props.unconfirmed_n_tx}
      <br />
      
      {props.unconfirmed_n_tx > 0 && 
        
        <ol>
        <h3>Unconfirmed Transactions</h3>
      {props.unconfirmedTransactions.map((item, i) => (
        <li key={i}>
        {item.value} / {item.value / 100000000} /{' '}
            {'$' + Number((toFixed((item.value / 100000000) * props.btcRate))).toLocaleString('en')}
        </li>
      ))}
      </ol>
      
      }
      

      <h1>Confirmed Info</h1>
      <br />
      Confirmed Transaction Count: {props.final_n_tx}
      <br />
      {props.final_n_tx > 0 && <ol>
      <h3>Confirmed Transactions</h3>
        Satoshi / Btc / USD
        {props.transactions.map((item, i) => (
          <li key={i}>
            {item.value} / {item.value / 100000000} /{' '}
            {'$' + Number((toFixed((item.value / 100000000) * props.btcRate))).toLocaleString('en')}
          </li>
        ))}
      </ol>}
      
    </div>
  );
};

export default List;
