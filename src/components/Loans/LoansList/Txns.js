import React, {useState} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReverseTxn from './ReverseTxn/ReverseTxn';

function Txns({loan, setLoan, txns, client_name}) {
  const [txnID, setTxnID] = useState(null);

  return (
    <>
      {txnID && <ReverseTxn txnID={txnID} setOpen={setTxnID} setLoan={setLoan}/>}
      <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default client__details'
          table='transactions'
          filename={`${client_name}'s transactions`}
          sheet='tablexls'
          buttonText='Download as XLS'
        />
        <a className='btn btn-default client__details' href={`/loans/loan_statement_pdf/${loan.id}/`} target="_blank" rel="noreferrer">
          Download as PDF
        </a>
      </div>
      <div style={{padding: '1.5rem'}} className='miniLoanDetails-container'>
        <div style={{width: '100%', overflowX: 'auto'}}>
          <div style={{maxHeight: '600px'}}>
            <table className='table' id='transactions'>
              <thead>
                <tr className='journal-details header' style={{position: 'sticky', top: '0'}}>
                  <th className='schedule__table'>Client Name</th>
                  <th className='schedule__table'>Value Date</th>
                  <th className='schedule__table'>Description</th>
                  <th className='schedule__table'>Debit</th>
                  <th className='schedule__table'>Credit</th>
                  <th className='schedule__table'>Total Balance</th>
                  {loan.product_type == 'Dynamic Term Loan' && <th className='schedule__table'>Action</th>}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='schedule__table'><b>{client_name}</b></td>
                </tr>
                {txns.map(txn => (
                  <tr key={txn.id}>
                    <td className='schedule__table'></td>
                    <td className='schedule__table'>{txn.cvalue_date}</td>
                    <td className='schedule__table'>{txn.description}</td>
                    <td className='schedule__table'>{txn.entry_type === 'Dr' && txn.amount}</td>
                    <td className='schedule__table'>{txn.entry_type === 'Cr' && txn.amount}</td>
                    <td className='schedule__table'>{txn.balance}</td>
                    {loan.product_type == 'Dynamic Term Loan' && (
                      <td className='schedule__table'>
                        {txn.txn_type === 'Interest Applied' ? <ReverseBtn id={txn.id} setTxnID={setTxnID}/> : null}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

const ReverseBtn = ({id, setTxnID}) => {
  const buttonStyles = {
    background: '#f5424b',
    color: '#fff',
    border: 'none',
    borderRadius: '.15rem',
    cursor: 'pointer',
    padding: '.2rem .25rem',
    marginLeft: '5px',
    fontSize: '0.75rem'
  };

  return (
    <button id={id} onClick={(evt) => setTxnID(evt.target.id)} style={buttonStyles}>
      Reverse
    </button>
  )
}

export default Txns;