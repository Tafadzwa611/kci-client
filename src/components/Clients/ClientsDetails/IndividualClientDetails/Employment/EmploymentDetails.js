import React, { useState } from 'react';
import UpdateEmployment from './UpdateEmployment';

function EmploymentDetails({client, setClient, clientId}) {
    const [openModal, setOpenModal] = useState(false);

    const toggleModal = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }

    return (
        <div className='active tab-pane'>
            <div className='post'>
                <div style={{marginBottom:"1.5rem"}}>
                    <button type='button' className='btn btn-success' onClick={toggleModal}
                        >Update Employment Details
                    </button>
                </div>
                <UpdateEmployment details={client} setClient={setClient} open={openModal} setOpen={setOpenModal} clientId={clientId}/>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem"}}>
                    <div>
                        <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                            <li>Employer: {client.employer === null || client.employer==='' ? 'Employer was not provided' : client.employer}</li>
                            <li>Ec Number: {client.ec_number === null || client.ec_number === '' ? 'Ec Number was not provided' : client.ec_number}</li>
                            <li>Work Address: {client.work_address === null || client.work_address === '' ? 'Work Address was not provided' : client.work_address}</li>
                        </ul>
                    </div>
                    <div>
                        <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                            <li>Type Of Employer: {client.type_of_employer === null || client.type_of_employer === '' ? 'Employer type was not provided' : client.type_of_employer}</li>
                            <li>Ec Number: {client.ec_number === null || client.ec_number === '' ? 'Ec Number was not provided' : client.ec_number}</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EmploymentDetails