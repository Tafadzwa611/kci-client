import React, { useEffect } from 'react';

function IncomeDetails({incomeDetails}) {

  useEffect(() => {
    const element = document.getElementById('loan-details');
    element.scrollIntoView({ behavior: 'instant' });
  }, []);


  return (
    <div id='loan-details'>
      <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"30%"}}>
            <ul>
                <li>Other Income Name: {incomeDetails.otherincome_name}</li>
                <li>Other Income Type: {incomeDetails.inc_type}</li>
                <li>Other Income Type: {incomeDetails.currency_code} {incomeDetails.income_amount}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
            <ul>
                <li>Reference: {incomeDetails.reference}</li>
                <li>Date Created: {incomeDetails.db_date_created}</li>
                <li>Created By: {incomeDetails.created_by_username}</li>
            </ul>
          </div>
          <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
            <ul>
                <li>Other Income Date: {incomeDetails.db_income_date}</li>
                <li>Description: {incomeDetails.description}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeDetails;