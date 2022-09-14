import React, { useEffect, useRef, useState } from 'react';
import MonthlyHeader from './MonthlyHeader';
import MonthlyTable from './MonthlyTable';
import MonthlyFooter from './MonthlyFooter';
import Filter from './Filter';
import NoData from '../ClientsReport/NoData';
import { makeRequest } from '../../../utils/utils';

const MonthlyReport = () => {
    const [month, setMonth] = useState('');
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [order, setOrder] = useState('-id');
    const [report, setReport] = useState([]);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [msg, setMsg] = useState('Select month and at least one branch, then click fetch to view report.');
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
        return <div>loading...</div>
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
            />
            <MonthlyHeader changeOrder={changeOrder} order={order} disableSelect={report.length === 0} />
            {report.length > 0 ?
                <>
                    <MonthlyTable report={report} currencyIso={currencyIso} />
                    <MonthlyFooter />
                </>:
                <NoData msg={msg} />
            }
        </>
    );
}

MonthlyReport.defaultProps = {
    allOption: {
      label: 'Select all',
      value: '*'
    }
  };
  

export default MonthlyReport;