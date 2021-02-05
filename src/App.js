import React, { Component } from 'react';
import './App.css';
import LoginPage from './LoginPage'
import ChatPage from './ChatPage'

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentScreen: sessionStorage.getItem( 'currentScreen' ) || 'LoginScreen',
      currentUsername: sessionStorage.getItem( 'currentUsername' ) || '',
      token: sessionStorage.getItem( 'token' ) || '',
      url: 'http://localhost:4567/'
    }
    this.loginPageSubmit = this.loginPageSubmit.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
  }

  loginPageSubmit (username, password, url){
    console.log("...............",username,password,url);
    var request = new XMLHttpRequest();
    var form = new FormData();
    form.append("password", password);
    form.append("username", username);
    sessionStorage.url = url;
    request.open("POST", sessionStorage.url + "/login");
    console.log("......................OPEN POST DONE");
    request.onreadystatechange = function(){
        console.log("......................",request);
        console.log("Request status",request.status);
        if (request.readyState !== 4) return;
        if (request.status === 201) {
            sessionStorage.setItem( 'token', JSON.parse(request.responseText).token);
            sessionStorage.setItem( 'currentScreen',"ChatScreen");
            sessionStorage.setItem( 'currentUsername',username);
            this.setState({
            currentUsername: username,
            currentScreen: sessionStorage.getItem( 'currentScreen'),
            token: sessionStorage.getItem( 'token' )
            });
        } else if (this.status === 403) {
            alert("Invalid username or password");
        } else {
            console.log("Request is ", request, "...END");
            alert(this.status + " failure to /login");
        }
    }.bind(this);
    request.send(form);  
    
  }
  onDisconnect(){
    console.log ("on disconnect...")
    this.setState({currentScreen: 'LoginScreen'})
  }

  render() {
    if(this.state.currentScreen === 'LoginScreen'){
	console.log ("on Login Screen")
     return <LoginPage onSubmit={this.loginPageSubmit} 
     url={this.state.url}/>
    }
    else if(this.state.currentScreen === 'ChatScreen'){
      return <ChatPage token={this.state.token}
                         username ={this.state.currentUsername}
                         url={sessionStorage.url}
                         onDisconnect={this.onDisconnect} />
    }

  }
}

export default App;
