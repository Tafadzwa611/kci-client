import React from 'react';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import { STATUS } from './Details';

function DetailsTab({deposit}) {
    const { currencies } = useCurrencies();
    const { branches } = useBranches();

    const branchMap = branches.reduce((acc, branch) => {
        acc[branch.id] = branch.name;
        return acc;
    }, {});

    const currencyMap = currencies.reduce((acc, currency) => {
        acc[currency.id] = currency.shortname;
        return acc;
    }, {});

    return (
        <div style={{display:"flex", columnGap:"1%"}}>
            <div style={{width:"74%"}}>
                <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between", marginBottom: '2rem'}}>
                    <div style={{width:"33%"}}>
                        <ul style={{paddingRight:"1rem"}}>
                            <li style={{marginBottom: '1rem'}}><b>Account Details</b></li>
                            <li>Client Name: {deposit.client__fullname}</li>
                            <li>Account Number: {deposit.account_number}</li>
                            <li>Product Name: {deposit.deposit_product__name}</li>
                            <li>Branch: {branchMap[deposit.branch_id]}</li>
                            <li>Account Balance: {currencyMap[deposit.currency_id]} {deposit.balance}</li>
                            <li>Initial Account Activation Date: {deposit.account_date || 'Not Set'}</li>
                            <li>Account Entry Date: {deposit.date_created}</li>
                            <li>Last Account Update Date: {deposit.last_updated}</li>
                            {{
                                [STATUS.ACTIVE]: <li>Status: <span className="badge badge-success">Active</span></li>,
                                [STATUS.INACTIVE]: <li>Status: <span className="badge badge-info">Inactive</span></li>,
                                [STATUS.OVERDRAFT]: <li>Status: <span className="badge badge-danger">Overdraft</span></li>
                            }[deposit.status]}
                            <li>Interest Term: {deposit.interest_term}</li>
                            <li>Interest Method: {deposit.interest_method}</li>
                            <li>Interest Posting Frequency: {deposit.interest_posting_frequency}</li>
                            <li>Fixed Interest Rate: {deposit.fixed_interest_rate}%</li>
                            <li>Created By: {deposit.created_by_name}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsTab;