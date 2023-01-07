import React, {useState, useEffect} from 'react';
import SendSms from './SendSms';
import { makeRequest } from '../../../utils/utils';

function SmsList() {
    const [clients, setClients] = useState([]);
    const [initing, setIniting] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        async function init() {
            await fetchClients();
            setIniting(false);
        }
        init();
    }, []);

    async function fetchClients() {
        try {
            const response = await makeRequest.get('/clientsapi/getclients/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                setClients([...data.map(client => ({label: client.fullname, value: client.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    const showModal = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }

    if (initing) {
        return <div>Loading...</div>
    }

    return (
        <>
            <SendSms
                open={openModal}
                setOpen={setOpenModal}
                clients={clients}
            />
            <div style={{paddingBottom: '40px'}}>
                <a href='#' onClick={showModal} className='btn btn-success'>Send Sms</a>
            </div>
        </>
    )
}

export default SmsList;