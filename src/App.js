import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import './App.css';

import SignInWithBurner from './SignInWithBurner';
import Wallet from './Wallet';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: window.localStorage.getItem('address') || undefined
    }

    // this.state = {
    //   address: '0xf48eb3e24bbc12c941eabbca303798bbd8c17bc0'
    // }

    this.updateAddress = this.updateAddress.bind(this)
  }

  updateAddress(address) {
    window.localStorage.setItem('address', address)
    this.setState({address})
  }

  renderSignIn() {
    return (
      <SignInWithBurner updateAddress={this.updateAddress}/>
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
