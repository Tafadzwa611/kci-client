import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../../../../utils/utils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import CurrencySelector from '../../../../Dashboard/CurrencySelector';

const statusClasses = {
    'Fully Paid': 'badge badge-success',
    'Early Settlement': 'badge badge-success',
    'Restructured': 'badge badge-dark',
    'Processing': 'badge badge-info-lighter',
    'Arrears': 'badge badge-info-light',
    'Open': 'badge badge-info',
    'Over Paid': 'badge badge-warning',
    'Defaulted': 'badge badge-danger',
    'Rejected': 'badge badge-danger',
    'Written-Off': 'badge badge-dark',
}

function ClientLoans({clientId}) {
    const [loans, setLoans] = useState([]);
    const [currencies, setCurrencies] = useState(null);
    const [currencyId, setCurrencyId] = useState(null);

    useEffect(() => {
        getLoans();
    }, [currencyId]);

    const getLoans = async () => {
        window.scrollTo(0, 0);
        if (currencyId !== null) {
            await fetchLoans();
        }
    }

    useEffect(() => {
        getCurrencies();
    }, []);

    const getCurrencies = async () => {
        await fetchCurrencies();
    }

    async function fetchLoans() {
        try {
            const response = await makeRequest.get(`/loansapi/client_loans_api/${clientId}/?currency_id=${currencyId}`, {timeout: 60000});
            if (response.ok) {
                const json_res = await response.json();
                return setLoans(json_res);
            }
        }catch(error) {
            console.log(error);
        }
    }

    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 6000});
            if (response.ok) {
                const data = await response.json();
                const zwlId = data.filter(currency => currency.shortname === 'ZWL')[0].id;
                setCurrencyId(zwlId);
                return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (loans===null || currencies === null) {
        return <div>Loading</div>
    }

    return (
        <>
            <div style={{marginBottom:"1.5rem", display:"flex", justifyContent:"end", columnGap:"10px"}} className="text-light">
                <ReactHTMLTableToExcel
                id='test-table-xls-button'
                className='btn btn-default client__details'
                table='loans'
                filename='tablexls'
                sheet='tablexls'
                buttonText='Download as XLS'/>
                <CurrencySelector currencies={currencies} currencyId={currencyId} setCurrencyId={setCurrencyId}/>
            </div>
            <div style={{width:"100%", overflowX:"auto", maxHeight:"600px"}}>
                <table id='loans' className='table'>
                    <thead style={{position:"sticky", top:"0"}}>
                        <tr className="client__address__table">
                            <th className="table-head-dark-color">Account</th>
                            <th className="table-head-dark-color">Loan_Product</th>
                            <th className="table-head-dark-color">Disbursement Date</th>
                            <th className="table-head-dark-color">Maturity Date</th>
                            <th className="table-head-dark-color">Principal</th>
                            <th className="table-head-dark-color">Principal Balance</th>
                            <th className="table-head-dark-color">Interest Rate</th>
                            <th className="table-head-dark-color">Total Interest</th>
                            <th className="table-head-dark-color">Interest Balance</th>
                            <th className="table-head-dark-color">Status</th>
                        </tr>
                        </thead>
                    <tbody>
                    {loans.length > 0 ? loans.map((loan) => (
                        <tr key={loan.id}>
                        <td>{loan.loan_id}</td>
                        <td>{loan.loan_product_name}</td>
                        <td>{loan.disbursement_date}</td>
                        <td>{loan.maturity_date}</td>
                        <td>{loan.principal}</td>
                        <td>{loan.principal_amount_due}</td>
                        <td>{loan.irate}</td>
                        <td>{loan.total_interest}</td>
                        <td>{loan.interest_amount_due}</td>
                        <td><small className={statusClasses[loan.status]} style={{margin: '3px'}}>{loan.status}</small></td>
                        </tr>
                    )):
                    <tr><td colSpan={10} style={{textAlign: 'center'}}>No transactions could be found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ClientLoans;