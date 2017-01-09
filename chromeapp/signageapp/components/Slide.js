import React, { Component, PropTypes } from 'react';
import JobBoard from '../slides/JobBoard';

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

    // Render nothing if we don't know the type
    return null;
  }
}
