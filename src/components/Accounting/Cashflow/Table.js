import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({statement}) => {
  return (
    <>
      <div style={{marginTop:'1.5rem'}}>
      <ReactHTMLTableToExcel
      id='test-table-xls-button'
      className='btn btn-default'
      table='cash-flow'
      filename='Cash Flow'
      sheet='tablexls'
      buttonText='Download as XLS'
      />
      </div>
      <div className='table-container font-12 cashflow' style={{marginTop:'1rem',border:'none', padding:'0'}}>
        <div className='table-responsive'>
          <div className='col-6'>
            <table className='table cashflow_table' id='cash-flow'>
              <thead>
                <tr className='table-head-row'>
                  <th>Referencing Account</th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                {statement.accounts.map(acc =>
                  <tr key={acc.id} className='danger'>
                    <td><b>{acc.name}</b></td>
                    <td>{acc.debits || '0.00'}</td>
                    <td>{acc.credits || '0.00'}</td>
                  </tr>
                )}
                <tr className='danger'>
                  <td><b>Total</b></td>
                  <td>{statement.total_debits}</td>
                  <td>{statement.total_credits}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table;