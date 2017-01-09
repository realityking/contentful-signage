import React, { Component, PropTypes } from 'react';

export default class Tweet extends Component {
  render() {
    const data = this.props.data;

    return(
      <div>
        <h1>{data.name}</h1>
        <div className='tweet'>
          <div className='user'>
            <img src={data.userProfilePic} />
            <p className='username'>{data.userName}</p>
            <p className='userid'>{data.userId}</p>
          </div>
          <div className='body'>
            <p className='text'>{data.text}</p>
            <p className='date'>{data.date}</p>
          </div>
        </div>
      </div>
    )
  }
}

