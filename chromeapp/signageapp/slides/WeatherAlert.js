import React, { Component, PropTypes } from 'react';

export default class WeatherAlert extends Component {
  render() {
    return(
      <div className='weatherAlert'>
        <h1 className='headline'>{this.props.data.name} - {this.props.data.state}</h1>
        <p className='description'>{this.props.data.description}</p>
        <p className='instruction'>{this.props.data.instruction}</p>
        <p className='date'>Starting: {this.props.data.start} - Ending: {this.props.data.end}</p>
      </div>
    )
  }
}

