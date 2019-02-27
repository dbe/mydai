import React, { Component } from 'react';

class SendTo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: undefined
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({amount: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/confirmation`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Sending</h2>
        <input type="text" placeholder="0" value={this.state.amount} onChange={this.onChange}/>
        <h2>xDAI to:</h2>
        <h3>{this.props.match.params.address}</h3>
        <input type="submit" value="Send" />
      </form>
    )
  }
}

export default SendTo;
