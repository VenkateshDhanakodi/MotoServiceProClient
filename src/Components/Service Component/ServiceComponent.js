import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicesRequest, fetchServicesSuccess, fetchServicesFailure } from '../../Redux/Reducers/serviceSlice';
import { port } from '../../App'
const ServiceComponent = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchServicesRequest());
      try {
        // Fetching data from the API endpoint
        const response = await fetch(`${port}/service`);
        const data = await response.json();
        dispatch(fetchServicesSuccess(data.data));
      } catch (error) {
        dispatch(fetchServicesFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div style={{ marginTop: "5em" }}>
      <h1>Services</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <strong>{service.name}</strong>: {service.description} - Price: {service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceComponent;
