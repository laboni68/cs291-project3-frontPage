import React from 'react'
import './App.css';

class LoginPage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			password: '',
			url: this.props.url
		}
		this.onChangeUsername = this.onChangeUsername.bind(this)
		this.onChangePassword = this.onChangePassword.bind(this)
		this.onChangeUrl = this.onChangeUrl.bind(this)
		this.submitThis = this.submitThis.bind(this)
	}
	/*updateInput (event) {
    this.setState({[event.target.name]: event.target.value});
  }*/
	onChangeUsername(e){
		this.setState({username: e.target.value})
	}
	onChangePassword(e){
		this.setState({password: e.target.value})
	}
	onChangeUrl(e){
		this.setState({url: e.target.value})
	}
	submitThis (e){
		e.preventDefault()
		this.props.onSubmit(this.state.username,this.state.password, this.state.url)
	}
	render(){
		return <div>
		
		<form className="login" onSubmit={this.submitThis}>
		<h2>Please enter your details</h2> <br/>
		<table >
			<tr>
				<td>USERNAME:</td>
				<td><input type = "text" placeholder="Enter Username" value={this.state.username} onChange={this.onChangeUsername}/></td>
			</tr>
			<tr>
				<td>PASSWORD:</td>
				<td><input type = "password" placeholder="Enter Password" value={this.state.password} onChange={this.onChangePassword}/></td>
			</tr>
			<tr>
				<td>URL</td>
				<td><input type = "text" value={this.state.url} placeholder="Enter network URL" onChange={this.onChangeUrl}/></td>
			</tr>
			<tr>
				<td><input type = "submit" value="Login"/></td>
			</tr>
			</table> 			
		</form>
		</div>
	}
}

export default LoginPage
