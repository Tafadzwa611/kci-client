import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function RejectLoan({setOpen, selectedLoanID, setLoan, loan}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    console.log(loan)
    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/loansapi/reject_loan/${selectedLoanID}/`, {}, {timeout: 8000});
            if (response.ok) {
                // setClient(curr => ({...curr, approved: true}));
                setLoan(curr => ({...curr, status: 'Rejected'}));
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
                    Reject Loan 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setOpen(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default RejectLoan;