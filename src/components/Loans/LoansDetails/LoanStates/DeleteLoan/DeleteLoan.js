import React from 'react';
import { makeRequest } from '../../../../../utils/utils';

const DeleteLoan = ({
    selectedLoanID,
    setOpen,
    setDetails,
    setLoans,
}) => {

    const deleteLoan = async () => {
		const response = await makeRequest.delete(`/loansapi/delete_loan/${selectedLoanID}/`, {timeout:8000});
        if (response.ok){
            setLoans(curr => curr.filter(loan => loan.id != selectedLoanID))
            setOpen(false);
            setDetails(false);
        }
	}

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div>
                    <i className="uil uil-info-circle modal_circle"></i>
                </div>
                <div className="title">
                    Delete Loan
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger"onClick={() => setOpen(false)}>Cancel</button>
                    <button className="btn btn-info" onClick={deleteLoan}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteLoan;