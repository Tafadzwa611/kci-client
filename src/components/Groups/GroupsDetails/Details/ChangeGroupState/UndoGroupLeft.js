import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function UndoGroupLeft({setUndoGroupLeft, setGroup, groupId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async () => {
        setLoading(true);
        await patchGroup();
    }

    async function patchGroup() {
        try {
            const response = await makeRequest.patch(`/clientsapi/undo_group_left/${groupId}/`, {}, {timeout: 8000});
            if (response.ok) {
                setGroup(curr => ({...curr, approved: true}));
                setGroup(curr => ({...curr, status: 'Inactive'}));
                setUndoGroupLeft(false);
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
                    Undo Group Left 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setUndoGroupLeft(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default UndoGroupLeft;