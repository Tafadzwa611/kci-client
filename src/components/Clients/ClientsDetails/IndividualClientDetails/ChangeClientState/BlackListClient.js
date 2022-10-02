import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';


function BlacklistClient({setClientBlacklist, setClient, clientId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/clientsapi/blacklist_client/${clientId}/`, {}, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                if (json_res.client_has_loans){
                    setClient(curr => ({...curr, approved: true}));
                }else{
                    setClient(curr => ({...curr, approved: false}));
                }
                setClient(curr => ({...curr, status: 'Blacklisted'}));
                setClientBlacklist(false);
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
                    Blacklist Client 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setClientBlacklist(false)}>Cancel</button>
                    <button className="btn btn-dark" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default BlacklistClient;