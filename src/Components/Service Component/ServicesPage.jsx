import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import ServiceCategories from './ServiceCategories';
import ServiceDetails from './ServiceDetails';
import engineOil from '../../Assets/Images/Service Images/general/engineOil1.jpg';
import oilFilter from '../../Assets/Images/Service Images/general/oilFilter1.jpg';
import airFilter from '../../Assets/Images/Service Images/general/airFilter1.jpg';
import carburetor from '../../Assets/Images/Service Images/general/carburetor1.jpg';
import sparkPlug from '../../Assets/Images/Service Images/general/sparkPlug1.jpg';
import brake from '../../Assets/Images/Service Images/general/brake1.jpg';
import clutch from '../../Assets/Images/Service Images/general/clutch1.jpg';
import chainSproket from '../../Assets/Images/Service Images/general/chainSproket1.jpg';
import bikeWashPolish from '../../Assets/Images/Service Images/general/bikeWashPolish1.jpg';
import './ServicesPage.css';

import overhaul from '../../Assets/Images/Service Images/repair/overhaul.jpg';
import brakeSystem from '../../Assets/Images/Service Images/repair/brakeSystem.jpg';
import tireReplacement from '../../Assets/Images/Service Images/repair/tireReplacement.jpg';
import chainSprocketsRepair from '../../Assets/Images/Service Images/repair/chainSprocketsRepair.jpg';
import electricalSystem from '../../Assets/Images/Service Images/repair/electricalSystem.jpg';
import suspensionTuning from '../../Assets/Images/Service Images/repair/suspensionTuning.jpg';
import carburetorRepair from '../../Assets/Images/Service Images/repair/carburetorRepair.jpg';
import clutchRepair from '../../Assets/Images/Service Images/repair/clutchRepair.jpg';
import oilFilterChange from '../../Assets/Images/Service Images/repair/oilFilterChange.jpg';
import batteryreplacement from '../../Assets/Images/Service Images/repair/batteryreplacement.jpg';

import ExhaustSystems from '../../Assets/Images/Service Images/upgrade/ExhaustSystems.jpg';
import suspensionComponent from '../../Assets/Images/Service Images/upgrade/suspensionComponent.jpg';
import tires from '../../Assets/Images/Service Images/upgrade/tires.jpg';
import brakeComponent from '../../Assets/Images/Service Images/upgrade/brakeComponent.jpg';
import airFilters from '../../Assets/Images/Service Images/upgrade/airFilters.jpg';
import HandlebarControls from '../../Assets/Images/Service Images/upgrade/HandlebarControls.jpg';
import seats from '../../Assets/Images/Service Images/upgrade/seats.jpg';
import lights from '../../Assets/Images/Service Images/upgrade/lights.jpg';
import SprocketsChains from '../../Assets/Images/Service Images/upgrade/SprocketsChains.jpg';
import EngineTuning from '../../Assets/Images/Service Images/upgrade/EngineTuning.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicesRequest, fetchServicesSuccess, fetchServicesFailure } from '../../Redux/Reducers/serviceSlice';

function ServicesPage() {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchServicesRequest());
      try {
        const response = await fetch('http://localhost:3377/service');
        const data = await response.json();
        dispatch(fetchServicesSuccess(data.data));
      } catch (error) {
        dispatch(fetchServicesFailure(error.message));
      }
    };
  
    fetchData();
  }, [dispatch]);
  
// const genItems = services[0].serviceItems;
// const generalItems = genItems.map((e)=>{
//   return e
// })
// const allServiceDescription = services.map((e)=>{
//   return e.serviceItems
// })

// const generalServiceDescription = allServiceDescription[0];
// const generalServiceItemsDescription = {};
// generalServiceDescription.forEach((e, i) => {
//   generalServiceItemsDescription["description" + (i + 1)] = e;
// });
// console.log(generalServiceItemsDescription);

// console.log(generalItems);
  const generalServiceItems = [
    { image: engineOil, description: 'Engine Oil Change' },
    { image: oilFilter, description: 'Oil Filter Change' },
    { image: airFilter, description: 'Air Filter Cleaning' },
    { image: carburetor, description: 'Carburettor Cleaning' },
    { image: brake, description: 'Brake Cleaning' },
    { image: clutch, description: 'Clutch Adjustment' },
    { image: chainSproket, description: 'Chain Sprocket Adjustment' },
    { image: sparkPlug, description: 'Spark Plug Cleaning' },
    { image: bikeWashPolish, description: 'Bike Wash and Polish' }
  ];
  
  const repairsServiceItems = [
    { image: overhaul, description: 'Engine Overhaul' },
    { image: brakeSystem, description: 'Brake Repair' },
    { image: tireReplacement, description: 'Tire Replacement' },
    { image: chainSprocketsRepair, description: 'Chain and Sprocket Replacement' },
    { image: electricalSystem, description: 'Electrical System Repair' },
    { image: suspensionTuning, description: 'Suspension Tuning' },
    { image: carburetorRepair, description: 'Carburetor and Fuel System Service' },
    { image: clutchRepair, description: 'Clutch Adjustment or Replacement' },
    { image: oilFilterChange, description: 'Oil and Filter Change' },
    { image: batteryreplacement, description: 'Battery Replacement' }
  ];
  
  const upgradesServiceItems = [
    { image: ExhaustSystems, description: 'Exhaust Systems' },
    { image: suspensionComponent, description: 'Suspension' },
    { image: tires, description: 'Tires' },
    { image: brakeComponent, description: 'Brakes' },
    { image: airFilters, description: 'Air Filters' },
    { image: HandlebarControls, description: 'Handlebars and Controls' },
    { image: seats, description: 'Seats' },
    { image: lights, description: 'Lights' },
    { image: SprocketsChains, description: 'Sprockets and Chains' },
    { image: EngineTuning, description: 'Engine Tuning' }
  ];
  
  // Define descriptions for each service category
  const serviceDescriptions = {
    'General Services': 'Our General Services are designed to keep your vehicle running smoothly. From routine oil changes to air filter cleaning, we provide essential maintenance to ensure your vehicle\'s longevity and performance. Trust our experienced mechanics to provide top-notch service for your everyday needs.',
    'Repairs': 'When your vehicle encounters unexpected issues, our Repair services have you covered. Our skilled technicians are equipped to diagnose and fix a wide range of problems, from brake issues to engine troubles. We prioritize safety and quality, so you can get back on the road with confidence.',
    'Upgrades': 'Looking to enhance your vehicle\'s performance or appearance? Our Upgrades category offers a range of options to personalize and optimize your ride. Whether it is adding advanced features or giving your vehicle a sleek makeover, we are here to help you take your driving experience to the next level.'
  };
  
  const serviceListTag = {
    'General Services': "List Of General Services",
    'Repairs': "List of popular Repairs",
    'Upgrades': "List of popular Upgrades"
  }
  const currentDate = new Date();
  const time = currentDate.getTime();

  const categories = Array.isArray(services) ? services.map((e) => e.name) : [];

  const [selectedCategory, setSelectedCategory] = useState('General Services');
  const [showServiceDetails, setShowServiceDetails] = useState(true);
  const [selectedServiceItems, setSelectedServiceItems] = useState(generalServiceItems);
  const [description, setDescription] = useState(serviceDescriptions['General Services']);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowServiceDetails(true);

    if (category === 'Repairs') {
      setSelectedServiceItems(repairsServiceItems);
    } else if (category === 'Upgrades') {
      setSelectedServiceItems(upgradesServiceItems);
    } else {
      setSelectedServiceItems(generalServiceItems);
    }

    setDescription(serviceDescriptions[category]);
  };

  return (
    <Container>
            {loading ? (
        <p>Loading...</p>
      ) : (<>
      <h2 className="mt-4 mb-4" id="features">Our Services</h2>

      {/* Service Categories UI */}
      <ServiceCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategoryClick}
      />

      {/* Service Details */}
      {showServiceDetails && (
        <ServiceDetails
          category={selectedCategory}
          description={description}
          image={`img/${selectedCategory.replace(' ', '-').toLowerCase()}.png`}
        />
      )}

      <div className="list-of-services mt-4">
        <p className="text-center inclusion">{serviceListTag[selectedCategory]}</p>
        <div className="row last-row-container">
          {selectedServiceItems?.map((item, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-4 col-sm-6 mb-3"
            >
              <div className="card service-card d-flex flex-column">
                <img
                  src={item.image}
                  className="card-img-top service-item-image"
                  alt={item.description}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center flex-grow-1">
                  <h5 className="card-title">{item.description}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>)}
    </Container>
  );
}

export default ServicesPage;
