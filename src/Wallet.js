import React, { Component } from 'react';

import Web3 from 'web3';

class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: new Web3(new Web3.providers.HttpProvider("https://dai.poa.network")),
      balance: '0.00'
    };
  }

  fetchBalance() {
    this.state.web3.eth.getBalance(this.props.address).then(weiBalance => {
      console.log('weiBalance: ', weiBalance);

      let balance = this.state.web3.utils.fromWei(weiBalance);

      console.log('balance: ', balance);

      this.setState({balance})
    }).catch(e => {
      console.log('e: ', e);
    })
  }

  render() {
    console.log('this.state.web3: ', this.state.web3);

    this.fetchBalance();

    return (
      <div>
        <h2 id="balance">{parseFloat(this.state.balance).toFixed(2)} DAI</h2>
      </div>
    );
  }
}

export default Wallet;
