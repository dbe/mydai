import React, { Component } from 'react';

class Wallet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>Address: {this.props.address}</p>
    );
  }
}

export default Wallet;
