import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {
        // takes the 'state' from appjsx, index for unique id
        this.props.messages.map((messageList, index) => {
          return <Message message = {messageList} key = {index} />
          })
        }
      </main>
    );
  }
}


export default MessageList;