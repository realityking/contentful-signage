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
      },
      {
        type: 'Tweet',
        data: {
          name: 'Latest Tweets for @contentful',
          userId: 'khaled_garbaya',
          userName: 'Khaled Garbaya 💻👻',
          userProfilePic: 'http://pbs.twimg.com/profile_images/803994875335163904/qmmR8j-F_normal.jpg',
          text: "@contentful it's a secret 😜, but maybe soonish",
          date: '2017-01-09T14:24:00'
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
