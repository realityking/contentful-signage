import React, { Component, PropTypes } from 'react';

export default class Clock extends Component {
  static propTypes = {
    locale: React.PropTypes.string,
    showDate: React.PropTypes.bool,
    hour12: React.PropTypes.string,
    timeZone: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  static defaultProps = {
    locale: "de-DE",
    showDate: false,
    hour12: false,
    timeZone: "Europe/Berlin"
  };

  componentDidMount() {
    this.loadInterval = setInterval(
      () => this.tick, 1000
    );
  };

  componentWillUnmount() {
    clearInterval(this.loadInterval);
  };

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    let dateString = '';
    if (this.props.showDate) {
      dateString = <span className="date">{this.state.date.toLocaleDateString(this.props.locale, {year: 'numeric', month: 'long', day: '2-digit'})}</span>;
    }

    return (
        <div className="clock">
          <span className="time">
            {this.state.date.toLocaleTimeString(this.props.locale, {hour: "2-digit", minute: "2-digit", hour12: this.props.hour12, timeZone: this.props.timeZone})}
          </span>
          {dateString}
        </div>);
  }
}
