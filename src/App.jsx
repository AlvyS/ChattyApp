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
			currentUser: 'A Non E-Moose',
			messages: []
		};
	}

	//// Wrap actions within componentDidMount to ensure connection is established first
	componentDidMount() {  
		this.socket = new WebSocket('ws://localhost:3001');
		this.socket.onopen = (event) => {}

		this.socket.onmessage = (broadcastedMessage) => {
			let retrievedMessage  = JSON.parse(broadcastedMessage.data);
			switch (retrievedMessage.type) {
				case 'incClient': {
					this.setState({ clientsOnline: retrievedMessage.size })
					break;
				}
				case 'incMessage': {
					const concatMessage = this.state.messages.concat(retrievedMessage);
					this.setState({ messages: concatMessage });
					break;
				}
				case 'incNotification': {
					const concatMessage = this.state.messages.concat(retrievedMessage);
					this.setState({ messages: concatMessage });
					break;
				}
			default: {}
			}
		}
	}

	addMessage = (content) => {
		let username = this.state.currentUser;
		const sendMessage = {
			type: 'postedMessage',
			username: username,
			content: content
		}
		this.socket.send(JSON.stringify(sendMessage));
	}

	editUsername = (username) => {
		const oldName = this.state.currentUser;
		this.setState({ currentUser: username })
		const notification = {
			type: 'postedNotification',
			nameNotification: `${oldName} changed name to ${username}`
		}
		this.socket.send(JSON.stringify(notification));
	}

	handleUsernameOnEnter = (event) => {
		if (event.key === 'Enter') {
			this.editUsername(event.target.value)
		}
	}

	render() {
		return (
			<div>
				<NavBar 
					clientsOnline = {this.state.clientsOnline} 
				/>
				<MessageList 
					messages={this.state.messages}
					notification={this.state.notification} 
				/>
				<ChatBar 
					editUsername = {this.handleUsernameOnEnter} 
					updateMessage={this.addMessage} 
				/>
			</div>
		)
	} 

}

////-------------------------------------------------------------------------------------------------------
export default App;