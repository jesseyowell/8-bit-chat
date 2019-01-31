import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
          <h1 className='title'>Bloc Chat</h1>
          <ul>
            <RoomList firebase={firebase} />
          </ul> 
       </div>
    );
  }
}

export default App;
