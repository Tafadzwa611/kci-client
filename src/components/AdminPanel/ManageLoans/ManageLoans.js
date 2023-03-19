/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import Products from './Products/Products';

const ManageLoans = () => {
  const [tab, setTab] = useState('products');

  return (
    <>
      <div className="bloc-tabs">
        <button className={tab === "products" ? "tabs-client active-tabs" : "tabs-client"} onClick={e => setTab("products")}>Loan Products</button>
      </div>
      <div className='tab-content font-12' style={{marginTop:"3rem"}}>
        {{
          'products': <Products setMainTab={setTab}/>,
        }[tab]}
      </div>
    </>
  )
}

export default ManageLoans;