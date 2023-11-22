//navBar.js file 123
import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../Assets/Icons/iconizer-MotroProServiceIcon.svg';
import './NavBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from '../Redux/Reducers/authSlice';

function NavBar() {
  const [showFullBrand, setShowFullBrand] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { isAuthenticated, userName } = useSelector((state) => state.auth);

  const toggleNavbar = () => {
    if (isAuthenticated) {
      dispatch(clearAuth()); // Dispatch the clearAuth action to clear the Redux store state
      navigate('/');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setShowFullBrand(window.innerWidth >= 400);
    };

    // Initial check
    handleResize();

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Navbar data-bs-theme="dark" fixed="top" id='header navbar-header' expand="lg">
      <Container fluid className='navbackground'>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={Icon}
            width="100"
            height="60"
            className="d-inline-block align-center title"
          />&nbsp;
          {showFullBrand ? (
            <span className="brand">
              <span className="highlight">M</span>oto<span className="highlight">P</span>ro
              <span className="highlight">S</span>ervices
            </span>
          ) : (
            ""
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link to='/' className='nav-link' onClick={() => scrollToSection('home')}>
              Home
            </Link>
            <Link to='/' className='nav-link' onClick={() => scrollToSection('whyus')}>
              Why Us
            </Link>
            <Link to='/' className='nav-link' onClick={() => scrollToSection('services')}>
              Services
            </Link>
            <Link to='/' className='nav-link' onClick={() => scrollToSection('contact')}>
              Contact Us
            </Link>
            {isAuthenticated ? (
              <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {userName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/mybookings' className='user-name-dropdown'>
                  My Bookings
                </Dropdown.Item>
                <Dropdown.Item onClick={toggleNavbar} className='user-name-dropdown'>
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            ) : (
              <Link to='/signin' className='nav-link signIn'>
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
