import React, { useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Journal from './Journal';
import axios from 'axios';
import Cookies from 'js-cookie';

function Table({statement, setStatement}) {
  const [journalID, setJournalID] = useState(null);
  const [error, setError] = useState(null);

  const goToJournalDetails = (evt) => {
    evt.preventDefault();
    setJournalID(evt.target.id);
  }

  const reconcile = async (evt) => {
    evt.preventDefault();
    setError(null);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/acc-api/mark-reconciled/${statement.account_id}/`, {last_reconciliation_date: statement.report_date}, CONFIG);
      setStatement(curr => ({...curr, reconciled: true}));
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
  }

  const removeClosure = async (evt) => {
    evt.preventDefault();
    setError(null);
    try {
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      await axios.patch(`/acc-api/remove_closure/${statement.account_id}/`, {closure_date: statement.report_date}, CONFIG);
      setStatement(curr => ({...curr, reconciled: false}));
    } catch (error) {
      setError(JSON.stringify(error.response.data));
    }
  }

  return (
    <div className='row cash-management-table' style={{columnGap: '5px', justifyContent: 'space-between'}}>
      <div style={{width: '60%'}}>
        <div style={{display: 'flex', flexDirection: 'row', columnGap: '10px', marginBottom: '10px'}}>
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
          {statement.reconciled ?
          <>
          <button className='btn btn-success'>Closed</button>
          <button type='submit' className='btn btn-danger' onClick={removeClosure}>Remove Closure</button>
          </> :
          <button type='submit' onClick={reconcile} className='btn btn-default'>Close</button>}
          {error}
        </div>
        <div style={{width:'100%', overflowX:'auto'}}>
          <div className='table__height'>
            <table id='cash-balance' className='table table-bordered table-condensed table-hover'>
              <thead>
                <tr className='journal-details header'>
                  <th>Date</th>
                  <th>Narration</th>
                  <th>Referencing Account</th>
                  <th>Reference</th>
                  <th>Dr</th>
                  <th>Cr</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{background: Number(statement.balance_bd) >= 0 ? '#7FFF00' : '#FFB6C1', position:'sticky', top:'0'}} className='cashreport-balance'>
                  <td>{statement.report_date}</td>
                  <td>Balance b/d</td>
                  <td></td>
                  <td>{Number(statement.balance_bd) >= 0 && statement.balance_bd}</td>
                  <td>{Number(statement.balance_bd) < 0 && Math.abs(statement.balance_bd)}</td>
                </tr>
                {statement.transactions.map(txn => {
                  return (
                    <tr key={txn.id} className={txn.id == journalID ? 'cashreport-table selected': 'cashreport-table'}>
                      <td></td>
                      <td>{txn.description}</td>
                      <td>{txn.ref_account}</td>
                      <td><a id={txn.id} href='#' onClick={goToJournalDetails}>{txn.reference}</a></td>
                      <td>{txn.type === 'receipt' && txn.amount}</td>
                      <td>{txn.type === 'payment' && txn.amount}</td>
                    </tr>
                  )
                })}
                <tr style={{background: Number(statement.balance_cd) >= 0 ? '#7FFF00' : '#FFB6C1', position:'sticky', insetBlockEnd:'0'}} className='cashreport-balance'>
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
      {journalID ? <Journal journalID={journalID} setJournalID={setJournalID} /> : null}
    </div>
  )
}

export default Table;