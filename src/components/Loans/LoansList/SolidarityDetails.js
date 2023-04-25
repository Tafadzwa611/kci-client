import Actions from './Actions';
import { statusClasses } from './data';
import React, { useState } from 'react';

function SolidarityDetails({loanApiData}) {
  const [loan, setLoan] = useState(loanApiData);
  const [tab, setTab] = useState('details');

  return (
    <div id='loan-details'>
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          <div style={{marginBottom:"1rem"}}>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:"5px"}}><b>{loan.group_name}&apos;s</b> Loan Details</span> /
                <div style={{marginLeft:"5px"}}>
                  <button className={statusClasses[loan.status]}>{loan.status}</button>
                </div>
              </div>
              <Actions loan={loan} setLoanDetails={setLoan} loanType={'sol'}/>
            </div>
          </div>
          <div>
            <div className='bloc-tabs'>
              <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}>Details</button>
              <button className={tab === 'schedule' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('schedule')}>Schedule</button>
              <button className={tab === 'txns' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('txns')}>Transactions</button>
              <button className={tab === 'payments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('payments')}>Payments</button>
              <button className={tab === 'securities' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('securities')}>Collateral</button>
              <button className={tab === 'penalties' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('penalties')}>Penalties</button>
              <button className={tab === 'comments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('comments')}>Comments</button>
              <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}>Attachments</button>
              <button className={tab === 'audit' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('audit')}>Audit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolidarityDetails;