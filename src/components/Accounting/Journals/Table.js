import React from 'react';
import { convertDate } from './utils';

const Table = ({journals, currencyIso}) => {

    return (

        <div className="table-container font-12" style={{padding:"0", border:"none"}}>
            <div className="table-responsive" style={{maxHeight:"800px"}}>
                <table className="table">
                    <thead>
                        <tr className="bg-gray-accs">
                            <th>Transaction ID</th>
                            <th>Account Debited</th>
                            <th>Account Credited</th>
                            <th>Amount Debited</th>
                            <th>Amount Credited</th>
                            <th>Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                    {journals.map(journal => {
                        return (
                            <tr key={journal.id}>
                                <td><a href={`/reports/reportsapp/#/jDetails/${journal.id}`}>{journal.transaction_id}</a></td>
                                <td>{journal.account_debited} <em><small>({journal.branch_debited})</small></em></td>
                                <td>{journal.account_credited} <em><small>({journal.branch_credited})</small></em></td>
                                <td>{`${currencyIso} ${journal.amount_debited}`}</td>
                                <td>{`${currencyIso} ${journal.amount_credited}`}</td>
                                <td>{convertDate(journal.date_created)}</td>
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