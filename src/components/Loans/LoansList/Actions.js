import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ApproveLoan from './ApproveLoan';
import UndoLoanApproval from './UndoLoanApproval';
import DeleteLoan from './DeleteLoan';
import RejectLoan from './RejectLoan';
import DisburseLoan from './DisburseLoan';
import UndoDisbursement from './UndoDisbursement';
import AddPayment from './AddPayment';
import AddFee from './AddFee';
import WriteOff from './WriteOff';
import UndoWriteOff from './UndoWriteOff';
import TopUp from './TopUp';

const MODAL_STATES = {
  approve: 'approve',
  reject: 'reject',
  deleteLoan: 'deleteLoan',
  disburse: 'disburse',
  undoDisburse: 'undoDisburse',
  undoApproval: 'undoApproval',
  addPayment: 'addPayment',
  addFee: 'addFee',
  writeOff: 'writeOff',
  undoWriteOff: 'undoWriteOff',
  topup: 'topup',
  none: false
};

const Actions = ({loan, setLoanDetails, loanType, setLoanId, setLoanData}) => {
  const {
    approve,
    reject,
    deleteLoan,
    disburse,
    undoDisburse,
    undoApproval,
    addPayment,
    addFee,
    writeOff,
    undoWriteOff,
    topup,
    none
  } = MODAL_STATES;
  const [modal, setModal] = useState(none);
  
  if (loan.status == 'Processing') {
    const approveUrl = loanType === 'cli' ? `/loansapi/approve_loan/${loan.id}/` : `/loansapi/approve_sloan/${loan.id}/`;
    const rejectUrl = loanType === 'cli' ? `/loansapi/reject_loan/${loan.id}/` : `/loansapi/reject_sloan/${loan.id}/`;
    const deleteUrl = loanType === 'cli' ? `/loansapi/delete_loan/${loan.id}/` : `/loansapi/delete_sloan/${loan.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {modal === approve && <ApproveLoan
          setOpen={setModal}
          updateLoanList={updateLoanList}
          url={approveUrl}
          setLoanDetails={setLoanDetails}
          setLoanData={setLoanData}
        />}
        {modal === reject && <RejectLoan setOpen={setModal} url={rejectUrl} setLoanDetails={setLoanDetails} updateLoanList={updateLoanList} setLoanData={setLoanData}/>}
        {modal === deleteLoan && <DeleteLoan
          loanId={loan.id}
          setOpen={setModal}
          url={deleteUrl}
          setLoanDetails={setLoanDetails}
          setLoanId={setLoanId}
          setLoanData={setLoanData}
        />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setModal(approve)}>Approve</button>
          <button className='btn btn-olive' onClick={() => setModal(reject)}>Reject</button>
          <button className='btn btn-olive'>
            <Link to={`/loans/viewloans/editloan/${loanType}/${loan.id}`}>Edit</Link>
          </button>
          <button className='btn btn-olive' onClick={() => setModal(deleteLoan)}>Delete</button>
        </div>
      </div>
    )
  } else if (loan.status == 'Approved') {
    const undoApprovalUrl = loanType === 'cli' ? `/loansapi/undo_loan_approval/${loan.id}/` : `/loansapi/undo_sloan_approval/${loan.id}/`;
    const disburseUrl = loanType === 'cli' ? `/loansapi/disburse_loan/${loan.id}/` : `/loansapi/disburse_sloan/${loan.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {modal === undoApproval && <UndoLoanApproval
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
          setOpen={setModal}
          url={undoApprovalUrl}
          setLoanDetails={setLoanDetails}
        />}
        {modal === disburse && <DisburseLoan
          setOpen={setModal}
          loan={loan}
          url={disburseUrl}
          setLoanDetails={setLoanDetails}
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
        />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setModal(undoApproval)}>Undo Approve</button>
          <button className='btn btn-olive' onClick={() => setModal(disburse)}>Disburse</button>
        </div>
      </div>
    )
  }else if (loan.status == 'Rejected') {
    const deleteUrl = loanType === 'cli' ? `/loansapi/delete_loan/${loan.id}/` : `/loansapi/delete_sloan/${loan.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {modal === deleteLoan && <DeleteLoan
          loanId={loan.id}
          setOpen={setModal}
          url={deleteUrl}
          setLoanDetails={setLoanDetails}
          setLoanId={setLoanId}
          setLoanData={setLoanData}
        />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setModal(deleteLoan)}>Delete</button>
        </div>
      </div>
    )
  }else {
    const undoDisburseUrl = loanType === 'cli' ? `/loansapi/undo_loan_disbursement/${loan.id}/` : `/loansapi/undo_sloan_disbursement/${loan.id}/`;
    return (
      <div style={{display:'flex', columnGap:'3px'}}>
        {modal === addPayment &&
        <AddPayment
          setOpen={setModal}
          loanId={loan.id}
          setLoan={setLoanDetails}
          currencyId={loan.currency_id}
          subLoans={loan.sub_loans_list}
          clientType={loan.client_type}
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
        />}
        {modal === addFee &&
        <AddFee
          setOpen={setModal}
          loanId={loan.id}
          setLoan={setLoanDetails}
          clientType={loan.client_type}
          subLoans={loan.sub_loans_list}
          manualFees={loan.manual_fees}
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
        />}
        {modal === writeOff &&
        <WriteOff
          loanId={loan.id}
          setOpen={setModal}
          setLoan={setLoanDetails}
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
        />}
        {modal === undoWriteOff &&
        <UndoWriteOff
          loanId={loan.id}
          setOpen={setModal}
          setLoan={setLoanDetails}
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
        />}
        {modal === undoDisburse && <UndoDisbursement
          setOpen={setModal}
          url={undoDisburseUrl}
          setLoanDetails={setLoanDetails}
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
        />}
        {modal === topup && <TopUp
          setOpen={setModal}
          loan={loan}
          setLoanDetails={setLoanDetails}
          updateLoanList={updateLoanList}
          setLoanData={setLoanData}
        />}
        <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
          <button className='btn btn-olive' onClick={() => setModal(addPayment)}>Add Payment</button>
          <button className='btn btn-olive' onClick={() => setModal(addFee)}>Add Fee</button>
          <button className='btn btn-olive' onClick={() => setModal(topup)}>Top-Up</button>
          {loan.status == 'Written-Off' ?
          <button className='btn btn-olive' onClick={() => setModal(undoWriteOff)}>Undo Write Off</button> :
          <button className='btn btn-olive' onClick={() => setModal(writeOff)}>Write Off</button>}
          <button className='btn btn-olive' onClick={() => setModal(undoDisburse)}>Undo Disbursement</button>
        </div>
      </div>
    )
  }
}


const updateLoanList = (newLoan, setLoanData) => {
  setLoanData(curr => {
    return {
      ...curr,
      loans: curr.loans.map(loan => {
        if (loan.id === newLoan.id) {
          return {
            ...loan,
            total_amount_paid: newLoan.total_amount_paid,
            principal_amount_due: newLoan.principal_amount_due,
            interest_amount_due: newLoan.interest_amount_due,
            penalty: newLoan.penalty,
            non_deductable_fees: newLoan.non_deductable_fees,
            status: newLoan.status,
            total_loan_penalty: newLoan.penalty_reference_settlement || newLoan.penalty_reference,
            total_loan_non_deduc_fees: newLoan.non_deductable_fees_reference_settlement || newLoan.non_deductable_fees_reference,
            db_date: newLoan.db_date
          }
        }
        return loan
      })
    }
  })
}

export default Actions;