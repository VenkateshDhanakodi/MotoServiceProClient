import Dropdown from 'react-bootstrap/Dropdown';
import './BookService.css';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
    fetchMotorcyclesRequest,
    fetchMotorcyclesSuccess,
    fetchMotorcyclesFailure,
    fetchModelsSuccess,
    setSelectedBrand,
    fetchBrandsSuccess,
    setModels
} from "../../Redux/Reducers/motorcycleSlice";
import CoveredServices from './CoveredServices';
import { updateOrderDetailsAsync } from '../../Redux/Reducers/Actions/orderActions';
import {selectedServiceItems} from './CoveredServices';
function BookService() {
    let { category } = useParams();
    const dispatch = useDispatch();
    const motorcycles = useSelector((state) => state.motorcycles);
    const [selectedBrandText, setSelectedBrandText] = useState('');
    const [selectedModelText, setSelectedModelText] = useState('');
    const [localCustomerName, setLocalCustomerName] = useState('');
    const [localSelectedServices, setLocalSelectedServices] = useState([]);
    const [localTotalAmount, setLocalTotalAmount] = useState(0);  
    const [localCustomerAddress, setLocalCustomerAddress] = useState({
      street: '',
      apartment: '',
      city: 'Erode', // Default city
      zipCode: '',
    });
  
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: {
          street: '',
          apartment: '',
          city: '',
          zipCode: '',
        },
        complaints: '', // Define complaints in customerDetails
      });
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            dispatch(fetchMotorcyclesRequest());
            const response = await fetch("http://localhost:3377/motorCycles");
            const responseData = await response.json();
            if (Array.isArray(responseData.data)) {
              const formattedData = responseData.data.map((item) => ({
                id: item._id,
                brand: item.brand,
                models: item.model,
              }));
              dispatch(fetchMotorcyclesSuccess(formattedData));
      
              const brands = formattedData.map((item) => item.brand);
              dispatch(fetchBrandsSuccess(brands));
      
              const models = formattedData.find((item) => item.brand === brands[0]).models;
              dispatch(fetchModelsSuccess(models));
              dispatch(setSelectedBrand(brands[0]));
      
              let authData = localStorage.getItem("authData");
              let userName = authData ? JSON.parse(authData).userName : '';
      
              // Update localCustomerName
              setLocalCustomerName(userName);
      
              // Update customerDetails
              setCustomerDetails((prevDetails) => ({
                ...prevDetails,
                name: userName,
                address: { ...prevDetails.address, city: 'Erode' }, // Include the complete address
              }));
            } else {
              dispatch(fetchMotorcyclesFailure("Invalid data format"));
            }
          } catch (error) {
            dispatch(fetchMotorcyclesFailure(error.message));
          }
        };
      
        fetchData();
      }, [dispatch, category]);

    const handleBrandSelection = async (selectedBrand) => {
        try {
            dispatch(setSelectedBrand(selectedBrand));
            setSelectedBrandText(selectedBrand); // Set the selected brand text
            dispatch(fetchMotorcyclesRequest());
            const response = await fetch(`http://localhost:3377/motorCycles/${selectedBrand}`);
            const responseData = await response.json();
            if (Array.isArray(responseData.brandModels)) {
                const models = responseData.brandModels[0].model;
                dispatch(setModels(models));
                dispatch(fetchModelsSuccess(models));
            } else {
                dispatch(fetchMotorcyclesFailure("Invalid data format"));
            }
        } catch (error) {
            dispatch(fetchMotorcyclesFailure(error.message));
        }
    };

    const selectedBrand = useSelector((state) => state.motorcycles.selectedBrand);
    const models = useSelector((state) => state.motorcycles.models);

    const handleModelSelection = (selectedModel) => {
        setSelectedModelText(selectedModel);
    };

    const handleBookServiceClick = async() => {
      
        // Validate if the required fields are filled
        if (!localCustomerName || !localCustomerAddress.street || !localCustomerAddress.zipCode) {
          // Handle the case where customer details are incomplete
          console.error('Validation check failed. Exiting...');
          return;
        }
            
        // Dispatch customer details to Redux
        const details = {
          orderDetails: {
            name: localCustomerName,
            address: { ...localCustomerAddress },
            complaints: customerDetails.complaints, // Add other relevant details as needed
          },
          selectedServiceItems
        };
        try {
          // dispatch(setCustomerDetails(details));
          dispatch(updateOrderDetailsAsync(details));
        } catch (error) {
          console.log(error);
        }  // Dispatch the action to update customer details
        // setLocalCustomerDetails(details);

        console.log('After setting customer details:');
        console.log('customerDetails:', details);
      
        // Navigate to checkout page
        console.log('orderDetails:', details);
        navigate('/checkout', {
          state: {
            orderDetails: details,
            selectedServiceItems
          },
        });
            };
          
      const handleComplaintsChange = (e) => {
        // Update customer complaints
        setCustomerDetails((prevDetails) => ({
          ...prevDetails,
          complaints: e.target.value,
        }));
      };   
    
      const handlePickupAddressChange = (field, value) => {
        console.log('Field:', field);
        console.log('Value:', value);      
        // Update the localCustomerAddress state based on the field and value
        setLocalCustomerAddress((prevAddress) => ({
          ...prevAddress,
          [field]: value,
        }));
      
        // Update the customerDetails state directly
        setCustomerDetails((prevDetails) => ({
          ...prevDetails,
          address: {
            ...prevDetails.address,
            [field]: value,
          },
        }));
      };
                    
      const handleApartmentChange = (e) => {
        // Update customer address - apartment
        setLocalCustomerAddress((prevAddress) => ({
          ...prevAddress,
          apartment: e.target.value,
        }));
      };
    
      const handleCityChange = (e) => {
        // Update customer address - city
        setLocalCustomerAddress((prevAddress) => ({
          ...prevAddress,
          city: e.target.value,
        }));
      };
    
      const handleZipCodeChange = (e) => {
        // Update customer address - zip code
        setLocalCustomerAddress((prevAddress) => ({
          ...prevAddress,
          zipCode: e.target.value,
        }));
      };    

    return (
        <div className='container-fluid book-service-wrapper'>
        <div className='book-services-top-page'>
        <h4>Enter The Details to Book The Service</h4>
        <div className='heading'>
            <div>
                <h5 id='category-offer-price'>{`${category} Booking`} &nbsp;
                    <span className='door-step'>Free door step pick up and drop off</span>
                    <span className='price'>{category === "General Services" ? `@ Rs.1100 Only` : "Rate will be updated when order is placed"}</span>
                </h5>
            </div>
        </div>
        <ol className='bike-details-selection'>
            <li className='bike-details-selection-li'>
                <div>
                    <h5>Brand</h5>
                    <div style={{ position: 'relative' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" required>
                                {selectedBrandText || 'Select Brand'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='drop-down'>
                                {motorcycles.brands.map((brand, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleBrandSelection(brand)}>
                                        {brand}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </li>
            <li className='bike-details-selection-li'>
                <div>
                    <h5>Model</h5>
                    <div style={{ position: 'relative' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" required>
                                {selectedModelText || 'Select Model'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='drop-down'>
                                {models.map((model, index) => (
                                    <Dropdown.Item key={index} onClick={() => handleModelSelection(model)}>
                                        {model}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </li>
            <li className='address-li bike-details-selection-li'>
                <div>
                    <h5>Complaints</h5>
                    <div className='complaints'>
                        <Form.Group as={Row} controlId="formGridAddress1" className='address-field complaints'>
                            <Col sm={10}>
                                <Form.Control placeholder="Enter specific complaints" className='complaints-inputbox' onChange={handleComplaintsChange}/>
                            </Col>
                        </Form.Group>
                    </div>
                </div>
            </li>
            <li className='address-li bike-details-selection-li'>
                <div>
                    <h5>Pick Up Address</h5>
                    <div className='address-item'>
                        <Form.Group as={Row} controlId="formGridAddress1" className='address-field'>
                            <Col sm={10}>
                            <Form.Control placeholder="123 Main St" onChange={(e) => handlePickupAddressChange("street", e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridAddress2" className='address-field'>
                                <Col sm={10}>
                                    <Form.Control placeholder="Apartment, studio, or floor" onChange={handleApartmentChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formGridCity" className='address-field'>
                                <Col sm={10}>
                                    <Form.Control placeholder="city" defaultValue={"Erode"} readOnly={true} onChange={handleCityChange}/>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="formGridZip" className='address-field'>
                                <Col sm={10}>
                                    <Form.Control placeholder="zip code" onChange={handleZipCodeChange}/>
                                </Col>
                            </Form.Group>
                        </div>
                    </div>
                </li>
            </ol>
            </div>
            <CoveredServices category={category} onBookServiceClick={handleBookServiceClick} />
        </div>
    )
}

export default BookService;
