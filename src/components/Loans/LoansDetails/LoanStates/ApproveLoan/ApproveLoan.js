// import React, { useState } from 'react';
// import { makeRequest } from '../../../../../utils/utils';


// function ApproveLoan({setOpenApproveLoan, setLoan, loanId}) {
//     const [loading, setLoading] = useState(false);
//     const [errorMsg, setErrorMsg] = useState('');

//     const handleSubmit = async () => {
//         setLoading(true);
//         await patchLoan();
//     }

//     async function patchLoan() {
//         try {
//             const response = await makeRequest.patch(`/loansapi/approve_loan/${loanId}/`, {}, {timeout: 8000});
//             if (response.ok) {
//                 setLoan(curr => ({...curr, status: 'Approved'}));
//                 setOpenApproveLoan(false);
//             }else {
//                 const error = await response.json();
//                 setErrorMsg(Object.values(error)[0]);
//             }
//             setLoading(false);
//         }catch(error) {
//             console.log(error);
//         }
//     }

//     return (
//         <div className="modalBackground">
//             <div className="modalContainer">
//                 <div>
//                     <i className="uil uil-check-circle modal_circle_approve"></i>
//                 </div>
//                 <div className="title">
//                     Approve Loan 
//                 </div>
//                 <div className="modal-footer">
//                     <button className="btn btn-default"onClick={() => setOpenApproveLoan(false)}>Cancel</button>
//                     <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ApproveLoan;

import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function ApproveLoan({setOpenApproveLoan, selectedLoanID}) {


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div>
                    <i className="uil uil-check-circle modal_circle_approve"></i>
                </div>
                <div className="title">
                    Approve Loan 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setOpenApproveLoan(false)}>Cancel</button>
                    <button className="btn btn-success">Continue</button>
                </div>
            </div>
        </div>
    )
}

export default ApproveLoan;