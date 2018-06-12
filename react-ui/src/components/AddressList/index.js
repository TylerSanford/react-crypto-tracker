import React, { Component } from 'react';
import './style.css';

// import { Route } from 'react-router-dom';  -  **   IDK IF NEEDED

// import MoviesDetails from './MoviesDetails';

// import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
import { getAddresses } from '../actions';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: []
    };
  }

  componentDidMount() {
    const addresses = this.props.getAddresses();
  }

  render() {
    return (
      <div className="Addresses">
        <h1>Bitcoin Addresses</h1>
        <ul>
          {this.props.addresses.map((address, i) => {
            return (
                  {address}
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addresses: state.addresses
  };
};

export default connect(mapStateToProps, { getAddresses })(Addresses);