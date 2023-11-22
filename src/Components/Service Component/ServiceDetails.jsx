import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Lottie from "lottie-react";
import aniGeneralService from "../../Assets/Animation/certified-mechanic.json";
import aniRepair from "../../Assets/Animation/bike-tyre-repair.json";
import aniUpgrade from "../../Assets/Animation/speedUp.json";
import '../AnimatePage.css';
import './serviceDetails.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

function ServiceDetails({ category, description }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let ani;
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      navigate(`service-booking/${category}`);
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  switch (category) {
    case "General Services":
      ani = aniGeneralService;
      break;
    case "Repairs":
      ani = aniRepair;
      break;
    case "Upgrades":
      ani = aniUpgrade;
      break;
    default:
      ani = aniGeneralService;
      break;
  }
  const navigate = useNavigate();
  return (
    <Container className="ServiceDetails">
      <Row className="mt-4">
        <Col sm={12} md={6}>
          <Lottie animationData={ani} className='animate' />
        </Col>
        <Col sm={12} md={6}>
          <h2 className="mt-4 mb-4">{category}</h2>
          <p className='service-details-description'>{description}</p>
          <button className="btn btn-primary" onClick={handleButtonClick}>
            Book {category}
          </button>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Sign In Required</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p> Please Sign in to Book The {category} ! </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" style={{ marginTop: "1em" }} onClick={() => navigate('/signin')}>
                Sign In
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default ServiceDetails;
