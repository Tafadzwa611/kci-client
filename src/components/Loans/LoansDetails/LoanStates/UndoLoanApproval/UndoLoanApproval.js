import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function UndoLoanApproval({setOpen, selectedLoanID, setLoan}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/loansapi/undo_loan_approval/${selectedLoanID}/`, {}, {timeout: 8000});
            if (response.ok) {
                setLoan(curr => ({...curr, status: 'Processing'}));
                setOpen(false);
            }else {
                const error = await response.json();
                setErrorMsg(Object.values(error)[0]);
            }
            setLoading(false);
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div>
                    <i className="uil uil-check-circle modal_circle_approve"></i>
                </div>
                <div className="title">
                    Undo Approval 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setOpen(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default UndoLoanApproval;