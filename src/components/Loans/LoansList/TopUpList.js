import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function TopUpList({topups}) {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default client__details'
          table='penalties'
          filename='Loan Top-Ups'
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div style={{padding: '1.5rem'}} className='miniLoanDetails-container'>
        <div style={{overflowX: 'auto', maxHeight: '600px'}}>
          <table className='table' id='penalties'>
            <thead>
              <tr className='journal-details header' style={{position: 'sticky', top: '0'}}>
                <th className='schedule__table'>Date Logged</th>
                <th className='schedule__table'>Value Date</th>
                <th className='schedule__table'>Fund Account Name</th>
                <th className='schedule__table'>Amount</th>
                <th className='schedule__table'>User</th>
              </tr>
            </thead>
            <tbody>
              {topups.map(topup => (
                <tr key={topup.id}>
                  <td className='schedule__table'>{topup.date_logged}</td>
                  <td className='schedule__table'>{topup.value_date}</td>
                  <td className='schedule__table'>{topup.fund_account_name}</td>
                  <td className='schedule__table'>{topup.topup_amount}</td>
                  <td className='schedule__table'>{topup.user_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TopUpList;