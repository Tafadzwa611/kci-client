import React, { useState } from 'react';
import UpdatePersonalDetails from './UpdatePersonalDetails';

function PersonalDetailsTable({client, setClient, clientId}) {
  const [openModal, setOpenModal] = useState(false);
  const details = Object.fromEntries(Object.entries(client).filter(
    ([key, value]) => ['first_name', 'last_name', 'fullname', 'gender', 'date_of_birth', 'registration_date', 'identification_type', 'identification_number', 'phone_number', 'email'].includes(key)
  ));

  const toggleModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  }

  return (
    <>
      <div className='col-12' style={{paddingBottom: '40px'}}>
        <a href='#' onClick={toggleModal} className='button button-success float-left' style={{marginRight: '5px'}}> Update Details</a>
      </div>
      <UpdatePersonalDetails details={details} setClient={setClient} open={openModal} setOpen={setOpenModal} clientId={clientId}/>
      <table className='table table-condensed well'>
        <tbody>
          <tr>
            <td><b>Account Number</b></td>
            <td>{client.client_id}</td>
          </tr>
          <tr>
            <td><b>Full Name</b></td>
            <td>{client.fullname}</td>
          </tr>
          <tr>
            <td><b>Gender</b></td>
            <td>{client.gender}</td>
          </tr>
          <tr>
            <td><b>Date of Birth</b></td>
            <td>{convertDate(client.date_of_birth)}</td>
          </tr>
          <tr>
            <td><b>ID Number</b></td>
            <td>{client.identification_number}</td>
          </tr>
          <tr>
            <td><b>Branch</b></td>
            <td>{client.branch}</td>
          </tr>
          <tr>
            <td><b>Phone Number</b></td>
            <td>{client.phone_number}</td>
          </tr>
          <tr>
            <td><b>Email</b></td>
            <td>{client.email===null || client.email==='' ? 'No email was provided' : client.email}</td>
          </tr>
        </tbody>
      </table>
    </>
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

export default PersonalDetailsTable;