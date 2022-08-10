import React from 'react';
import { makeRequest, getFormattedDate } from '../../../utils/utils';
import DateSelect from './DateSelect';
import SelectBranch from './SelectBranch';
import BalanceSheetTable from './BalanceSheetTable';
import Error from './Error';

const BalanceSheet = () => {
    //branches
    const [branches, setBranches] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [currencies, setCurrencies] = React.useState(null);
    const [currencyId, setCurrencyId] = React.useState(null);
    const [currencyIso, setCurrencyIso] = React.useState(null);
    //balance sheet
    const [balanceSheet, setBalanceSheet] = React.useState({});
    const [balanceErrorMessage, setBalanceErrorMessage] = React.useState('');
    const [loadingBalanceSheet, setLoadingBalanceSheet] = React.useState(false);
    const [errorLoadingBalanceSheet, setErrorLoadingBalanceSheet] = React.useState(false);
    //balance sheet date
    const [asAtDate, setAsAtDate] = React.useState('');

    const balanceSheetApiEndpoint = React.useRef('');

    const groupBy = key => {
        const groupObjects = array => (
            array.reduce((objectsByKeyValue, obj) => {
                const value = obj[key];
                objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                return objectsByKeyValue;
            },{})
        )
        return groupObjects
    }

    const groupBranchesByName = groupBy('name');

    const fetchBranches = React.useCallback(async function() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
            const data = await response.json();
            let results = data.results.map(result => {
                return {...result, checked: false}
            })
            results = [{name: 'All Branches', checked: false}, ...results];
            setBranches(groupBranchesByName(results));
            setLoading(false);
        } catch (error) {
            setError(true);
            if (error.name === 'AbortError') {
                setErrorMessage('Network error please try again!');
            }else {
                setErrorMessage('Unexpected error please contact support!');
            }
        }
    }, []);

    const fetchBalanceSheet = React.useCallback(async function() {
        try {
            const response = await makeRequest.get(balanceSheetApiEndpoint.current, {timeout: 8000});
            const data = await response.json();
            setBalanceSheet(data);
            setLoadingBalanceSheet(false);
        }catch (error) {
            setErrorLoadingBalanceSheet(true);
            if (error.name === 'AbortError') {
                setBalanceErrorMessage('Network error please try again!');
            }else {
                console.log(error);
                setBalanceErrorMessage('Unexpected error please contact support!');
            }
        }
    }, []);

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

    React.useEffect(() => {
        fetchCurrencies()
    }, []);

    React.useEffect(() => {
        fetchBranches()
    }, []);

    const loadBalanceSheet = async (evt) => {
        evt.preventDefault();
        setLoadingBalanceSheet(true);
        balanceSheetApiEndpoint.current = `/acc-api/balance-sheet/?branchIds=${branchIds()}&currency_id=${currencyId}&asAtDate=${getFormattedDate(asAtDate, 'mm/dd/yyyy')}`;
        await fetchBalanceSheet();
        setCurrencyIso(currencies.filter(currency => currency.id == currencyId)[0].shortname);
    }

    const branchIds = () => {
        let keys = Object.keys(branches);
        keys.splice(keys.indexOf('All Branches'), 1);
        let branchIds = [];
        keys.forEach(key => {
            if (branches[key][0].checked) {
                branchIds.push(branches[key][0].id);
            }
        })
        return branchIds.join()
    }

    const reset = (evt) => {
        evt.preventDefault();
        setAsAtDate("");
        setBalanceSheet({});
    }

    if (error) {
        return (
            <Error errorMessage={errorMessage}/>
        )
    }

    if (loading || currencies===null) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            <DateSelect 
                selectedDate={asAtDate} 
                branchIds={branchIds()} 
                setSelectedDate={setAsAtDate} 
                fetch={loadBalanceSheet} 
                reset={reset}
                currencies={currencies}
                currencyId={currencyId}
                setCurrencyId={setCurrencyId}
            />
            <div style={{paddingTop: "17px"}}></div>
            <SelectBranch
                branches={branches}
                setBranches={setBranches}
            />
            <BalanceSheetTable
                balanceSheet={balanceSheet}
                loading={loadingBalanceSheet}
                asAtDate={asAtDate}
                branchIds={branchIds()}
                errorloading={errorLoadingBalanceSheet}
                errorMessage={balanceErrorMessage}
            />
        </>
    )
}

export default BalanceSheet;