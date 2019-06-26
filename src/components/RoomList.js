import React, { Component } from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
    
        rooms: [],
        newRoom: '',
  
      };

      
      this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
  
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });    
      });
    
  }

  handleChange(e) {
    this.setState({ newRoom: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    let addRooms = this.state.newRoom;
      this.roomsRef.push({   
          name: addRooms
    }); 
    this.setState({ newRoom: '' });
  }

  


   render() {
     
     // this is used to disable the buttons when there is an empty value for the room name
     const { rooms, newRoom } = this.state;
     const isEnabled = rooms.length > 0 && newRoom.length > 0;

  return (
       <div className="room-container">  
     {
      this.state.rooms.map( (room, index) => {
        return (
                     <div className="left-sidebar nes-container is-dark is-rounded">  
                     <p key={index} onClick={ () => this.props.handleActiveRoom(room) }>{room.name}</p>
                     </div>
        );
      })
     }
      <form onSubmit={ (e) => this.createRoom(e) }>
        <label>
            <p class="room-text-box">New room name:</p>
            <input 
              type="text"
              size="12"
              placeholder="Enter room name" 
              value={this.state.newRoom} 
              onChange={ (e) => this.handleChange(e) } /> 
          </label>
          <button disabled={!isEnabled}>Submit</button>
      </form>
      </div>
      
    )}
}


export default RoomList;