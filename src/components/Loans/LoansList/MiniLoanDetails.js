import Actions from './Actions';
import { statusClasses } from './data';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckBox } from '../../../common';

function MiniLoanDetails({loanData, extra}) {
  const {loanDetails, setLoanDetails, setLoanId, setLoanData} = extra;
  const [tab, setTab] = useState('details');

  useEffect(() => {
    setLoanDetails(loanData);
  }, []);

  if (!loanDetails) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div id='loan-details'>
        <div style={{position:'sticky', top:'0', width:'100%'}}>
          <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
            <div style={{marginBottom:'1rem'}}>
              <div style={{marginBottom:'1rem', display:'flex', justifyContent:'space-between'}}>
                <button className='btn btn-default' onClick={() => setLoanId(null)}>Close</button>
                <button className='btn btn-default'>
                  <Link to={`/loans/viewloans/loandetails/cli/${loanDetails.loan.id}`}>Max</Link>
                </button>
              </div>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center'}}></div>
                <Actions
                  loan={loanDetails.loan}
                  setLoanDetails={setLoanDetails}
                  setLoanId={setLoanId}
                  setLoanData={setLoanData}
                  loanType={'cli'}
                />
              </div>
            </div>
          </div>
          <div className='bloc-tabs'>
            <button className={tab === 'details' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('details')}>Details</button>
            <button className={tab === 'schedule' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('schedule')}>Schedule</button>
            <button className={tab === 'txns' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('txns')}>Statement</button>
            <button className={tab === 'payments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('payments')}>Payments</button>
            <button className={tab === 'penalties' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('penalties')}>Penalties</button>
            <button className={tab === 'comments' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('comments')}>Comments</button>
          </div>
          {{
            'details': <DetailsTab loan={loanDetails.loan}/>,
            'schedule': <ScheduleTab installments={loanDetails.loan.installments} />,
            'txns': <Txns txns={loanDetails.loan.txns} />,
            'payments': <Payments payments={loanDetails.loan.payments} />,
            'penalties': <Penalties penalties={loanDetails.loan.penalties} />,
            'comments': <Comments comments={loanDetails.loan.comments} />,
          }[tab]}
        </div>
      </div>
    </div>
  )
}

const thStyle2 = {border: 'none', borderBottom: '1px solid #c1d0d7'};

const Comments = ({comments}) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Date</b></th>
          <th style={thStyle2}><b>User</b></th>
          <th style={thStyle2}><b>Comment</b></th>
          <th style={thStyle2}><b>Action</b></th>
        </tr>
      </thead>
      <tbody>
        {comments.map(comment => (
          <tr key={comment.id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{comment.cdate_created}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{comment.user_name}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{comment.comments}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>Action</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Penalties = ({penalties}) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Penalty Date</b></th>
          <th style={thStyle2}><b>Reason for Penalty</b></th>
          <th style={thStyle2}><b>Amount</b></th>
          <th style={thStyle2}><b>Amount Paid</b></th>
          <th style={thStyle2}><b>Amount Due</b></th>
          <th style={thStyle2}><b>Status</b></th>
          <th style={thStyle2}><b>Action</b></th>
        </tr>
      </thead>
      <tbody>
        {penalties.map(penalty => (
          <tr key={penalty.id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.cdate_created}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.description}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.amount_for_fixed_amount_penalty}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.amount_paid}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.amount_due}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{penalty.status}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>Action</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Payments = ({payments}) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Date Recorded</b></th>
          <th style={thStyle2}><b>Collection Date</b></th>
          <th style={thStyle2}><b>Collected by</b></th>
          <th style={thStyle2}><b>Receipt Number</b></th>
          <th style={thStyle2}><b>Notes</b></th>
          <th style={thStyle2}><b>Branch Collected</b></th>
          <th style={thStyle2}><b>Account</b></th>
          <th style={thStyle2}><b>Principal Paid</b></th>
          <th style={thStyle2}><b>Interest Paid</b></th>
          <th style={thStyle2}><b>Penalty Paid</b></th>
          <th style={thStyle2}><b>Fees Paid</b></th>
          <th style={thStyle2}><b>To Be Refunded</b></th>
          <th style={thStyle2}><b>Total Amount Paid</b></th>
          <th style={thStyle2}><b>Action</b></th>
        </tr>
      </thead>
      <tbody>
        {payments.map(payment => (
          <tr key={payment.id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.date_recorded}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.cdate_created}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.user_name}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.receipt_number}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.notes}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.branch_name}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.fund_account_name}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.principal_amount_paid}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.interest_amount_paid}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.penalty}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.fees}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.money_to_be_refunded}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{payment.amount_paid}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>Action</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const Txns = ({txns}) => {
  return (
    <table>
      <thead>
        <tr>
          <th style={thStyle2}><b>Value Date</b></th>
          <th style={thStyle2}><b>Description</b></th>
          <th style={thStyle2}><b>Debit</b></th>
          <th style={thStyle2}><b>Credit</b></th>
          <th style={thStyle2}><b>Total Balance</b></th>
        </tr>
      </thead>
      <tbody>
        {txns.map(txn => (
          <tr key={txn.id}>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.cvalue_date}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.description}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.entry_type === 'Dr' && txn.amount}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.entry_type === 'Cr' && txn.amount}</td>
            <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{txn.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const ScheduleTab = ({installments}) => {
  const thStyle1 = {border: 'none', borderBottom: '1px solid #c1d0d7', borderRight: '1px solid #c1d0d7'};
  const [expected, setExpected] = useState(true);
  const [paid, setPaid] = useState(true);
  const [dues, setDues] = useState(true);

  return (
    <>
      <CheckBox isChecked={expected} label='Amount Expected' onChange={() => setExpected(curr => !curr)} />
      <CheckBox isChecked={paid} label='Amount Paid' onChange={() => setPaid(curr => !curr)} />
      <CheckBox isChecked={dues} label='Amount Due' onChange={() => setDues(curr => !curr)} />
      <table>
        <thead>
          <tr style={{backgroundColor: '#F2F8FF'}}>
            <th style={{width: '10px', border: 'none', borderBottom: '1px solid #c1d0d7'}}><b>#</b></th>
            <th style={thStyle1}><b>Due Date</b></th>
            {expected &&
            <>
              <th style={thStyle2}><b>Principal Expected</b></th>
              <th style={thStyle2}><b>Interest Expected</b></th>
              <th style={thStyle2}><b>Fees Expected</b></th>
              <th style={thStyle2}><b>Penalty Expected</b></th>
              <th style={thStyle1}><b>Total Expected</b></th>
            </>}
            {paid &&
            <>
              <th style={thStyle2}><b>Principal Paid</b></th>
              <th style={thStyle2}><b>Interest Paid</b></th>
              <th style={thStyle2}><b>Fees Paid</b></th>
              <th style={thStyle2}><b>Penalty Paid</b></th>
              <th style={thStyle1}><b>Total Paid</b></th>
            </>}
            {dues &&
            <>
              <th style={thStyle2}><b>Principal Due</b></th>
              <th style={thStyle2}><b>Interest Due</b></th>
              <th style={thStyle2}><b>Fees Due</b></th>
              <th style={thStyle2}><b>Penalty Due</b></th>
              <th style={thStyle1}><b>Total Due</b></th>
            </>}
            <th style={thStyle2}><b>State</b></th>
          </tr>
        </thead>
        <tbody>
          {installments.map(installment => (
            <tr key={installment.period}>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.period}</td>
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef,border-right: 1px solid #c1d0d7'}}>{installment.installment_date}</td>
              {expected &&
              <>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.principal}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>
                  {installment.interest_on_settlement && installment.interest_on_settlement != installment.interest ?
                  <>
                    <del>{`${installment.interest}`}</del>
                    {` ${installment.interest_on_settlement}`}
                  </> :
                  `${installment.interest}`}
                </td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>
                  {installment.fees_on_settlement && installment.fees_on_settlement != installment.fees ?
                  <>
                    <del>{`${installment.fees}`}</del>
                    {` ${installment.fees_on_settlement}`}
                  </> :
                  `${installment.fees}`}
                </td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>
                  {installment.penalty_on_settlement && installment.penalty_on_settlement != installment.penalty ?
                  <>
                    <del>{`${installment.penalty}`}</del>
                    {` ${installment.penalty_on_settlement}`}
                  </> :
                  `${installment.penalty}`}
                </td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.installment}</td>
              </>}
              {paid &&
              <>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.principal_paid}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.interest_paid}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.fees_paid}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.penalty_paid}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.total_paid}</td>
              </>}
              {dues &&
              <>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.principal_due}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.interest_due}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.fees_due}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.penalty_due}</td>
                <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>{installment.balance}</td>
              </>}
              <td style={{border: 'none', borderBottom: '1px dotted #e6ecef'}}>Pending</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const DetailsTab = ({loan}) => {
  return (
    <div style={{display:'flex', columnGap:'1%'}}>
      <div style={{width:'74%'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
          <div style={{width:'33%'}}>
            <ul style={{paddingRight:'1rem'}}>
              <li style={{marginBottom: '1rem'}}><b>General</b></li>
              <li>Client Name: {loan.client_fullname}</li>
              <li>Group Name: {loan.group_name}</li>
              <li>Account ID: {loan.loan_id}</li>
              <li>Account State: <button className={statusClasses[loan.status]}>{loan.status}</button></li>
              <li>Assigned to Branch: {loan.branch}</li>
              <li>Assigned to Loan Officer: {loan.loan_officer_name}</li>
              <li>Loan Created By: {loan.loan_created_by}</li>
              <li>Loan Approved By: {loan.loan_approved_by}</li>
              <li>Loan Disbursed By: {loan.loan_amount_disbursed_by}</li>
              <li>Currency: {loan.currency_name}</li>
              <li>Application Date: {loan.app_date}</li>
              <li>Disbursement Date: {loan.db_date}</li>
              <li>Approval Date: {loan.approv_date}</li>
              <li>First Repayment Date: {loan.first_payment_date}</li>
              <li>Maturity Date: {loan.mat_date}</li>
              <li>Product: {loan.product_name}</li>
              <li>Loan Amount: {loan.currency_name}{loan.principal}</li>
              <li>Interest Rate: {loan.interest_rate}%{loan.interest_interval}</li>
              <li>Interest Method: {loan.interest_method}</li>
              <li>Reason For Loan: {loan.reason_for_borrowing}</li>
              <li>Fund Account Name: {loan.fund_account_name}</li>
              <li>Action On Default: {loan.action_on_loan_default}</li>
              {loan.action_on_loan_default !== 'Do Nothing' &&
              <>
                <li>Penalty Tolerance Period In Days: {loan.grace_period} {loan.grace_period == 1 ? 'Day' : 'Days'}</li>
                <li>Penalty Rate: {loan.late_repayment_penalty_percentage}%{loan.penalty_charged_per}</li>
                <li>Apply Penalty On: {loan.apply_late_repayment_penalty_on}</li>
              </>}
              <li>Repayment Cycle: {loan.repayment_cycle}</li>
              <li>Number Of Installments: {loan.number_of_repayments} {loan.number_of_repayments == 1 ? 'Installment' : 'Installments'}</li>
            </ul>
          </div>
          <div style={{width:'33%'}}>
            <ul style={{paddingRight:'1rem'}}>
              <li style={{marginBottom: '1rem'}}><b>Details</b></li>

              {loan.status === 'Arrears' &&
              <>
              <li>Amount In Arrears: {loan.currency_name} {loan.amount_in_arrears}</li>
              <li style={{marginBottom: '1rem'}}>Days In Arrears: {loan.days_in_arrears}</li>
              </>}
              {loan.next_installment ?
              <>
                <li>Next Installment Date: {loan.currency_name} {loan.next_installment.installment_date}</li>
                <li>Next Installment Amount: {loan.currency_name} {loan.next_installment.installment}</li>
                <li>Next Installment Principal: {loan.currency_name} {loan.next_installment.principal}</li>
                <li>Next Installment Principal Balance: {loan.currency_name} {loan.next_installment.principal_due}</li>
                <li>
                  Next Installment Total Interest: {loan.next_installment.interest_on_settlement && loan.next_installment.interest_on_settlement != loan.next_installment.interest ?
                  <>
                    <del>{`${loan.currency_name}${loan.next_installment.interest}`}</del>
                    {` ${loan.currency_name} ${loan.next_installment.interest_on_settlement}`}
                  </> :
                  `${loan.currency_name} ${loan.next_installment.interest}`}
                </li>
                <li>Next Installment Interest Balance: {loan.currency_name} {loan.next_installment.interest_due}</li>
                <li>Next Installment Total Fees: {loan.currency_name} {loan.next_installment.fees}</li>
                <li>Next Installment Fees Balance: {loan.currency_name} {loan.next_installment.fees_due}</li>
                <li>Next Installment Total Penalty: {loan.currency_name} {loan.next_installment.penalty}</li>
                <li style={{marginBottom: '1rem'}}>Next Installment Penalty Balance: {loan.currency_name} {loan.next_installment.penalty_due}</li>
              </>: <li style={{marginBottom: '1rem'}}>Next Installment Date: --</li>}

              <li>Principal: {loan.currency_name}{loan.principal}</li>
              <li>
                Total Interest: {loan.interest_settlement && loan.interest_settlement != loan.interest ?
                <>
                  <del>{`${loan.currency_name}${loan.interest}`}</del>
                  {` ${loan.currency_name}${loan.interest_settlement}`}
                </> :
                `${loan.currency_name}${loan.interest}`}
              </li>
              <li>
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

              <li>Total Principal Balance: {loan.currency_name} {loan.principal_amount_due}</li>
              <li>Total Interest Balance: {loan.currency_name} {loan.interest_amount_due}</li>
              <li>Total Fees Balance: {loan.currency_name} {loan.non_deductable_fees}</li>
              <li style={{marginBottom: '1rem'}}>Total Penalty Balance: {loan.currency_name} {loan.penalty}</li>

              <li>Total Principal Paid: {loan.currency_name} {loan.principal_amount_paid}</li>
              <li>Total Interest Paid: {loan.currency_name} {loan.interest_amount_paid}</li>
              <li>Total Fees Paid: {loan.currency_name} {loan.fees_amount_paid}</li>
              <li style={{marginBottom: '1rem'}}>Total Penalty Paid: {loan.currency_name} {loan.penalty_amount_paid}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MiniLoanDetails;