import React, { Component, PropTypes } from 'react';

export default class WeatherAlert extends Component {
  render() {
    const data = this.props.data;

    return(
      <div className='weatherAlert'>
        <h1>Weather Alert</h1>
        <h1 className='headline'>{data.name} - {data.state}</h1>
        <p className='description'>{data.description}</p>
        <p className='instruction'>{data.instruction}</p>
        <p className='date'>Starting: {data.start} - Ending: {data.end}</p>
      </div>
    )
  }
}

