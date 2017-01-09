import React, { Component, PropTypes } from 'react';

export default class Tweet extends Component {
  render() {
    return(
      <div className='tweet'>
        <div className='user'>
          <img src={this.props.data.userProfilePic} />
          <p className='username'>{this.props.data.userName}</p>
          <p className='userid'>{this.props.data.userId}</p>
        </div>
        <div className='body'>
          <p className='text'>{this.props.data.text}</p>
          <p className='date'>{this.props.data.date}</p>
        </div>
      </div>
    )
  }
}

