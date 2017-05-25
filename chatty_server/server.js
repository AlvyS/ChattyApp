const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
// Used to generate random ID for each broadcast
const uuid = require('node-uuid'); 

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()

  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//// Connecting Websocket
wss.on('connection', (ws) => {

  // BROADCAST NUMBER OF CLIENTS
  const clientSize = {
    type: 'incClient',
    size: wss.clients.size
  }
  wss.clients.forEach((client) => {
    if (client.readyState = WebSocket.OPEN) {
      client.send(JSON.stringify(clientSize));
    }
  })

  ws.on('message', (message) => {
    let parseData = JSON.parse(message);

    //// BROADCAST MESSAGES TO ALL CLIENTS
    if(parseData.type === 'postedMessage') {
      const castMessage = {
        type: 'incMessage',
        id: uuid.v4(),
        username: parseData.username,
        content: parseData.content
      }
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(castMessage));
        }
      }); // CLOSE forEach broadcast
    } // CLOSE if postedMessage
    
    //// BROADCAST NOTIFICATIONS TO ALL CLIENTS
    else if(parseData.type === 'postedNotification') {
      const castNotification = {
        type: 'incNotification',
        id: uuid.v4(),
        content: parseData.nameNotification
      }
      wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(castNotification));
        }
      }); // CLOSE forEach broadcast
    } // CLOSE if postedNotification

  });

  //// Callback when client closes socket
  ws.on('close', () => {
    const clientSize = {
      type: 'incClient',
      size: wss.clients.size
    }
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(clientSize));
      }
    })
  });

}); // CLOSE on connection