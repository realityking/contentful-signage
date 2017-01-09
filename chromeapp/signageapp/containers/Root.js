import React, { Component, PropTypes } from 'react';
import MainSection from '../components/MainSection';
import SideBar from '../components/SideBar';

export default class Root extends Component {
  render() {
    var slides = [
      {
        type: 'JobBoard',
        data: {
          office: 'Berlin',
          jobs: ['Engineering Manager', 'PHP Ecosystem Developer', 'Senior Controller', 'Product Designer', 'Product Marketing Manager']
        }
      },
      {
        type: 'JobBoard',
        data: {
          office: 'San Francisco',
          jobs: ['Sales Engineer', 'Director of Developer Evangelism', 'Product Marketing Manager']
        }
      }
    ];

    return (
      <div id="app">
        <MainSection slides={slides} />
        <SideBar />
      </div>
    );
  }
}
