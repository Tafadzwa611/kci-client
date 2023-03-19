import React from 'react';

function ProductDetails({product, close}) {
  return (
    <div style={{position:"sticky", top:"0", width:"100%"}}>
      <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">
        <div className="row" style={{marginBottom:"1.5rem", marginTop:"0"}}>
          <div className="col-12" style={{display:"flex", justifyContent:"flex-end"}}>
            <button><a onClick={close} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
          </div>
        </div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"30%"}}>
            <ul>
              <li>Product Name: {product.name}</li>
              <li>Product ID: {product.loan_product_id}</li>
              <li>Product Type: {product.product_category}</li>
              <li>Product Currency: {product.currency}</li>
              <li>Principal Range: {product.minimum_principal_amount} - {product.maximum_principal_amount}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
            <ul>
              <li>Interest Rate: {product.interest_rate}</li>
              <li>Interest Interval: {product.interest_interval}</li>
              <li>Loan Duration Time Unit: {product.loan_duration_time_unit}</li>
              <li>Disbursements Methods: {product.disbursement_method}</li>
              <li>Product Duration Range: {product.minimum_loan_duration} - {product.maximum_loan_duration}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
            <ul>
              <li>Interest Method: {product.interest_method}</li>
              <li>Grace Period: {product.grace_period}</li>
              <li>Payment Allocation Method: {product.payment_allocation_method}</li>
              <li>Date Created: {product.date_created}</li>
              <li>Created By: {product.created_by}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;