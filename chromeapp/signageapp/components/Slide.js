import React, { Component, PropTypes } from 'react';
import JobBoard from '../slides/JobBoard';
import Tweet from '../slides/Tweet';
import WeatherAlert from '../slides/WeatherAlert';

export default class Slide extends Component {
  static propTypes = {
    type: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
  };

  render() {
    var data = this.props.data;
    if (this.props.type === 'JobBoard') {
      return(<div className="slide">
        <h1>{data.office}</h1>
      </div>)
    }
    if (this.props.type === 'Tweet') {
      return(
        <div className='slide'>
          <h1>{data.name}</h1>
          <Tweet data={data} />
        </div>
      )
    }
    if (this.props.type === 'WeatherAlert') {
      return(
        <div className='slide'>
          <h1>Weather Alert</h1>
          <WeatherAlert data={data} />
        </div>
      )
    }

    // Render nothing if we don't know the type
    return null;
  }
}
