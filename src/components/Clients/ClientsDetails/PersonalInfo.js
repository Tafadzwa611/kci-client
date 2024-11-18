import React from 'react';
import { MODAL_STATES } from './data';

function PersonalInfo({client, setModal}) {
  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', marginTop:'1.5rem'}}>
        <div>
          <button className='btn btn-success' onClick={() => setModal(MODAL_STATES.updateInfo)}>Update Personal Details</button>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
        <div>
          <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
            <li>Account Number: {client.client_id}</li>
            <li>Client Type: {client.client_type} <a style={{cursor: 'pointer'}} onClick={() => setModal(MODAL_STATES.changeType)}><small>Change</small></a></li>
            <li>Gender: {client.gender}</li>
            <li>Date of Birth: {client.date_of_birth} <em>({client.age_year} years, {client.age_month} month(s))</em></li>
            <li>Client Registration Date: {client.registration_date}</li>
            <li>Branch: {client.branch}</li>
            <li>Client Officer: {client.client_manager ? client.client_manager : 'None'}</li>
          </ul>
        </div>

        <div>
          <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
            <li>Client Unit: {client.unit ? client.unit : 'Not provided'}</li>
            <li>Phone Number: {client.mobile_number}</li>
            <li>Secondary Phone Number: {client.phone_number_secondary ? client.phone_number_secondary : 'Not provided'}</li>
            <li>Whatsapp Number: {client.whatsapp_number ? client.whatsapp_number : 'Not provided'}</li>
            <li>Whatsapp Banking: {client.whatsapp_banking_active ? 'Active' : 'Not Active'}</li>
            <li>Home Phone: {client.home_phone ? client.home_phone : 'Not provided'}</li>
            <li>Email: {client.email ? client.email : 'Not provided'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo;