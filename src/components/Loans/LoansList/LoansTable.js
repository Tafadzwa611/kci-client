import React from 'react';
import { convertDate, getAge } from '../../Accounting/Journals/utils';
import Footer from './Footer';
import Loan from '../LoansDetails/Loan';


function LoansTable({loans, nextPageNumber, loadMoreLoans, totalCount, loadingMore, currencies, currencyId, setDetails, details, selectedLoanID, setSelectedLoanID, selectedloan}) {
  
  const handleClick = (e) => {
    setSelectedLoanID(e.target.id)
    if (e.target.id != selectedLoanID){
      setDetails(true);
    }else{
      setDetails(curr => !curr)
    }
  }
  
  const currency = currencies.filter(currency => currencyId == currency.id)[0];

  const totalPrincipal = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.principal);
  }, 0);

  const totalPrincipalAmountDue = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.principal_amount_due);
  }, 0);

  const totalPrincipalAmountDueAtMaturity = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.amount_due_at_maturity);
  }, 0);

  const totalAmountPaid = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.total_amount_paid);
  }, 0);

  const statusClasses = {
    'Fully Paid': 'badge badge-success',
    'Early Settlement': 'badge badge-success',
    'Restructured': 'badge badge-dark',
    'Processing': 'badge badge-info-lighter',
    'Arrears': 'badge badge-info-light',
    'Open': 'badge badge-info',
    'Over Paid': 'badge badge-warning',
    'Defaulted': 'badge badge-danger',
    'Rejected': 'badge badge-danger',
    'Written-Off': 'badge badge-dark',
  }
 
  return (
        <div>
          <div style={{margin:"10px 0", display:"flex", justifyContent:"end"}}>
              <div className='col-sm-3'>Showing {loans.length} of {totalCount} loans.</div>
          </div>
          <div style={{padding:"0", border:"none"}} className={details ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
            <div className={details ? "table-responsive journal__table-container clientstable" : "table-responsive full__table"} >
              <div className="table__height">
                <table className='table'>
                  <thead>
                    {details ?
                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                      <th>Client</th>
                      <th>Loan_Number</th>
                    </tr>:
                    <tr className="journal-details header" style={{position:"sticky", top:"0"}}>
                      <th>Client</th>
                      <th>Loan_Number</th>
                      <th>Date_Disbursed</th>
                      <th>Interest_Rate</th>
                      <th>Repayment_Cycle</th>
                      <th>Loan_Duration</th>
                      <th>Principal</th>
                      <th>Principal_Amount_Due</th>
                      <th>Amount_Due_At_Maturity</th>
                      <th>Amount_Paid</th>
                      <th>Status</th>
                    </tr>
                    }
                  </thead>
                  <tbody>
                    {loans.length > 0 ? loans.map(loan => {
                      if (details) {
                        if (selectedloan.id == loan.id) {
                          return (
                            <tr key={loan.id}>
                              <td className='td-class'>
                                <div title={loan.client}>
                                  <span id={loan.client_id}>
                                    {loan.client.length >14 ? `${loan.client.slice(0, 15)}...`: loan.client}
                                  </span>
                                </div>
                              </td>
                              <td><span onClick={handleClick} id={loan.id} style={{color:"red", fontSize:"0.75rem", cursor:"pointer"}} className="link">{loan.loan_id}</span></td>
                            </tr>
                          )
                        }else{
                          return (
                            <tr key={loan.id}>
                              <td className='td-class'>
                                <div title={loan.client}>
                                  <span id={loan.client_id}>
                                    {loan.client.length >14 ? `${loan.client.slice(0, 15)}...`: loan.client}
                                  </span>
                                </div>
                              </td>
                              <td><span onClick={handleClick} id={loan.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{loan.loan_id}</span></td>
                            </tr>
                          )
                        }
                      }
                      else 
                      { 
                      return (
                        <tr className='tr-class' key={loan.id}>
                          <td className='td-class'>
                            <div title={loan.client}>
                              <span id={loan.client_id}>
                                {loan.client.length >14 ? `${loan.client.slice(0, 15)}...`: loan.client}
                              </span>
                            </div>
                          </td>
                          <td><span onClick={handleClick} id={loan.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{loan.loan_id}</span></td>
                          <td>{convertDate(loan.loan_added_on)}</td>
                          <td>{loan.interest_rate}%</td>
                          <td>{loan.repayment_cycle}</td>
                          <td>{getDuration(loan.repayment_cycle, loan.number_of_repayments)}</td>
                          <td><span style={{display:"flex"}}><span>{loan.currency} </span><span>{parseFloat(loan.principal).toFixed(2)}</span></span></td>
                          <td><span style={{display:"flex"}}><span>{loan.currency} </span><span>{parseFloat(loan.principal_amount_due).toFixed(2)}</span></span></td>
                          <td><span style={{display:"flex"}}><span>{loan.currency} </span><span>{parseFloat(loan.amount_due_at_maturity).toFixed(2)}</span></span></td>
                          <td><span style={{display:"flex"}}><span>{loan.currency} </span><span>{parseFloat(loan.total_amount_paid).toFixed(2)}</span></span></td>
                          <td><span className={statusClasses[loan.status]} style={{marginBottom:"3px"}}>{loan.status}</span></td>
                        </tr>
                      )
                    }}) : <tr><td colSpan={10} style={{textAlign: 'center'}}>No loans could be found.</td></tr>}
                  </tbody>
                  {!details &&
                  <tfoot style={{insetBlockEnd: 0, position: 'sticky'}} className="journal-details header">
                    <tr>
                      <th>Total</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>{currency.shortname} {parseFloat(totalPrincipal).toFixed(2)}</th>
                      <th>{currency.shortname} {parseFloat(totalPrincipalAmountDue).toFixed(2)}</th>
                      <th>{currency.shortname} {parseFloat(totalPrincipalAmountDueAtMaturity).toFixed(2)}</th>
                      <th>{currency.shortname} {parseFloat(totalAmountPaid).toFixed(2)}</th>
                      <th></th>
                    </tr>
                  </tfoot>
                  }
                </table>
              </div>
              {details && (
                <div style={{position:"sticky", top:"0", width:"100%"}}>
                    <div className="j-details-container" style={{padding:"1.5rem"}}>

                      <Loan selectedLoanID={selectedLoanID} setDetails={setDetails} />

                    </div>
                </div>
              )}
            </div>
          </div>
          <Footer nextPageNumber={nextPageNumber} loadMoreLoans={loadMoreLoans} loadingMore={loadingMore}/>
        </div>
  )
}

const maybePluralize = (count, noun, suffix = 's') => `${count} ${noun}${count !== 1 ? suffix : ''}`;
const getDuration = (repayment_cycle, number_of_repayments) => {
  if (repayment_cycle == 'Monthly') {
    return maybePluralize(number_of_repayments, 'Month')
  }else if (repayment_cycle == 'Daily') {
    return maybePluralize(number_of_repayments, 'Day')
  }else if (repayment_cycle == 'Weekly') {
    return maybePluralize(number_of_repayments, 'Week')
  }else if (repayment_cycle == 'Biweekly') {
    return maybePluralize(2 * number_of_repayments, 'Week')
  }else if (repayment_cycle == 'Bimonthly') {
    return maybePluralize(2 * number_of_repayments, 'Month')
  }else if (repayment_cycle == 'Quartely') {
    return maybePluralize(3 * number_of_repayments, 'Month')
  }else if (repayment_cycle == 'Every 4 Months') {
    return maybePluralize(4 * number_of_repayments, 'Month')
  }else if (repayment_cycle == 'Semi-annually') {
    return maybePluralize(6 * number_of_repayments, 'Month')
  }else if (repayment_cycle == 'Yearly') {
    return maybePluralize(number_of_repayments, 'Year')
  }
}

export default LoansTable;