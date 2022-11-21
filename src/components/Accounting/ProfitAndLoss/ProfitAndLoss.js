import React, { useEffect, useState } from 'react';
import { makeRequest } from '../../../utils/utils';
import DateRange from './DateRange';
import Display from './Display';
import MiniLoader from '../../Loader/MiniLoader';
import New from './New';

function ProfitAndLoss() {
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [currencies, setCurrencies] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);
  const [currencyIso, setCurrencyIso] = useState(null);
  const [v, setV] = useState('o');

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const data = await getStatement();
    setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
    setLoading(false);
    setReport(data);
  }

  useEffect(() => {
    setReport(null);
  }, [v]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCurrencies();
  }, []);

  async function getStatement() {
    const url = getUrl();
    const response = await makeRequest.get(url, {timeout: 8000});
    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      const error = await response.json();
      console.log(error);
    }
  }

  const getUrl = () => {
    let url = `/acc-api/income-statement/?minDate=${minDate}&maxDate=${maxDate}&currency_id=${currencyId}&v=${v}`;
    selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
    return url
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

  if (currencies===null) {
    return (
      <MiniLoader />
    )
  }

  return (
    <>
      <div>
        <div>
          <DateRange
            minDate={minDate}
            maxDate={maxDate}
            currencies={currencies}
            currencyId={currencyId}
            setCurrencyId={setCurrencyId}
            disableFetch={selectedBranchesIds.length===0 || minDate==='' || maxDate===''}
            onSubmit={onSubmit}
            setMaxDate={setMaxDate}
            setMinDate={setMinDate}
            updateSelectedBranchesId={setSelectedBranchesIds}
            v={v}
            setV={setV}
          />
          {v === 'o' ? <Display report={report} loading={loading} currencyIso={currencyIso} /> : <New loading={loading} report={report}/>}
        </div>
      </div>
    </>
  )
}

export default ProfitAndLoss;