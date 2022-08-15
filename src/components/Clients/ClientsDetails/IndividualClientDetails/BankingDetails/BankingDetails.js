import React, { useState } from 'react';
import UpdateBankingDetails from './UpdateBankingDetails';

function BankingDetails({client, setClient, clientId}) {
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
                    >Update Banking Details
                </button>
            </div>
            <UpdateBankingDetails details={client} setClient={setClient} open={openModal} setOpen={setOpenModal} clientId={clientId}/>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem"}}>
                <div>
                    <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                        <li>Bank Name: {client.bank_name === null || client.bank_name==='' ? 'Bank Name was not provided' : client.bank_name}</li>
                        <li>Account Number: {client.account_number === null || client.account_number === '' ? 'Account Number was not provided' : client.account_number}</li>
                    </ul>
                </div>
                <div>
                    <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                        <li>Bank Branch: {client.bank_branch === null || client.bank_branch === '' ? 'Bank Branch was not provided' : client.bank_branch}</li>
                        <li>Mobile Money Number: {client.mobile_money_number === null || client.mobile_money_number === '' ? 'Mobile Money Number was not provided' : client.mobile_money_number}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}

export default BankingDetails;