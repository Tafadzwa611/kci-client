import React, {useEffect, useRef, useState} from 'react';
import { makeRequest } from '../../../../utils/utils';
import Table from '../AssetsSubAccounts/Table';
import DateRange from '../AssetsSubAccounts/DateRange';
import MiniLoader from '../../../Loader/MiniLoader';

const IncomeSubAccounts = () => {
    const [subaccounts, setSubAccounts] = useState([])
    const [branches, setBranches] = useState(null);
    const [branchIds, setBranchIds] = useState(null);
    const [mainacc, setMainAcc] = useState('');
    const [currencyId, setCurrencyId] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [accStatement, setAccStatement] = useState(false)
    const [selectedSubAccID, setSelectedSubAccID] = useState(null)

    useEffect(() => {
        getBranches();
    }, []);

    useEffect(() => {
        getCurrency();
    }, [])

    useEffect(() => {
        if (currencyId !== null){
            getSubAccounts();
        }
        setAccStatement(false)
    }, [currencyId]);

    async function fetchCurrency() {
        try {
          const response = await makeRequest.get('/usersapi/currencieslist/', {timeout: 8000});
          if (response.ok) {
            const data = await response.json();
            if (currencyId===null) {
              const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
              setCurrencyId(zwlId);
            }
            return setCurrency([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
          }else {
            const error = await response.json();
            console.log(error);
          }
        }catch(error) {
          console.log(error);
        }
    }
    
    const getCurrency = async () => {
        await fetchCurrency();
    };

    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }

    const getSubAccounts = async () => {
        window.scrollTo(0, 0);
        const data = await fetchSubAccounts();
        setSubAccounts(data);
    };

    const getBranches = async () => {
        window.scrollTo(0, 0);
        const branches = await fetchBranches();
        setBranches(branches);
    };

    async function fetchSubAccounts() {
        try {
            const url = getUrl();
            const response = await makeRequest.get(url, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                return json_res;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    function getUrl() {
        let url = `/acc-api/chartsofaccs-sub-accounts-list/?currency_id=${currencyId}&acc_type=INCOME`;
        if (branchIds !== null) {
            branchIds.forEach(id => (url += `&branch_ids=${id}`));
        }
        if (mainacc !== '') {
            url += `&main_acc=${mainacc}`;
        }
        return url
    }

    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 6000});
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

    const onSubmit = async (evt) => {
        evt.preventDefault();
        const data = await fetchSubAccounts();
        setSubAccounts(data);
    }
    
    if (subaccounts === null || branches === null || currency === null) {
        return <MiniLoader />
    }
    
    return (
        <>
            <DateRange 
                onSubmit={onSubmit}
                changeCurrency={changeCurrency}
                setSubAccounts={setSubAccounts}
                branches={branches}
                setBranchIds={setBranchIds}
                currency={currency}
                currencyId={currencyId}
            />
            <Table 
                subaccounts={subaccounts}
                accStatement={accStatement}
                setAccStatement={setAccStatement}
                selectedSubAccID={selectedSubAccID}
                setSelectedSubAccID={setSelectedSubAccID}
            />
        </>
    )
}

export default IncomeSubAccounts;