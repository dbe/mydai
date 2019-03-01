import React, { Component } from 'react';

class SendTo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({amount: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    let amount = this.props.toWei(this.state.amount, 'ether');

    this.props.sendMoney(this.props.address, amount).then(ret => {
      this.props.history.push('/confirmation');
    }).catch(e => {
      console.log('e: ', e);
    })

    this.props.history.push('/popup');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Sending</h2>
        <input type="text" value={this.state.amount} onChange={this.onChange} />
        <h2>xDAI to:</h2>
        <h3>{this.props.address}</h3>
        <input type="submit" value="Send" />
      </form>
    )
  }
}

export default SendTo;
