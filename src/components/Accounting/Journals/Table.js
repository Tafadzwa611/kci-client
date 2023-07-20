import React, { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import {JournalDetails} from './JournalDetails';

export default function Table({info, setInfo, params}) {
  const [jID, setJID] = useState(null);
  const [line, setLine] = useState(0);
  const handleClick = (e) => {
    setLine(e.target.dataset.line);
    setJID(e.target.id);
  }
  const close = () => setJID(null);

  useEffect(() => {
    setLine(0);
    setJID(null);
  }, [JSON.stringify(info)]);

  return (
    <div style={{marginTop:'1rem'}}>
      <div style={{marginBottom:'1rem'}}>
        <TableHeader journals={info} params={params} setJournals={setInfo}/>
        {jID ?
          <MiniTable journals={info.journals} jID={jID} line={line} close={close} handleClick={handleClick}/> :
          <MainTable handleClick={handleClick} line={line}  journals={info.journals}/>}
      </div>
    </div>
  )
}

const MainTable = ({journals, handleClick, line}) => {
  useEffect(() => {
    const table = document.getElementById('journals');
    const rows = table.querySelectorAll('tr');
    rows[line].scrollIntoView({behavior: 'instant', block: 'center'});
  }, []);

  return (
    <div style={{display:'block'}}>
      <div className='table-responsive p-0' style={{maxHeight: '600px'}}>
        <table className='table table-bordered table-head-fixed text-nowrap' id='journals'>
          <thead>
            <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
              <th className='th-sm'>Transaction_ID</th>
              <th className='th-sm'>Value_Date</th>
              <th className='th-sm'>Date_Logged</th>
              <th className='th-sm'>Account_Debited_Name</th>
              <th className='th-sm'>Account_Debited_Code</th>
              <th className='th-sm'>Account_Debited_Balance</th>
              <th className='th-sm'>Branch_Debited</th>
              <th className='th-sm'>Account_Credited_Name</th>
              <th className='th-sm'>Account_Credited_Code</th>
              <th className='th-sm'>Account_Credited_Balance</th>
              <th className='th-sm'>Branch_Credited</th>
              <th className='th-sm'>Transaction_Amount</th>
              <th className='th-sm'>Client_ID</th>
              <th className='th-sm'>Client_Name</th>
              <th className='th-sm'>Loan_Account_ID</th>
              <th className='th-sm'>Created_By</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal, idx) => {
              return (
                <tr key={journal.id}>
                  <td><span onClick={handleClick} id={journal.id} data-line={idx} style={{fontSize:'0.75rem', cursor:'pointer'}} className='link'>{journal.transaction_id}</span></td>
                  <td>{journal.value_date}</td>
                  <td>{journal.date_logged}</td>
                  <td>{journal.account_debited_name}</td>
                  <td>{journal.account_debited_code}</td>
                  <td>{journal.acc_debited_bal}</td>
                  <td>{journal.branch_debited_name}</td>
                  <td>{journal.account_credited_name}</td>
                  <td>{journal.account_credited_code}</td>
                  <td>{journal.acc_credited_bal}</td>
                  <td>{journal.branch_credited_name}</td>
                  <td>{journal.amount}</td>
                  <td>{journal.client_id}</td>
                  <td>{journal.client_name}</td>
                  <td>{journal.client_id}</td>
                  <td>{journal.created_by_name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const MiniTable = ({handleClick, close, journals, jID, line}) => {
  useEffect(() => {
    const table = document.getElementById('journals');
    const rows = table.querySelectorAll('tr');
    rows[line].scrollIntoView({behavior: 'instant', block: 'center'});
  }, []);

  return (
    <div style={{display:'grid', gridTemplateColumns:'2fr 3fr', columnGap:'1rem'}}>
      <div className='table-responsive p-0' style={{maxHeight: '600px'}}>
        <table className='table table-bordered table-head-fixed text-nowrap' id='journals'>
          <thead>
            <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
              <th>Transaction_ID</th>
              <th className='th-sm'>Account_Debited_Name</th>
              <th className='th-sm'>Account_Credited_Name</th>
            </tr>
          </thead>
          <tbody>
            {journals.map((journal, idx) => {
              return (
                <tr key={journal.id}>
                  <td>
                    <span onClick={handleClick} id={journal.id} data-line={idx} style={{fontSize:'0.75rem', cursor:'pointer', ...(journal.id == jID ? {color:'red'} : {})}} className='link'>
                      {journal.transaction_id}
                    </span>
                  </td>
                  <td>{journal.account_debited_code} - {journal.account_debited_name}</td>
                  <td>{journal.account_credited_code} - {journal.account_credited_name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <JournalDetails close={close} journalId={jID}/>
    </div>
  )
}