import React, {useState, useEffect} from 'react';
import DateRange from './DateRange';
import Header from './Header';
import Table from './Table';
import Footer from './Footer';
import { makeRequest } from '../../../utils/utils';
import NoData from '../ClientsReport/NoData';
import MiniLoader from '../../Loader/MiniLoader';


const LoanOfficerReport = () => {
    const [report, setReport] = useState([]);
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [msg, setMsg] = useState('Select date range and at least one branch, then click Apply Filters to view report.');
  
    useEffect(() => {
        fetchCurrencies()
    }, []);
  
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
        let url = `/reportsapi/loan-officer-report/?currency_id=${currencyId}`;
        if (minDate !== '') {url += `&min_date=${minDate}`};
        if (maxDate !== '') {url += `&max_date=${maxDate}`};
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
        return <MiniLoader />
    }

    return (
        <>
            <DateRange 
                currencies={currencies}
                currencyId={currencyId}
                setCurrencyId={setCurrencyId}
                minDate={minDate}
                maxDate={maxDate}
                disableFetch={selectedBranchesIds.length === 0}
                onSubmit={onSubmit}
                setMinDate={setMinDate}
                setMaxDate={setMaxDate}
                updateSelectedBranchesId={setSelectedBranchesIds}
            />
            {report.length > 0 ?
                <>
                    <Table report={report} currencyIso={currencyIso} />
                    <Footer />
                </> :
            <NoData msg={msg} />
            }
        </>
    );
}

export default LoanOfficerReport;