import Actions from './Actions';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BlocTabs from './BlocTabs';
import {statusClasses} from './data';

function MiniLoanDetails({loanData, extra}) {
  const {setLoanId, setLoanData} = extra;
  const [loan, setLoan] = useState(loanData);
  const loanType = loan.client_type === 'Clients' ? 'cli' : 'sol';

  return (
  
    <div id='loan-details'>
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          <div style={{marginBottom:'1rem'}}>
            <div style={{marginBottom:'1rem', display:'flex', justifyContent:'space-between'}}>
              <button className='btn btn-default' onClick={() => setLoanId(null)}>Close</button>
              <button className='btn btn-default max'>
                <Link to={`/loans/viewloans/loandetails/cli/${loan.id}`}>Max</Link>
              </button>
            </div>
            <div style={{marginBottom:'1rem', display:'flex', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:"5px"}}><b>{loan.client_fullname ? loan.client_fullname : loan.group_name}</b></span> /
                <span style={{margin: "0 5px"}}><b>{loan.loan_id}</b></span> /          
                <div style={{marginLeft:"5px"}}>
                  <button className={statusClasses[loan.status]}>{loan.status}</button>
                </div>
              </div>
              <Actions
                loan={loan}
                setLoanDetails={setLoan}
                setLoanId={setLoanId}
                setLoanData={setLoanData}
                loanType={loanType}
              />
            </div>
          </div>
          <BlocTabs loan={loan} setLoan={setLoan} client_name={loan.client_fullname ? loan.client_fullname : loan.group_name}/>
        </div>
      </div>
    </div>
  )
}

export default MiniLoanDetails;