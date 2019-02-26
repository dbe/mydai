import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';

import SignInWithBurner from './SignInWithBurner';
import Wallet from './Wallet';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: undefined
    }
  }

  renderSignIn() {
    return (
      <SignInWithBurner updateAddress={address => this.setState({address}) }/>
    );
  }

  renderWallet() {
    return (
      <Wallet address={this.state.address} />
    );
  }

  render() {
    let content = this.state.address === undefined ? this.renderSignIn() : this.renderWallet();
    return (
      <BrowserRouter>
        <Route path="/" render={() => content} />
      </BrowserRouter>
    );
  }
}

export default App;
