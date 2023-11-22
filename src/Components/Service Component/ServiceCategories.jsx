import React from 'react';
import Button from 'react-bootstrap/Button';

function ServiceCategories({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="service-categories">
      <div className="d-flex">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? 'primary' : 'outline-primary'}
            onClick={() => onSelectCategory(category)}
            className="flex-fill mr-2 mb-2"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ServiceCategories;
