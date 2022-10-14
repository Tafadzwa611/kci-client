import React from 'react';
import { convertDate } from '../../Accounting/Journals/utils';
import Footer from './Footer';


function LoansTable({loans, nextPageNumber, loadMoreLoans, totalCount, loadingMore}) {

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

    return (
        <div className="table-container font-12" style={{border:"none", padding:"0"}}>
            <div className='table-responsive'>
                <div className="table__height">
                    <table className='table'>
                        <thead className="journal-details header">
                            <tr>
                                <th>Client</th>
                                <th>Loan Number</th>
                                <th>Payment Date</th>
                                <th>Installment Due</th>
                                <th>Pending Due</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.length > 0 ? loans.map(loan => {
                            return (
                                <tr key={loan.id}>
                                <td><span id={loan.client_id}>{loan.client}</span></td>
                                <td><span>{loan.loan_id}</span></td>
                                <td>{convertDate(loan.payment_date)}</td>
                                <td>{loan.installment}</td>
                                <td>{loan.pending_due}</td>
                                <td><small className={statusClasses[loan.status]} style={{margin: '3px'}}>{loan.status}</small></td>
                                </tr>
                            )
                            }) : <tr><td colSpan={10} style={{textAlign: 'center'}}>No loans could be found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer nextPageNumber={nextPageNumber} loadMoreLoans={loadMoreLoans} loadingMore={loadingMore}/>
        </div>
    )
}

export default LoansTable;