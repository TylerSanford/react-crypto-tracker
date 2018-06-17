import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

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

const transactionsStyle = {
  fontSize: 10
};

const List = props => {
  const balSatoshi = props.balance;
  const balBtc = balSatoshi / 100000000;
  const balUSD = balBtc * props.btcRate;
  const balUSDFixed = toFixed(balUSD);

  return (
    <div>
      <Card style={cardStyle}>
        <CardHeader className="card-header" title="Bitcoin Address Information" />

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
                    <TableCell
                      component="th"
                      scope="row"
                      style={transactionsStyle}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell style={transactionsStyle}>
                      {item.value / 100000000}
                    </TableCell>
                    <TableCell style={transactionsStyle}>
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
                <TableCell>Confirmations</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.transactions.map((item, i) => {
                return (
                  <TableRow key={i + 1}>
                    <TableCell
                      component="th"
                      scope="row"
                      style={transactionsStyle}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell style={transactionsStyle}>
                      {item.value / 100000000}
                    </TableCell>
                    <TableCell style={transactionsStyle}>
                      {'$' + toFixed((item.value / 100000000) * props.btcRate)}
                    </TableCell>
                    <TableCell style={transactionsStyle}>
                      {moment(item.confirmed).format('lll')}
                    </TableCell>
                    <TableCell style={transactionsStyle}>
                      {item.confirmations}
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
