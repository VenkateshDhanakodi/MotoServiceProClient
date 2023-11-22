import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Container, Form, Row, Col } from 'react-bootstrap';
import Checkout from './Checkout';

const stripePromise = loadStripe('pk_test_51O6vfpSBynZz5QNgUrOWSIkfV6KzwnO4PqJU8KxuX4UM89MdcMggJuRXhjQAUY3OSppeCMENFQWNVGj00PT1AVWI00rPP1P2yG'); // Replace with your actual Stripe public key

const CheckoutPage = ({ location }) => {
  if (!location || !location.state || !location.state.orderDetails) {
    console.error('Error: Missing or invalid order details.');
    return (
      <div style={{ marginTop: "3em" }}>
        <p>Loading or error handling...</p>
      </div>
    );
  }

  const { selectedServiceItems, category, customerDetails } = location.state.orderDetails;
  const { name: customerName, address: customerAddress, complaints } = customerDetails;
  
  return (
    <Container style={{ marginTop: "3em" }}>
      <h2>Checkout</h2>
      <Form>
        <Form.Group as={Row} controlId="customerName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Name on the Card" value={customerName} readOnly />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="customerAddress">
          <Form.Label column sm={2}>
            Address
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Customer Address" value={customerAddress} readOnly />
          </Col>
        </Form.Group>

        <h3>Selected Service Items:</h3>
        <ul>
          {selectedServiceItems.map((service, index) => (
            <li key={index}>
              {service.selected ? service.item.name : 'Not selected'}
            </li>
          ))}
        </ul>

        <p>Motorcycle Category: {category}</p>
      </Form>

      <Elements stripe={stripePromise}>
        <Checkout orderDetails={location.state.orderDetails} />
      </Elements>
    </Container>
  );
};

export default CheckoutPage;
