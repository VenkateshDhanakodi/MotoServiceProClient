import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
// import Slide1 from '../Assets/Images/Bike_mechanic.jpg';
import Slide1 from '../Assets/Images/maybe-homepage-bg.jpg';
import Slide2 from '../Assets/Images/repairs.jpg';
import Slide3 from '../Assets/Images/man-fixing-motorcycle-modern-workshop1.jpg';
import './HomePageImage.css'

function HomePageImage() {
  const imageStyle = {
    height: '90vh',
  };

  return <div>
    <Carousel id='home'>
      <Carousel.Item interval={3000}>
        <Image
          className="d-block w-100 carouselImage"
          src={Slide1}
          alt="General Services"
          style={imageStyle}
          fluid
        />
        <Carousel.Caption className='captions'>
          <h1><span>Welcome to MotoProServices</span></h1>
          <h5><span>Your Trusted Partner for Motorcycle Services</span></h5>
          <a href="#features" className="btn btn-primary">
            Explore Services
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <Image
          className="d-block w-100 carouselImage"
          src={Slide2}
          alt="Motorcycle Repair"
          style={imageStyle}
          fluid
        />
        <Carousel.Caption className='captions'>
          <h1><span>Expert Motorcycle Repairs</span></h1>
          <h5><span>Our skilled technicians ensure top-notch repairs and services.</span></h5>
          <a href="#features" className="btn btn-primary">
            View Popular Repairs
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <Image
          className="d-block w-100 carouselImage"
          src={Slide3}
          alt="Motorcycle Upgrades"
          style={imageStyle}
          fluid
        />
        <Carousel.Caption className='captions'>
          <h1><span>Upgrade Your Ride</span></h1>
          <h5><span>Explore our upgrade options for an enhanced experience.</span></h5>
          <a href="#features" className="btn btn-primary">
            View Upgrades
          </a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
}

export default HomePageImage;
