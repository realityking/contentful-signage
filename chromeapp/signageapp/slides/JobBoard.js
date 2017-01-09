import React, { Component, PropTypes } from 'react';

export default class JobBoard extends Component {
  static propTypes = {
    data: React.PropTypes.object
  };

  render() {
    const data = this.props.data;

    return(<div>
        <h1>{data.office}</h1>
        <ul>
          {data.jobs.map(function(job) {
            return <li>{job}</li>;
          })}
        </ul>
      </div>
      )
  }
}
