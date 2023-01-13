import React, {useState} from 'react';
import { convertDate } from '../../Accounting/Journals/utils';
import ApproveLoan from './LoanStates/ApproveLoan/ApproveLoan';


const Loan = ({
    setDetails,
    selectedloan,
    selectedLoanID,

}) => {

    // const [loan, setLoan] = useState(null);
    const [openApproveLoan, setOpenApproveLoan] = useState(false);


    console.log(selectedloan)


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
        'Approved': 'badge-bg badge-bg-info-light',
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
            {/* {selectedloan.status == 'Open' && 
            <div className="client-state-btns" style={{display:"flex", columnGap:"3px"}}>
              {userperms.undo_client_blacklist ?
                <button className="btn btn-olive" onClick={(e) => setUndoClientBlacklist(curr => !curr)}>Undo Blacklist</button>:
                <button className="btn btn-olive" onClick={(e) => setRequestUndoClientBlackList(curr => !curr)}>Request Undo Blacklist</button>
              }
            </div>
            } */}

            {openApproveLoan &&
                <ApproveLoan 
                    selectedLoanID={selectedLoanID}
                    // setLoan={setLoan}
                    setOpenApproveLoan={setOpenApproveLoan}
                />
            }

            {selectedloan.status == 'Open' && 
                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", marginTop:"1rem", justifyContent:"flex-end"}}>
                    <button className="btn btn-olive" >Undo Disburse</button>
                </div>
            }
            {selectedloan.status == 'Approved' && 
                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", marginTop:"1rem", justifyContent:"flex-end"}}>
                    <button className="btn btn-olive" >Undo Approve</button>
                    <button className="btn btn-olive" >Disburse</button>
                </div>
            }
            {selectedloan.status == 'Processing' && 
                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", marginTop:"1rem", justifyContent:"flex-end"}}>
                    <button className="btn btn-olive" onClick={(e) => setOpenApproveLoan(curr => !curr)}>Approve</button>
                    <button className="btn btn-olive" >Reject</button>
                    <button className="btn btn-olive" >Edit</button>
                    <button className="btn btn-olive" >Delete</button>
                </div>
            }
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