import React, { Component } from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: ''
    }
    this.pressEnter = this.handleEnter.bind(this);
  }

// On enter, create const 'message' and run it as 'prop -> state' up through app.jsx
  handleEnter = (event) => {
    if (event.key === 'Enter') {
      const message = this.state.message;
      this.props.updateMessage(message)
      this.setState({ message: '' });
    }
  }

  handleChangeMessageValue = (event) => {
    this.setState({ message: event.target.value });
  }

  handleChangeNameValue = (event) => {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onKeyDown={this.props.editUsername}
          onChange={this.handleChangeNameValue} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onKeyDown={this.handleEnter}
          onChange={this.handleChangeMessageValue}
        />
      </footer>
    ) // CLOSE return
  } // CLOSE Render

} // Close chatbar extends compoonent
export default ChatBar;