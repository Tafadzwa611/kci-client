import React, { useState } from 'react';
// import UpdatePersonalDetails from './UpdatePersonalDetails';
// import TransferClient from './TransferClient';

function Details({group, setGroup, groupId, branches}) {
  const [open, setOpen] = useState(false);
//   const details = Object.fromEntries(Object.entries(client).filter(
//     ([key, value]) => ['first_name', 'last_name', 'fullname', 'gender', 'date_of_birth', 'identification_type', 'identification_number', 'registration_date', 'phone_number', 'email'].includes(key)
//   ));

  return (
    <div>
      {/* <UpdatePersonalDetails details={details} setGroup={setGroup} open={open} setOpen={setOpen} groupId={groupId}/> */}
      <div>
        {/* <TransferClient open={openModal} groupId={groupId} setGroup={setGroup} setOpen={setOpenModal} branches={branches}/> */}
        <div style={{display:'flex'}}>
          <span><b>{group.group_name}</b></span>   
        </div>

        <div style={{display:'flex', justifyContent:"space-between", marginTop:"1.5rem"}}>
          {group.status == 'Inactive' &&
            <div style={{display:'flex', columnGap:"10px"}}>
                <button className="btn btn-default client__details">Add loan</button>
                <button className="btn btn-default client__details">Transfer Group</button>
            </div>
          }
          <div>
              {group.status == 'Blacklisted' ?
                <button className="btn btn-success" style={{pointerEvents: 'none', opacity: '0.7'}} onClick={(e) => setOpen(curr => !curr)}>Update Personal Details</button>:
                <button className="btn btn-success" onClick={(e) => setOpen(curr => !curr)}>Update Personal Details</button>
              }
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem"}}>

          <div>
            <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
              <li>Account Number: {group.group_id}</li>
              <li>Group Date: {convertDate(group.group_date)}</li>
              <li>Group Phone Number: {group.group_phone_number}</li>
              <li>Branch: {group.branch}</li>
              <li>Group State: {group.status}</li>
            </ul>
          </div>

          <div>
            <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
              <li>Group Type: {group.group_type}</li>
              <li>Group Bank: {group.group_bank_name}</li>
              <li>Group Account: {group.group_account_number}</li>
              <li>Group Address: {group.address}</li>
              <li>Group Officer: {group.group_officer}</li>
              {/* <li>Email: {client.email===null || client.email==='' ? 'No email was provided' : client.email}</li> */}
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