import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';

function ProductList({products}) {
  const [selectedPrdct, setSelectedPrdct] = useState(null);

  const handleClick = (e) => {
    const product = products.find(prd => prd.id == e.target.id);
    setSelectedPrdct(product);
  }

  return (
    <Table
      products={products}
      selectedPrdct={selectedPrdct}
      handleClick={handleClick}
      setSelectedPrdct={setSelectedPrdct}
    />
  )
}

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;