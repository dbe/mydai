import React, { Component } from 'react';
import {Link, Route} from 'react-router-dom';
import { sign } from 'sign-in-with-burner';

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

    this.sendMoney = this.sendMoney.bind(this);

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

  sendMoney(to, amount) {
    this.web3.eth.getTransactionCount(this.props.address).then(nonce => {
      let tx = {
        to,
        nonce,
        gasPrice: this.web3.utils.toWei('1', 'gwei'),
        gasLimit: 21000,
        value: amount,
        chainId: 100
      }

      sign(tx, {
        burnerUrl: 'http://localhost:3001',
        siteName: 'MyDai'
      }).then(signed => {
        console.log('signed: ', signed);
        
        this.web3.eth.sendSignedTransaction(signed).then(result => {
          console.log('result: ', result);
        }).catch(e => {
          console.log('e: ', e);
        })

      }).catch(e => {
        console.log('e: ', e);
      })
    })
  }

  render() {
    return (
      <div>
        <Route path="/" render={() => <Balance balance={this.state.balance}/>} />

        <Route exact path="/" render={() => <FriendList friends={this.state.friends}/>} />
        <Route exact path="/" component={Buttons} />

        <Route exact path="/send" component={Send} />
        <Route exact
          path="/send/:address"
          render={({match, history}) => (
            <SendTo
              sendMoney={this.sendMoney}
              address={match.params.address}
              history={history}
            />
          )}
        />

        <Route exact path="/confirmation" component={Confirmation} />
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
const Confirmation = () => (
  <div>
    <h1>Transaction complete</h1>
    <Link to='/'>OK</Link>
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
