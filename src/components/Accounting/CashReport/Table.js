import React, { useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Journal from './Journal';
import { makeRequest } from '../../../utils/utils';

function Table({setOrder, statement, loggedInUser, intValues, order, reconciled}) {
  const [showJournal, setShowJournal] = useState(false);
  const [journal, setJournal] = useState(null);
  const [selectedrowId, setSelectedrowId] = useState(null);
  const receipts = statement.transactions.filter(txn => txn.type == 'receipt');
  const payments = statement.transactions.filter(txn => txn.type == 'payment');
  let transactions;

  if (order === 'ReceiptsFirst') {
    transactions = [...receipts, ...payments];
  }else if (order === 'PaymentsFirst') {
    transactions = [...payments, ...receipts];
  }else {
    transactions = statement.transactions;
  }

  const goToJournalDetails = (evt) => {
    evt.preventDefault();
    setShowJournal(true);
    setJournal(null);
    setSelectedrowId(evt.target.id);
    fetchJournal(evt.target.id);
  }

  const reconcile = async (evt) => {
    evt.preventDefault();
    try {
      const body = {last_reconciliation_date: statement.report_date}
      const response = await makeRequest.patch(`/acc-api/mark-reconciled/${intValues.account_id}/`, body, {timeout: 6000});
      if (response.ok) {
        return setReconciled(true);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  async function fetchJournal(journalId) {
    try {
      const response = await makeRequest.get(`/acc-api/journal-details/${journalId}/`, {timeout: 6000});
      if (response.ok) {
        const data = await response.json();
        return setJournal(data);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  return (
        <div className='row cash-management-table' style={{columnGap:"5px", justifyContent:"space-between"}}>
          <div style={{width:"60%"}}>
            <div style={{display:"flex", flexDirection:"row", columnGap:"10px", marginBottom:"10px"}}>
              <div>
                <ReactHTMLTableToExcel
                  id='test-table-xls-button'
                  className='download-table-xls-button btn btn-default'
                  table='cash-balance'
                  filename='Cash Balance'
                  sheet='tablexls'
                  buttonText='Download as XLS'
                />
              </div>
              <div className="btn btn-default csh-btn">
                <select value={order} onChange={evt => setOrder(evt.target.value)} className="cashreport-select">
                  <option value='ReceiptsFirst'>Show Receipts First</option>
                  <option value='PaymentsFirst'>Show Payments First</option>
                  <option value='Chronologically'>List Chronologically</option>
                </select>
              </div>
              {reconciled ?
                <button className='btn btn-success'>Reconciled</button> :
                <button type='submit' onClick={reconcile} className="btn btn-default">Mark As Reconciled</button>
              }
            </div>
            <div style={{width:"100%", overflowX:"auto"}}>
              <div className="table__height">
                <table id='cash-balance' className='table table-bordered table-condensed table-hover'>
                  <thead>
                    <tr className="journal-details header">
                      <th>Date</th>
                      <th>Narration</th>
                      <th>Reference</th>
                      <th>Dr</th>
                      <th>Cr</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{background: Number(statement.balance_bd) >= 0 ? '#7FFF00' : '#FFB6C1', position:'sticky', top:'0'}} className="cashreport-balance">
                      <td>{statement.report_date}</td>
                      <td>Balance b/d</td>
                      <td></td>
                      <td>{Number(statement.balance_bd) >= 0 && statement.balance_bd}</td>
                      <td>{Number(statement.balance_bd) < 0 && Math.abs(statement.balance_bd)}</td>
                    </tr>
                    {transactions.map(txn => {
                      return (
                        <tr key={txn.id} className={txn.id == selectedrowId ? "cashreport-table selected": "cashreport-table"}>
                          <td></td>
                          <td>{txn.description}</td>
                          <td><a id={txn.id} href='#' onClick={goToJournalDetails}>{txn.reference}</a></td>
                          <td>{txn.type === 'receipt' && txn.amount}</td>
                          <td>{txn.type === 'payment' && txn.amount}</td>
                        </tr>
                      )
                    })}
                    <tr style={{background: Number(statement.balance_cd) >= 0 ? '#7FFF00' : '#FFB6C1', position:'sticky', insetBlockEnd:'0'}} className="cashreport-balance">
                      <td></td>
                      <td>Balance c/d</td>
                      <td></td>
                      <td>{Number(statement.balance_cd) < 0 && Math.abs(statement.balance_cd)}</td>
                      <td>{Number(statement.balance_cd) >= 0 && statement.balance_cd}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{statement.total_receipts}</td>
                      <td>{statement.total_payments}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {showJournal && <Journal journal={journal} setShowJournal={setShowJournal} setSelectedrowId={setSelectedrowId}/>}
        </div>
  )
}

export default Table;