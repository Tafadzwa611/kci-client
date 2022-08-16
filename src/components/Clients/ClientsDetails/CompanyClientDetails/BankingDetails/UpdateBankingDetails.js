import React, { useState } from 'react';
import {fetcherWithTimeout} from 'common/es';

function UpdateBankingDetails({details, open, setClient, clientId, setOpen}) {
  const [newDetails, setNewDetails] = useState(details);
  const [serverError, setServerError] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    patchClient();
  }

  async function patchClient() {
    try {
      const response = await fetcherWithTimeout.patch(`/clientsapi/update_client_banking/${clientId}/`, newDetails, {timeout: 6000});
      if (response.ok) {
        setClient(curr => ({...curr, ...newDetails}));
        setOpen(false);
        setServerError(false);
      }else {
        const error = await response.json();
        console.log(error);
        setServerError(true);
      }
    }catch(error) {
      setServerError(true);
    }
  }

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Update Banking Info</h4>
            <button type='button' className='close' onClick={e => setOpen(false)}><span aria-hidden='true'>&times;</span></button>
          </div>
          <ModalBody details={newDetails} errors={errors} setErrors={setErrors} serverError={serverError} setDetails={setNewDetails}/>
          <div className='modal-footer justify-content-between'>
            <button type='button' className='button button-default' onClick={e => setOpen(false)}>Close</button>
            <button type='submit' className='button button-info pull-right submit-btn' onClick={handleSubmit}>
              Update Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ModalBody = ({details, setDetails, serverError, errors}) => {
  const handleChange = (evt) => {
    setDetails(curr => {
      return {...curr, [evt.target.name]: evt.target.value}
    })
  }

  return (
    <>
      <div className='modal-body'>
        {serverError && <div className='alert alert-danger alert-dismissible'>
          <h4><i className='icon fa fa-ban'></i> Alert!</h4>
            An error occured while updating banking information, please try again later.
        </div>}
        <div className='row'>
          <label className='col-sm-3 control-label'>Bank Name</label>
          <div className='col-sm-5'>
            <input name='bank_name' type='text' className='form-control well' autoComplete='new-password' onChange={handleChange} value={details.bank_name||''} required/>
            <p style={{color: 'red'}}>{errors['bank_name']}</p>
          </div>
        </div>

        <div className='row'>
          <label className='col-sm-3 control-label'>Bank Branch</label>
          <div className='col-sm-5'>
            <input name='bank_branch' type='text' className='form-control well' autoComplete='new-password' onChange={handleChange} value={details.bank_branch||''} required/>
            <p style={{color: 'red'}}>{errors['bank_branch']}</p>
          </div>
        </div>

        <div className='row'>
          <label className='col-sm-3 control-label'>Account Number</label>
          <div className='col-sm-5'>
            <input name='account_number' type='text' className='form-control well' onChange={handleChange} value={details.account_number||''} required/>
            <p style={{color: 'red'}}>{errors['account_number']}</p>
          </div>
        </div>

        <div className='row'>
          <label className='col-sm-3 control-label'>Mobile Money Number</label>
          <div className='col-sm-5'>
            <input name='mobile_money_number' type='text' className='form-control well' onChange={handleChange} value={details.mobile_money_number||''} required/>
            <p style={{color: 'red'}}>{errors['mobile_money_number']}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateBankingDetails;