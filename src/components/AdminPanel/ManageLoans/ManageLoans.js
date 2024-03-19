import React, {useState} from 'react';
import Products from './Products/Products';
import Fees from './Fees/Fees';
import Collateral from './Collateral/Collateral';
import LoanControls from './LoanControls/LoanControls';

const ManageLoans = () => {
  const [tab, setTab] = useState('products');

  return (
    <>
      <div className='bloc-tabs'>
        <button className={tab === 'products' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('products')}>Loan Products</button>
        <button className={tab === 'fees' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('fees')}>Loan Fees</button>
        <button className={tab === 'collateral' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('collateral')}>Collateral</button>
        <button className={tab === 'controls' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('controls')}>Loan Controls</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:'3rem'}}>
        {{
          products: <Products />,
          fees: <Fees />,
          collateral: <Collateral />,
          controls: <LoanControls />,
        }[tab]}
      </div>
    </>
  )
}

export default ManageLoans;