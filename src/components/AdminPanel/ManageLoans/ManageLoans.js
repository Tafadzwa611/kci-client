import React, {useState} from 'react';
import Products from './Products/Products';
import ProductCategories from './ProductCategories/ProductCategories';
import Fees from './Fees/Fees';
import Collateral from './Collateral/Collateral';

const ManageLoans = () => {
  const [tab, setTab] = useState('products');

  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'products' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('products')}>Loan Products</button>
        <button className={tab === 'categories' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('categories')}>Product Categories</button>
        <button className={tab === 'fees' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('fees')}>Loan Fees</button>
        <button className={tab === 'collateral' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('collateral')}>Collateral</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {{
          'products': <Products />,
          'categories': <ProductCategories />,
          'fees': <Fees />,
          'collateral': <Collateral />,
        }[tab]}
      </div>
    </>
  )
}

export default ManageLoans;