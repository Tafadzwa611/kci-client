import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function RejectGroup({setRejectGroup, setGroup, groupId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchGroup();
    }

    async function patchGroup() {
        try {
            const response = await makeRequest.patch(`/clientsapi/reject_group/${groupId}/`, {}, {timeout: 8000});
            if (response.ok) {
                setGroup(curr => ({...curr, approved: false}));
                setGroup(curr => ({...curr, status: 'Rejected'}));
                setRejectGroup(false);
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
                    Reject Group 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setRejectGroup(false)}>Cancel</button>
                    <button className="btn btn-danger" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default RejectGroup;