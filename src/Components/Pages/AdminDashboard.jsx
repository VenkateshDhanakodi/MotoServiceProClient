import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/api/bookings')
      .then(response => {
        const updatedBookings = response.data.map(booking => ({ ...booking, status: 'Open' }));
        setBookings(updatedBookings);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleButtonClick = (id) => {
    setBookings(prevBookings => {
      return prevBookings.map(booking => {
        if (booking._id === id) {
          return { ...booking, status: 'Closed' };
        } else {
          return booking;
        }
      });
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Admin Dashboard</h1>
          <h2>Total Bookings: {bookings.length}</h2>
        </Col>
      </Row>
      {bookings.map(booking => (
        <Row key={booking._id}>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Booking ID: {booking._id}</Card.Title>
                <Card.Text>User: {booking.user}</Card.Text>
                <Card.Text>Service: {booking.service}</Card.Text>
                <Card.Text>Amount Paid: {booking.amountPaid}</Card.Text>
                <Button
                  onClick={() => handleButtonClick(booking._id)}
                  variant={booking.status === 'Open' ? 'success' : 'danger'}
                >
                  {booking.status}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default AdminDashboard;
