import React, { useState, useEffect } from 'react';
import Filter from './Filter'
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import NoData from '../ClientsReport/NoData';
import { makeRequest } from '../../../utils/utils';

const DailyReport = () => {
    const [dateOfReport, setDateOfReport] = useState('');
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [report, setReport] = useState(null);
    const [msg, setMsg] = useState('Select month and at least one branch, then click fetch to view report.');
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
  
    useEffect(() => {
        fetchCurrencies()
    }, []);
  
    useEffect(() => {
        setReport(null);
    }, [dateOfReport, selectedBranchesIds]);
  
    const onSubmit = async (evt) => {
        evt.preventDefault();
        const data = await getReport();
        setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
        setReport(data);
    }
  
    async function getReport() {
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
        let url = `/reportsapi/daily-report/?currency_id=${currencyId}`;
        if (dateOfReport !== '') {url += `&date_of_report=${dateOfReport}`};
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
        return <div>loading...</div>
    }
  
    return (
        <>
            <Filter 
                currencies={currencies}
                currencyId={currencyId}
                setCurrencyId={setCurrencyId}
                dateOfReport={dateOfReport}
                setDateOfReport={setDateOfReport}
                disableFetch={selectedBranchesIds.length === 0}
                onSubmit={onSubmit}
                updateSelectedBranchesId={setSelectedBranchesIds}
            />
            <Header dateOfReport={dateOfReport} />
            {report != null ?
                <>
                    <Table report={report} currencyIso={currencyIso} dateOfReport={dateOfReport} />
                    <Footer />
                </> :
                  <NoData msg={msg} />
            }
        </>
    );
}

export default DailyReport;