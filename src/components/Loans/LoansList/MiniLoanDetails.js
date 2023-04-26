import Actions from './Actions';
import { statusClasses } from './data';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckBox } from '../../../common';
import LoanFiles from './LoanFiles';

function MiniLoanDetails({loanData, extra}) {
  const {setLoanId, setLoanData} = extra;
  const [tab, setTab] = useState('details');
  const [loan, setLoan] = useState(loanData.loan);

  return (
    <div>
      <div id='loan-details'>
        <div style={{position:'sticky', top:'0', width:'100%'}}>
          <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
            <div style={{marginBottom:'1rem'}}>
              <div style={{marginBottom:'1rem', display:'flex', justifyContent:'space-between'}}>
                <button className='btn btn-default' onClick={() => setLoanId(null)}>Close</button>
                <button className='btn btn-default'>
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
                <button className={tab === 'details' ? 'tabs-client_a active-tabs' : 'tabs-client_a'} onClick={() => setTab('details')}>Details</button>
                <button className={tab === 'schedule' ? 'tabs-client_a active-tabs' : 'tabs-client_a'} onClick={() => setTab('schedule')}>Schedule</button>
                <button className={tab === 'txns' ? 'tabs-client_a active-tabs' : 'tabs-client_a'} onClick={() => setTab('txns')}>Statement</button>
                <button className={tab === 'payments' ? 'tabs-client_a active-tabs' : 'tabs-client_a'} onClick={() => setTab('payments')}>Payments</button>
                <button className={tab === 'penalties' ? 'tabs-client_a active-tabs' : 'tabs-client_a'} onClick={() => setTab('penalties')}>Penalties</button>
                <button className={tab === 'comments' ? 'tabs-client_a active-tabs' : 'tabs-client_a'} onClick={() => setTab('comments')}>Comments</button>
                <button className={tab === 'files' ? 'tabs-client_a active-tabs' : 'tabs-client_a'} onClick={() => setTab('files')}>Attachments</button>
              </div>
              {{
                'details': <DetailsTab loan={loan}/>,
                'schedule': <ScheduleTab installments={loan.installments} />,
                'txns': <Txns txns={loan.txns} />,
                'payments': <Payments payments={loan.payments} />,
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

const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};

const Comments = ({comments}) => {
  return (
    <div className="miniLoanDetails-container">
      <table className="table">
        <thead>
          <tr className="journal-details schedule__tables">
            <th>Date</th>
            <th>User</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map(comment => (
            <tr key={comment.id}>
              <td className="schedule__table">{comment.cdate_created}</td>
              <td className="schedule__table">{comment.user_name}</td>
              <td className="schedule__table">{comment.comments}</td>
              <td className="schedule__table">Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Penalties = ({penalties}) => {
  return (
    <div style={{overflowX:'auto', maxHeight:"600px"}} className="miniLoanDetails-container">
      <table className="table">
        <thead>
          <tr className="journal-details schedule__tables" style={{position:'sticky', top:'0'}}>
            <th className="schedule__table">Penalty Date</th>
            <th className="schedule__table">Reason for Penalty</th>
            <th className="schedule__table">Amount</th>
            <th className="schedule__table">Amount Paid</th>
            <th className="schedule__table">Amount Due</th>
            <th className="schedule__table">Status</th>
            <th className="schedule__table">Action</th>
          </tr>
        </thead>
        <tbody>
          {penalties.map(penalty => (
            <tr key={penalty.id}>
              <td className="schedule__table">{penalty.cdate_created}</td>
              <td className="schedule__table">{penalty.description}</td>
              <td className="schedule__table">{penalty.amount_for_fixed_amount_penalty}</td>
              <td className="schedule__table">{penalty.amount_paid}</td>
              <td className="schedule__table">{penalty.amount_due}</td>
              <td className="schedule__table">{penalty.status}</td>
              <td className="schedule__table">Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Payments = ({payments}) => {
  return (
    <div style={{overflowX:'auto', maxHeight:"600px"}} className="miniLoanDetails-container">
      <table className="table">
        <thead>
          <tr className="journal-details schedule__tables" style={{position:'sticky', top:'0'}}>
            <th className="schedule__table">Date Recorded</th>
            <th className="schedule__table">Collection Date</th>
            <th className="schedule__table">Collected by</th>
            <th className="schedule__table">Receipt Number</th>
            <th className="schedule__table">Notes</th>
            <th className="schedule__table">Branch Collected</th>
            <th className="schedule__table">Account</th>
            <th className="schedule__table">Principal Paid</th>
            <th className="schedule__table">Interest Paid</th>
            <th className="schedule__table">Penalty Paid</th>
            <th className="schedule__table">Fees Paid</th>
            <th className="schedule__table">To Be Refunded</th>
            <th className="schedule__table">Total Amount Paid</th>
            <th className="schedule__table">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td className="schedule__table">{payment.date_recorded}</td>
              <td className="schedule__table">{payment.cdate_created}</td>
              <td className="schedule__table">{payment.user_name}</td>
              <td className="schedule__table">{payment.receipt_number}</td>
              <td className="schedule__table">{payment.notes}</td>
              <td className="schedule__table">{payment.branch_name}</td>
              <td className="schedule__table">{payment.fund_account_name}</td>
              <td className="schedule__table">{payment.principal_amount_paid}</td>
              <td className="schedule__table">{payment.interest_amount_paid}</td>
              <td className="schedule__table">{payment.penalty}</td>
              <td className="schedule__table">{payment.fees}</td>
              <td className="schedule__table">{payment.money_to_be_refunded}</td>
              <td className="schedule__table">{payment.amount_paid}</td>
              <td className="schedule__table">Action</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Txns = ({txns}) => {
  return (
    <div style={{overflowX:'auto', maxHeight:"600px"}} className="miniLoanDetails-container">
      <table className="table">
        <thead>
          <tr className="journal-details schedule__tables" style={{position:'sticky', top:'0'}}>
            <th className="schedule__table">Value Date</th>
            <th className="schedule__table">Description</th>
            <th className="schedule__table">Debit</th>
            <th className="schedule__table">Credit</th>
            <th className="schedule__table">Total Balance</th>
          </tr>
        </thead>
        <tbody>
          {txns.map(txn => (
            <tr key={txn.id}>
              <td className="schedule__table">{txn.cvalue_date}</td>
              <td className="schedule__table">{txn.description}</td>
              <td className="schedule__table">{txn.entry_type === 'Dr' && txn.amount}</td>
              <td className="schedule__table">{txn.entry_type === 'Cr' && txn.amount}</td>
              <td className="schedule__table">{txn.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const ScheduleTab = ({installments}) => {
  const [expected, setExpected] = useState(true);
  const [paid, setPaid] = useState(true);
  const [dues, setDues] = useState(true);

  return (
    <>
      <div style={{display: 'flex', columnGap: "1rem", marginBottom:"1rem"}}>
        <CheckBox isChecked={expected} label='Amount Expected' onChange={() => setExpected(curr => !curr)} />
        <CheckBox isChecked={paid} label='Amount Paid' onChange={() => setPaid(curr => !curr)} />
        <CheckBox isChecked={dues} label='Amount Due' onChange={() => setDues(curr => !curr)} />
      </div>
      <div style={{overflow:"auto", maxHeight:"600px"}} className="miniLoanDetails-container">
        <table className="table">
          <thead>
            <tr className="journal-details schedule__tables" style={{position:'sticky', top:'0'}}>
              <th className="schedule__table"><b>#</b></th>
              <th className="schedule__table schedule__installment__right">Due Date</th>
              {expected &&
              <>
                <th className="schedule__table">Principal Expected</th>
                <th className="schedule__table">Interest Expected</th>
                <th className="schedule__table">Fees Expected</th>
                <th className="schedule__table">Penalty Expected</th>
                <th className="schedule__table schedule__installment__right">Total Expected</th>
              </>}
              {paid &&
              <>
                <th className="schedule__table">Principal Paid</th>
                <th className="schedule__table">Interest Paid</th>
                <th className="schedule__table">Fees Paid</th>
                <th className="schedule__table">Penalty Paid</th>
                <th className="schedule__table schedule__installment__right">Total Paid</th>
              </>}
              {dues &&
              <>
                <th className="schedule__table">Principal Due</th>
                <th className="schedule__table">Interest Due</th>
                <th className="schedule__table">Fees Due</th>
                <th className="schedule__table">Penalty Due</th>
                <th className="schedule__table schedule__installment__right">Total Due</th>
              </>}
              <th className="schedule__table">State</th>
            </tr>
          </thead>
          <tbody>
            {installments.map(installment => (
              <tr key={installment.period}>
                <td className='schedule__table schedule__installment'>{installment.period}</td>
                <td className='schedule__table schedule__installment schedule__installment__right'>{installment.installment_date}</td>
                {expected &&
                <>
                  <td className='schedule__table schedule__installment'>{installment.principal}</td>
                  <td className='schedule__table schedule__installment'>
                    {installment.interest_on_settlement && installment.interest_on_settlement != installment.interest ?
                    <>
                      <del>{`${installment.interest}`}</del>
                      {` ${installment.interest_on_settlement}`}
                    </> :
                    `${installment.interest}`}
                  </td>
                  <td className='schedule__table schedule__installment'>
                    {installment.fees_on_settlement && installment.fees_on_settlement != installment.fees ?
                    <>
                      <del>{`${installment.fees}`}</del>
                      {` ${installment.fees_on_settlement}`}
                    </> :
                    `${installment.fees}`}
                  </td>
                  <td className='schedule__table schedule__installment'>
                    {installment.penalty_on_settlement && installment.penalty_on_settlement != installment.penalty ?
                    <>
                      <del>{`${installment.penalty}`}</del>
                      {` ${installment.penalty_on_settlement}`}
                    </> :
                    `${installment.penalty}`}
                  </td>
                  <td className='schedule__table schedule__installment schedule__installment__right'>{installment.installment}</td>
                </>}
                {paid &&
                <>
                  <td className='schedule__table schedule__installment'>{installment.principal_paid}</td>
                  <td className='schedule__table schedule__installment'>{installment.interest_paid}</td>
                  <td className='schedule__table schedule__installment'>{installment.fees_paid}</td>
                  <td className='schedule__table schedule__installment'>{installment.penalty_paid}</td>
                  <td className='schedule__table schedule__installment schedule__installment__right'>{installment.total_paid}</td>
                </>}
                {dues &&
                <>
                  <td className='schedule__table schedule__installment'>{installment.principal_due}</td>
                  <td className='schedule__table schedule__installment'>{installment.interest_due}</td>
                  <td className='schedule__table schedule__installment'>{installment.fees_due}</td>
                  <td className='schedule__table schedule__installment'>{installment.penalty_due}</td>
                  <td className='schedule__table schedule__installment schedule__installment__right'>{installment.balance}</td>
                </>}
                <td className='schedule__table schedule__installment'>Pending</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

const DetailsTab = ({loan}) => {
  return (
    <div style={{display:'flex', columnGap:'1%'}}>
      <div style={{width:'100%'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
          <div style={{width:'48%'}}>
            <ul style={{paddingRight:'1rem'}}>
              <li style={{marginBottom: '1rem'}}><b>General</b></li>
              {/* <li>Client Name: {loan.client_fullname}</li>
              <li>Group Name: {loan.group_name}</li>
              <li>Account ID: {loan.loan_id}</li>
              <li>Account State: <button className={statusClasses[loan.status]}>{loan.status}</button></li> */}
              <li style={{marginBottom:"0.25rem"}}>Assigned to Branch: {loan.branch}</li>
              <li style={{marginBottom:"0.25rem"}}>Assigned to Loan Officer: {loan.loan_officer_name}</li>
              <li style={{marginBottom:"0.25rem"}}>Loan Created By: {loan.loan_created_by}</li>
              <li style={{marginBottom:"0.25rem"}}>Loan Approved By: {loan.loan_approved_by}</li>
              <li style={{marginBottom:"0.25rem"}}>Loan Disbursed By: {loan.loan_amount_disbursed_by}</li>
              <li style={{marginBottom:"0.25rem"}}>Currency: {loan.currency_name}</li>
              <li style={{marginBottom:"0.25rem"}}>Application Date: {loan.app_date}</li>
              <li style={{marginBottom:"0.25rem"}}>Disbursement Date: {loan.db_date}</li>
              <li style={{marginBottom:"0.25rem"}}>Approval Date: {loan.approv_date}</li>
              <li style={{marginBottom:"0.25rem"}}>First Repayment Date: {loan.first_payment_date}</li>
              <li style={{marginBottom:"0.25rem"}}>Maturity Date: {loan.mat_date}</li>
              <li style={{marginBottom:"0.25rem"}}>Product: {loan.product_name}</li>
              <li style={{marginBottom:"0.25rem"}}>Loan Amount: {loan.currency_name}{loan.principal}</li>
              <li style={{marginBottom:"0.25rem"}}>Interest Rate: {loan.interest_rate}%{loan.interest_interval}</li>
              <li style={{marginBottom:"0.25rem"}}>Interest Method: {loan.interest_method}</li>
              <li style={{marginBottom:"0.25rem"}}>Reason For Loan: {loan.reason_for_borrowing}</li>
              <li style={{marginBottom:"0.25rem"}}>Fund Account Name: {loan.fund_account_name}</li>
              <li style={{marginBottom:"0.25rem"}}>Action On Default: {loan.action_on_loan_default}</li>
              {loan.action_on_loan_default !== 'Do Nothing' &&
              <>
                <li style={{marginBottom:"0.25rem"}}>Penalty Tolerance Period In Days: {loan.grace_period} {loan.grace_period == 1 ? 'Day' : 'Days'}</li>
                <li style={{marginBottom:"0.25rem"}}>Penalty Rate: {loan.late_repayment_penalty_percentage}%{loan.penalty_charged_per}</li>
                <li style={{marginBottom:"0.25rem"}}>Apply Penalty On: {loan.apply_late_repayment_penalty_on}</li>
              </>}
              <li style={{marginBottom:"0.25rem"}}>Repayment Cycle: {loan.repayment_cycle}</li>
              <li style={{marginBottom:"0.25rem"}}>Number Of Installments: {loan.number_of_repayments} {loan.number_of_repayments == 1 ? 'Installment' : 'Installments'}</li>
            </ul>
          </div>
          <div style={{width:'48%'}}>
            <ul style={{paddingRight:'1rem'}}>
              <li style={{marginBottom: '1rem'}}><b>Details</b></li>

              {loan.status === 'Arrears' &&
              <>
              <li style={{marginBottom:"0.25rem"}}>Amount In Arrears: {loan.currency_name} {loan.amount_in_arrears}</li>
              <li style={{marginBottom: '1rem'}}>Days In Arrears: {loan.days_in_arrears}</li>
              </>}
              {loan.next_installment ?
              <>
                <li style={{marginBottom:"0.25rem"}}>Next Installment Date: {loan.currency_name} {loan.next_installment.installment_date}</li>
                <li style={{marginBottom:"0.25rem"}}>Next Installment Amount: {loan.currency_name} {loan.next_installment.installment}</li>
                <li style={{marginBottom:"0.25rem"}}>Next Installment Principal: {loan.currency_name} {loan.next_installment.principal}</li>
                <li style={{marginBottom:"0.25rem"}}>Next Installment Principal Balance: {loan.currency_name} {loan.next_installment.principal_due}</li>
                <li style={{marginBottom:"0.25rem"}}>
                  Next Installment Total Interest: {loan.next_installment.interest_on_settlement && loan.next_installment.interest_on_settlement != loan.next_installment.interest ?
                  <>
                    <del>{`${loan.currency_name}${loan.next_installment.interest}`}</del>
                    {` ${loan.currency_name} ${loan.next_installment.interest_on_settlement}`}
                  </> :
                  `${loan.currency_name} ${loan.next_installment.interest}`}
                </li>
                <li style={{marginBottom:"0.25rem"}}>Next Installment Interest Balance: {loan.currency_name} {loan.next_installment.interest_due}</li>
                <li style={{marginBottom:"0.25rem"}}>Next Installment Total Fees: {loan.currency_name} {loan.next_installment.fees}</li>
                <li style={{marginBottom:"0.25rem"}}>Next Installment Fees Balance: {loan.currency_name} {loan.next_installment.fees_due}</li>
                <li style={{marginBottom:"0.25rem"}}>Next Installment Total Penalty: {loan.currency_name} {loan.next_installment.penalty}</li>
                <li style={{marginBottom: '1rem'}}>Next Installment Penalty Balance: {loan.currency_name} {loan.next_installment.penalty_due}</li>
              </>: <li style={{marginBottom: '1rem'}}>Next Installment Date: --</li>}

              <li style={{marginBottom:"0.25rem"}}>Principal: {loan.currency_name}{loan.principal}</li>
              <li style={{marginBottom:"0.25rem"}}>
                Total Interest: {loan.interest_settlement && loan.interest_settlement != loan.interest ?
                <>
                  <del>{`${loan.currency_name}${loan.interest}`}</del>
                  {` ${loan.currency_name}${loan.interest_settlement}`}
                </> :
                `${loan.currency_name}${loan.interest}`}
              </li>
              <li style={{marginBottom:"0.25rem"}}>
                Total Fees: {loan.non_deductable_fees_reference_settlement && loan.non_deductable_fees_reference_settlement != loan.non_deductable_fees_reference ?
                <>
                  <del>{`${loan.currency_name}${loan.non_deductable_fees_reference}`}</del>
                  {` ${loan.currency_name}${loan.non_deductable_fees_reference_settlement}`}
                </> :
                `${loan.currency_name}${loan.non_deductable_fees_reference}`}
              </li>
              <li style={{marginBottom: '1rem'}}>
                Total Penalty: {loan.penalty_reference_settlement && loan.penalty_reference_settlement != loan.penalty_reference ?
                <>
                  <del>{`${loan.currency_name}${loan.penalty_reference}`}</del>
                  {` ${loan.currency_name}${loan.penalty_reference_settlement}`}
                </> :
                `${loan.currency_name}${loan.penalty_reference}`}
              </li>

              <li style={{marginBottom:"0.25rem"}}>Total Principal Balance: {loan.currency_name} {loan.principal_amount_due}</li>
              <li style={{marginBottom:"0.25rem"}}>Total Interest Balance: {loan.currency_name} {loan.interest_amount_due}</li>
              <li style={{marginBottom:"0.25rem"}}>Total Fees Balance: {loan.currency_name} {loan.non_deductable_fees}</li>
              <li style={{marginBottom: '1rem'}}>Total Penalty Balance: {loan.currency_name} {loan.penalty}</li>

              <li style={{marginBottom:"0.25rem"}}>Total Principal Paid: {loan.currency_name} {loan.principal_amount_paid}</li>
              <li style={{marginBottom:"0.25rem"}}>Total Interest Paid: {loan.currency_name} {loan.interest_amount_paid}</li>
              <li style={{marginBottom:"0.25rem"}}>Total Fees Paid: {loan.currency_name} {loan.fees_amount_paid}</li>
              <li style={{marginBottom: '1rem'}}>Total Penalty Paid: {loan.currency_name} {loan.penalty_amount_paid}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniLoanDetails;