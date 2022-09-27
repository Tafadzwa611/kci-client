
import React from 'react';
import { convertDate } from '../../Accounting/Journals/utils';
import Footer from './Footer';


function LoansTable({loans, nextPageNumber, loadMoreLoans, totalCount, loadingMore}) {

    const statusClasses = {
        'Arrears': 'badge badge-info-light',
        'Defaulted': 'badge badge-danger',
    }

    return (
        <div>
            <div className='table-responsive' style={{maxHeight: '600px'}}>
                <table className='table' width='100%'>
                    <thead className="journal-details header">
                        <tr>
                        <th>Client</th>
                        <th>Loan Number</th>
                        <th>Branch</th>
                        <th>Disbursement Date</th>
                        <th>Last Payment Date</th>
                        <th>Days Past Due</th>
                        <th>Installment Due</th>
                        <th>Principal Due</th>
                        <th>Pending Due</th>
                        <th>Status</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.length > 0 ? loans.map(loan => {
                            return (
                                <tr key={loan.id}>
                                    <td>{loan.client}</td>
                                    <td>{loan.loan_id}</td>
                                    <td>{loan.branch}</td>
                                    <td>{convertDate(loan.disbursement_date)}</td>
                                    <td>{convertDate(loan.payment_date)}</td>
                                    <td>{loan.days_past_due} days</td>
                                    <td>{loan.currency} {loan.installment}</td>
                                    <td>{loan.currency} {loan.principal_due}</td>
                                    <td>{loan.currency} {loan.amount_due}</td>
                                    <td><small className={statusClasses[loan.status]} style={{margin: '3px'}}>{loan.status}</small></td>
                                    <td>
                                        <div className='btn-group-vertical'>
                                        <a type='button' className='btn btn-xs btn-default btn-block' href={`/loans/update_loan_status/${loan.id}`}>Write-off</a>
                                        <a type='button' className='btn btn-xs btn-default btn-block' href={`/loans/edit_schedule/${loan.id}`}>Re-open</a>
                                        <a type='button' className='btn btn-xs btn-default btn-block' href={`/loans/change_loan_status/${loan.id}`}>Change Status</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : <tr><td colSpan={10} style={{textAlign: 'center'}}>No loans could be found.</td></tr>}
                    </tbody>
                </table>
            </div>
            {loans.length > 0  && 
                <Footer nextPageNumber={nextPageNumber} loadMoreLoans={loadMoreLoans} loadingMore={loadingMore}/>
            }
        </div>

    )
}

export default LoansTable;