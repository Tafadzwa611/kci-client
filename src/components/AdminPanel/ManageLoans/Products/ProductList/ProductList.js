import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import EditProduct from '../CreateUpdate/EditProduct';
import AddProduct from '../CreateUpdate/AddProduct';
import { Fetcher, SuccessBtn } from '../../../../../common';

function ProductList({products}) {
  const [view, setView] = useState('list');
  const [productId, setProductId] = useState(null);
  const [selectedPrdct, setSelectedPrdct] = useState(null);

  useEffect(() => {
    if (productId !== null) {
      const product = products.find(prd => prd.id == productId);
      setSelectedPrdct(product);
    }
  }, []);

  const handleClick = (e) => {
    const product = products.find(prd => prd.id == e.target.id);
    setSelectedPrdct(product);
  }

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Loan Product'}/>
        <Table
          setView={setView}
          products={products}
          selectedPrdct={selectedPrdct}
          handleClick={handleClick}
          setSelectedPrdct={setSelectedPrdct}
        />
      </>
    )
  }else if (view === 'edit') {
    return (
      <Fetcher urls={['/loansapi/product_groups/']} extra={{setView, productId}}>
        {({data, extra}) => <EditProduct
          productGrps={data[0]}
          initialValues={selectedPrdct}
          setView={extra.setView}
          setSelectedPrdct={setSelectedPrdct}
        />}
      </Fetcher>
    )
  }
  return (
    <Fetcher urls={['/loansapi/product_groups/']} extra={{setView, setProductId}}>
      {({data, extra}) => <AddProduct productGrps={data[0]} setView={extra.setView} setProductId={extra.setProductId}/>}
    </Fetcher>
  )
}

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
