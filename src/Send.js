import React, { Component } from 'react';

class Send extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      sendTo: ''
    }
  }

  onChange(event) {
    this.setState({sendTo: event.target.value});
  }

  //TODO: Validate address
  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/send/${this.state.sendTo}`);
  }

  render() {
    return (
      <div>
        <h2>Send xDAI to: </h2>

        <form onSubmit={this.handleSubmit}>
          <label>Address:
            <input type="text" value={this.state.sendTo} onChange={this.onChange} />
          </label>

          <input type="submit" value="Next"></input>
        </form>
      </div>
    )
  }
}

export default Send;
