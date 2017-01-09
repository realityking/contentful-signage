import React, { Component, PropTypes } from 'react';
import SideBar from '../components/SideBar';
import MainSection from '../components/MainSection';


export default class Root extends Component {

  render() {
    return (
      <div id="app">
        <MainSection />
        <SideBar />
      </div>
    );
  }
}
