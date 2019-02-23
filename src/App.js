import React, { Component } from 'react';
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
      <div className="content">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 text-center m-5 content-card">
            {content}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default App;
