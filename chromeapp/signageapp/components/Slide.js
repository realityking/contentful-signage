import React, { Component, PropTypes } from 'react';
import JobBoard from '../slides/JobBoard';
import Tweet from '../slides/Tweet';
import WeatherAlert from '../slides/WeatherAlert';
import TeamStatistics from '../slides/TeamStatistics';

export default class Slide extends Component {
  static propTypes = {
    type: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired
  };

  render() {
    var data = this.props.data;
    if (this.props.type === 'JobBoard') {
      return(<div className="slide">
        <JobBoard data={data}/>
      </div>)
    }
    if (this.props.type === 'Tweet') {
      return(
        <div className='slide'>
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
    if (this.props.type === 'TeamStatistics') {
      return(
        <div className='slide'>
          <h1>Team Stats</h1>
          <TeamStatistics data={data} />
        </div>
      )
    }

    // Render nothing if we don't know the type
    return null;
  }
}
