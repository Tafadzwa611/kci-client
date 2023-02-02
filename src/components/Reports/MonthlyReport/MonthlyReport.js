import React, { useEffect, useRef, useState } from 'react';
import Filter from './Filter';
import MonthlyTable from './MonthlyTable';
import NoData from '../ClientsReport/NoData';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';
import MonthlyFooter from './MonthlyFooter';


function MonthlyReport() {
  const [month, setMonth] = useState('');
  const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
  const [order, setOrder] = useState('-id');
  const [report, setReport] = useState([]);
  const [currencies, setCurrencies] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);
  const [currencyIso, setCurrencyIso] = useState(null);
  const [msg, setMsg] = useState('Select month and at least one branch, then click fetch to view report.');
  const [selectedBranches, setSelectedBranches] = useState([]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    fetchCurrencies()
}, []);

  async function getReport() {
    const url = getUrl();
    const response = await makeRequest.get(url, {timeout: 8000});
    if (response.ok) {
      const data = await response.json();
      setReport(data);
      if (data.length === 0) {
        setMsg('No data could be found in the selected branches or month');
      }
    } else {
      const error = await response.json();
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

  const getUrl = () => {
    let url = `/reportsapi/monthly-report/?order=${order}&currency_id=${currencyId}`;
    if (month !== '') {url += `&date_of_report=${month}`};
    selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
    return url
  }

  const onSubmit = async (evt) => {
    evt.preventDefault();
    setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
    getReport();
  }

  const changeOrder = async (evt) => {
    evt.preventDefault();
    isFirstRun.current = false;
    setOrder(evt.target.value);
  }

  useEffect(() => {
    if (!isFirstRun.current) {
      getReport();
    }
  }, [order]);

  if (currencies===null) {
    return <MiniLoader />
  }

  return (
    <>
        <Filter
          currencies={currencies}
          currencyId={currencyId}
          setCurrencyId={setCurrencyId}
          month={month}
          setMonth={setMonth}
          disableFetch={selectedBranchesIds.length === 0}
          onSubmit={onSubmit}
          updateSelectedBranchesId={setSelectedBranchesIds}
          setSelectedBranches={setSelectedBranches}
        />
        <div style={{paddingTop: '17px'}}></div>
        {
          report.length > 0 ?
          <>
            <MonthlyTable report={report} currencyIso={currencyIso} selectedBranches={selectedBranches}/>
            <MonthlyFooter />
          </> :
          <NoData msg={msg} />
        }
    </>
  )
}

export default MonthlyReport;