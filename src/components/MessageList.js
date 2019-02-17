import React, { Component } from 'react';

class MessageList extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
    
    		messages: [],
    		newMessages: []
  
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

	showMessages(message) {

		// const listMessage = message.filter(message => this.props.activeRoom === this.state.messages.key);
		// console.log(listMessage);
		// this.setState({ messages: listMessage });
			
	}


   	render() {
	
		const activeRoomMessage = this.state.messages.filter(message => message.roomId === this.props.activeRoom);
        console.log(activeRoomMessage);
        console.log(this.state.messages.roomId);
		return (
			<div>  
		 	{	
		 		activeRoomMessage.map( (message) => {
			
				return (
					<div key={message.key}>
                		<p>{message.username}</p>
                		<p>{message.content}</p>
                		<p>{message.sentAt}</p>
                		<p>{this.props.activeRoom}</p>
					</div>
			      );
			   })
		    }
			</div>
		);  
	}

}

export default MessageList;