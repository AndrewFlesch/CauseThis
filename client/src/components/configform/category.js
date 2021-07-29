import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';

const Category = ({
items,
category
}) => {

return (
  <div className="categorysection">
  <h2>{category}</h2>
    {items.map((item) => (
      <Button
        fullArray={item}
        key={item._id}
      />
    ))}
  </div>
)

}

Category.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Category;
