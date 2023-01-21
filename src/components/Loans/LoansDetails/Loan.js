import React, {useState, useEffect} from 'react';
import { convertDate } from '../../Accounting/Journals/utils';
import ApproveLoan from './LoanStates/ApproveLoan/ApproveLoan';
import RejectLoan from './LoanStates/RejectLoan/RejectLoan';
import DeleteLoan from './LoanStates/DeleteLoan/DeleteLoan';
import UndoLoanDisbursement from './LoanStates/UndoLoanDisbursement/UndoLoanDisbursement';
import UndoLoanApproval from './LoanStates/UndoLoanApproval/UndoLoanApproval';
import MiniLoader  from '../../Loader/MiniLoader';
import { makeRequest } from '../../../utils/utils';


const Loan = ({
    setDetails,
    selectedloan,
    selectedLoanID,
    setLoans,
}) => {

    const [loan, setLoan] = useState(null);
    const [openApproveLoan, setOpenApproveLoan] = useState(false);
    const [openRejectLoan, setOpenRejectLoan] = useState(false);
    const [openDeleteLoan, setOpenDeleteLoan] = useState(false);
    const [openUndoDisbursement, setOpenUndoDisbursement] = useState(false);
    const [openLoanApproval, setOpenLoanApproval] = useState(false);
    const [openUndoLoanApproval, setOpenUndoLoanApproval] = useState(false);
    
    const handleClose = () => {
        setDetails(false);
    }

    useEffect(() => {
        getLoan(selectedLoanID);
    }, [selectedLoanID]);

    const getLoan = async () => {
        await fetchLoan();
    }

    if (loan === null) {
        return <MiniLoader />
    }

    console.log(loan)

    async function fetchLoan() {
        try {
            const response = await makeRequest.get(`/loansapi/get_loan/${selectedLoanID}/`, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                return setLoan(json_res.loan);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
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
                    <button className={statusClasses[loan.status]}>{loan.status}</button>
                    <span><b>{loan.client}'s</b> Loan Details</span>
                </div>
                <button className="btn btn-default client__details" onClick={handleClose}>Close</button>
            </div>

            {openApproveLoan &&
                <ApproveLoan 
                    selectedLoanID={selectedLoanID}
                    // setLoan={setLoan}
                    open={openApproveLoan}
                    setOpen={setOpenApproveLoan}
                />
            }

            {openRejectLoan &&
                <RejectLoan 
                    selectedLoanID={selectedLoanID}
                    setLoan={setLoan}
                    open={openRejectLoan}
                    setOpen={setOpenRejectLoan}
                    loan={loan}
                />
            }

            {openDeleteLoan &&
                <DeleteLoan 
                    selectedLoanID={selectedLoanID}
                    setLoan={setLoan}
                    open={openDeleteLoan}
                    setOpen={setOpenDeleteLoan}
                    loan={loan}
                    setDetails={setDetails}
                    setLoans={setLoans}
                />
            }

            {openUndoDisbursement &&
                <UndoLoanDisbursement 
                    selectedLoanID={selectedLoanID}
                    setLoan={setLoan}
                    setOpen={setOpenUndoDisbursement}
                />
            }

            {openUndoLoanApproval &&
                <UndoLoanApproval 
                    selectedLoanID={selectedLoanID}
                    setLoan={setLoan}
                    setOpen={setOpenUndoLoanApproval}
                />
            }


            {loan.status == 'Open' && 
                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", marginTop:"1rem", justifyContent:"flex-end"}}>
                    <button className="btn btn-olive" onClick={(e) => setOpenUndoDisbursement(curr => !curr)}>Undo Disburse</button>
                </div>
            }
            {loan.status == 'Approved' && 
                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", marginTop:"1rem", justifyContent:"flex-end"}}>
                    <button className="btn btn-olive" onClick={(e) => setOpenUndoLoanApproval(curr => !curr)}>Undo Approve</button>
                    <button className="btn btn-olive" >Disburse</button>
                </div>
            }
            {loan.status == 'Processing' && 
                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", marginTop:"1rem", justifyContent:"flex-end"}}>
                    <button className="btn btn-olive" onClick={(e) => setOpenApproveLoan(curr => !curr)}>Approve</button>
                    <button className="btn btn-olive" onClick={(e) => setOpenRejectLoan(curr => !curr)}>Reject</button>
                    <button className="btn btn-olive" >Edit</button>
                    <button className="btn btn-olive" onClick={(e) => setOpenDeleteLoan(curr => !curr)}>Delete</button>
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
                                <td>{loan.loan_added_on}</td>
                                <td>{loan.first_repayment_date}</td>
                                <td>{loan.maturity_date}</td>
                                <td>{loan.principal}</td>
                                <td>{loan.principal_amount_due}</td>
                                <td>{loan.interest_rate}% {loan.interest_interval}</td>
                                <td>{loan.interest}</td>
                                <td>{loan.total_amount_paid}</td>
                                <td>{loan.total_amount_paid}</td>
                                <td>{loan.total_amount_paid}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Loan;