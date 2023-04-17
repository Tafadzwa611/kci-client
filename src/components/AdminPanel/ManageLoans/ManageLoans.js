import React, {useState} from 'react';
import Products from './Products/Products';
import ProductCategories from './ProductCategories/ProductCategories';
import Fees from './Fees/Fees';

const ManageLoans = () => {
  const [tab, setTab] = useState('products');

  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'products' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('products')}>Loan Products</button>
        <button className={tab === 'categories' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('categories')}>Product Categories</button>
        <button className={tab === 'fees' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('fees')}>Loan Fees</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {{
          'products': <Products />,
          'categories': <ProductCategories />,
          'fees': <Fees />,
        }[tab]}
      </div>
    </>
  )
}

export default ManageLoans;