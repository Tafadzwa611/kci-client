import React, {useState} from 'react';
import DeleteProduct from './DeleteProduct';
import GeneralProductInfo from './GeneralProductInfo';
import Fees from './Fees';
import Forms from './Forms';

function ProductDetails({product, close, setView, setProducts}) {
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [tab, setTab] = useState('details');

  return (
    <div style={{position:"sticky", top:"0", width:"100%"}}>
      <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">
        {openDeleteProduct && <DeleteProduct setOpenDeleteProduct={setOpenDeleteProduct} setProducts={setProducts} close={close} name={product.name} productId={product.id}/>}
        <div className="row" style={{marginBottom:"1.5rem", marginTop:"0"}}>
          <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
            <button><a onClick={close} className="btn btn-default client__details" style={{borderRadius:"0"}}>Close</a></button>
            <div style={{display:"flex", columnGap: "5px"}}>
              <button className="btn btn-olive" onClick={() => setView('edit')}>Edit</button>
              <button className="btn btn-olive" onClick={() => setOpenDeleteProduct(true)}>Delete</button>
            </div>
          </div>
        </div>
        <div className='bloc-tabs'>
          <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}>Product Info</button>
          <button className={tab === 'fees' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('fees')}>Fees</button>
          <button className={tab === 'forms' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('forms')}>Forms</button>
        </div>
        {{
          details: <GeneralProductInfo product={product} close={close} setView={setView}/>,
          fees: <Fees fees={product.fees} allow_editing_fees_on_loan_creation={product.allow_editing_fees_on_loan_creation}/>,
          forms: <Forms custom_forms={product.custom_forms}/>
        }[tab]}
      </div>
    </div>
  )
}

export default ProductDetails;
