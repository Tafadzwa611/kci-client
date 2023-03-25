import React, { useState } from 'react';
import UpdatePersonalDetails from './UpdatePersonalDetails';
// import TransferClient from './TransferClient';

function Details({client, setClient, clientId, branches}) {
  const [open, setOpen] = useState(false);
  const details = Object.fromEntries(Object.entries(client).filter(
    ([key, value]) => ['first_name', 'last_name', 'fullname', 'gender', 'date_of_birth', 'identification_type', 'identification_number', 'registration_date', 'phone_number', 'email'].includes(key)
  ));

  const statusClasses = {
    'Active': 'badge badge-success',
    'Blacklisted': 'badge badge-dark',
    'Processing': 'badge badge-info-lighter',
    'Pending Approval': 'badge badge-info-light',
    'Inactive': 'badge badge-info',
    'Left': 'badge badge-semi-dark',
    'Rejected': 'badge badge-danger',
  }

  return (
    <div>
      <UpdatePersonalDetails details={details} setClient={setClient} open={open} setOpen={setOpen} clientId={clientId}/>
      <div>
        {/* <TransferClient open={openModal} clientId={clientId} setClient={setClient} setOpen={setOpenModal} branches={branches}/> */}
        <div style={{display:'flex'}}>
          <span><b>{client.first_name} {client.last_name}</b> -</span>   
          <span style={{marginLeft:"3px"}}>{client.employer} - {client.job_position}</span>
        </div>

        <div style={{display:'flex', justifyContent:"space-between", marginTop:"1.5rem"}}>
          {client.status == 'Inactive' &&
            <div style={{display:'flex', columnGap:"10px"}}>
                <button className="btn btn-default client__details">Add loan</button>
                <button className="btn btn-default client__details">Transfer Client</button>
            </div>
          }
          <div>
              {client.status == 'Blacklisted' ?
                <button className="btn btn-success" style={{pointerEvents: 'none', opacity: '0.7'}} onClick={(e) => setOpen(curr => !curr)}>Update Personal Details</button>:
                <button className="btn btn-success" onClick={(e) => setOpen(curr => !curr)}>Update Personal Details</button>
              }
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem"}}>

          <div>
            <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
              <li>Account Number: {client.client_id}</li>
              <li>Gender: {client.gender}</li>
              <li>Date of Birth: {convertDate(client.date_of_birth)}</li>
              <li>ID Number: {client.identification_number}</li>
              <li>Client State: <span className={statusClasses[client.status]}>{client.status}</span></li>
            </ul>
          </div>

          <div>
            <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
              <li>Client Registration Date: {convertDate(client.registration_date)}</li>
              <li>Branch: {client.branch}</li>
              <li>Phone Number: {client.phone_number}</li>
              <li>Email: {client.email===null || client.email==='' ? 'No email was provided' : client.email}</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function convertDate(date_str) {
  if (date_str === '' || date_str === null) {
    return date_str
  }
  const temp_date = date_str.split("-");
  return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
}

export default Details;