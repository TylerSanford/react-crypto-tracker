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
  // let re = new RegExp('^-?\\d+(?:.\\d{0,' + (2 || -1) + '})?');
  // return num.toString().match(re);
  return num.toLocaleString(
    'en-US',
    { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 }
  );
  // return Number(outNumber.substring(0,(outNumber.indexOf('.') + 3)));
}

const style = {
  marginBottom: 10
};

const List = props => {
  const balSatoshi = props.balance;
  const balBtc = balSatoshi / 100000000;
  const balUSD = balBtc * props.btcRate;
  const balUSDFixed = toFixed(balUSD);

  return (
    <div>
      <Card style={style}>
        <CardHeader title="Bitcoin Address Information" />
        
        {props.address}
        <br />
        <div style={{ borderWidth: 1 }}>
          Balance: ₿ {balBtc}
          <br />
          Balance: $ {balUSDFixed}
          <br />
        </div>
      </Card>
      <Card style={style}>
        <CardHeader
          title={props.unconfirmed_n_tx + ' Unconfirmed Transactions'}
        />
        {props.unconfirmed_n_tx > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Bitcoin</TableCell>
                <TableCell>USD</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.unconfirmedTransactions.map((item, i) => {
                return (
                  <TableRow style={{ textAlign: 'left' }} key={i + 1}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell>{item.value / 100000000}</TableCell>
                    <TableCell>
                      {'$' + toFixed((item.value / 100000000) * props.btcRate)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>

      <Card>
        <CardHeader title={props.n_tx + ' Confirmed Transactions'} />
        {props.n_tx > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Bitcoin</TableCell>
                <TableCell>USD</TableCell>
                <TableCell>Confirmed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.transactions.map((item, i) => {
                return (
                  <TableRow style={{ textAlign: 'left' }} key={i + 1}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell>{item.value / 100000000}</TableCell>
                    <TableCell>
                      {'$' + toFixed((item.value / 100000000) * props.btcRate)}
                    </TableCell>
                    <TableCell>
                      {moment(item.confirmed).format('lll')}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default List;
