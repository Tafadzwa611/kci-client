
import React, { useState } from 'react';
import UpdateBankingDetails from './UpdateBankingDetails';

function BankingDetails({client, setClient, clientId}) {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  }

  return (
    <>
      <div className='active tab-pane'>
        <div className='post'>
          <div className='col-12' style={{paddingTop: '10px', paddingBottom: '40px'}}>
            <a href='#' onClick={toggleModal} className='button button-success float-left' style={{marginRight: '5px'}}>Update Banking Details</a>
          </div>
          <UpdateBankingDetails details={client} setClient={setClient} open={openModal} setOpen={setOpenModal} clientId={clientId}/>
          <table className='table table-condensed well'>
            <tbody>
              <tr>
                <td><b>Bank Name</b></td>
                <td>{client.bank_name || 'Bank Name was not provided'}</td>
              </tr>
              <tr>
                <td><b>Bank Branch</b></td>
                <td>{client.bank_branch || 'Bank Branch was not provided'}</td>
              </tr>
              <tr>
                <td><b>Account Number</b></td>
                <td>{client.account_number || 'Account Number was not provided'}</td>
              </tr>
              <tr>
                <td><b>Mobile Money Number</b></td>
                <td>{client.mobile_money_number || 'Mobile Money Number was not provided'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default BankingDetails;