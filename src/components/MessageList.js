import React, { Component } from 'react';

class MessageList extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
    
    		messages: [],
    		newMessage: '',
    		roomId: ''
  
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
	
		const { messages, newMessage } = this.state;
		const isEnabled = messages.length > 0 && newMessage.length > 0 && this.props.activeRoom.key != null;

		const activeRoomMessage = this.state.messages.filter(message => message.roomId === this.props.activeRoom.key);
        	console.log(activeRoomMessage); // testing the filter
        	console.log(this.props.activeRoom); 
		return (
			<div className="form-box">
		 	{	
              activeRoomMessage.map( (message) => {
			  let formattedTime = new Date(message.sentAt).toLocaleTimeString("en-US");
		
				return(
				  <div className="nes-container is-dark is-rounded with-title" key={message.key}>
                    <p className="title">{message.username}</p>
                	<p>{message.content}</p>
                	<p>{formattedTime}</p>
				  </div>	
			    );
			  })
		    }
		    <form onSubmit={ (e) => this.createMessage(e) }>
				<label>
		    		Message:
		  			<input type="text"
		  			       placeholder="Enter message here" 
		  			       value={this.state.newMessage} 
		  			       onChange={ (e) => this.handleMessage(e) } /> 
		   		</label>
		  			<button disabled={!isEnabled}>Submit</button>
		  	</form>
			</div>
		);  
	}

}

export default MessageList;