import React, { Component } from 'react';

import avatar from './avatar.png';

class Friend extends Component {
  constructor(props) {
    super(props);
  }

  renderLastMessage() {
    let {messages} = this.props.attr;

    if(messages.length === 0) {
      return "No messages yet."
    } else {
      return messages[messages.length - 1].text;
    }
  }

  render() {
    return (
      <div className="friend row" key={this.props.attr.address}>
        <div className="col-3">
          <img className="avatar" src={avatar} />
        </div>
        <div className="col-9">
          <div className="row">
            <p className="friend-name">
              {this.props.attr.name}
            </p>
          </div>
          <div className="row">
            <p className="message-summary">
              {this.renderLastMessage()}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Friend;
