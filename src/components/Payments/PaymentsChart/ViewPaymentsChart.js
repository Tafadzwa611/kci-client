import React from 'react';
import PrincipalPaymentsChart from './PrincipalPaymentsChart';
import { makeRequest } from '../../../utils/utils';

const ViewPaymentsChart = () => {

    const [branches, setBranches] = React.useState(null);
    const [currencies, setCurrencies] = React.useState(null);

    React.useEffect(() => {
        getBranchCurrencyData();
    }, []);

    const getBranchCurrencyData = async () => {
        await fetchBranches();
        await fetchCurrencies();
    }

    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
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

    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
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

    if (branches === null || currencies === null) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <>
            <PrincipalPaymentsChart branches={branches} currencies={currencies} />
        </>
    )
}

export default ViewPaymentsChart;