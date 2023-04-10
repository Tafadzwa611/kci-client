import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MiniIncomeDetails({incomeDetails, extra, setIncomeId}) {
  const {setIncomeDetails} = extra;
  const navigate = useNavigate();

  useEffect(() => {
    setIncomeDetails(incomeDetails);
  }, []);

  return (
    <div style={{position:"sticky", top:"0", width:"100%"}}>
      <div style={{display:"flex", flexDirection:"column", padding:"1.5rem"}} className="j-details-container">

        <div className="row" style={{marginBottom:"1.5rem", marginTop:"0"}}>
            <div className="col-12" style={{display:"flex", justifyContent:"space-between"}}>
              <button className='btn btn-olive' onClick={() => navigate({pathname: '/otherincome/viewotherincome', search: `?income_id=${incomeDetails.id}`})}>
                Max
              </button>
              <div style={{display:"flex", columnGap: "10px"}}>
                <button><a onClick={e => setIncomeId(null)} className="btn btn-default" style={{borderRadius:"0"}}>Close</a></button>
                <button><a className="btn btn-olive" id="delete" value={incomeDetails.id} onClick={console.log('delete')}>Delete</a></button>
              </div>
            </div>
        </div>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <div style={{width:"30%"}}>
            <ul>
                <li>Other Income Name: {incomeDetails.otherincome_name}</li>
                <li>Other Income Type: {incomeDetails.income_type}</li>
                <li>Other Income Type: {incomeDetails.currency} {incomeDetails.income_amount}</li>
            </ul>
        </div>
        <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"center"}}>
            <ul>
                <li>Reference: {incomeDetails.reference}</li>
                <li>Date Created: {incomeDetails.date_created}</li>
                <li>Created By: {incomeDetails.created_by}</li>
            </ul>
        </div>
        <div style={{width:"30%", display:"flex", alignItems:"start", justifyContent:"end"}}>
            <ul>
                <li>Other Income Date: {incomeDetails.income_date}</li>
                <li>Description: {incomeDetails.description}</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MiniIncomeDetails;