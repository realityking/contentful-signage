import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import Slide from './Slide';

export default class MainSection extends Component {
  static propTypes = {
    slides: PropTypes.func.isRequired
  };

  render() {
    var settings = {
      dots: false,
      arrows: false,
      infinite: true,
      draggable: false,
      swipeToSlide: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    };

    return(<div id="mainSection">
      <div style={{width: '100%'}}>
        <Slider {...settings}>
          {this.props.slides.map(function(slide) {
            return <div><Slide type={slide.type} data={slide.data}/></div>;
          })}
        </Slider>
      </div>
    </div>)
  }
};
