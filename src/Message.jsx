import React, {Component} from 'react';


class Message extends Component {
  render() {

    switch (this.props.message.type) {
      case 'incMessage': {
        return (
          <div className="message">
              <span className="message-username">{this.props.message.username}</span>
              <span className="message-content">{this.props.message.content}</span>
          </div>      
        )
        break;
      }
      case 'incNotification': {
        return (
          <div className = 'message-notification'> {this.props.message.content} </div>
        )
        break;
      }
      default: 
    }
    
  }
}

export default Message;