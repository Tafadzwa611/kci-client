import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../../utils/utils';
import Filter from './Filter';
import Empty from './Empty';
import TrialBalanceTable from './TrialBalanceTable';
import Error from './Error';
import MiniLoader from '../../Loader/MiniLoader';
// import Loader from './Loader';

const TrialBalance = ({loggedInUser}) => {
    const [maxDate, setMaxDate] = useState('');
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);
    const [currencyIso, setCurrencyIso] = useState(null);
    const [trialBalance, setTrialBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        getTrialBalance();
    }, [])

    const getTrialBalance = async () => {
        window.scrollTo(0, 0);
        fetchCurrencies();
        const branches = await fetchBranches();
        setBranches(branches);
    };
  
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
  
    async function fetchTrialBalance() {
        try {
            const url = getUrl();
            const response = await makeRequest.get(url, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                setErrorMessage(null);
                setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
                setTrialBalance(json_res);
            }else {
                const error = await response.json();
                setErrorMessage(getTrialBalanceErrors(error));
            }
            setLoading(false);
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
  
    const onSubmit = async (evt) => {
        evt.preventDefault();
        setLoading(true);
        setTrialBalance(null);
        await fetchTrialBalance();
    }
  
    function getUrl() {
        let url = `/acc-api/trial-balance-entries/?maxDate=${maxDate}&currency_id=${currencyId}`;
        branchIds.forEach(id => (url += `&branch_ids=${id}`));
        return url
    }
  
    if (branches===null || currencies===null) {
        return <MiniLoader />
    }

    return (
        <>
            {errorMessage != null && <Error errorMessage={errorMessage}/>}
            <Filter 
                maxDate={maxDate}
                setMaxDate={setMaxDate}
                currencies={currencies}
                currencyId={currencyId}
                setCurrencyId={setCurrencyId}
                branches={branches}
                setBranchIds={setBranchIds}
                onSubmit={onSubmit}
            />
            <div style={{paddingTop: '17px'}}></div>
            {trialBalance===null && !loading ?
                <Empty message='Select Start Date, End Date and at least one branch to run income statement.'/> :
                <TrialBalanceTable currencyIso={currencyIso} trialBalance={trialBalance} loading={loading} loggedInUser={loggedInUser} maxDate={maxDate} />
            }
        </>
    );
}

function getTrialBalanceErrors(errors) {
    if ('non_field_errors' in errors) {
        return errors['non_field_errors'][0]
    }
}

export default TrialBalance;