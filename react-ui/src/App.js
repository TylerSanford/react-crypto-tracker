import React, { Component } from 'react';
import logo from './assets/images/logo/lemonade.png';
import './App.css';

import BtcRate from './components/BtcRate';
import AddAddress from './components/AddAddress';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sam's Lemonade</h1>
        </header>
        <div className="body-container">
        <BtcRate />
        <AddAddress />
        </div>
        <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
          
      </div>
    );
  }
}

export default App;
