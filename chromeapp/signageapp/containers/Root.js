import React, { Component, PropTypes } from 'react';
import MainSection from '../components/MainSection';
import SideBar from '../components/SideBar';

import _ from 'lodash';
var contentful_cda_client = require('../lib/contentful_cda_client');

export default class Root extends Component {
	
	// Initial state
	constructor(props) {
		super(props);
		this.state = {
			slides: [
	      {
	        type: 'JobBoard',
	        data: {
	          office: 'Berlin',
	          jobs: ['Engineering Manager', 'PHP Ecosystem Developer', 'Senior Controller', 'Product Designer', 'Product Marketing Manager']
	        }
	      }
			]
		};
	}
	
	componentDidMount() {
		this.tick();
		this.loadInterval = setInterval(
			() => this.tick(), 1000 * 5
		);		
	}
	
	componentWillUnmount() {
		clearInterval(this.loadInterval);
	}
	
	tick() {
		contentful_cda_client.syncContentful().then( (entries) => {
			if (entries == null) {
				return;
			}
			this.setState({
				slides: this.jobBoardSlidesFromEntries(entries)
			});
		});
	}
	
  render() {

	  console.log();
	  var slides = this.state.slides;

    // var slides = [
    //   {
    //     type: 'JobBoard',
    //     data: {
    //       office: 'Berlin',
    //       jobs: ['Engineering Manager', 'PHP Ecosystem Developer', 'Senior Controller', 'Product Designer', 'Product Marketing Manager']
    //     }
    //   },
    //   {
    //     type: 'JobBoard',
    //     data: {
    //       office: 'San Francisco',
    //       jobs: ['Sales Engineer', 'Director of Developer Evangelism', 'Product Marketing Manager']
    //     }
    //   },
    //   {
    //     type: 'Tweet',
    //     data: {
    //       name: 'Latest Tweets for @contentful',
    //       userId: 'khaled_garbaya',
    //       userName: 'Khaled Garbaya 💻👻',
    //       userProfilePic: 'http://pbs.twimg.com/profile_images/803994875335163904/qmmR8j-F_normal.jpg',
    //       text: "@contentful it's a secret 😜, but maybe soonish",
    //       date: '2017-01-09T14:24:00'
    //     }
    //   },
    //   {
    //     type: 'WeatherAlert',
    //     data: {
    //       name: 'Berlin - 2017-01-07T09:00:00',
    //       headline: 'Amtliche WARNUNG vor FROST',
    //       event: 'FROST',
    //       description: 'Es tritt mäßiger Frost zwischen -2 °C und -7 °C auf.',
    //       state: "Berlin",
    //       stateShort: 'BL',
    //       regionName: "Berlin",
    //       instruction: "",
    //       start: "2017-01-09T14:24:00",
    //       end: "2017-01-09T14:24:00",
    //       type: 5,
    //       level: 2,
    //       altitudeStart: null,
    //       altitudeEnd: null
    //     }
    //   }
    // ];

    return (
      <div id="app">
        <MainSection slides={slides} />
        <SideBar />
      </div>
    );
  }
	
	// MARK: Private
	
	jobBoardSlidesFromEntries(entries) {
		
		var offices = _.filter(entries, function(entry) {
			return entry.fields.hasOwnProperty("availableJobs");
		});

		var slides = [];
		for (var i = 0; i < offices.length; i++) {
			var jobBoard = {
				type: 'JobBoard',
				data: {
					office: offices[i].fields.name["en-US"],
					jobs: offices[i].fields.availableJobs["en-US"]
				}
			}
			slides.push(jobBoard)
		}

		return slides
	}
}
