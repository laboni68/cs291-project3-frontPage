import React, { Component } from 'react';
import SendMessageBar from './SendMessageBar';
import ActiveUsers from './ActiveUsers';
import AllMessages from './AllMessages';
import './App.css';

class ChatPage extends Component{
	constructor(props) {
		super(props);
		this.state = {
		      allMessages: [],
		      token: this.props.token,
		      currentUser: this.props.username,
		      activeUsers: [],
		      url: this.props.url

		};
	this.streamSource = new EventSource(this.state.url+"/stream/"+this.state.token);
	this.sendingMessage=this.sendingMessage.bind(this);
	this.atBottom = false;
	this.changeOfScrollState=this.changeOfScrollState.bind(this);
}

sendingMessage(message){
	console.log("Msg received is ",message)
	var form = new FormData();
	form.append("message", message);
	var request = new XMLHttpRequest();
	request.open("POST", this.state.url + "/message");
	request.setRequestHeader(
	        "Authorization",
	        "Bearer " + this.state.token
	);
	request.send(form);
}
changeOfScrollState(state){
	this.atBottom = state;
}
componentDidMount (){
		this.streamSource.addEventListener("ServerStatus", (event) => {
		   	 this.setState({allMessages: [...this.state.allMessages,
{'message': JSON.parse(event.data).status, 'user': 'Server', 'created': JSON.parse(event.data).created}]}) 
		});
		this.streamSource.addEventListener("Message", (event) => {
			this.setState({allMessages: [...this.state.allMessages,JSON.parse(event.data)]})
		});
		 this.streamSource.addEventListener("Users", (event) => {
			this.setState({activeUsers: JSON.parse(event.data).users})
		});
		 this.streamSource.addEventListener("Join", (event) => {
			console.log(event, "------------------")
			const tempUsers = new Set(this.state.users)
			const joinedUser = JSON.parse(event.data).user
			const messageShown = joinedUser + " has joined the chat"
			if(!tempUsers.has(joinedUser)){
				this.setState({activeUsers: [...this.state.activeUsers,joinedUser],
				allMessages: [...this.state.allMessages,{'message': messageShown, 'user': 'Server', 
		   	'created': JSON.parse(event.data).created}]})
			  }	
			
		});
		 this.streamSource.addEventListener("Part", (event) => {
			const tempUsers = new Set(this.state.users)
			const partedUser = JSON.parse(event.data).user
			const messageShown = partedUser + " has left the chat"
			tempUsers.delete(partedUser)
			this.setState({activeUsers: [...tempUsers],
				allMessages: [...this.state.allMessages,{'message': messageShown, 'user': 'Server', 
		   	'created': JSON.parse(event.data).created}]})	
		});
		 this.streamSource.addEventListener("Disconnect", (event) => {
			console.log("disconnect event")
			this.streamSource.close()
			this.props.onDisconnect()
		});

}


render(){
		return(
			<div className="ChatPage">
				<div className="chatHeader">
						<h1 className="ChatHeaderBetween"> Hey, {this.state.currentUser}, you are online! Chat with your friends </h1>
				</div>
				
				<div className="chatMessages">
					<ActiveUsers activeUsers={this.state.activeUsers}/>
					<AllMessages allMessages={this.state.allMessages}
								changeOfScrollState={this.changeOfScrollState} 
								atBottom={this.atBottom}/>
				</div>
				<div className="Message-send">
					<SendMessageBar onSubmit={this.sendingMessage} />
				</div>	 
			</div>
		     )		
	}


}
export default ChatPage




