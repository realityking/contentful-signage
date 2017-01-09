import React, { Component, PropTypes } from 'react';
import { BarChart } from 'react-d3-components';


export default class TeamStatistics extends Component {
	
  static propTypes = {
    data: React.PropTypes.object
  };

  render() {
    const data = this.props.data;
		
	//	var BarChart = ReactD3.BarChart;
    return(<BarChart
	                data={data}
	                width={400}
	                height={400}
	                margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
      )
  }
}
