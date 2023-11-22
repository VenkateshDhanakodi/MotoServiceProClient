import React from 'react';
import HomePageImage from './HomePageImage';
import WhyUsPage from './WhyUsPage';
import ServicesPage from './Service Component/ServicesPage';
import ContactUsPage from './ContactUsPage';

function HomePage() { 
  return (
    <div className='homePage container-fluid'>
      <div id='home'>
        <HomePageImage />
      </div>
      <div id='whyus'>
        <WhyUsPage />
      </div>
      <div id='services'>
        <ServicesPage />
      </div>
      <div id='contact'>
        <ContactUsPage />
      </div>
    </div>
  );
}

export default HomePage