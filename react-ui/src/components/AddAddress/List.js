import React from 'react';
import transactionList from './transactionList.js';

const List = props => {
  const { txrefs } = props;

  return (
    <div>
      Address = {props.address}
      <br />
      Balance = {props.balance}
      <br />
      Final Number Transactions = {props.final_n_tx}
      <br />
      {txrefs}
      
      
    
    
    </div>
  )
};

export default List;