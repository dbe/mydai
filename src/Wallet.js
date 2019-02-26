import React, { Component } from 'react';

import Web3 from 'web3';
import Friend from './Friend';

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.web3 = new Web3(new Web3.providers.HttpProvider("https://dai.poa.network"))

    this.state = {
      balance: '0.00',
      friends: [
        {
          name: 'Banana Sam',
          address: '0x1192eb327a459584ed86ed4503948b2996e7f628',
          messages: [
            {fromFriend: true, type: 'request', amount: 10},
            {fromFriend: false, type: 'sent', amount: 10},
            {fromFriend: true, type: 'message', text: "Thanks man! Beers later?"},
            {fromFriend: false, type: 'message', text: "No Prob, lets do it."},
          ]
        },
        {name: 'Bill the banana man', address: '0x70123d7551a036a8ae9c3d370637bd1b161c2800', messages: []},
      ]
    };

    this.fetchBalance();
  }

  fetchBalance() {
    this.web3.eth.getBalance(this.props.address).then(weiBalance => {
      let balance = this.web3.utils.fromWei(weiBalance);

      this.setState({balance})
    }).catch(e => {
      console.log('e: ', e);
    })
  }

  renderFriends() {
    return (
      <div id="friends">
        {this.state.friends.map(friend => <Friend key={friend.address} attr={friend } />)}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2 id="balance">{parseFloat(this.state.balance).toFixed(2)} xDAI</h2>
        {this.renderFriends()}
        <button id='send'>Send</button>
        <button id='receive'>Receive</button>
      </div>
    );
  }
}

export default Wallet;
