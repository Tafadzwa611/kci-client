import React, { useState } from 'react';
import ProductList from './ProductList/ProductList';
import AddProduct from './Add Product/AddProduct';
import { Fetcher, SuccessBtn } from '../../../../common';

const Products = () => {
  const [view, setView] = useState('list');
  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Loan Product'}/>
        <Fetcher urls={['/loansapi/loan_products_list/']}>
          {({data}) => <ProductList products={data[0].loan_products}/>}
        </Fetcher>
      </>
    )
  }
  return (
    <Fetcher urls={['/loansapi/product_groups/']} extra={{setView}}>
      {({data, extra}) => <AddProduct productGrps={data[0]} setView={extra.setView}/>}
    </Fetcher>
  )
}

export default Products;