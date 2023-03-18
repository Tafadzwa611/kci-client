import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function UndoGroupApproval({setUndoGroupApproval, setGroup, groupId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/clientsapi/undo_group_approval/${groupId}/`, {}, {timeout: 8000});
            if (response.ok) {
                setGroup(curr => ({...curr, approved: false}));
                setGroup(curr => ({...curr, status: 'Pending Approval'}));
                setUndoGroupApproval(false);
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
                    <i className="uil uil-history-alt modal_circle_left"></i>
                </div>
                <div className="title">
                    Undo Approve Group 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setUndoGroupApproval(false)}>Cancel</button>
                    <button className="btn btn-dark" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default UndoGroupApproval;