
import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';

function UpdateBusinessInfo({details, open, setBusiness, setOpen}) {
  const [newDetails, setNewDetails] = useState(details);
  const [serverError, setServerError] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    put();
  }

  async function put() {
    try {
      const response = await makeRequest.put(`/clientsapi/update_business/${details.id}/`, newDetails, {timeout: 8000});
      if (response.ok) {
        setBusiness(curr => ({...curr, ...newDetails}));
        setOpen(false);
        setServerError(false);
      }else {
        const error = await response.json();
        console.log(error);
        setServerError(true);
      }
    }catch(error) {
      console.log(error);
      setServerError(true);
    }
  }

  const disableAdd = Object.values(errors).findIndex(el => el!=='') != -1;

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable text-light'>
          <div className='modal-content'>

            <div className='modal-header'>
                <label className="form-title">[ Update Personal Info ]</label>
                <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
            </div>

            <div className='modal-body'>
              <ModalBody details={newDetails} errors={errors} setErrors={setErrors} serverError={serverError} setDetails={setNewDetails}/>
            </div>

            <div className='modal-footer justify-content-between'>
                <button type='button' className='btn btn-default' onClick={e => setOpen(false)}>Close</button>
                <button type='submit' className='btn btn-info' style={disableAdd ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableAdd} onClick={handleSubmit}>
                    Update Info
                </button>
            </div>

          </div>
      </div>
    </div>
  )
}

const ModalBody = ({details, setDetails, serverError, setErrors, errors}) => {
  const handleChange = (evt) => {
    setDetails(curr => {
      return {...curr, [evt.target.name]: evt.target.value}
    })
    validate(evt);
  }

  const validate = (evt) => {
    if (evt.target.required && evt.target.value === '') {
      setErrors(curr => {
        return {...curr, [evt.target.name]: 'This field is required'}
      })
    }else {
      setErrors(curr => {
        return {...curr, [evt.target.name]: ''}
      })
    }
  }

  return (
    <>
      <div className='modal-body'>
        {serverError && <div className='alert alert-danger alert-dismissible'>
          <h4><i className='icon fa fa-ban'></i> Alert!</h4>
            An error occured while updating client information, please try again later.
        </div>}
        <div className='row custom-background'>
          <label className='form-label'>Business Name<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.name} required/>
            <p style={{color: 'red'}}>{errors['name']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Business Type<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='business_type' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.business_type} required/>
            <p style={{color: 'red'}}>{errors['business_type']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Business Start Date<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='business_start_date' type='date' className='custom-select-form' onFocus={validate} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} value={details.business_start_date} required/>
            <p style={{color: 'red'}}>{errors['business_start_date']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Physical Address<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='address' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.address} required/>
            <p style={{color: 'red'}}>{errors['address']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>City/Town<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='city' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.city} required/>
            <p style={{color: 'red'}}>{errors['city']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Country<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='country' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.country} required/>
            <p style={{color: 'red'}}>{errors['country']}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateBusinessInfo;