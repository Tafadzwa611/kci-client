import React from 'react';
import { convertDate } from '../../Accounting/Journals/utils';
import Footer from './Footer';
import Loan from '../LoansDetails/Loan';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Fetcher } from '../../../common';


function LoansTable(
  {
    loans, 
    nextPageNumber, 
    loadMoreLoans, 
    totalCount, 
    loadingMore, 
    currencies, 
    currencyId, 
    setDetails, 
    details, 
    selectedLoanID, 
    setSelectedLoanID, 
    selectedloan,
    minDate,
    maxDate,
    selectedBranches,
    setLoans,
  }) {

  const getStrDate = (date) => {
    const mydate = new Date(date);
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()];
    return `${month} ${mydate.getDate()}, ${mydate.getFullYear()}`;
  }

  const getFileName = () => {
    if (minDate != '' && maxDate != '') {
      return `Loans List  for ${loans[0].tenant} from ${getStrDate(minDate)} to ${getStrDate(maxDate)}`
    }
    if (minDate == '' && maxDate != '') {
      return `Loans List  for ${loans[0].tenant} upto ${getStrDate(maxDate)}`
    }
    if (minDate != '' && maxDate == '') {
      return `Loans List  for ${loans[0].tenant} from ${getStrDate(minDate)}`
    }
    return `Loans List  for ${loans[0].tenant} all time.`
  }
  
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

  const totalInterest = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.interest);
  }, 0);

  const totalPenalty = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.penalty_reference);
  }, 0);

  const totalPrincipalAmountDue = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.principal_amount_due);
  }, 0);

  const totalInterestAmountDue = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.interest_amount_due);
  }, 0);

  const totalPenaltyAmountDue = loans.reduce((accumulator, loan) => {
    return parseFloat(accumulator) + parseFloat(loan.penalty);
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
    'Arrears': 'badge badge-danger',
    'Approved': 'badge badge-info-light',
    'Open': 'badge badge-info',
    'Over Paid': 'badge badge-warning',
    'Defaulted': 'badge badge-danger',
    'Rejected': 'badge badge-danger',
    'Written-Off': 'badge badge-dark',
  }
 
  return (
      <div>
          <div className="table-header">
            <div>
              Showing {loans.length} of {totalCount} loans.
            </div>
            <div>
              <ReactHTMLTableToExcel
                id='test-table-xls-button'
                className='btn btn-default'
                table='loans'
                filename='loans'
                sheet='tablexls'
                buttonText='Download as XLS'
              />
            </div>
          </div>
          <div style={details ? {display:"grid", gridTemplateColumns:"25% 74%", columnGap:"1%"} : {display:"block"}}>
            <div style={{padding:"0", border:"none"}}>
              <div style={{width:"100%", overflowX:"auto"}}>

                <div className="table__height">
                  <table className='table' id='loans'>
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
                          <th>Interest</th>
                          <th>Penalty</th>
                          <th>Principal_Amount_Due</th>
                          <th>Interest_Amount_Due</th>
                          <th>Penalty_Amount_Due</th>
                          <th>Amount_Due_At_Maturity</th>
                          <th>Amount_Paid</th>
                          {/* <th>Status</th> */}
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
                                <td style={{display: "flex", flexDirection: "row", alignItems: "center", columnGap: "5px"}}>
                                  <span onClick={handleClick} id={loan.id} style={{color:"red", fontSize:"0.75rem", cursor:"pointer"}} className="link">{loan.loan_id}</span>
                                  <span className={statusClasses[loan.status]} style={{marginBottom:"3px"}}>{loan.status}</span>
                                </td>
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
                                <td style={{display: "flex", flexDirection: "row", alignItems: "center", columnGap: "5px"}}>
                                  <span onClick={handleClick} id={loan.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{loan.loan_id}</span>
                                  <span className={statusClasses[loan.status]} style={{marginBottom:"3px"}}>{loan.status}</span>
                                </td>
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
                            <td style={{display: "flex", flexDirection: "row", alignItems: "center", columnGap: "5px"}}>
                              <span onClick={handleClick} id={loan.id} style={{fontSize:"0.75rem", cursor:"pointer"}} className="link">{loan.loan_id}</span>
                              <span className={statusClasses[loan.status]} style={{marginBottom:"3px"}}>{loan.status}</span>
                            </td>
                            <td>{convertDate(loan.loan_added_on)}</td>
                            <td>{loan.interest_rate}%</td>
                            <td>{loan.repayment_cycle}</td>
                            <td>{getDuration(loan.repayment_cycle, loan.number_of_repayments)}</td>
                            <td>{parseFloat(loan.principal).toFixed(2)}</td>
                            <td>{parseFloat(loan.interest).toFixed(2)}</td>
                            <td>{parseFloat(loan.penalty_reference).toFixed(2)}</td>
                            <td>{parseFloat(loan.principal_amount_due).toFixed(2)}</td>
                            <td>{parseFloat(loan.interest_amount_due).toFixed(2)}</td>
                            <td>{parseFloat(loan.penalty).toFixed(2)}</td>
                            <td>{parseFloat(loan.amount_due_at_maturity).toFixed(2)}</td>
                            <td>{parseFloat(loan.total_amount_paid).toFixed(2)}</td>
                            {/* <td><span className={statusClasses[loan.status]} style={{marginBottom:"3px"}}>{loan.status}</span></td> */}
                          </tr>
                        )
                      }}) : <tr><td colSpan={15} style={{textAlign: 'center'}}>No loans could be found.</td></tr>}
                      {
                        loans.length > 0 && 
                        <>
                          <tr>
                            <td className='text-bold text-left' colSpan={15}>Loans List</td>
                          </tr>
                          <tr>
                            <td title={getFileName()} className='text-bold text-left' colSpan={15} style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}>
                            {getFileName()}
                            </td>
                          </tr>
                          <tr>
                            <td
                            title={selectedBranches.length == 0 ? 'User Branch' : selectedBranches.map(branch => ` ${branch.name}`)}
                            className='text-bold text-left'
                            colSpan={15}
                            style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
                            >Branches: {selectedBranches.length == 0 ? 'User Branch' : selectedBranches.map(branch => ` ${branch.name}`)}</td>
                          </tr>
                          <tr>
                            <td className='text-bold text-left' colSpan={15}>{`Extracted On: ${new Date()}`}</td>
                          </tr>
                          <tr>
                            <td className='text-bold text-left' colSpan={15}>Currency: {currency.shortname}</td>
                          </tr>
                        </>
                      }
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
                        <th>{parseFloat(totalPrincipal).toFixed(2)}</th>
                        <th>{parseFloat(totalInterest).toFixed(2)}</th>
                        <th>{parseFloat(totalPenalty).toFixed(2)}</th>
                        <th>{parseFloat(totalPrincipalAmountDue).toFixed(2)}</th>
                        <th>{parseFloat(totalInterestAmountDue).toFixed(2)}</th>
                        <th>{parseFloat(totalPenaltyAmountDue).toFixed(2)}</th>
                        <th>{parseFloat(totalPrincipalAmountDueAtMaturity).toFixed(2)}</th>
                        <th>{parseFloat(totalAmountPaid).toFixed(2)}</th>
                      </tr>
                    </tfoot>
                    }
                  </table>
                </div>
              </div>
            </div>
            <div>
              {details && (
                <div style={{position:"sticky", top:"0", width:"100%"}}>
                    <div className="j-details-container" style={{padding:"1.5rem"}}>
                      <Fetcher urls={['/acc-api/cash-and-cash-equivalents-sub-accs/', `/loansapi/get_loan/${selectedLoanID}/`, '/usersapi/staff/']}>
                        {({data}) => <Loan 
                                        fund_accounts={data[0]} 
                                        loan_info={data[1].loan} 
                                        days_in_arrears={data[1].days_in_arrears} 
                                        user_permissions={data[1].user_permissions} 
                                        loan_officers={data[2]} 
                                        selectedLoanID={selectedLoanID} 
                                        setDetails={setDetails} 
                                        selectedloan={selectedloan} 
                                        setLoans={setLoans}
                                    />}
                      </Fetcher>

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