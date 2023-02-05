import React from 'react';
import Empty from './Empty';
import MiniLoader from '../../Loader/MiniLoader';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function New({report, loading, minDate, maxDate, currencyIso, loggedInUser}) {
  if (loading) {
    return <MiniLoader />
  }

  if (report===null || report.rtype != 'accrual') {
    return <Empty message='Select Start Date, End Date and at least one branch to run income statement.'/>
  }

  const getStrDate = (date) => {
    const mydate = new Date(date);
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()];
    return `${month} ${mydate.getDate()}, ${mydate.getFullYear()}`;
  }

  const incomeAccs = report.income_statement.filter(acc => acc.type === 'INCOME');
  const expenseAccs = report.income_statement.filter(acc => acc.type === 'EXPENSE');

  return (
    <div style={{marginTop:"2rem"}}>
      <div>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='new-income-statement'
          filename={`${currencyIso} Income Statement for ${loggedInUser.company_name} from ${getStrDate(minDate)} to ${getStrDate(maxDate)}`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <table id='new-income-statement' className='table' style={{marginTop:"10px"}}>
        <thead className="journal-details header">
          <tr>
            <th>Account Branch</th>
            <th>GL Code</th>
            <th>Account Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b>{currencyIso} Income Statement</b></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><b>{loggedInUser.company_name} From {getStrDate(minDate)} to {getStrDate(maxDate)}</b></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {incomeAccs.map((acc, idx) => {
            return (
              <tr key={idx}>
                <td>{acc.branch_name}</td>
                <td>{acc.code}</td>
                <td>{acc.name}</td>
                <td>{acc.amount}</td>
              </tr>
            )
          })}
          <tr>
            <td></td>
            <td></td>
            <td><b>TOTAL INCOME</b></td>
            <td><b>{report.total_income}</b></td>
          </tr>
          {expenseAccs.map((acc, idx) => {
            return (
              <tr key={idx}>
                <td>{acc.branch_name}</td>
                <td>{acc.code}</td>
                <td>{acc.name}</td>
                <td>{acc.amount}</td>
              </tr>
            )
          })}
          <tr>
            <td></td>
            <td></td>
            <td><b>TOTAL EXPENSES</b></td>
            <td><b>{report.total_expenses}</b></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td><b>NET INCOME</b></td>
            <td><b>{report.net_income}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default New;