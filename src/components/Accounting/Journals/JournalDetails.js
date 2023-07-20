import React from 'react';
import { Fetcher } from '../../../common';
import { useParams, Link } from 'react-router-dom';

export default function JournalDetailView() {
  const params = useParams();
  return <JournalDetails journalId={params.journalId}/>
}

const JournalDetails = ({journalId, close}) => {
  return (
    <Fetcher urls={[`/acc-api/journal-details/${journalId}/`]}>
      {({data}) => (
        <div style={{position:'sticky', top:'0', width:'100%'}}>
          <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
            {close ?
            <div className='row' style={{margin:'0 0 1.5rem'}}>
              <div className='col-12' style={{display:'flex', justifyContent:'flex-end'}}>
                <button><a onClick={close} className='btn btn-default' style={{borderRadius:'0'}}>Close</a></button>
              </div>
              <button className='btn btn-olive'>
                <Link to={`/accounting/viewaccounting/journals/journal/${journalId}`}>Max</Link>
              </button>
            </div> : null}
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <div>
                <ul>
                  <li><b>Debit</b></li>
                  <li>Account Debited: {data[0].account_debited}</li>
                  <li>Account Debited Code: {data[0].account_debited_code}</li>
                  <li>Branch Debited: {data[0].branch_debited}</li>
                  <li>Amount Debited: {data[0].currency} {data[0].amount}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li><b>Credit</b></li>
                  <li>Account Credited: {data[0].account_credited}</li>
                  <li>Account Credited Code: {data[0].account_credited_code}</li>
                  <li>Branch Credited: {data[0].branch_credited}</li>
                  <li>Amount Credited: {data[0].currency} {data[0].amount}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li><b>Loan and Client Details</b></li>
                  <li>Client Name: {data[0].client_name}</li>
                  <li>Client ID: {data[0].client_id}</li>
                  <li>Account ID: {data[0].account_id}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li><b>Additional Details</b></li>
                  <li>Currency: {data[0].currency}</li>
                  <li>Value Date: {data[0].value_date}</li>
                  <li>Date Logged: {data[0].date_added}</li>
                  <li>Created By: {data[0].created_by}</li>
                  <li>Narrative: {data[0].description}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fetcher>
  )
}

export {JournalDetails};