import React, { Component, PropTypes } from 'react';
import MainSection from '../components/MainSection';
import SideBar from '../components/SideBar';

export default class Root extends Component {
  render() {
    var slides = [1, 2, 3, 4, 5];

    return (
      <div id="app">
        <MainSection slides={slides} />
        <SideBar />
      </div>
    );
  }
}
