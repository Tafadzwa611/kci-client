import React, {useState} from 'react';
import DateRange from './DateRange';
import { Fetcher } from '../../../common';
import Table from './Table';

function Journals({loggedInUser}) {

  return (
    <>
      <Fetcher urls={[`/acc-api/accounts-list/`, `/usersapi/staff/`]}>
        {({data}) => <ViwJournals accounts={data[0]} staff={data[1]} loggedInUser={loggedInUser} />}
      </Fetcher>
    </>
  )
}

const ViwJournals = ({accounts, loggedInUser, staff}) => {
  const [params, setParams] = useState(null);
  const [journals, setJournals] = useState({count: 0, next_page_num: 0, journals: []});
  const [intValues, setIntValues] = useState([]);
  const [accountId, setAccountId] = useState('');
  const [openBal, setOpenBal] = useState('');
  const [msg, setMsg] = useState('Select date range and at least one branch, then click search to view journals.');
  const [selectedjrnlID, setSelectedJrnlID] = useState(null)
  const [details, setDetails] = useState(false)
  const [asStatement, setAsStatement] = useState(false);

  console.log(journals);

  return (
    <>
      <DateRange 
        setJournals={setJournals} 
        setParams={setParams} 
        setIntValues={setIntValues}
        accounts={accounts}
        staff={staff}
        setAccountId={setAccountId}
        setOpenBal={setOpenBal}
      />
      <div style={{paddingTop: '2rem'}}></div>
      <div style={{margin:"0"}}>{accountId != '' && <>View As Account Statement <input type='checkbox' value={asStatement} onChange={e => setAsStatement(curr => !curr)}/></>}</div>
      <Table 
        journals={journals}
        setSelectedJrnlID={setSelectedJrnlID} 
        selectedjrnlID={selectedjrnlID}
        selectedjrnl={journals.journals.find(jrnl => jrnl.id == selectedjrnlID)}
        details={details}
        setDetails={setDetails}
        openBal={openBal}
        asStatement={asStatement}
        accountId={accountId}
        setJournals={setJournals}
        params={params}
      />
    </>
  )
}

export default Journals;