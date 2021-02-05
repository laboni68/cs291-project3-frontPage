import React from 'react'
import './App.css';

class ActiveUsers extends React.Component{
ListUsers(users){
	console.log("List users...")
	return (
      <li className="active-list">
        <div className="users">
         {users}
         </div>
      </li>
    );
}
render() {
    return (
      <ul className = "active-user-head-body">
        <h4 > Friends who are online</h4>
        {this.props.activeUsers.map(m =>this.ListUsers(m))}
      </ul>
    );
  }

}

export default ActiveUsers
