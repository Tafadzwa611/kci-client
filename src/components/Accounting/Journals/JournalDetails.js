import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ReverseJournal from './ReverseJournal';
import axios from 'axios';
import Cookies from 'js-cookie';


export default function JournalDetailView() {
  const params = useParams();
  return <JournalDetails journalId={params.journalId}/>
}


const JournalDetails = ({ close, journalId }) => {
  const [showReverse, setShowReverse] = React.useState(false);
  const [journal, setJournal] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setJournal(null);
        const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
        const response = await axios.get(`/acc-api/journal-details/${journalId}/`, CONFIG);
        setJournal(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    fetchData();
  }, [journalId]);

  if (!journal) {
    return <div>Loading...</div>
  }

  const hasReversal = journal.reversals.length > 0;

  return (
    <div>
      {showReverse && <ReverseJournal journalId={journalId} setJournal={setJournal} setOpen={setShowReverse} />}
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          {close ? (
            <div style={{margin:'0 0 1.5rem', display:'flex', justifyContent:'space-between'}}>
              <button>
                <a onClick={close} className='btn btn-default client__details' style={{borderRadius:'0'}}>Close</a>
              </button>
              <div>
                <button disabled={hasReversal} className='btn btn-olive' onClick={() => setShowReverse(true)}>
                  Reverse
                </button>
                <button className='btn btn-default client__details'>
                  <Link to={`/accounting/viewaccounting/journals/journal/${journalId}`}>Max</Link>
                </button>
              </div>
            </div>
          ) : (
            <div style={{margin:'0 0 1.5rem', display:'flex', justifyContent:'space-between'}}>
              <button disabled={hasReversal} className='btn btn-olive' onClick={() => setShowReverse(true)}>Reverse</button>
            </div>
          )}
          <div style={{display:'flex', flexDirection:'column', rowGap:'1rem'}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <div>
                <ul>
                  <li><b>Debit</b></li>
                  <li>Account Debited: {journal.account_debited}</li>
                  <li>Account Debited Code: {journal.account_debited_code}</li>
                  <li>Branch Debited: {journal.branch_debited}</li>
                  <li>Amount Debited: {journal.currency} {journal.amount}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li><b>Credit</b></li>
                  <li>Account Credited: {journal.account_credited}</li>
                  <li>Account Credited Code: {journal.account_credited_code}</li>
                  <li>Branch Credited: {journal.branch_credited}</li>
                  <li>Amount Credited: {journal.currency} {journal.amount}</li>
                </ul>
              </div>
              <div>
                <ul>
                  <li><b>Loan and Client Details</b></li>
                  <li>Client Name: {journal.client_name}</li>
                  <li>Client ID: {journal.client_id}</li>
                  <li>Account ID: {journal.account_id}</li>
                </ul>
              </div>
            </div>
            <div>
              <ul>
                <li><b>Additional Details</b></li>
                <li>Journal Number: {journal.id}</li>
                <li>Transaction ID: {journal.transaction_id}</li>
                <li>Currency: {journal.currency}</li>
                <li>Value Date: {journal.value_date}</li>
                <li>Date Logged: {journal.date_added}</li>
                <li>Created By: {journal.created_by}</li>
                <li>Narrative: {journal.description}</li>
                {journal.original_journal && (
                  <li>
                    Original Entry: 
                    <Link to={`/accounting/viewaccounting/journals/journal/${journal.original_journal.id}`}>
                      {` ${journal.original_journal.transaction_id}`}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            {journal.reversals.length > 0 && (
              <div>
                <ul>
                  <li><b>Reversal</b></li>
                  {journal.reversals.map(rev => (
                    <li key={rev.id}>
                      This entry has a reversal entry
                      <Link to={`/accounting/viewaccounting/journals/journal/${rev.id}`}>
                        {` ${rev.transaction_id}`}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export {JournalDetails};