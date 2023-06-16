import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const TrialBalanceTable = ({trialBalance, loggedInUser, intValues}) => {

    const [omitZeroBalances, setOmitZeroBalances] = useState(false);
    const [accounts, setAccounts] = useState([]);
    
    useEffect(() => {
        if (omitZeroBalances) {
            setAccounts(trialBalance.accounts.filter(account => Number(account.balance) != 0));
        }else {
            setAccounts(trialBalance.accounts);
        };
    }, [omitZeroBalances]);

    return (
        <div className="col-12 font-12">
            <div style={{marginTop:"40px", border:"none", padding:"0"}} className="trial_balance_table_container">
                <div style={{float:"left", margin:"20px", marginLeft:"0", marginTop:"0", display:"flex", flexDirection:"row", alignItems:"center", columnGap:"10px"}}>
                    <div>
                        <ReactHTMLTableToExcel
                            id='test-table-xls-button'
                            className='download-table-xls-button btn btn-default'
                            table='trial-balance'
                            filename={`${trialBalance.currency} Trial Balance for ${loggedInUser.company_name} as on ${intValues.maxDate}`}
                            sheet='tablexls'
                            buttonText='Download as XLS'
                        />
                    </div>
                    <div style={{marginTop:"12px"}}>
                        <input type='checkbox' checked={omitZeroBalances} onChange={e => setOmitZeroBalances(!omitZeroBalances)} style={{marginRight:"5px"}}/>
                        <label> Omit Accounts with zero balances</label>
                    </div>
                </div>
                <div className="table-responsive" style={{maxHeight:"1000px"}}>
                    <table className="table" style={{width:"100%"}} id='trial-balance'>
                        <thead className="clients-report-table">
                            <tr className="journal-details fees__report_thead">
                                <th>Account</th>
                                <th>Branch</th>
                                <th>Account Type</th>
                                <th>Debit({trialBalance.currency})</th>
                                <th>Credit({trialBalance.currency})</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>{trialBalance.currency} Trial Balance</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><b>{loggedInUser.company_name} as on {intValues.maxDate}</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {accounts.length > 0 ? accounts.map(account => {
                                return (
                                    <tr key={account.id}>
                                        <td>{account.account_name}</td>
                                        <td>{account.branch}</td>
                                        <td>{account.account_type}</td>
                                        {Number(account.balance) >= 0 ?
                                        <td className="trial-balance-text-color" style={{background: 'rgb(127, 255, 0) none repeat scroll 0% 0%', textAlign: 'center'}}>{account.balance}</td> : <td></td>}
                                        {Number(account.balance) < 0 ?
                                        <td className="trial-balance-text-color" style={{background: 'rgb(255, 182, 193) none repeat scroll 0% 0%', textAlign: 'center'}}>{account.balance}</td> : <td></td>}
                                    </tr>
                                    )
                                }) : <tr><td colSpan={5} style={{textAlign: 'center'}}>No accounts could be found.</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", columnGap:"5px", margin:"20px"}}>
                    <i className="uil uil-exclamation-triangle" style={{color:"#ffc107"}}></i> 
                    Please note that, only accounts that had transactions in the selected time periods are shown.
                </div>
            </div>
        </div>
    );
}

export default TrialBalanceTable;