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
import Fees from './Fees';

function BlocTabs({loan, setLoan, client_name, setLoanData}) {
  const [tab, setTab] = useState('details');

  return (
    <div>
      <div className='bloc-tabs' style={{marginBottom:'2rem'}}>
        <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}>Details</button>
        {loan.client_type === 'Groups (solidarity)' && <button className={tab === 'loans' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('loans')}>Loans</button>}
        <button className={tab === 'schedule' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('schedule')}>Schedule</button>
        <button className={tab === 'txns' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('txns')}>Transactions</button>
        <button className={tab === 'payments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('payments')}>Payments</button>
        <button className={tab === 'fees' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('fees')}>Fees</button>
        <button className={tab === 'penalties' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('penalties')}>Penalties</button>
        <button className={tab === 'securities' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('securities')}>Collateral</button>
        <button className={tab === 'comments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('comments')}>Comments</button>
        <button className={tab === 'files' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('files')}>Attachments</button>
        {/* <button className={tab === 'audit' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('audit')}>Audit</button> */}
      </div>
      {{
        'details': <DetailsTab loan={loan}/>,
        'payments': <Payments
          payments={loan.payments}
          currencyId={loan.currency_id}
          setLoan={setLoan}
          loanId={loan.id}
          currencyName={loan.currency_name}
          accountId={loan.loan_id}
          clientName={loan.client_fullname ? loan.client_fullname : loan.group_name}
        />,
        'securities': <Securities collaterals={loan.collaterals} setLoan={setLoan} loanId={loan.id} />,
        'loans': <SubLoans loans={loan.sub_loans_list} client_name={client_name} />,
        'schedule': <ScheduleTab
          loanId={loan.id}
          setLoan={setLoan}
          client_name={client_name}
          setLoanData={setLoanData}
          currencyId={loan.currency_id}
          installments={loan.installments}
        />,
        'txns': <Txns txns={loan.txns} client_name={client_name} />,
        'penalties': <Penalties
          penalties={loan.penalties}
          subLoans={loan.sub_loans_list}
          clientType={loan.client_type}
          status={loan.status}
          client_name={client_name}
          loanId={loan.id}
          penalty={loan.penalty}
          setLoan={setLoan}
          locked={loan.penalties_locked}
        />,
        'fees': <Fees setLoan={setLoan} fees={loan.applied_fees}/>,
        'comments': <Comments comments={loan.comments} setLoan={setLoan} loanId={loan.id}/>,
        'files': <LoanFiles loanId={loan.id} files={loan.files} setLoan={setLoan} />,
        'audit': <Audit loanId={loan.id}/>,
      }[tab]}
    </div>
  )
}

export default BlocTabs;