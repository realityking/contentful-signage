
import React, { Component, PropTypes } from 'react';
import MainSection from '../components/MainSection';
import SideBar from '../components/SideBar';

import _ from 'lodash';
var contentful_cda_client = require('../lib/contentful_cda_client');

var locale = "en-US"


function jobBoardSlideFromEntry(entry) {
	
	var fields = entry.fields;
	var jobBoard = {
		type: 'JobBoard',
		data: {
			office: fields.name[locale],
			jobs: fields.availableJobs[locale]
		}
	}
	return jobBoard;
}

function tweetsSlideFromEntry(entry) {

	var fields = entry.fields;
	var tweetSlide = {
    type: 'Tweet',
    data: {
      name: fields.name[locale],
      userId: fields.userId[locale],
      userName: fields.userName[locale],
      userProfilePic: fields.userProfilePic,
      text: fields.text[locale],
      date: fields.date[locale],
    }
  };
	return tweetSlide;
}


function weatherAlertSlideFromEntry(entry) {
	
	var fields = entry.fields;
	var weatherAlertSlide = {
    type: 'WeatherAlert',
    data: {
      name: fields.name[locale],
      headline: fields.headline[locale],
      event: fields.event[locale],
      description: fields.event[locale],
      state: fields.state[locale],
      stateShort: fields.stateShort[locale],
      regionName: fields.regionName[locale],
      instruction: fields.instruction[locale],
      start: fields.start[locale],
      end: fields.end[locale],
      type: fields.type[locale],
      level: fields.level[locale],
      altitudeStart: fields.altitudeStart[locale],
      altitudeEnd: fields.altitudeEnd[locale]
    }
  };
	return weatherAlertSlide;
}

function teamStatsSlideDataFromEntries(entries) {
	
	var chartData = _.map(entries, function(entry) {
		return {
			label: entry.fields.teamName[locale],
			values: [
				{ x: "TODO", y: entry.fields.todo[locale] }, 
				{ x: "In Progress", y: entry.fields.inProgress[locale] },
				{ x: "Done", y: entry.fields.done[locale] }
				]
		};
	});
	var slide = {
		type: 'TeamStatistics',
		data: chartData
	};
	return slide;
}

function transformEntriesToSlides(entries) {
	var slides = [];
	for (var i = 0; i < entries.length; i++) {
		var contentType = entries[i].sys.contentType.sys.id;
		console.log(contentType);
		switch (contentType) {
		case "weatherAlert":
			slides.push(weatherAlertSlideFromEntry(entries[i]));
			break;
		case "tweet":
			slides.push(tweetsSlideFromEntry(entries[i]));
			break;
		case "officeAndJobs":
			slides.push(jobBoardSlideFromEntry(entries[i]));
			break;
		default:
			break;
		}
	}
	var teamStatsEntries = _.filter(entries, function(entry) {
		return entry.sys.contentType.sys.id == "teamStats";
	})
	slides.push(teamStatsSlideDataFromEntries(teamStatsEntries));
	
	return slides;
}

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
				slides: transformEntriesToSlides(entries)
			});
		});
	}
	
  render() {
    return (
      <div id="app">
        <MainSection slides={this.state.slides} />
        <SideBar />
      </div>
    );
  }
}
