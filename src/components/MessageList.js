import React, { Component } from 'react';

class MessageList extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
    
    		messages: [],
    		newMessage: ''
  
  		};

  		
  		this.messageRef = this.props.firebase.database().ref('messages');
  	   
	}

	componentDidMount() {
		
		this.messageRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
    		this.setState({ messages: this.state.messages.concat( message ) });
   		});

	}

	handleMessage(e) {
		this.setState({ newMessage: e.target.value });
	}

	createMessage(e) {
		e.preventDefault();
		let newMessage = this.state.newMessage;
		this.messageRef.push({
			username: this.props.currentUser.displayName || 'Guest',
			content: newMessage,
			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
			roomId: this.props.activeRoom.key
		});
		this.setState({ newMessage: '' });
	}

   	render() {
	
		const activeRoomMessage = this.state.messages.filter(message => message.roomId === this.props.activeRoom.key);
        	console.log(activeRoomMessage); // testing the filter
        	console.log(this.props.activeRoom); 
		return (
			<div>
			<form onSubmit={ (e) => this.createMessage(e) }>
				<label>
		    		Message:
		  			<input type="text" value={this.state.newMessage} onChange={ (e) => this.handleMessage(e) } /> 
		   		</label>
		  			<input type="submit" value="Submit" />
		  	</form>
		 	{	

		 		activeRoomMessage.map( (message) => {
			    
			    let formattedTime = new Date(message.sentAt).toLocaleTimeString("en-US");
				
				return (
					<div key={message.key}>
                		<p>{message.username}</p>
                		<p>{message.content}</p>
                		<p>{formattedTime}</p>
					</div>
					
			      );
			   })
		    }
			</div>
		);  
	}

}

export default MessageList;