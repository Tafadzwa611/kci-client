import React from 'react';
import { useLocation, Navigate, Link } from "react-router-dom";

function BatchResults() {
    const location = useLocation();
    const state = location.state;

    console.log(state);

    if (!state) return <Navigate to='/accounting/viewaccounting/journals/addjournalbatch' replace />;

    return (
        <div>
            <div style={{margin:'20px 0'}}>
                <button type='button' className='btn btn-success'>
                <Link to='/accounting/viewaccounting/journals/addjournalbatch'>Add Journals</Link>
                </button>
            </div>
            <h2>Failed Transactions</h2>
            <FailTable failRes={state.failed}/>
            <div style={{marginTop: '30px'}}></div>
            <h2>Successful Transactions</h2>
            <SuccessTable successRes={state.success}/>
        </div>
    )
}

function SuccessTable({successRes}) {
    return (
        <div style={{display:'block'}}>
            <div style={{padding:'0', border:'none'}}>
                <div style={{width:'100%', overflowX:'auto'}}>
                    <div className='table__height'>
                        <table className='table' id='loans'>
                            <thead>
                                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                                    <th>Transaction_ID</th>
                                    <th>Account_Debited_Code</th>
                                    <th>Account_Debited_Name</th>
                                    <th>Branch_Debited</th>
                                    <th>Account_Credited_Code</th>
                                    <th>Account_Credited_Name</th>
                                    <th>Branch_Credited</th>
                                    <th>Currency</th>
                                    <th>Amount</th>
                                    <th>Txn_Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {successRes.length > 0 ? (
                                    successRes.map(res => {
                                    return (
                                        <tr className='tr-class' key={res.id}>
                                            <td className='td-class'>{res.transaction_id}</td>
                                            <td className='td-class'>{res.account_debited_code}</td>
                                            <td className='td-class'>{res.account_debited}</td>
                                            <td className='td-class'>{res.branch_debited}</td>
                                            <td className='td-class'>{res.account_credited_code}</td>
                                            <td className='td-class'>{res.account_credited}</td>
                                            <td className='td-class'>{res.branch_credited}</td>
                                            <td className='td-class'>{res.currency}</td>
                                            <td className='td-class'>{res.amount}</td>
                                            <td className='td-class'>{res.txn_date}</td>
                                        </tr>
                                    )
                                })) : (
                                    <tr className='tr-class'>
                                        <td className='td-class' colSpan={10} style={{ textAlign: 'center' }}>They were no successful transactions.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FailTable({failRes}) {
    return (
        <div style={{display:'block'}}>
            <div style={{padding:'0', border:'none'}}>
                <div style={{width:'100%', overflowX:'auto'}}>
                    <div className='table__height'>
                        <table className='table' id='loans'>
                            <thead>
                                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                                    <th>Reason</th>
                                    <th>Account_Debited_Code</th>
                                    <th>Account_Debited_Name</th>
                                    <th>Branch_Debited</th>
                                    <th>Account_Credited_Code</th>
                                    <th>Account_Credited_Name</th>
                                    <th>Branch_Credited</th>
                                    <th>Amount</th>
                                    <th>Txn_Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {failRes.length > 0 ? (
                                    failRes.map((res, idx) => {
                                    return (
                                        <tr className='tr-class' key={idx}>
                                            <td className='td-class'>{res.fail_reason}</td>
                                            <td className='td-class'>{res.account_debited_code}</td>
                                            <td className='td-class'>{res.account_debited}</td>
                                            <td className='td-class'>{res.branch_debited}</td>
                                            <td className='td-class'>{res.account_credited_code}</td>
                                            <td className='td-class'>{res.account_credited}</td>
                                            <td className='td-class'>{res.branch_credited}</td>
                                            <td className='td-class'>{res.amount}</td>
                                            <td className='td-class'>{res.txn_date}</td>
                                        </tr>
                                    )
                                })) : (
                                    <tr className='tr-class'>
                                        <td className='td-class' colSpan={9} style={{ textAlign: 'center' }}>They were no failed transactions.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BatchResults;
