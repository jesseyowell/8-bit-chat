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

		const listMessage = message.filter(message => this.props.activeRoom.key !== this.state.messages.roomId);
		this.setState({ messages: listMessage });

	}


   	render() {
	

		return (
			<div>  
		 	{	
		 		this.state.messages.map( (message, index) => {
			
				return (
					<div key={index} onClick={ (message) => this.showMessages(message) }>
                		<p>{message.username}</p>
                		<p>{message.content}</p>
                		<p>{message.sentAt}</p>
                		<p>{this.props.activeRoom.key}</p>
					</div>
			      );
			   })
		    }
			</div>
		);  
	}

}

export default MessageList;