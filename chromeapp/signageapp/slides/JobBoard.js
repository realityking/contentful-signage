import React, { Component, PropTypes } from 'react';
import { TagCloud } from 'react-tagcloud';

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}


export default class JobBoard extends Component {
  static propTypes = {
    data: React.PropTypes.object
  };

  render() {
    const jobs = this.props.data.jobs.map(function(job) {
      return {value: job, count: getRandom(1, 50)};
    });
    const office = this.props.data.office;

    return(<div className={office.toLowerCase().replace(' ', '-')}>
        <h1>We're hiring!</h1>
        <h2>For the {office} office</h2>
        <div className="cloudWrapper">
          <TagCloud minSize={30}
                    maxSize={60}
                    tags={jobs}
          />
        </div>
      </div>
      )
  }
}
