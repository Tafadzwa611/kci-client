import React from 'react';
import { Fetcher } from '../../../common';

function Journal({journalID, setJournalID}) {
  const closeJournalDetails = (evt) => {
    evt.preventDefault();
    setJournalID(null);
  }

  return (
    <Fetcher urls={[`/acc-api/journal-details/${journalID}`]}>
      {({data}) => (
        <div style={{width: '38%'}}>
          <span>Journal Details</span>
          <div className='journal-details'>
            <button type='button' className='close' onClick={closeJournalDetails}><span aria-hidden='true' style={{fontSize:'1.2rem'}}>&times;</span></button>
            <div style={{display:'flex', columnGap:'7px', marginTop:'1.5rem'}}>
              <div className='col-6'>
                <ul className='list-unstyled well'>
                  <li><b>Debit</b></li>
                  <li>Account Debited: {data[0].account_debited}</li>
                  <li>Branch Debited: {data[0].branch_debited}</li>
                  <li>Amount Debited: {data[0].currency} {data[0].amount_debited}</li>
                </ul>
              </div>

              <div className='col-6'>
                <ul className='list-unstyled well'>
                  <li><b>Credit</b></li>
                  <li>Account Credited: {data[0].account_credited}</li>
                  <li>Branch Credited: {data[0].branch_credited}</li>
                  <li>Amount Credited: {data[0].currency} {data[0].amount_credited}</li>
                </ul>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <ul className='list-unstyled well'>
                  <li><b>Additional Details</b></li>
                  <li>Created By: {data[0].created_by}</li>
                  <li>Reference: {data[0].transaction_id}</li>
                  <li>Narrative: {data[0].description}</li>
                  <li>Value Date: {data[0].value_date}</li>
                  <li>Date Logged: {data[0].date_added}</li>
                  <li>Created By: {data[0].created_by}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fetcher>
  )
}

export default Journal;