import React from 'react';

function DetailsTab({loan}) {
  return (
    <div style={{display:'flex', columnGap:'1%'}}>
      <div style={{width:'100%'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: '2rem'}}>
          <div style={{width:'48%'}}>
            <ul style={{paddingRight:'1rem'}}>
              <li style={{marginBottom: '1rem'}}><b>General</b></li>
              <li style={{marginBottom: '0.25rem'}}>Assigned to Branch: {loan.branch}</li>
              <li style={{marginBottom: '0.25rem'}}>Assigned to Loan Officer: {loan.loan_officer_name}</li>
              <li style={{marginBottom: '0.25rem'}}>Loan Created By: {loan.loan_created_by}</li>
              <li style={{marginBottom: '0.25rem'}}>Loan Approved By: {loan.loan_approved_by}</li>
              <li style={{marginBottom: '0.25rem'}}>Loan Disbursed By: {loan.loan_amount_disbursed_by}</li>
              <li style={{marginBottom: '0.25rem'}}>Currency: {loan.currency_name}</li>
              <li style={{marginBottom: '0.25rem'}}>Application Date: {loan.app_date}</li>
              <li style={{marginBottom: '0.25rem'}}>Disbursement Date: {loan.db_date}</li>
              <li style={{marginBottom: '0.25rem'}}>Approval Date: {loan.approv_date}</li>
              <li style={{marginBottom: '0.25rem'}}>First Repayment Date: {loan.first_payment_date}</li>
              <li style={{marginBottom: '0.25rem'}}>Maturity Date: {loan.mat_date}</li>
              <li style={{marginBottom: '0.25rem'}}>Product: {loan.product_name}</li>
              <li style={{marginBottom: '0.25rem'}}>Product Type: {loan.product_type}</li>
              <li style={{marginBottom: '0.25rem'}}>Interest Application: {loan.interest_application}</li>
              <li style={{marginBottom: '0.25rem'}}>Applied Amount: {loan.currency_name} {loan.org_principal}</li>
              <li style={{marginBottom: '0.25rem'}}>Loan Amount: {loan.currency_name} {loan.principal}</li>
              <li style={{marginBottom: '0.25rem'}}>Interest Rate: {loan.interest_rate}%{loan.interest_interval}</li>
              <li style={{marginBottom: '0.25rem'}}>Interest Method: {loan.interest_method}</li>
              <li style={{marginBottom: '0.25rem'}}>Reason For Loan: {loan.reason_for_borrowing}</li>
              <li style={{marginBottom: '0.25rem'}}>Fund Account Name: {loan.fund_account_name}</li>
              <li style={{marginBottom: '0.25rem'}}>Action On Default: {loan.action_on_loan_default}</li>
              {loan.action_on_loan_default !== 'Do Nothing' &&
              <>
                <li style={{marginBottom: '0.25rem'}}>Penalty Tolerance Period In Days: {loan.grace_period} {loan.grace_period == 1 ? 'Day' : 'Days'}</li>
                <li style={{marginBottom: '0.25rem'}}>Penalty Rate: {loan.late_repayment_penalty_percentage}%{loan.penalty_charged_per}</li>
                <li style={{marginBottom: '0.25rem'}}>Apply Penalty/Interest On: {loan.apply_late_repayment_penalty_on}</li>
              </>}
              {loan.action_on_loan_default == 'Add Interest' ? (
                <li style={{marginBottom: '0.25rem'}}>
                  Default Interest: {loan.lock_interest ? 'Locked' : 'Unlocked'} 
                </li>
              ) : null}
              <li style={{marginBottom: '0.25rem'}}>Repayment Cycle: {loan.repayment_cycle}</li>
              <li style={{marginBottom: '0.25rem'}}>Number Of Installments: {loan.number_of_repayments} {loan.number_of_repayments == 1 ? 'Installment' : 'Installments'}</li>
              {loan.auto_restructure &&
                <>
                  <li style={{marginBottom: '1rem'}}><b>Auto Restructure Settings</b></li>
                  <li style={{marginBottom: '0.25rem'}}>Auto Restructure Interest: {loan.auto_restructure_interest}%{loan.interest_interval}</li>
                  <li style={{marginBottom: '0.25rem'}}>Number of Installments: {loan.auto_restructure_installments}</li>
                </>
              }
              {loan.product_type === 'Dynamic Term Loan' && (
                <>
                  <li style={{marginTop: '1rem', marginBottom: '0.5rem'}}><b>Dynamic Term Interest Settings</b></li>
                  <li style={{marginBottom: '0.25rem'}}>Interest Applied On: {loan.dynamic_interest_applied_on}</li>
                  <li style={{marginBottom: '0.25rem'}}>Add Interest After Maturity: {loan.add_interest_after_maturity ? 'Yes' : 'No'}</li>
                  {loan.add_interest_after_maturity && (
                    <li style={{marginBottom: '0.25rem'}}>
                      Default Interest Rate: {loan.dynamic_default_interest_rate}%{loan.interest_interval}
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
          <div style={{width:'48%'}}>
            <ul style={{paddingRight: '1rem'}}>
              <li style={{marginBottom: '1rem'}}><b>Details</b></li>

              {loan.status === 'Arrears' &&
              <>
              <li style={{marginBottom: '0.25rem'}}>Amount In Arrears: {loan.currency_name} {loan.amount_in_arrears}</li>
              <li style={{marginBottom: '1rem'}}>Days In Arrears: {loan.days_in_arrears}</li>
              </>}
              {loan.next_installment ?
              <>
                <li style={{marginBottom: '0.25rem'}}>Next Installment Date: {loan.next_installment.installment_date}</li>
                <li style={{marginBottom: '0.25rem'}}>Next Installment Amount: {loan.currency_name} {loan.next_installment.installment}</li>
                <li style={{marginBottom: '0.25rem'}}>Next Installment Principal: {loan.currency_name} {loan.next_installment.principal}</li>
                <li style={{marginBottom: '0.25rem'}}>Next Installment Principal Balance: {loan.currency_name} {loan.next_installment.principal_due}</li>
                <li style={{marginBottom: '0.25rem'}}>
                  Next Installment Total Interest: {loan.next_installment.interest_on_settlement && loan.next_installment.interest_on_settlement != loan.next_installment.interest ?
                  <>
                    <del>{`${loan.currency_name}${loan.next_installment.interest}`}</del>
                    {` ${loan.currency_name} ${loan.next_installment.interest_on_settlement}`}
                  </> :
                  `${loan.currency_name} ${loan.next_installment.interest}`}
                </li>
                <li style={{marginBottom: '0.25rem'}}>Next Installment Interest Balance: {loan.currency_name} {loan.next_installment.interest_due}</li>
                <li style={{marginBottom: '0.25rem'}}>Next Installment Total Fees: {loan.currency_name} {loan.next_installment.fees}</li>
                <li style={{marginBottom: '0.25rem'}}>Next Installment Fees Balance: {loan.currency_name} {loan.next_installment.fees_due}</li>
                <li style={{marginBottom: '0.25rem'}}>Next Installment Total Penalty: {loan.currency_name} {loan.next_installment.penalty}</li>
                <li style={{marginBottom: '1rem'}}>Next Installment Penalty Balance: {loan.currency_name} {loan.next_installment.penalty_due}</li>
              </>: <li style={{marginBottom: '1rem'}}>Next Installment Date: --</li>}

              <li style={{marginBottom: '0.25rem'}}>Principal: {loan.currency_name} {loan.principal}</li>
              <li style={{marginBottom: '0.25rem'}}>
                Total Interest: {loan.interest_settlement && loan.interest_settlement != loan.interest ?
                <>
                  <del>{`${loan.currency_name} ${loan.interest}`}</del>
                  {` ${loan.currency_name} ${loan.interest_settlement}`}
                </> :
                `${loan.currency_name} ${loan.interest}`}
              </li>
              <li style={{marginBottom:'0.25rem'}}>
                Total Fees: {loan.non_deductable_fees_reference_settlement && loan.non_deductable_fees_reference_settlement != loan.non_deductable_fees_reference ?
                <>
                  <del>{`${loan.currency_name} ${loan.non_deductable_fees_reference}`}</del>
                  {` ${loan.currency_name} ${loan.non_deductable_fees_reference_settlement}`}
                </> :
                `${loan.currency_name} ${loan.non_deductable_fees_reference}`}
              </li>
              <li style={{marginBottom: '1rem'}}>
                Total Penalty: {loan.penalty_reference_settlement && loan.penalty_reference_settlement != loan.penalty_reference ?
                <>
                  <del>{`${loan.currency_name} ${loan.penalty_reference}`}</del>
                  {` ${loan.currency_name} ${loan.penalty_reference_settlement}`}
                </> :
                `${loan.currency_name} ${loan.penalty_reference}`}
              </li>

              <li style={{marginBottom: '0.25rem'}}>Total Principal Balance: {loan.currency_name} {loan.principal_amount_due}</li>
              <li style={{marginBottom: '0.25rem'}}>Total Interest Balance: {loan.currency_name} {loan.interest_amount_due}</li>
              {loan.product_type === 'Dynamic Term Loan' && (
                <li style={{marginBottom: '0.25rem'}}>
                  Daily Pro-Rata Interest Balance: {loan.currency_name} {loan.pro_rata_interest_bal}
                </li>
              )}
              <li style={{marginBottom: '0.25rem'}}>Total Fees Balance: {loan.currency_name} {loan.non_deductable_fees}</li>
              <li style={{marginBottom: '1rem'}}>Total Penalty Balance: {loan.currency_name} {loan.penalty}</li>

              <li style={{marginBottom: '0.25rem'}}>Total Principal Paid: {loan.currency_name} {loan.principal_amount_paid}</li>
              <li style={{marginBottom: '0.25rem'}}>Total Interest Paid: {loan.currency_name} {loan.interest_amount_paid}</li>
              <li style={{marginBottom: '0.25rem'}}>Total Fees Paid: {loan.currency_name} {loan.fees_amount_paid}</li>
              <li style={{marginBottom: '0.25rem'}}>Total Penalty Paid: {loan.currency_name} {loan.penalty_amount_paid}</li>
              <li style={{marginBottom: '1rem'}}>Amount To Be Refunded: {loan.currency_name} {loan.money_to_be_refunded}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsTab;