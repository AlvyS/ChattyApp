import React, { Component } from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
////------------------------------------------------------------------------------------------------------

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientsOnline: 0,
            currentUser: 'A Non E-Moose', // optional. Undefined currentUser is Anonymous
            messages: []
        };
    } // CLOSE constructor

    //// Wrap actions within componentDidMount to ensure connection is established first
    componentDidMount() {  
        console.log('Component Did Mount');
        this.socket = new WebSocket('ws://localhost:3001');

        this.socket.onopen = (event) => {
            console.log('Socket Open!')
        }

        this.socket.onmessage = (broadcastedMessage) => {
            console.log('Retrieving broadcast:', broadcastedMessage.data);
            let retrievedMessage  = JSON.parse(broadcastedMessage.data);
            console.log('Determining broadcast message type:', retrievedMessage);

            switch (retrievedMessage.type) {
                case 'incClient': {
                    console.log('Type is client size');
                    this.setState({ clientsOnline: retrievedMessage.size })
                break;
                }
                case 'incMessage': {
                    console.log('Type is Message');
                    const concatMessage = this.state.messages.concat(retrievedMessage);
                    this.setState({ messages: concatMessage });
                break;
                }
                case 'incNotification': {
                    console.log('Type is notification');
                    const concatMessage = this.state.messages.concat(retrievedMessage);
                    this.setState({ messages: concatMessage });
                break;
                }
            default: {}
        } // CLOSE switch conditional
        
        // TEST MESSAGE SIMULATION
        // setTimeout(() => {
        //     console.log("Simulating incoming message");
        //     let testMessage = {id: 3, type:"incMessage", username: "Michelle", content: "Hello there!"};
        //     const simulatedMessage = this.state.messages.concat(testMessage)
        //     this.setState({messages: simulatedMessage})
        //     }, 3000);
        
        }     //CLOSE socket on message
    }      // CLOSE componentDidMount

    addMessage = (content) => {
        let username = this.state.currentUser;
        console.log('currentUser', this.state.currentUser);
        const sendMessage = {
            type: 'postedMessage',
            username: username,
            content: content
        }
        console.log('Message sent to server:', sendMessage);
        this.socket.send(JSON.stringify(sendMessage));
    }       // CLOSE addMessage
       
    editUsername = (username) => {
        console.log('Changing Username: ', username);
        const oldName = this.state.currentUser;
        this.setState({ currentUser: username })
        const notification = {
            type: 'postedNotification',
            nameNotification: `${oldName} changed name to ${username}`
        }
        console.log('Notification sent to server: ', notification);
        this.socket.send(JSON.stringify(notification));
    }       // CLOSE editUsername

    handleUsernameOnEnter = (event) => {
        if (event.key === 'Enter') {
            this.editUsername(event.target.value)
        }
    }

    render() {
        console.log('Rendering <App/>')
        return (
            <div>
                <NavBar
                    clientsOnline = {this.state.clientsOnline} />
                <MessageList 
                    messages={this.state.messages}
                    notification={this.state.notification} />
                <ChatBar 
                    editUsername = {this.handleUsernameOnEnter} 
                    updateMessage={this.addMessage} />
            </div>
        )
    }      // CLOSE Render

}      // CLOSE Class app extends component



////-------------------------------------------------------------------------------------------------------
export default App;