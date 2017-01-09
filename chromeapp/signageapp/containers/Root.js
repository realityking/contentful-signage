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
      },
      {
        type: 'WeatherAlert',
        data: {
          name: 'Berlin - 2017-01-07T09:00:00',
          headline: 'Amtliche WARNUNG vor FROST',
          event: 'FROST',
          description: 'Es tritt mäßiger Frost zwischen -2 °C und -7 °C auf.',
          state: "Berlin",
          stateShort: 'BL',
          regionName: "Berlin",
          instruction: "",
          start: "2017-01-09T14:24:00",
          end: "2017-01-09T14:24:00",
          type: 5,
          level: 2,
          altitudeStart: null,
          altitudeEnd: null
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
