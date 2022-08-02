import React from 'react';
import { convertDate } from '../../Journals/utils';

const Table = (props) => {
    return (
        <div className="table-container font-12" style={{padding:"0", border:"none", marginTop:"2rem"}}>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr className="bg-gray-accs">
                            <th>GL Code</th>
                            <th>Account Name</th>
                            <th>Type</th>
                            <th>Branch</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.mainaccounts.map(account => {
                            return (
                            <tr key={account.id}>
                                <td>{account.general_ledger_code}</td>
                                <td>{account.general_ledger_name}</td>
                                <td>{account.account_type}</td>
                                <td>{account.branch.name}</td>
                                <td>{convertDate(account.date_created)}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;