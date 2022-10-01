import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function ApproveClient({setOpenApproveClient, setClient, clientId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        try {
        const response = await makeRequest.patch(`/clientsapi/approve_client/${clientId}/`, {}, {timeout: 8000});
        if (response.ok) {
            setClient(curr => ({...curr, approved: true}));
            setClient(curr => ({...curr, status: 'Inactive'}));
            setOpenApproveClient(false);
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
                    Approve Client 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                    <button className="btn btn-default"onClick={() => setOpenApproveClient(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ApproveClient;