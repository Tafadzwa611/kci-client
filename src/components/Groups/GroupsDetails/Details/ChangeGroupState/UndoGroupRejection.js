import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function UndoGroupRejection({setUndoGroupRejection, setGroup, groupId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async () => {
        setLoading(true);
        await patchGroup();
    }

    async function patchGroup() {
        try {
            const response = await makeRequest.patch(`/clientsapi/undo_group_rejection/${groupId}/`, {}, {timeout: 8000});
            if (response.ok) {
                setGroup(curr => ({...curr, approved: false}));
                setGroup(curr => ({...curr, status: 'Pending Approval'}));
                setUndoGroupRejection(false);
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
                    Undo Group Rejection 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setUndoGroupRejection(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default UndoGroupRejection;