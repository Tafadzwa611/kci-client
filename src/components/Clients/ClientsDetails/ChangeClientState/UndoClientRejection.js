import React, { useState } from 'react';


function UndoClientRejection({setUndoClientRejection, setClient, clientId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        console.log('UndoClientRejection');
        // try {
        //     const response = await makeRequest.patch(`/clientsapi/undo_client_rejection/${clientId}/`, {}, {timeout: 8000});
        //     if (response.ok) {
        //         setClient(curr => ({...curr, approved: false}));
        //         setClient(curr => ({...curr, status: 'Pending Approval'}));
        //         setUndoClientRejection(false);
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
                    <i className="uil uil-sync modal_circle_undo_client_rejection"></i>
                </div>
                <div className="title">
                    Undo Client Rejection 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setUndoClientRejection(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default UndoClientRejection;