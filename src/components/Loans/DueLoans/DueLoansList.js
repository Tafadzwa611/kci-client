import React, { useState, useEffect, useRef } from 'react';
import Filter from './Filter';
import { makeRequest } from '../../../utils/utils';
import LoansTable from './LoansTable';
import MiniLoader from '../../Loader/MiniLoader';


function DueLoansList() {
  const today = new Date();
  const [loans, setLoans] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPageNumber, setNextPageNumber] = useState(null);
  const [month, setMonth] = useState(`${today.getFullYear()}-${today.getMonth() < 10 ? `0${today.getMonth()+1}` : today.getMonth()+1}`);
  const [branches, setBranches] = useState(null);
  const [branchIds, setBranchIds] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageNum = useRef(1);
  const isFirstRun = useRef(true);

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    await fetchCurrencies();
    const branches = await fetchBranches();
    setBranches(branches);
  }

  useEffect(() => {
    getLoans();
  }, [currencyId]);

  const getLoans = async () => {
    if (currencyId != null && isFirstRun.current) {
      isFirstRun.current = false;
      const data = await fetchLoans();
      setLoans(data.loans);
      setTotalCount(data.count);
    }
  }

  async function fetchLoans() {
    try {
      const url = getUrl();
      const response = await makeRequest.get(url, {timeout: 8000});
      if (response.ok) {
        const json_res = await response.json();
        setNextPageNumber(json_res.next_page_num);
        setLoading(false);
        setLoadingMore(false);
        return json_res;
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
      const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
      if (response.ok) {
        const data = await response.json();
        if (currencyId===null) {
          const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
          setCurrencyId(zwlId);
        }
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
      const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
      if (response.ok) {
        const json_res = await response.json();
        return json_res.results;
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  function getUrl() {
    let url = `/loansapi/due_loans_list/?page_num=${pageNum.current}&currency_id=${currencyId}&due_month=${month}`
    if (branchIds !== null) {
      branchIds.forEach(id => (url += `&branch_ids=${id}`));
    }
    return url
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const data = await fetchLoans();
    setLoans(data.loans);
    setTotalCount(data.count);
  }

  const loadMore = async (evt) => {
    evt.preventDefault();
    setLoadingMore(true);
    pageNum.current += 1;
    const data = await fetchLoans();
    setLoans(curr => [...curr,...data.loans]);
  }

  if (currencies===null || branches===null) {
    return <MiniLoader />
  }

  return (
    <>
      <Filter
        month={month}
        currencies={currencies}
        currencyId={currencyId}
        branches={branches}
        loading={loading}
        setBranchIds={setBranchIds}
        setCurrencyId={setCurrencyId}
        setMonth={setMonth}
        onSubmit={onSubmit}
      />
      <div style={{paddingTop: '2rem'}}></div>
      <LoansTable loans={loans} totalCount={totalCount} nextPageNumber={nextPageNumber} loadMoreLoans={loadMore} loadingMore={loadingMore}/>
    </>
  )
}

export default DueLoansList;