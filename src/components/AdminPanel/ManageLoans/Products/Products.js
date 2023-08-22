import React from 'react';
import ProductList from './ProductList/ProductList';
import { Fetcher } from '../../../../common';

const Products = () => {
  return (
    <Fetcher urls={['/loansapi/loan_products_list/']}>
      {({data}) => <ProductList data={data[0]}/>}
    </Fetcher>
  )
}

export default Products;