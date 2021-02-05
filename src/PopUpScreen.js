import React from 'react'
import './App.css';

class PopUpScreen extends React.Component {
  render() {
    return (
      <div className='PopUpScreen'>
        <div className='popUp'>
        <button className='popUpClick' onClick={this.props.PopUp}>Your Messages</button>
        </div>
      </div>
    );
  }
}
export default PopUpScreen
