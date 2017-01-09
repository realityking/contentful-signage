import React, { Component, PropTypes } from 'react';
import Clock from '../components/Clock';

export default class SideBar extends Component {
  render() {
    return(<div id="sideBar">
      <Clock showDate={true} />
    </div>)
  }
}
