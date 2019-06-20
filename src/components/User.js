import React, { Component } from 'react';

class User extends Component {

	constructor(props) {
		super(props);
	
		this.state = {

			isLoggedIn: false
  
  		};
	}

	componentDidMount() {
		this.props.firebase.auth().onAuthStateChanged( user => {
  		this.props.setUser(user);
		});
	}

	userSignIn(user) {
		const provider = new this.props.firebase.auth.GoogleAuthProvider();
		this.props.firebase.auth().signInWithPopup( provider );
		this.setState({ isLoggedIn: true });
	}

	userSignOut(user) {
		this.props.firebase.auth().signOut();
		this.setState({ isLoggedIn: false });
	}

	render() {
		
		let button;
		let displayName;

		if (this.state.isLoggedIn === false) {
			button = <button className="nes-btn is-primary" onClick={ (user) => this.userSignIn(user) }>Sign In</button>;
			displayName = 'Guest';
		}	
				
		else {
			button = <button className="nes-btn is-success" onClick={ (user) => this.userSignOut(user) }>Sign out</button>;
			displayName = this.props.currentUser.displayName;
		}
			
		return (
			<div className="signin-box">
				{button}
				{displayName}
			</div>		
		);
	}			
}    	

export default User;