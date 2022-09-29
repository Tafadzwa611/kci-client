import React from 'react';
import MiniLoader from '../../Loader/MiniLoader';

function Journal(props) {
  const {journal, setShowJournal, setSelectedrowId} = props;

  if (journal === null) {
    return <MiniLoader />
  }

  const closeJournalDetails = (evt) => {
    evt.preventDefault();
    setShowJournal(false);
    setSelectedrowId(null);
  }

  return (
    <div style={{width:"35%"}}>
      <span>Journal Details</span>
        <div className="journal-details">
          <button type='button' className='close' onClick={closeJournalDetails}><span aria-hidden='true' style={{fontSize:"1.2rem"}}>&times;</span></button>
            <div className='row'>
              <div className='col-6'>
                <ul className='list-unstyled well'>
                  <li><b>Debit</b></li>
                  <li>Account Debited: {journal.account_debited}</li>
                  <li>Branch Debited: {journal.branch_debited}</li>
                  <li>Amount Debited: {journal.currency} {journal.amount_debited}</li>
                </ul>
              </div>

              <div className='col-6'>
                <ul className='list-unstyled well'>
                  <li><b>Credit</b></li>
                  <li>Account Credited: {journal.account_credited}</li>
                  <li>Branch Credited: {journal.branch_credited}</li>
                  <li>Amount Credited: {journal.currency} {journal.amount_credited}</li>
                </ul>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <ul className='list-unstyled well'>
                  <li><b>Additional Details</b></li>
                  <li>Created By: {journal.created_by}</li>
                  <li>Reference: {journal.transaction_id}</li>
                  <li>Narrative: {journal.description}</li>
                </ul>
              </div>
            </div>
      </div>
    </div>
  )
}

export default Journal;