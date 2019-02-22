import React, { Component } from 'react';
import './App.css';

import SignInWithBurner from './SignInWithBurner';

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

  render() {
    let content = this.state.address === undefined ? this.renderSignIn() : <h1>{this.state.address}</h1>;

    return (
      <div className="content">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 text-center mt-5">
            {content}
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    );
  }
}

export default App;
