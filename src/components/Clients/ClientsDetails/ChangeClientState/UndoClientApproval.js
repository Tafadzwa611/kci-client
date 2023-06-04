import React, { useState } from 'react';


function UndoClientApproval({setUndoClientApproval, setClient, clientId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        console.log('UndoClientApproval');
        // try {
        //     const response = await makeRequest.patch(`/clientsapi/undo_client_approval/${clientId}/`, {}, {timeout: 8000});
        //     if (response.ok) {
        //         setClient(curr => ({...curr, approved: false}));
        //         setClient(curr => ({...curr, status: 'Pending Approval'}));
        //         setUndoClientApproval(false);
        //     }else {
        //         const error = await response.json();
        //         setErrorMsg(Object.values(error)[0]);
        //     }
        //     setLoading(false);
        // }catch(error) {
        //     console.log(error);
        // }
    }


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div>
                    <i className="uil uil-history-alt modal_circle_left"></i>
                </div>
                <div className="title">
                    Undo Approve Client 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setUndoClientApproval(false)}>Cancel</button>
                    <button className="btn btn-dark" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default UndoClientApproval;