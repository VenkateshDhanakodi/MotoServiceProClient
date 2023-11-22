import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import './WhyUsPage.css';
import quality from '../Assets/Images/why us/quality-of-work.jpg'
import experienceMechanic from '../Assets/Images/why us/experienced-mechanics.jpg'
import customeSatisfaction from '../Assets/Images/why us/customeSatisfaction.jpg'

function WhyUsPage() {
  const [smallScreen, setSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setSmallScreen(window.innerWidth < 350);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container className="why-us-container">
      <h2 className="text-center mt-4 mb-4" id='whyus'>Why Choose Us</h2>
      <Row>
        {/* Quality Service */}
        <Col md={4} className={` ${smallScreen ? 'mb-4' : 'mb-8'}`}>
          <Card className="text-center">
            <Image className='image-style' src={quality} alt="Quality Service" fluid />
            <Card.Body>
              <Card.Title>Quality Service</Card.Title>
              <Card.Text>
                We are committed to providing the highest quality of service to ensure your satisfaction.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Experienced Team */}
        <Col md={4} className={` ${smallScreen ? 'mb-4' : 'mb-8'}`}>
          <Card className="text-center">
            <Image className='image-style' src={experienceMechanic} alt="Experienced Team" fluid />
            <Card.Body>
              <Card.Title>Experienced Team</Card.Title>
              <Card.Text>
                Our team of experts has years of experience in the industry, ensuring reliable solutions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Customer Satisfaction */}
        <Col md={4} className={` ${smallScreen ? 'mb-4' : 'mb-8'}`}>
          <Card className="text-center">
            <Image className='image-style' src={customeSatisfaction} alt="Customer Satisfaction" fluid />
            <Card.Body>
              <Card.Title>Customer Satisfaction</Card.Title>
              <Card.Text>
                Your satisfaction is our top priority, and we go the extra mile to meet your needs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default WhyUsPage;
