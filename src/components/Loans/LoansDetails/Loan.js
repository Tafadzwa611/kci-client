import React from 'react';
import { convertDate } from '../../Accounting/Journals/utils';


const Loan = ({
    setDetails,
    selectedloan,

}) => {

    const handleClose = () => {
        setDetails(false);
    }

    const statusClasses = {
        'Fully Paid': 'badge-bg badge-bg-success',
        'Early Settlement': 'badge-bg badge-bg-success',
        'Restructured': 'badge-bg badge-bg-dark',
        'Processing': 'badge-bg badge-bg-info-lighter',
        'Arrears': 'badge-bg badge-bg-info-light',
        'Open': 'badge-bg badge-bg-info',
        'Over Paid': 'badge-bg badge-bg-warning',
        'Defaulted': 'badge-bg badge-bg-danger',
        'Rejected': 'badge-bg badge-bg-danger',
        'Written-Off': 'badge-bg badge-bg-dark',
    }

    return (
        <div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <div style={{display:"flex", alignItems:"center", columnGap:"1rem"}}>
                    <button className={statusClasses[selectedloan.status]}>{selectedloan.status}</button>
                    <span><b>{selectedloan.client}'s</b> Loan Details</span>
                </div>
                <button className="btn btn-default client__details" onClick={handleClose}>Close</button>
            </div>
            <div style={{overflowY:"auto", maxWidth:"fit-content", margin:"1rem 0"}}>
                <div>
                    <table className="table">
                        <thead>
                            <tr className="client__address__table">
                                <th className="table-head-dark-color">Released</th>
                                <th className="table-head-dark-color">First Repayment Date</th>
                                <th className="table-head-dark-color">Maturity</th>
                                <th className="table-head-dark-color">Principal</th>
                                <th className="table-head-dark-color">Principal Due</th>
                                <th className="table-head-dark-color">Interest Rate</th>
                                <th className="table-head-dark-color">Total Interest</th>
                                <th className="table-head-dark-color">Total Amount Due</th>
                                <th className="table-head-dark-color">Paid</th>
                                <th className="table-head-dark-color">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{selectedloan.loan_added_on}</td>
                                <td>{selectedloan.first_repayment_date}</td>
                                <td>{selectedloan.maturity_date}</td>
                                <td>{selectedloan.principal}</td>
                                <td>{selectedloan.principal_amount_due}</td>
                                <td>{selectedloan.interest_rate}% {selectedloan.interest_interval}</td>
                                <td>{selectedloan.interest}</td>
                                <td>{selectedloan.total_amount_paid}</td>
                                <td>{selectedloan.total_amount_paid}</td>
                                <td>{selectedloan.total_amount_paid}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Loan;