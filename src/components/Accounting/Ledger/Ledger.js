import React, { useEffect, useState, useRef } from 'react';
import { makeRequest } from '../../../utils/utils';
import Filter from './Filter';
import TableHeader from './TableHeader';
import Table from './Table';
import Footer from './Footer';
import MiniLoader from '../../Loader/MiniLoader';

function Ledger() {
  const [openingBal, setOpeningBal] = useState(0);
  const [txns, setTxns] = useState([]);
  const [totalTxnCount, setTotalTxnCount] = useState(0);
  const [accs, setAccs] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [initing, setIniting] = useState(true);
  const [currencyId, setCurrencyId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [branchId, setBranchId] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [mode, setMode] = useState('ledger');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pageNum = useRef(1);
  const disableFetch = currencyId === '' || branchId === '' || minDate === '' || maxDate === '' || accountId === '';

  useEffect(() => {
    async function runInit() {
      await Promise.all([fetchAccounts(), fetchCurrencies(), fetchBranches()]);
      setIniting(false);
    }
    runInit();
  }, []);

  useEffect(() => {
    setTxns([]);
    setOpeningBal(0);
    setTotalTxnCount(0);
    setAccountId('');
    setLoaded(false);
  }, [branchId, currencyId]);

  useEffect(() => {
    setTxns([]);
    setOpeningBal(0);
    setTotalTxnCount(0);
    setLoaded(false);
  }, [mode, minDate, maxDate]);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    pageNum.current = 1;
    setTxns([]);
    setTotalTxnCount(0);
    const url = getUrl();
    setLoading(true);
    if (mode == 'ledger') {  
      await getJournals(url);
      setLoaded(true);
    }else {
      await getExcel(url);
    }
    setLoading(false);
  }

  const loadMore = async (evt) => {
    evt.preventDefault();
    setLoadingMore(true);
    const url = getUrl('ledger');
    await getJournals(url);
    setLoadingMore(false);
  }

  async function getExcel(url) {
    await makeRequest.get(url, {timeout: 80000});
  }

  async function getJournals(url) {
    const response = await makeRequest.get(url, {timeout: 80000});
    if (response.ok) {
      const data = await response.json();
      setOpeningBal(data.account_opening_balance);
      setTotalTxnCount(data.count);
      setTxns(curr => [...curr, ...data.journals]);
      pageNum.current = data.next_page_num;
    } else {
      const error = await response.json();
      console.log(error);
    }
  }

  const getUrl = () => {
    let url = `/acc-api/${mode}/?page_num=${pageNum.current}&min_date=${minDate}&max_date=${maxDate}&account_id=${accountId}&format=json`;
    return url
  }

  async function fetchAccounts() {
    try {
      const response = await makeRequest.get('/acc-api/accounts-list/', {timeout: 80000});
      if (response.ok) {
        const data = await response.json();
        return setAccs(data);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  async function fetchCurrencies() {
    try {
      const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 80000});
      if (response.ok) {
        const data = await response.json();
        return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  async function fetchBranches() {
    try {
      const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 80000});
      if (response.ok) {
        const data = await response.json();
        return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  if (initing) {
    return <div><MiniLoader /></div>
  }

  return (
    <>
      <div>
        <div>
          <Filter
            accs={accs.filter(acc => acc.currency == currencyId && acc.branch_id == branchId)}
            accId={accountId}
            setAccId={setAccountId}
            minDate={minDate}
            setMinDate={setMinDate}
            maxDate={maxDate}
            setMaxDate={setMaxDate}
            branchId={branchId}
            setBranchId={setBranchId}
            branches={branches}
            currencies={currencies}
            currencyId={currencyId}
            setCurrencyId={setCurrencyId}
            loading={loading}
            disableFetch={disableFetch}
            mode={mode}
            setMode={setMode}
            onSubmit={onSubmit}
          />
          <div style={{paddingTop: '17px'}}></div>
          {loaded && <div className='row'>
            <div style={{width:"100%"}}>
              <div>
                <TableHeader numberOfTxnsLoaded={txns.length} totalTxnCount={totalTxnCount}/>
                <Table openingBal={openingBal} txns={txns}/>
                <Footer
                  nextPageNumber={pageNum.current}
                  loadMore={loadMore}
                  loadingMore={loadingMore}
                />
              </div>
            </div>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Ledger;