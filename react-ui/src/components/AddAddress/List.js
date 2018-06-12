import React from 'react';

const List = props => {
  return (
    <div>
      Address = {props.address}
      <br />
      Balance = {props.balance}
      <br />
      Final Number Transactions = {props.final_n_tx}
      <br />
      
      
    
    
    </div>
  )
};

export default List;