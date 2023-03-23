import React, { useState } from 'react';
import ProductList from './ProductList/ProductList';
import { Fetcher } from '../../../../common';

const Products = () => {
  const [productId, setProductId] = useState(null);
  return (
    <>
      <Fetcher urls={['/loansapi/loan_products_list/']} extra={{productId, setProductId}}>
        {({data, extra}) => <ProductList data={data[0]} extra={extra}/>}
      </Fetcher>
    </>
  )
}

export default Products;