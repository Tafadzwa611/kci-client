import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function GroupLeft({setGroupLeft, setGroup, groupId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchGroup();
    }

    async function patchGroup() {
        try {
        const response = await makeRequest.patch(`/clientsapi/mark_group_as_left/${groupId}/`, {}, {timeout: 8000});
        if (response.ok) {
            setGroup(curr => ({...curr, approved: true}));
            setGroup(curr => ({...curr, status: 'Left'}));
            setGroupLeft(false);
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
                    <i className="uil uil-sign-out-alt modal_circle_left"></i>
                </div>
                <div className="title">
                    Group Left 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setGroupLeft(false)}>Cancel</button>
                    <button className="btn btn-dark" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default GroupLeft;