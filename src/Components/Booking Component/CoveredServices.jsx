import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicesRequest, fetchServicesSuccess, fetchServicesFailure } from '../../Redux/Reducers/serviceSlice';
import { Form, Col, Row, Button } from 'react-bootstrap';
import {setTotalAmount} from '../../Redux/Reducers/orderSlice'
export const CoveredServices = ({ category, onBookServiceClick }) => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);
  const [selectedServiceItems, setSelectedServiceItems] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchServicesRequest());
      try {
        const response = await fetch(`http://localhost:3377/service/${category}`);
        const data = await response.json();
        dispatch(fetchServicesSuccess(data.data));

        // Initialize selectedServiceItems array with initial values based on the category
        const initialSelection = Array(data.data.serviceItems.length).fill(category === 'General Services');
        setSelectedServiceItems(initialSelection);
      } catch (error) {
        dispatch(fetchServicesFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch, category]);

  const handleCheckboxChange = (index) => {
    setSelectedServiceItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = !updatedItems[index];
      return updatedItems;
    });
  };

  const handleButtonClick = () => {
    // Calculate the total amount based on the selected services
    const totalAmount = selectedServiceItems.reduce((total, service, index) => {
      return total + (service.selected ? services.serviceItems[index].price : 0);
    }, 0);
    // Dispatch the action to update total amount in the order slice redux
    dispatch(setTotalAmount(totalAmount));

    // Trigger the parent component's function
    if (typeof onBookServiceClick === 'function') {
      onBookServiceClick(); // Call the provided function
    }
  };

  return (
    <div className='book-services-bottom-page'>
      <h4 style={{ color: "steelblue" }}>
        {category === 'General Services'
          ? 'Covered Services'
          : category === 'Repairs'
          ? 'Select the Repair Items'
          : category === 'Upgrades'
          ? 'Select the Upgrade Items'
          : ''}
      </h4>
      <Form style={{ backgroundColor: "lightsteelblue" }}>
        <Row style={{ width: "100%", margin: "0 auto" }}>
          {services && services.serviceItems ? (
            services.serviceItems.map((item, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Form.Check
                  type="checkbox"
                  label={category === 'General Services'
                  ? item.name
                  : `${item.name} (Rs.${item.price})`}
                  checked={selectedServiceItems[index] || (category === "General Services")}
                  readOnly={category === "General Services"}
                  onChange={(e) => {
                    if (category !== "General Services") {
                      handleCheckboxChange(index);
                    }
                  }}
                />
              </Col>
            ))
          ) : (
            <div>Loading services...</div>
          )}
        </Row>
      </Form>
      <br></br>
      <div style={{textAlign: 'center'}}>
        <Button
          variant="primary"
          onClick={handleButtonClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Click to Book the service'}
        </Button>
      </div>
    </div>
  );
};

export const selectedServiceItems = []; // Export the selectedServiceItems array

export default CoveredServices; // You can still export it as the default export if needed
