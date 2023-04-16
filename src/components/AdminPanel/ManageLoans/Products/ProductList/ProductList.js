import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from './Table';
import EditProduct from '../CreateUpdate/EditProduct';
import AddProduct from '../CreateUpdate/AddProduct';
import { Fetcher, SuccessBtn } from '../../../../../common';

function ProductList({data, extra}) {
  const {productId, setProductId} = extra;
  const [view, setView] = useState('list');
  const [selectedPrdct, setSelectedPrdct] = useState(null);
  const [products, setProducts] = useState(data);

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
          setProducts={setProducts}
        />
      </>
    )
  }else if (view === 'edit') {
    return (
      <Fetcher urls={['/loansapi/product_groups/', '/loansapi/list_fees/']} extra={{setView, productId}}>
        {({data, extra}) =>
          <EditProduct
            productGrps={data[0]}
            loanFees={data[1]}
            initialValues={selectedPrdct}
            setView={extra.setView}
            setSelectedPrdct={setSelectedPrdct}
            setProducts={setProducts}
          />}
      </Fetcher>
    )
  }
  return (
    <Fetcher urls={['/loansapi/product_groups/', '/loansapi/list_fees/']} extra={{setView, setProductId}}>
      {({data, extra}) => 
        <AddProduct
          productGrps={data[0]}
          loanFees={data[1]}
          setProducts={setProducts}
          setSelectedPrdct={setSelectedPrdct}
          setView={extra.setView}
          setProductId={extra.setProductId}
          reRenderProducts={extra.reRenderProducts}
        />}
    </Fetcher>
  )
}

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
