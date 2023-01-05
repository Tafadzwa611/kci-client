import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import Display from './Display';
import { makeRequest } from '../../../utils/utils';

const BalanceSheet = () => {
    const [reportDate, setReportDate] = useState('');
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchCurrencies();
    }, []);

    useEffect(() => {
        setReport(null);
    }, [reportDate, selectedBranchesIds, currencyId]);

    const onSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        const data = await getStatement();
        setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
        setLoading(false);
        setReport(data);
    }

    async function getStatement() {
        const url = getUrl();
        const response = await makeRequest.get(url, {timeout: 6000});
        if (response.ok) {
            const data = await response.json();
        return data
        } else {
            const error = await response.json();
            console.log(error);
        }
    }

    const getUrl = () => {
        let url = `/acc-api/balance-sheet/?report_date=${reportDate}&currency_id=${currencyId}`;
        selectedBranchesIds.forEach(id => (url += `&branch_ids=${id}`));
        return url
    }

    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 60000});
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
        <div>
            Loading...
        </div>
        )
    }

    return (
        <>
            <div>
                <Filter
                    reportDate={reportDate}
                    currencies={currencies}
                    currencyId={currencyId}
                    setCurrencyId={setCurrencyId}
                    disableFetch={selectedBranchesIds.length === 0 || reportDate === ''}
                    onSubmit={onSubmit}
                    setReportDate={setReportDate}
                    updateSelectedBranchesId={setSelectedBranchesIds}
                />
                <Display report={report} loading={loading} currencyIso={currencyIso} reportDate={reportDate} />
            </div>
        </>
    )
}

export default BalanceSheet;