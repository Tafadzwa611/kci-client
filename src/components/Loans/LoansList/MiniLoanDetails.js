import Actions from './Actions';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoanFiles from './LoanFiles';
import Securities from './Securities';
import Comments from './Comments';
import Penalties from './Penalties';
import Payments from './Payments';
import Txns from './Txns';
import ScheduleTab from './ScheduleTab';
import DetailsTab from './DetailsTab';
import {statusClasses} from './data';

function MiniLoanDetails({loanData, extra}) {
  const {setLoanId, setLoanData} = extra;
  const [tab, setTab] = useState('details');
  const [loan, setLoan] = useState(loanData);

  return (
    <div>
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
                  <span style={{marginRight:"5px"}}><b>{loan.client_fullname}</b></span> /
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
                  loanType={'cli'}
                />
              </div>
              <div className='bloc-tabs' style={{marginBottom:"2rem"}}>
                <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}>Details</button>
                <button className={tab === 'schedule' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('schedule')}>Schedule</button>
                <button className={tab === 'txns' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('txns')}>Statement</button>
                <button className={tab === 'payments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('payments')}>Payments</button>
                <button className={tab === 'securities' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('securities')}>Collateral</button>
                <button className={tab === 'penalties' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('penalties')}>Penalties</button>
                <button className={tab === 'comments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('comments')}>Comments</button>
                <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}>Attachments</button>
              </div>
              {{
                'details': <DetailsTab loan={loan}/>,
                'schedule': <ScheduleTab installments={loan.installments} />,
                'txns': <Txns txns={loan.txns} />,
                'payments': <Payments payments={loan.payments} />,
                'securities': <Securities collaterals={loan.collaterals} setLoan={setLoan} loanId={loan.id} />,
                'penalties': <Penalties penalties={loan.penalties} />,
                'comments': <Comments comments={loan.comments} />,
                'files': <LoanFiles loanId={loan.id} files={loan.files} setLoan={setLoan} />,
              }[tab]}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniLoanDetails;