import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function UndoClientBlackList({setUndoClientBlacklist, setClient, clientId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/clientsapi/undo_client_blacklist/${clientId}/`, {}, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                if (json_res.client_has_loans){
                    setClient(curr => ({...curr, approved: true}));
                    setClient(curr => ({...curr, status: 'Active'}));
                }else{
                    setClient(curr => ({...curr, approved: false}));
                    setClient(curr => ({...curr, status: 'Pending Approval'}));
                }
                setUndoClientBlacklist(false);
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
                    <i className="uil uil-sync modal_circle_undo_client_rejection"></i>
                </div>
                <div className="title">
                    Undo Client Blacklist 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setUndoClientBlacklist(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default UndoClientBlackList;