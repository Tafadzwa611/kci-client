import React from 'react';

function PersonalInfo({app}) {
  return (
    <div>
      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
        <div>
          <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
            <li>Client Type: {app.client_type}</li>
            <li>Gender: {app.gender}</li>
            <li>Date of Birth: {app.date_of_birth} <em>({app.age_year} years, {app.age_month} month(s))</em></li>
            <li>Branch: {app.branch}</li>
          </ul>
        </div>

        <div>
          <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
            <li>Phone Number: {app.mobile_number}</li>
            <li>Secondary Phone Number: {app.phone_number_secondary ? app.phone_number_secondary : 'Not provided'}</li>
            <li>Whatsapp Number: {app.whatsapp_number ? app.whatsapp_number : 'Not provided'}</li>
            <li>Home Phone: {app.home_phone ? app.home_phone : 'Not provided'}</li>
            <li>Email: {app.email ? app.email : 'Not provided'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo;