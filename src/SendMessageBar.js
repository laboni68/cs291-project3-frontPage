import React from 'react'
import './App.css';

class SendMessageBar extends React.Component{
	constructor(props){
	super(props);
	this.state={
		msg: ''
	}
	this.send=this.send.bind(this)
	this.changeMsg=this.changeMsg.bind(this)
}
changeMsg(e){
	this.setState({msg: e.target.value})
}
send(e){
	e.preventDefault()
	this.props.onSubmit(this.state.msg)
	this.setState({msg: ''})
}
render(){
		return <div >
			<form  className="message-bar" onSubmit={this.send}>
				<input className="textfield" type = "text" value={this.state.msg} placeholder="Type your message here " onChange={this.changeMsg}/>
			</form>
		</div>
	}

}
export default SendMessageBar
