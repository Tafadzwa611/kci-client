import Actions from './Actions';
import { statusClasses } from './data';
import React, { useState } from 'react';
import BlocTabs from './BlocTabs';

function LoanDetails({loanApiData}) {
  const [loan, setLoan] = useState(loanApiData);
  const loanType = loan.client_type === 'Clients' ? 'cli' : 'sol';

  return (
    <div id='loan-details'>
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          <div style={{marginBottom:'1rem'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:'5px'}}><b>{loan.client_fullname ? loan.client_fullname : loan.group_name}&apos;s</b> Loan Details</span> /
                <span style={{margin: "0 5px"}}><b>{loan.loan_id}</b></span> /          
                <div style={{marginLeft:'5px'}}>
                  <button className={statusClasses[loan.status]}>{loan.status}</button>
                </div>
              </div>
              <Actions loan={loan} setLoanDetails={setLoan} loanType={loanType}/>
            </div>
          </div>
          <BlocTabs loan={loan} setLoan={setLoan}/>
        </div>
      </div>
    </div>
  )
}

export default LoanDetails;