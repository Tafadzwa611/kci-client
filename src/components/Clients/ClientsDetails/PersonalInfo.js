import React from 'react';
import { MODAL_STATES } from './data';

const statusClasses = {
  'Active': 'badge badge-success',
  'Blacklisted': 'badge badge-dark',
  'Processing': 'badge badge-info-lighter',
  'Pending Approval': 'badge badge-info-light',
  'Inactive': 'badge badge-info',
  'Left': 'badge badge-semi-dark',
  'Rejected': 'badge badge-danger',
}

function PersonalInfo({client, setModal}) {
  return (
    <div>
      <div style={{display:'flex'}}>
        <span><b>{client.first_name} {client.last_name}</b></span>
      </div>

      <div style={{display:'flex', justifyContent:'space-between', marginTop:'1.5rem'}}>
        {client.status == 'Inactive' &&
          <div style={{display:'flex', columnGap:'10px'}}>
              <button className='btn btn-default client__details'>Add loan</button>
              <button className='btn btn-default client__details'>Transfer Client</button>
          </div>}
        <div>
          <button className='btn btn-success' onClick={() => setModal(MODAL_STATES.updateInfo)}>Update Personal Details</button>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
        <div>
          <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
            <li>Client State: <span className={statusClasses[client.status]}>{client.status}</span></li>
            <li>Account Number: {client.client_id}</li>
            <li>Client Type: {client.client_type} <a style={{cursor: 'pointer'}} onClick={() => setModal(MODAL_STATES.changeType)}><small>Change</small></a></li>
            <li>Gender: {client.gender}</li>
            <li>Date of Birth: {client.date_of_birth}</li>
            <li>Client Registration Date: {client.registration_date}</li>
            <li>Branch: {client.branch}</li>
          </ul>
        </div>

        <div>
          <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
            <li>Phone Number: {client.mobile_number}</li>
            <li>Secondary Phone Number: {client.phone_number_secondary ? client.phone_number_secondary : 'Not provided'}</li>
            <li>Whatsapp Number: {client.whatsapp_number ? client.whatsapp_number : 'Not provided'}</li>
            <li>Home Phone: {client.home_phone ? client.home_phone : 'Not provided'}</li>
            <li>Email: {client.email ? client.email : 'Not provided'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo;