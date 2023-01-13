import React, { useState, useEffect, useRef } from 'react';
import { makeRequest } from '../../../utils/utils';
import Filter from './Filter';
import LoansTable from './LoansTable';
import Error from '../../Accounting/TrialBalance/Error';
import MiniLoader from '../../Loader/MiniLoader';


function LoansList() {
  const [loans, setLoans] = useState([]);
  const [branches, setBranches] = useState(null);
  const [branchIds, setBranchIds] = useState(null);
  const [nextPageNumber, setNextPageNumber] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [minLoanAddedOn, setMinLoanAddedOn] = useState('');
  const [maxLoanAddedOn, setMaxLoanAddedOn] = useState('');
  const [minPrincipalAmountDue, setMinPrincipalAmountDue] = useState('');
  const [maxPrincipalAmountDue, setMaxPrincipalAmountDue] = useState('');
  const [minAmountPaid, setMinAmountPaid] = useState('');
  const [maxAmountPaid, setMaxAmountPaid] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [products, setProducts] = useState(null);
  const [productId, setProductId] = useState('');
  const [details, setDetails] = useState(false)
  const [selectedLoanID, setSelectedLoanID] = useState(null)
  const [client, setClient] = useState('');
  const [selectedBranches, setSelectedBranches] = useState([]);
  const pageNum = useRef(1);
  const isFirstRun = useRef(true);

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    await fetchCurrencies();
    await fetchProducts();
    const branches = await fetchBranches();
    setBranches(branches);
  }
  
  const getLoans = async () => {
    if (currencyId != null && isFirstRun.current) {
        isFirstRun.current = false;
    }
  }

  useEffect(() => {
    getLoans()
  }, [currencyId]);

  useEffect(() => {
    setLoans([]);
    setTotalCount(0);
  }, [productId, currencyId, branchIds, status, minLoanAddedOn, maxLoanAddedOn, minPrincipalAmountDue, maxPrincipalAmountDue, minAmountPaid, maxAmountPaid]);

  async function fetchLoans() {
    try {
      const url = getUrl();
      const response = await makeRequest.get(url, {timeout: 8000});
      setLoading(false);
      if (response.ok) {
        setErrorMessage(null);
        const json_res = await response.json();
        setNextPageNumber(json_res.next_page_num);
        setLoadingMore(false);
        return json_res;
      }else {
        const error = await response.json();
        setErrorMessage(Object.values(error)[0][0]);
        console.log(Object.values(error)[0][0]);
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

  async function fetchProducts() {
    try {
      const response = await makeRequest.get('/loansapi/loan_products/', {timeout: 8000});
      if (response.ok) {
        const data = await response.json();
        return setProducts([...data.loan_products.map(result => ({...result, label: result.name, value: result.id}))]);
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }


  function getUrl() {
    let url = `/loansapi/loan_list/?page_num=${pageNum.current}&currency_id=${currencyId}`;
    if (branchIds !== null) {
      branchIds.forEach(id => (url += `&branch_ids=${id}`));
    }
    if (minLoanAddedOn !== '') {
      url += `&min_loan_added_on=${minLoanAddedOn}`;
    }
    if (maxLoanAddedOn !== '') {
      url += `&max_loan_added_on=${maxLoanAddedOn}`;
    }
    if (minPrincipalAmountDue !== '') {
      url += `&min_principal_amount_due=${minPrincipalAmountDue}`;
    }
    if (maxPrincipalAmountDue !== '') {
      url += `&max_principal_amount_due=${maxPrincipalAmountDue}`;
    }
    if (minAmountPaid !== '') {
      url += `&min_total_amount_paid=${minAmountPaid}`;
    }
    if (maxAmountPaid !== '') {
      url += `&max_total_amount_paid=${maxAmountPaid}`;
    }
    if (status !== null) {
      status.forEach(item => (url += `&status=${item}`));
    }
    if (client !== '') {
      url += `&client=${client}`;
    }
    if (productId !== '') {
      url += `&loan_product_id=${productId}`;
    }
    return url
  }

  const loadMore = async (evt) => {
    evt.preventDefault();
    setLoadingMore(true);
    pageNum.current += 1;
    const data = await fetchLoans();
    setLoans(curr => [...curr,...data.loans]);
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    pageNum.current = 1;
    const data = await fetchLoans();
    setLoans(data.loans);
    setTotalCount(data.count);
  }

  if (currencies===null || branches===null || products===null) {
    return <MiniLoader />
  }

  return (
    <>
        {errorMessage != null && <Error errorMessage={errorMessage}/>}
        <Filter
            minLoanAddedOn={minLoanAddedOn}
            maxLoanAddedOn={maxLoanAddedOn}
            setMinLoanAddedOn={setMinLoanAddedOn}
            setMaxLoanAddedOn={setMaxLoanAddedOn}
            setSelectedBranches={setSelectedBranches}
            products={products}
            productId={productId}
            setProductId={setProductId}
            branches={branches}
            currencies={currencies}
            setBranchIds={setBranchIds}
            currencyId={currencyId}
            setCurrencyId={setCurrencyId}
            status={status}
            setStatus={setStatus}
            loading={loading}
            minPrincipalAmountDue={minPrincipalAmountDue}
            setMinPrincipalAmountDue={setMinPrincipalAmountDue}
            maxPrincipalAmountDue={maxPrincipalAmountDue}
            setMaxPrincipalAmountDue={setMaxPrincipalAmountDue}
            minAmountPaid={minAmountPaid}
            setMinAmountPaid={setMinAmountPaid}
            maxAmountPaid={maxAmountPaid}
            setMaxAmountPaid={setMaxAmountPaid}
            onSubmit={onSubmit}
            details={details} 
            client={client}
            setClient={setClient}
        />
        {loans.length != 0 &&
          <>
            <div style={{paddingTop: '2rem'}}></div>
            <LoansTable
                loans={loans}
                minDate={minLoanAddedOn}
                maxDate={maxLoanAddedOn}
                selectedBranches={selectedBranches}
                totalCount={totalCount}
                nextPageNumber={nextPageNumber}
                loadMoreLoans={loadMore}
                loadingMore={loadingMore}
                currencies={currencies}
                currencyId={currencyId}
                setDetails={setDetails} 
                details={details} 
                selectedLoanID={selectedLoanID}
                setSelectedLoanID={setSelectedLoanID}
                selectedloan={loans.find(loan => loan.id == selectedLoanID)}
                loanId={selectedLoanID}
            />
          </>
        }
        {loans.length == 0 &&
          <div>
              <div className="table-footer-container card-body clients_table" style={{borderTop:"none"}}>

                  <div className="all-data-loaded">
                      <i className="uil uil-exclamation-triangle"></i> 
                      <span>No loans at the moment</span>
                  </div>
              </div>
          </div>
        }
    </>
  )
}

export default LoansList;