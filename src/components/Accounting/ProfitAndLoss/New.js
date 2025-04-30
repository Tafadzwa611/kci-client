import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Margin, usePDF } from 'react-to-pdf';

function New({report}) {
  const { toPDF, targetRef } = usePDF({
    filename: 'income-statement.pdf',
    page: { margin: Margin.MEDIUM, orientation: 'landscape' },
  });

  const groupedIncomeAccs = report.grouped_accounts.INCOME;
  const groupedExpenseAccs = report.grouped_accounts.EXPENSE;

  const incomeAccs = report.ungrouped_accounts.filter(acc => acc.type === 'INCOME');
  const expenseAccs = report.ungrouped_accounts.filter(acc => acc.type === 'EXPENSE');

  return (
    <div style={{marginTop:'2rem'}}>
      <div style={{display: 'flex', columnGap: '5px'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='new-income-statement'
          filename={`${report.currency} Income Statement for ${report.company_name} from ${report.min_date} to ${report.max_date}`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
        <button className='btn btn-default' onClick={toPDF}>Download as PDF</button>
      </div>
      <div ref={targetRef}>
        <table id='new-income-statement' className='table' style={{marginTop:'10px'}}>
          <thead className='journal-details header'>
            <tr>
              <th>GL Code</th>
              <th>Account Branch</th>
              <th>Account Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>{report.currency} Income Statement</b></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td><b>{report.company_name} From {report.min_date} to {report.max_date}</b></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {Object.keys(groupedIncomeAccs).map((headerAccountName, idx) => (
              <GroupedAccounts key={idx} headerAccountName={headerAccountName} detailAccounts={groupedIncomeAccs[headerAccountName]}/>
            ))}
            {incomeAccs.map((acc, idx) => <DetailAccount key={idx} acc={acc} />)}
            <tr>
              <td></td>
              <td></td>
              <td><b>TOTAL INCOME</b></td>
              <td><b>{report.total_income}</b></td>
            </tr>
            {Object.keys(groupedExpenseAccs).map((headerAccountName, idx) => (
              <GroupedAccounts key={idx} headerAccountName={headerAccountName} detailAccounts={groupedExpenseAccs[headerAccountName]}/>
            ))}
            {expenseAccs.map((acc, idx) => <DetailAccount key={idx} acc={acc} />)}
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
    </div>
  )
}

const DetailAccount = ({acc}) => {
  return (
    <tr>
      <td>{acc.code}</td>
      <td>{acc.branch_name ? acc.branch_name : 'Interbranch'}</td>
      <td>{acc.name}</td>
      <td>{acc.balance}</td>
    </tr>
  )
}

const GroupedAccounts = ({headerAccountName, detailAccounts}) => {
  return (
    <>
      <tr>
        <td><b>{headerAccountName}</b></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      {detailAccounts.map((acc, idx) => (
        <tr key={idx}>
          <td style={{paddingLeft:'5rem'}}>{acc.code}</td>
          <td>{acc.branch_name}</td>
          <td>{acc.name}</td>
          <td>{acc.balance}</td>
        </tr>
      ))}
    </>
  )
}

export default New;