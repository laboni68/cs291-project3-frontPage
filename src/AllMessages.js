import React from 'react'
import './App.css';
import PopUpScreen from './PopUpScreen'
class AllMessages extends React.Component{
	constructor(props){
    		super(props)
   		 this.state = { showPopUp: false }
	this.atBottom = true
        this.messageFromSelf = true
	this.togglePopUp=this.togglePopUp.bind(this)
  	}
togglePopUp(){
	console.log("in pop up")
	this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.props.changeOfScrollState(true);
	this.atBottom = true;
    this.setState({showPopup: false})
}
  componentDidMount() {
    if(!this.props.atBottom && this.messageFromSelf){
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.props.changeOfScrollState(true);}
    else if(this.props.atBottom){
          this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.props.changeOfScrollState(true);}
  }
  
  componentDidUpdate() {
    if(!this.props.atBottom && this.messageFromSelf){
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.props.changeOfScrollState(true);}
    else if(this.props.atBottom){
          this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    this.props.changeOfScrollState(true);}
  }

ListMessages(m){
	console.log("in list msg")
    const whoSentMsg = m.user;
    const msg = m.message;
    //console.log(m.created)
    var date = new Date(m.created*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    const created = hours + ':' + minutes.substr(-2)
    var sender=whoSentMsg
    var msgType = 'Message'
    if (whoSentMsg === 'Server'){
	const msgType = 'Server'
	const sender = ''}
    const currentMember = sessionStorage.getItem( 'currentUsername' );
    var className=""
    if(sender === currentMember){
      this.messageFromSelf = true
      className = "Messages-currentMember"}
    else{
      this.messageFromSelf = false
      className = "Messages-other"}
    return (
      <li className={msgType} >
      	<div className = {className}>
  	      <div className="Message-content">
  	        <div className="username">
  	          {sender}
  	        </div>
  	        <div className="message">
  		      <div className="text">{msg}</div>
  		      <div className="created">{created}</div>
  	        </div>
  	      </div>
  	    </div>
      </li>
    );
  }

ScrollLogic= e =>{
    console.log("in scroll logic")
    let element = e.target
    if (element.scrollHeight - element.scrollTop - 1 < element.clientHeight) {
      this.props.changeOfScrollState(true); 
      this.atBottom = true
      this.setState({showPopUp: false})
    }
    else{
      this.props.changeOfScrollState(false);  
      this.atBottom = false
    }
}
render(){
console.log("showPopup: ", this.state.showPopUp)
	return (
      <ul className = "MessageList" onScroll={this.ScrollLogic}>
        {this.props.allMessages.map(m => this.ListMessages(m))}
	{(this.state.showPopUp || !this.atBottom)? <PopUpScreen PopUp={this.togglePopUp.bind(this)}/>: null}
	
        <li style={{ float:"left", clear: "both" }}
        ref={(el) => { this.messagesEnd = el; }}>
        </li>
      </ul>
    );
}
}
export default AllMessages
