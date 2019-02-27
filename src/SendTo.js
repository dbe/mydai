import React, { Component } from 'react';

class SendTo extends Component {
  constructor(props) {
    super(props);

    console.log('props: ', props);
  }


  render() {
    console.log('this.props: ', this.props);
    return (
      <div>
        <h2>Sending</h2>
        <input type="text" />
        <h2>xDAI to:</h2>
        <h3>{this.props.match.params.address}</h3>
      </div>
    )
  }
}

export default SendTo;
