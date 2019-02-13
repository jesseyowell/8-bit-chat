import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBoFr5vkorNr8GNHhc-qzX9wCUA0N_k_VE",
    authDomain: "bloc-chat-react-80bc1.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-80bc1.firebaseio.com",
    projectId: "bloc-chat-react-80bc1",
    storageBucket: "bloc-chat-react-80bc1.appspot.com",
    messagingSenderId: "825422430869"
};
  
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      ActiveRoom: null

    };

  }

  handleActiveRoom(e) {
    const newActiveRoom = e.target.innerText;
    this.setState({ ActiveRoom: newActiveRoom });
  }

  render() {
    return (
      <div className="App">
          <h1 className='title'>Bloc Chat</h1>
          <ul>
            <h3>{this.state.ActiveRoom}</h3>
            <RoomList firebase={firebase} handleActiveRoom={ (e) => this.handleActiveRoom(e) } />
            <MessageList firebase={firebase} 
                         handleActiveRoom={ (e) => this.handleActiveRoom(e) } 
                         ActiveRoom={this.state.ActiveRoom} />
          </ul> 
       </div>
    );
  }
}

export default App;
