import React, {useState, useEffect, useRef} from 'react';
import { makeRequest } from '../../../utils/utils';
import Filter from './Filter';
import TableHeader from './TableHeader';
import ExpectedPaymentsTable from './ExpectedPaymentsTable';
import MiniLoader from '../../Loader/MiniLoader';


function ExpectedPaymentsReport() {
  const [installments, setInstallments] = useState([]);
  const [aggregateData, setAggregateData] = useState({});
  const [initing, setIniting] = useState(true);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [branches, setBranches] = useState([]);
  const [branchIds, setBranchIds] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const pageNum = useRef(1);

  const disableFetch = branchIds.length === 0 || currencyId === ''|| minDate === '' || maxDate === '';

  useEffect(() => {
    async function runInit() {
      await Promise.all([fetchCurrencies(), fetchBranches()]);
      setIniting(false);
    }
    runInit();
  }, []);

  const onSubmit = async (evt) => {
    evt.preventDefault();
    pageNum.current = 1;
    // setInstallments([]);
    // setAggregateData({});
    setLoading(true);
    const url = getUrl();
    await getInstallments(url);
    setLoading(false);
  }

  const loadMore = async (evt) => {
    evt.preventDefault();
    setLoadingMore(true);
    const url = getUrl();
    await getInstallments(url);
    setLoadingMore(false);
  }

  async function getInstallments(url) {
    const response = await makeRequest.get(url, {timeout: 6000});
    if (response.ok) {
      const data = await response.json();
      setInstallments(curr => [...curr, ...data.installments]);
      setAggregateData(data.aggregate_data);
      setLoaded(true);
      pageNum.current = data.next_page_num;
    } else {
      const error = await response.json();
      console.log(error);
    }
  }

  const getUrl = () => {
    let url = `/reportsapi/expected_installments_report/?currency_id=${currencyId}&page_num=${pageNum.current}&start_date=${minDate}&end_date=${maxDate}`;
    branchIds.forEach(id => (url += `&branch_ids=${id}`));
    return url
  }

  async function fetchCurrencies() {
    try {
      const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 6000});
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
      const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 6000});
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
    return <MiniLoader/>
  }

  return (
    <>
        <div>
          <Filter
            minDate={minDate}
            setMinDate={setMinDate}
            maxDate={maxDate}
            setMaxDate={setMaxDate}
            currencies={currencies}
            currencyId={currencyId}
            setCurrencyId={setCurrencyId}
            branches={branches}
            setBranchIds={setBranchIds}
            disableFetch={disableFetch}
            onSubmit={onSubmit}
            loading={loading}
          />
          {loaded && <div className='row'>
            <div className='col-12'>
              <div>
                <TableHeader aggregateData={aggregateData} minDate={minDate} maxDate={maxDate}/>
              </div>
              <div>
                <ExpectedPaymentsTable installments={installments}/>
              </div>
            </div>
          </div>}
        </div>
    </>
  )
}

export default ExpectedPaymentsReport;