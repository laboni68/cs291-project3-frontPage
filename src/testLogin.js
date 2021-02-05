import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url:"http://localhost:4567/",
      username: "",
      password: ""
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

updateInput =event=> {
    this.setState({[event.target.name]: event.target.value});
  }
onSubmit (e){
		e.preventDefault()
		this.props.onSubmit(this.state.username,this.state.password, this.state.url)
	}
render(){
	
	return (
	    <form className="loginForm" onSubmit={this.onSubmit}>
	      <label>
		Chat URL : <br/>
	      <input type ="text" name="url" onChange={this.updateInput} value={this.state.url}/><br/>
		</label>
		<label>
		Username : <br/>
	      <input type ="text" name="username" onChange={this.updateInput} value={this.state.username}/><br/>
		</label>
		<label>
		Password : <br/>
	      <input type ="password" name="password" onChange={this.updateInput} value={this.state.password}/><br/>
		</label>
	      <input type = "submit"  value="Login!"/>
	    </form>
	  );
}

}

export default Login;
