import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function BlacklistGroup({setGroupBlacklist, setGroup, groupId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchGroup();
    }

    async function patchGroup() {
        try {
            const response = await makeRequest.patch(`/clientsapi/blacklist_group/${groupId}/`, {}, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                if (json_res.old_status == 'Active' || json_res.old_status == 'Inactive'){
                    setGroup(curr => ({...curr, approved: true}));
                }
                else
                {
                    setGroup(curr => ({...curr, approved: false}));
                }
                setGroup(curr => ({...curr, status: 'Blacklisted'}));
                setGroupBlacklist(false);
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
                    <i className="uil uil-times-circle modal_circle_left"></i>
                </div>
                <div className="title">
                    Blacklist Group 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setGroupBlacklist(false)}>Cancel</button>
                    <button className="btn btn-dark" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default BlacklistGroup;