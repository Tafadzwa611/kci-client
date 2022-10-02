import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function UndoClientLeft({setUndoClientLeft, setClient, clientId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/clientsapi/undo_mark_as_left/${clientId}/`, {}, {timeout: 8000});
            if (response.ok) {
                setClient(curr => ({...curr, approved: true}));
                setClient(curr => ({...curr, status: 'Inactive'}));
                setUndoClientLeft(false);
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
                    Undo Client Left 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setUndoClientLeft(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default UndoClientLeft;