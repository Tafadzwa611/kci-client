import React from 'react';
import { statusClasses } from './data';

function DetailsTab({loan}) {
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
                <li>Next Installment Date: {loan.next_installment.installment_date}</li>
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

export default DetailsTab;