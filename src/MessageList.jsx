import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
        <main className="messages">
        {
        this.props.messages.map((messageList, index) => { // takes the 'state' from appjsx, index for primary id
          return <Message message = {messageList} key = {index} /> // the 'state' from app down to message
          })
        }
        </main>
    );
  }
}


export default MessageList;