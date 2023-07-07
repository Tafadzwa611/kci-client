import React, {useState} from 'react';
import Filter from './Filter';
import { Fetcher } from '../../../common';
import Table from './Table';
import TableHeader from './TableHeader';

function Ledger({loggedInUser}) {

  return (
    <>
      <Fetcher urls={[`/acc-api/accounts-list/`, `/usersapi/branch-list/`]}>
        {({data}) => <Report accounts={data[0]} branches={data[1]} loggedInUser={loggedInUser} />}
      </Fetcher>
    </>
  )
}

const Report = ({accounts, loggedInUser, branches}) => {
  const [params, setParams] = useState(null);
  const [openingBal, setOpeningBal] = useState(0);
  const [txns, setTxns] = useState({count: 0, next_page_num: 0, journals: []});
  const [intValues, setIntValues] = useState([]);
  const [mode, setMode] = useState('ledger');

  return (
    <>
        <Filter 
            setOpeningBal={setOpeningBal} 
            setParams={setParams} 
            setIntValues={setIntValues}
            accounts={accounts}
            branches={branches}
            setTxns={setTxns}
            setMode={setMode}
            mode={mode}
        />
        <div style={{paddingTop: '2rem'}}></div>
        <Table 
          openingBal={openingBal} 
          txns={txns}
          setTxns={setTxns}
          params={params}
          mode={mode}
        />
    </>
  )
}

export default Ledger;