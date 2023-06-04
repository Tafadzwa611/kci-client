import React, { useState } from 'react';
// import { makeRequest } from '../../../../../utils/utils';


function ClientLeft({setClientLeft, setClient, clientId}) {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async () => {
        setLoading(true);
        await patchClient();
    }

    async function patchClient() {
        console.log('ClientLeft');
        // try {
        // const response = await makeRequest.patch(`/clientsapi/mark_as_left/${clientId}/`, {}, {timeout: 8000});
        // if (response.ok) {
        //     setClient(curr => ({...curr, approved: true}));
        //     setClient(curr => ({...curr, status: 'Left'}));
        //     setClientLeft(false);
        // }else {
        //     const error = await response.json();
        //     setErrorMsg(Object.values(error)[0]);
        // }
        // setLoading(false);
        // }catch(error) {
        // console.log(error);
        // }
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div>
                    <i className="uil uil-sign-out-alt modal_circle_left"></i>
                </div>
                <div className="title">
                    Client Left 
                </div>
                <div className="modal-footer">
                    <button className="btn btn-default"onClick={() => setClientLeft(false)}>Cancel</button>
                    <button className="btn btn-dark" onClick={handleSubmit}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default ClientLeft;