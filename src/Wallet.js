import React, { Component } from 'react';
import {Link, Route, withRouter} from 'react-router-dom';
import { sign } from 'sign-in-with-burner';
import loader from './loader.gif';

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
    return new Promise((resolve, reject) => {
      try {
        this.web3.eth.getTransactionCount(this.props.address).then(nonce => {
          let tx = {
            to,
            nonce,
            gasPrice: this.web3.utils.toWei('1', 'gwei'),
            gasLimit: 21000,
            value: amount,
            chainId: 100
          }

          let options = {
            burnerUrl: 'https://xdai.io/loginV2',
            siteName: 'MyDai'
          }

          sign(tx, options).then(signed => {
            this.props.history.push('/processing');

            this.web3.eth.sendSignedTransaction(signed).on('transactionHash', hash => {
              console.log('hash: ', hash);
            }).on('receipt', receipt => {
              console.log('receipt: ', receipt);
            }).once('confirmation', conf => {
              this.fetchBalance();
              resolve()
            })
          })

        })
      } catch(e) {
        reject(e);
      }
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
              toWei={this.web3.utils.toWei}
            />
          )}
        />

        <Route exact path="/popup" component={Popup} />
        <Route exact path="/processing" component={Processing} />
        <Route exact path="/confirmation" component={Confirmation} />
      </div>
    );
  }
}

const Balance = ({balance}) => {
  let formatted = (parseInt(balance*100)/100).toFixed(2)
  // return <h2 id="balance">{parseFloat(balance).toFixed(2)} xDAI</h2>;
  return <h2 id="balance">{formatted} xDAI</h2>;
}
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
const Popup = () => <h1>Please confirm transaction on Burner Wallet</h1>
const Processing = () => (
  <div>
    <h1>Reticulating Splines</h1>
    <img id="processing" src={loader} alt='' />
  </div>
)

export default withRouter(Wallet);
