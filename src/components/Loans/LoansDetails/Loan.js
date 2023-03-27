import React, {useState} from 'react';
import ApproveLoan from './LoanStates/ApproveLoan/ApproveLoan';
import DisburseLoan from './LoanStates/DisburseLoan/DisburseLoan';
import RejectLoan from './LoanStates/RejectLoan/RejectLoan';
import DeleteLoan from './LoanStates/DeleteLoan/DeleteLoan';
import UndoLoanDisbursement from './LoanStates/UndoLoanDisbursement/UndoLoanDisbursement';
import UndoLoanApproval from './LoanStates/UndoLoanApproval/UndoLoanApproval';
import MoreLoanDetails from './MoreLoanDetails/MoreLoanDetails';

const Loan = ({
    setDetails,
    selectedLoanID,
    setLoans,
    fund_accounts,
    loan_officers,
    loan_info,
    days_in_arrears}) => {

    const [loan, setLoan] = useState(loan_info);
    const [daysInArrears, setDaysInArrears] = useState(days_in_arrears)
    const [openApproveLoan, setOpenApproveLoan] = useState(false);
    const [openRejectLoan, setOpenRejectLoan] = useState(false);
    const [openDeleteLoan, setOpenDeleteLoan] = useState(false);
    const [openUndoDisbursement, setOpenUndoDisbursement] = useState(false);
    const [openLoanApproval, setOpenLoanApproval] = useState(false);
    const [openUndoLoanApproval, setOpenUndoLoanApproval] = useState(false);
    const [openMoreLoanDetails, setOpenMoreLoanDetails] = useState(false);
    const [openDisburseLoan, setOpenDisburseLoan] = useState(false);
    const [scheduleStrategies, setScheduleStrategies] = useState(loan_info.schedule_strategies);
    const [defaultScheduleStrategy, setDefaultScheduleStrategies] = useState(loan_info.default_schedule_strategy);
    const [firstRepaymentDate, setFirstRepaymentDate] = useState(loan_info.first_repayment_date);

    const handleClose = () => {
        setDetails(false);
    }

    const statusClasses = {
        'Fully Paid': 'badge-bg badge-bg-success',
        'Early Settlement': 'badge-bg badge-bg-success',
        'Restructured': 'badge-bg badge-bg-dark',
        'Processing': 'badge-bg badge-bg-info-lighter',
        'Arrears': 'badge-bg badge-bg-danger',
        'Approved': 'badge-bg badge-bg-info-light',
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
                    <button className={statusClasses[loan.status]}>{loan.status}</button>
                    <span><b>{loan.client_fullname}'s</b> Loan Details</span>
                </div>
                <div style={{display:"flex", columnGap:"3px", justifyContent:"flex-end"}}>
                    <button className="btn btn-default client__details" onClick={(e) => setOpenMoreLoanDetails(curr => !curr)}>Expand</button>
                    <button className="btn btn-default client__details" onClick={handleClose}>Close</button>
                </div>
            </div>

            {openMoreLoanDetails &&
                <MoreLoanDetails 
                    openMoreLoanDetails={openMoreLoanDetails}
                    setOpenMoreLoanDetails={setOpenMoreLoanDetails}
                    loan={loan}
                    setOpenUndoDisbursement={setOpenUndoDisbursement}
                    setOpenUndoLoanApproval={setOpenUndoLoanApproval}
                    setOpenApproveLoan={setOpenApproveLoan}
                    setOpenRejectLoan={setOpenRejectLoan}
                    setOpenDeleteLoan={setOpenDeleteLoan}
                    setOpenDisburseLoan={setOpenDisburseLoan}
                />
            }

            {openApproveLoan &&
                <ApproveLoan 
                    selectedLoanID={selectedLoanID}
                    setLoan={setLoan}
                    open={openApproveLoan}
                    setOpen={setOpenApproveLoan}
                />
            }

            {openDisburseLoan &&
                <DisburseLoan 
                    selectedLoanID={selectedLoanID}
                    setLoan={setLoan}
                    open={openDisburseLoan}
                    setOpen={setOpenDisburseLoan}
                    scheduleStrategies={scheduleStrategies}
                    defaultScheduleStrategy={defaultScheduleStrategy}
                    firstRepaymentDate={firstRepaymentDate}
                    fund_accounts={fund_accounts}
                    loan_officers={loan_officers}
                />
            }

            {openRejectLoan &&
                <RejectLoan 
                    selectedLoanID={selectedLoanID}
                    setLoan={setLoan}
                    setOpen={setOpenRejectLoan}
                    loan={loan}
                />
            }

            {openDeleteLoan &&
                <DeleteLoan 
                    selectedLoanID={selectedLoanID}
                    setOpen={setOpenDeleteLoan}
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
                    <button className="btn btn-olive" onClick={() => setOpenUndoDisbursement(curr => !curr)}>Undo Disbursement</button>
                </div>
            }
            {loan.status == 'Approved' && 
                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", marginTop:"1rem", justifyContent:"flex-end"}}>
                    <button className="btn btn-olive" onClick={() => setOpenUndoLoanApproval(curr => !curr)}>Undo Approve</button>
                    <button className="btn btn-olive" onClick={() => setOpenDisburseLoan(curr => !curr)}>Disburse</button>
                </div>
            }
            {loan.status == 'Processing' && 
                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", marginTop:"1rem", justifyContent:"flex-end"}}>
                    <button className="btn btn-olive" onClick={() => setOpenApproveLoan(curr => !curr)}>Approve</button>
                    <button className="btn btn-olive" onClick={() => setOpenRejectLoan(curr => !curr)}>Reject</button>
                    <button className="btn btn-olive" >Edit</button>
                    <button className="btn btn-olive" onClick={() => setOpenDeleteLoan(curr => !curr)}>Delete</button>
                </div>
            }
            <div style={{overflowY:"auto", maxWidth:"fit-content", margin:"1rem 0"}}>
                <div>
                    <table className="table">
                        <thead>
                            <tr className="client__address__table">
                                {
                                    (loan.status == 'Rejected' || loan.status == 'Approved' || loan.status == 'Processing' ) ?
                                        <th className="table-head-dark-color">Application Date</th>:
                                        <th className="table-head-dark-color">Released</th>
                                }   
                                <th className="table-head-dark-color">First Repayment Date</th>
                                <th className="table-head-dark-color">Maturity</th>
                                <th className="table-head-dark-color">Principal</th>
                                <th className="table-head-dark-color">Principal Due</th>
                                <th className="table-head-dark-color">Interest Rate</th>
                                <th className="table-head-dark-color">Total Interest</th>
                                <th className="table-head-dark-color">Total Amount Due</th>
                                <th className="table-head-dark-color">Paid</th>
                                <th className="table-head-dark-color">Balance</th>
                                {loan.status == 'Arrears' && 
                                    <th className="table-head-dark-color">Days in Arrears</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                    (loan.status == 'Rejected' || loan.status == 'Approved' || loan.status == 'Processing' ) ?
                                        <td>{loan.application_date}</td>:
                                        <td>{loan.loan_added_on}</td>
                                }
                                <td>{loan.first_repayment_date}</td>
                                <td>{loan.maturity_date}</td>
                                <td>{loan.principal}</td>
                                <td>{loan.principal_amount_due}</td>
                                <td>{loan.interest_rate}% {loan.interest_interval}</td>
                                <td>{loan.interest}</td>
                                <td>
                                    {
                                        (loan.status == 'Early Settlement') ?
                                            (
                                                loan.interest != loan.interest_settlement || 
                                                loan.penalty_reference != loan.penalty_reference_settlement || 
                                                loan.non_deductable_fees_reference != loan.non_deductable_fees_reference_settlement 
                                            ) ? 
                                            <>
                                                <>
                                                    <del>
                                                        {
                                                            (
                                                                parseFloat(loan.principal) + 
                                                                parseFloat(loan.interest) + 
                                                                parseFloat(loan.penalty_reference) + 
                                                                parseFloat(loan.non_deductable_fees_reference)
                                                            ).toFixed(2)
                                                        }
                                                    </del>
                                                </>
                                                <br />
                                                <>
                                                    {
                                                        (
                                                            parseFloat(loan.principal) + 
                                                            parseFloat(loan.interest_settlement) +
                                                            parseFloat(loan.penalty_reference_settlement) +
                                                            parseFloat(loan.non_deductable_fees_reference_settlement)
                                                        ).toFixed(2)
                                                    }
                                                </>
                                            </>
                                            :
                                            <>
                                                {
                                                    (
                                                        parseFloat(loan.principal) + 
                                                        parseFloat(loan.interest) +
                                                        parseFloat(loan.penalty_reference) +
                                                        parseFloat(loan.non_deductable_fees_reference)
                                                    ).toFixed(2)
                                                }
                                            </>
                                        :
                                        <>
                                            {
                                                (
                                                    parseFloat(loan.principal) + 
                                                    parseFloat(loan.interest) +
                                                    parseFloat(loan.penalty_reference) +
                                                    parseFloat(loan.non_deductable_fees_reference)
                                                ).toFixed(2)
                                            }
                                        </>
                                    }
                                </td>
                                <td>{loan.total_amount_paid}</td>
                                <td>
                                    {
                                        (
                                            parseFloat(loan.principal_amount_due) + 
                                            parseFloat(loan.interest_amount_due) +
                                            parseFloat(loan.penalty) +
                                            parseFloat(loan.non_deductable_fees)
                                        ).toFixed(2)
                                    }
                                </td>
                                { loan.status == 'Arrears' &&
                                    <td>{daysInArrears} days</td>
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Loan;

