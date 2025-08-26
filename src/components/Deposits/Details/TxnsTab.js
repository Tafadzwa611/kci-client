import React from 'react';

function TxnsTab({ deposit }) {
    return (
        <div style={{padding: '1.5rem'}} className='miniLoanDetails-container'>
            <div style={{width: '100%', overflowX: 'auto'}}>
                <div style={{maxHeight: '600px'}}>
                    <table className='table' id='transactions'>
                        <thead>
                            <tr className='journal-details header' style={{position: 'sticky', top: '0'}}>
                                <th className='schedule__table'>ID</th>
                                <th className='schedule__table'>Date</th>
                                <th className='schedule__table'>Transaction Name</th>
                                <th className='schedule__table'>Credit</th>
                                <th className='schedule__table'>Debit</th>
                                <th className='schedule__table'>Balance</th>
                                <th className='schedule__table'>Description</th>
                                <th className='schedule__table'>Created By</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deposit.statement.map((txn) => (
                                <tr key={txn.id} className='table-row'>
                                    <td className='schedule__table'>{txn.id}</td>
                                    <td className='schedule__table'>{txn.txn_date}</td>
                                    <td className='schedule__table'>{txn.transaction_name}</td>
                                    <td className='schedule__table'>{txn.transaction_type === "Cr" ? txn.amount : ""}</td>
                                    <td className='schedule__table'>{txn.transaction_type === "Dr" ? txn.amount : ""}</td>
                                    <td className='schedule__table'>{txn.account_balance}</td>
                                    <td className='schedule__table'>{txn.description}</td>
                                    <td className='schedule__table'>{txn.created_by_id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TxnsTab;