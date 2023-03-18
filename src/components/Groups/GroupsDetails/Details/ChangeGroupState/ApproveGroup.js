import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function ApproveGroup({setOpenApproveGroup, setGroup, groupId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchGroup();
    }

    async function patchGroup() {
        try {
        const response = await makeRequest.patch(`/clientsapi/approve_group/${groupId}/`, {}, {timeout: 8000});
        if (response.ok) {
            setGroup(curr => ({...curr, approved: true}));
            setGroup(curr => ({...curr, status: 'Inactive'}));
            setOpenApproveGroup(false);
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
                    Approve Group 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setOpenApproveGroup(false)}>Cancel</button>
                    <button className="btn btn-success" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default ApproveGroup;