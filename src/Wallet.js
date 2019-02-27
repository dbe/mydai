import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';

import Web3 from 'web3';
import Friend from './Friend';
import Send from './Send';
import SendTo from './SendTo';

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

  render() {
    return (
      <div>
        <Route path="/" render={() => <Balance balance={this.state.balance}/>} />

        <Route exact path="/" render={() => <FriendList friends={this.state.friends}/>} />
        <Route exact path="/" component={Buttons} />

        <Route exact path="/send" component={Send} />
        <Route exact path="/send/:address" component={SendTo} />
      </div>
    );
  }
}

const Balance = ({balance}) => <h2 id="balance">{parseFloat(balance).toFixed(2)} xDAI</h2>;
const Buttons = () => (
  <div>
    <button id='send'><Link to="/send">Send</Link></button>
    <button id='receive'>Receive</button>
  </div>
);
const FriendList = ({friends}) => {
  return (
    <div id="friends">
      {friends.map(friend => <Friend key={friend.address} attr={friend } />)}
    </div>
  )
}

export default Wallet;
