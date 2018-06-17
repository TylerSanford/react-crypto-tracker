import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

function toFixed(num) {
  let re = new RegExp('^-?\\d+(?:.\\d{0,' + (2 || -1) + '})?');
  // console.log(num.toString().match(re));
  return num.toString().match(re);
}

const style = {
  // margin: 10
  marginBottom: 10
};

const List = props => {
  const balSatoshi = props.balance;
  const balBtc = balSatoshi / 100000000;
  const balUSD = balBtc * props.btcRate;
  const balUSDFixed = Number(toFixed(balUSD));

  return (
    <div>
      <Card style={style}>
        <CardHeader title="Bitcoin Address Information" />
        <br />
        {props.address}
        <br />
        <div style={{borderWidth: 1}}>
        Balance: ₿ {balBtc}
        <br />
        Balance: $ {balUSDFixed}
        <br />
        </div>
      </Card>
      <Card style={style}>
          <CardHeader title={props.unconfirmed_n_tx + " Unconfirmed Transactions"} />
      {props.unconfirmed_n_tx > 0 && (
        
          <CardContent>
          Unconfirmed Balance: {props.unconfirmed_balance}
          <br />
          Unconfirmed Transactions Count: {props.unconfirmed_n_tx}
          <br />
          <ol>
            {/* <h3>Unconfirmed Transactions</h3> */}
            {props.unconfirmedTransactions.map((item, i) => (
              <li key={i}>
                {item.value} / {item.value / 100000000} /{' '}
                {'$' +
                  Number(
                    toFixed((item.value / 100000000) * props.btcRate)
                  )}
              </li>
            ))}
          </ol>
          </CardContent>
      )}
        </Card>
      {props.final_n_tx > 0 &&
        <Card>
          <CardHeader title={props.final_n_tx + " Confirmed Transactions"} />
          {/* <h1>Confirmed Info</h1> */}
          {/* <br />
          Confirmed Transaction Count: {props.final_n_tx} */}
          {/* <br /> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                {/* <TableCell>Satoshi</TableCell> */}
                <TableCell>Bitcoin</TableCell>
                <TableCell>USD</TableCell>
                <TableCell>Confirmed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {props.transactions.map((item, i) => {
              return (
              <TableRow style={{textAlign: 'left'}} key={i+1}>
                <TableCell component="th" scope="row">{i+1}</TableCell>
                {/* <TableCell>{item.value}</TableCell> */}
                <TableCell>{item.value / 100000000}</TableCell>
                <TableCell>{'$' +
                  Number(
                    toFixed((item.value / 100000000) * props.btcRate)
                  )}</TableCell>
                  <TableCell>{moment(item.confirmed).format('lll')}</TableCell>
              </TableRow>
              );
            })}
            </TableBody>
          </Table>


          {/* <ol>
            Satoshi / Btc / USD
            
              <li key={i}>
                {item.value} / {item.value / 100000000} /{' '}
                {'$' +
                  Number(
                    toFixed((item.value / 100000000) * props.btcRate)
                  ).toLocaleString('en')}
              </li>
            ))}
          </ol> */}
        </Card>
      }
    </div>
  );
};

export default List;
