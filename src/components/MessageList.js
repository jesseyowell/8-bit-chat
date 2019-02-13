import React, { Component } from 'react';
import RoomList from '../components/RoomList';

class MessageList extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
    
    		messages: []
  
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

	showMessageList() {


	}


   	render() {
	

		return (
			<div>  
		 	{
		 		
		 		this.state.messages.map( (message, index) => {
			
				return (
					<div key={index}>
                		<p>{this.state.messages[index].username}</p>
                		<p>{this.state.messages[index].content}</p>
                		<p>{this.state.messages[index].sentAt}</p>
					</div>
			      );
			   })
		    }
			</div>
		);  
	}

}

export default MessageList;