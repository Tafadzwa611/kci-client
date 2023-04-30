import React, { useState } from 'react';
import LoanFiles from './LoanFiles';
import Securities from './Securities';
import Comments from './Comments';
import Penalties from './Penalties';
import Payments from './Payments';
import Txns from './Txns';
import ScheduleTab from './ScheduleTab';
import DetailsTab from './DetailsTab';
import SubLoans from './SubLoans';
import Audit from './Audit';

function BlocTabs({loan, setLoan}) {
  const [tab, setTab] = useState('details');

  return (
    <>
    <div>
      <div className='bloc-tabs' style={{marginBottom:"2rem"}}>
        <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}>Details</button>
        {loan.client_type === 'Groups (solidarity)' && <button className={tab === 'loans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('loans')}>Loans</button>}
        <button className={tab === 'schedule' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('schedule')}>Schedule</button>
        <button className={tab === 'txns' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('txns')}>Transactions</button>
        <button className={tab === 'payments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('payments')}>Payments</button>
        <button className={tab === 'securities' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('securities')}>Collateral</button>
        <button className={tab === 'penalties' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('penalties')}>Penalties</button>
        <button className={tab === 'comments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('comments')}>Comments</button>
        <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}>Attachments</button>
        <button className={tab === 'audit' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('audit')}>Audit</button>
      </div>
      {{
        'details': <DetailsTab loan={loan}/>,
        'loans': <SubLoans loans={loan.sub_loans_list}/>,
        'schedule': <ScheduleTab installments={loan.installments} />,
        'txns': <Txns txns={loan.txns} />,
        'payments': <Payments payments={loan.payments} />,
        'securities': <Securities collaterals={loan.collaterals} setLoan={setLoan} loanId={loan.id} />,
        'penalties': <Penalties penalties={loan.penalties} loanId={loan.id} setLoan={setLoan} />,
        'comments': <Comments comments={loan.comments} />,
        'files': <LoanFiles loanId={loan.id} files={loan.files} setLoan={setLoan} />,
        'audit': <Audit />,
      }[tab]}
    </div>
    </>
    
  )
}

export default BlocTabs;