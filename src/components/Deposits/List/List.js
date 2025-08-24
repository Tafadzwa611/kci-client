import React from 'react';
import Filter from './Filter';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { Link } from 'react-router-dom';

function List() {
    const [deposits, setDeposits] = React.useState({
        "count": 0,
        "limit": 0,
        "offset": 0,
        "next_offset": null,
        "prev_offset": null,
        "page": 1,
        "total_pages": 0,
        "results": []
    });
    const { currencies } = useCurrencies();

    const currencyMap = currencies.reduce((acc, currency) => {
        acc[currency.id] = currency.shortname;
        return acc;
    }, {});

    return (
        <div>
            <div style={{margin:'20px 0'}}>
                <button type='button' className='btn btn-success'>
                    <Link to='/deposits/add'>Create Deposit Account</Link>
                </button>
            </div>
            <Filter setDeposits={setDeposits}/>
            <div style={{paddingTop: '2rem'}}></div>
            <div className='table-responsive font-12'>
                <table className='table table-hover'>
                    <tbody>
                        <tr className='journal-details header'>
                            <th>Account_Number</th>
                            <th>Client_Fullname</th>
                            <th>Deposit_Product_Name</th>
                            <th>Currency</th>
                            <th>Balance</th>
                        </tr>  
                        {deposits.results.map((deposit) => (
                            <tr className='table-row' key={deposit.id}>
                                <td><Link to={`/deposits/${deposit.id}`}>{deposit.account_number}</Link></td>
                                <td>{deposit.client__fullname}</td>
                                <td>{deposit.deposit_product__name}</td>
                                <td>{currencyMap[deposit.currency_id]}</td>
                                <td>{deposit.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default List;