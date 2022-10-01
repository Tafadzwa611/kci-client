import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function RejectClient({setRejectClient, setClient, clientId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/clientsapi/reject_client/${clientId}/`, {}, {timeout: 8000});
            if (response.ok) {
                setClient(curr => ({...curr, approved: false}));
                setClient(curr => ({...curr, status: 'Rejected'}));
                setRejectClient(false);
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
                    <i className="uil uil-times-circle modal_circle_reject"></i>
                </div>
                <div className="title">
                    Reject Client 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger" onClick={handleSubmit}>Continue</button>
                    <button className="btn btn-default"onClick={() => setRejectClient(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default RejectClient;