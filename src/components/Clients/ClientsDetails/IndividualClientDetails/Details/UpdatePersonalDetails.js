import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';

function UpdatePersonalDetails({details, open, setClient, clientId, setOpen}) {
  const [newDetails, setNewDetails] = useState(details);
  const [serverError, setServerError] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    patchClient();
  }

  async function patchClient() {
    try {
      const response = await makeRequest.patch(`/clientsapi/update_client_personal/${clientId}/`, newDetails, {timeout: 6000});
      if (response.ok) {
        const newFullName = newDetails.first_name.charAt(0).toUpperCase() + newDetails.first_name.slice(1) + ' ' + newDetails.last_name.charAt(0).toUpperCase() + newDetails.last_name.slice(1);
        setClient(curr => ({...curr, ...newDetails, fullname: newFullName }));
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

  const newDetailsWithoutEmail = Object.fromEntries(Object.entries(newDetails).filter(([key, value]) => key !== 'email'));
  const disableAdd = Object.values(newDetailsWithoutEmail).findIndex(el => el==='') != -1 || Object.values(errors).findIndex(el => el!=='') != -1;

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none', top: '4rem'}}>
        <div className='modal-dialog modal-lg modal-dialog-scrollable text-light' style={{maxHeight:"calc(100% - 6rem)"}}>
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

const ModalBody = ({details, setDetails, serverError, errors, setErrors}) => {
  const handleChange = (evt) => {
    setDetails(curr => {
      return {...curr, [evt.target.name]: evt.target.value}
    })
    if (evt.target.name in validators) {
      validators[evt.target.name](evt.target.value);
    }else {
      validate(evt);
    }
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

  const validateIdNum = idnum => {
    if (idnum !== '') {
      const re = /^\d{2}-{0,1}\d{6,7}\s{0,1}([a-zA-Z]\d{2})$/;
      if (!re.test(String(idnum).toLowerCase())) {
        setErrors(curr => {
          return {...curr, identification_number: 'ID number is invalid'}
        });
      }else {
        setErrors(curr => {
          return {...curr, identification_number: ''}
        });
      }
    }else {
      setErrors(curr => {
        return {...curr, identification_number: ''}
      });
    }
  }

  const validatePhoneNum = phoneNum => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNum !== '') {
      if (!re.test(String(phoneNum).toLowerCase())) {
        setErrors(curr => {
          return {...curr, phone_number: 'Phone number number is invalid'}
        });
        return 
      }
    }
    setErrors(curr => {
      return {...curr, phone_number: ''}
    })
  }

  const validateEmail = email => {
    if (email !== '') {
      const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        setErrors(curr => {
          return {...curr, email: 'Email is invalid'}
        });
      }else {
        setErrors(curr => {
          return {...curr, email: ''}
        });
      }
    }else {
      setErrors(curr => {
        return {...curr, email: ''}
      });
    }
  }

  const validators = {phone_number: validatePhoneNum, email: validateEmail, identification_number: validateIdNum};

  return (
    <>
      <div className='modal-body'>
        {serverError && <div className='alert alert-danger alert-dismissible'>
          <h4><i className='icon fa fa-ban'></i> Alert!</h4>
            An error occured while updating client information, please try again later.
        </div>}
        <div className='row custom-background'>
          <label className='form-label'>First Name<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='first_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.first_name} required/>
            <p style={{color: 'red'}}>{errors['first_name']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Last Name<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='last_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.last_name} required/>
            <p style={{color: 'red'}}>{errors['last_name']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Identification Number<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='identification_number' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.identification_number} required/>
            <p style={{color: 'red'}}>{errors['identification_number']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Identification Type<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <select name='identification_type' className='custom-select-form' onFocus={validate} onChange={handleChange} value={details.identification_type} required>
              <option value=''></option>
              <option value='ID'>National ID Card</option>
              <option value='Passport'>Passport</option>
              <option value='Licence'>Licence</option>
              <option value='Other'>Other</option>
            </select>
            <p style={{color: 'red'}}>{errors['identification_type']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Gender<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <select name='gender' className='custom-select-form' onFocus={validate} onChange={handleChange} value={details.gender} required>
              <option value=''></option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
            </select>
            <p style={{color: 'red'}}>{errors['gender']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Date of Birth<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='date_of_birth' type='date' className='custom-select-form' onFocus={validate} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} value={details.date_of_birth} required/>
            <p style={{color: 'red'}}>{errors['date_of_birth']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Client Registration Date<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='registration_date' type='date' className='custom-select-form' onFocus={validate} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} value={details.registration_date} required/>
            <p style={{color: 'red'}}>{errors['registration_date']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Phone Number<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='phone_number' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.phone_number} required/>
            <p style={{color: 'red'}}>{errors['phone_number']}</p>
          </div>
        </div>

        <div className='row custom-background'>
          <label className='form-label'>Email<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='email' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={details.email || ''} required/>
            <p style={{color: 'red'}}>{errors['email']}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePersonalDetails;