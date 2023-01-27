import React, {useEffect, useState} from 'react';
import LoanInfo from './LoanInfo/LoanInfo';
import LoanRepayments from './LoanRepayments/LoanRepayments';

const MoreLoanDetails = (
    {  
        openMoreLoanDetails, 
        setOpenMoreLoanDetails,
        loan,
        setOpenUndoDisbursement,
        setOpenUndoLoanApproval,
        setOpenApproveLoan,
        setOpenRejectLoan,
        setOpenDeleteLoan
    }) => {

    const [tab, setTab] = useState('loan-details');

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
        <div className={openMoreLoanDetails ? 'modal fade show' : 'modal fade'} style={{display: openMoreLoanDetails ? 'block' : 'none'}}>
            <div className='modal-dialog modal-xl modal-dialog-scrollable' style={{maxWidth:"calc(100% - 3rem)", height:"calc(100% - 7rem)", top:"4rem"}}>
                <div className='modal-content client-details-bg'>
                    <div className='modal-header activities' style={{alignItems:"center"}}>
                        <div style={{display:"flex", alignItems:"center", columnGap:"1rem"}}>
                            <button className={statusClasses[loan.status]}>{loan.status}</button>
                            <span><b>{loan.client}'s</b> Loan Details</span>
                        </div>
                        <div style={{display:"flex", columnGap:"3px"}}>
                            {loan.status == 'Open' && 
                                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", justifyContent:"flex-end"}}>
                                    <button className="btn btn-olive" onClick={(e) => setOpenUndoDisbursement(curr => !curr)}>Undo Disbursement</button>
                                </div>
                            }
                            {loan.status == 'Approved' && 
                                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", justifyContent:"flex-end"}}>
                                    <button className="btn btn-olive" onClick={(e) => setOpenUndoLoanApproval(curr => !curr)}>Undo Approve</button>
                                    <button className="btn btn-olive" >Disburse</button>
                                </div>
                            }
                            {loan.status == 'Processing' && 
                                <div className="client-state-btns" style={{display:"flex", columnGap:"3px", justifyContent:"flex-end"}}>
                                    <button className="btn btn-olive" onClick={(e) => setOpenApproveLoan(curr => !curr)}>Approve</button>
                                    <button className="btn btn-olive" onClick={(e) => setOpenRejectLoan(curr => !curr)}>Reject</button>
                                    <button className="btn btn-olive" >Edit</button>
                                    <button className="btn btn-olive" onClick={(e) => setOpenDeleteLoan(curr => !curr)}>Delete</button>
                                </div>
                            }
                            <button type='button' className='close' onClick={e => setOpenMoreLoanDetails(false)}><span aria-hidden='true'>&times;</span></button>
                        </div>
                    </div>
                    <div className='modal-body'>
                        <div>
                            <div>
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
                                <div className="bloc-tabs">
                                    <button className={tab === "loan-details" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loan-details")}> Loan Info </button>
                                    <button className={tab === "loan-repayments" ? "tabs-client active-tabs" : "tabs-client"} onClick={e=> setTab("loan-repayments")}> Loan Repayments </button>
                                </div>
                                <div className='tab-content font-12 text-light' style={{marginTop:"3rem"}}>
                                    {{
                                        'loan-details': <LoanInfo loan={loan} />,
                                        'loan-repayments': <LoanRepayments loan={loan} />,
                                    }[tab]}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='modal-footer justify-content-between activities'>
                        <button type='button' className='btn btn-default' onClick={e => setOpenMoreLoanDetails(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreLoanDetails;