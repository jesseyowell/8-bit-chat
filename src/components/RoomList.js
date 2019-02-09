import React, { Component } from 'react';

class RoomList extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
    
    		rooms: [],
    		newRoom: ''
  
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

	handleRoomClick(e, index) {
		
		if (this.state.rooms[index] === index ) {
			return <span style="font-weight: bold">{this.state.rooms.name}</span>		
		}

		else return this.state.rooms[index]
	}


   render() {
	
	return (
       <div>  
		 {
		 	this.state.rooms.map( (room, index) => {
			
				return (
					<ul key={index} >
                		<li onClick={ (e) => this.handleRoomClick(this.props.handleActiveRoom) }>{this.state.rooms[index].name}</li>
					</ul>
				);
			})
		 }
			<form onSubmit={ (e) => this.createRoom(e) }>
				
				<label>
		    		Room name:
		  			<input type="text" value={this.state.newRoom} onChange={ (e) => this.handleChange(e) } /> 
		   		</label>
		  		<input type="submit" value="Submit" />
			</form>
    	</div>
    )}
}


export default RoomList;