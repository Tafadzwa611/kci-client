import React, { useState, useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom';
import { makeRequest } from '../../../utils/utils';

function JournalDetailsModal(journal) {
    const {journalId} = useParams();
    const [journal, setJournal] = useState(null);
    const txn_date = useRef('');

    const d = new Date('2020-10-16T08:00:00');
    console.log(d);

    useEffect(async () => {
        getJournal();
    }, []);

    const getJournal = async () => {
        await fetchJournal();
    };

    async function fetchJournal() {
        try {
            const response = await makeRequest.get(`/acc-api/journal-details/${journalId}/`, {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                txn_date.current = new Date(data.date_added);
                return setJournal(data);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (journal === null) {
        return <div>Loading</div>
    }

  return (
    <>
        <h3>Journal Details</h3>
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
                  <li>Date: {txn_date.current.toDateString()}, {txn_date.current.toTimeString()}</li>
                  <li>Created By: {journal.created_by}</li>
                  <li>Narrative: {journal.description}</li>
                </ul>
              </div>
            </div>

            <div className='row no-print'>
              <div className='col-12'>
                <a href='/reports/reportsapp/#/jrs' className='button button-default'>Go To Journals</a>
              </div>
            </div>

    </>
  )
}

export default JournalDetailsModal;