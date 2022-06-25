import React from 'react';

function ClientInformation({clientInfo, setClientInfo, clientErrors, setClientErrors, setTab}) {
  const handleChange = (evt) => {
    setClientInfo(curr => {
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
      setClientErrors(curr => {
        return {...curr, [evt.target.name]: 'This field is required'}
      })
    }else {
      setClientErrors(curr => {
        return {...curr, [evt.target.name]: ''}
      })
    }
  }

  const validateEmail = email => {
    if (email !== '') {
      const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(email).toLowerCase())) {
        setClientErrors(curr => {
          return {...curr, email: 'Email is invalid'}
        });
      }else {
        setClientErrors(curr => {
          return {...curr, email: ''}
        });
      }
    }else {
      setClientErrors(curr => {
        return {...curr, email: ''}
      });
    }
  };

  const validateIdNum = idnum => {
    if (idnum !== '') {
      const re = /^\d{2}-{0,1}\d{6,7}\s{0,1}([a-zA-Z]\d{2})$/;
      if (!re.test(String(idnum).toLowerCase())) {
        setClientErrors(curr => {
          return {...curr, identification_number: 'ID number is invalid'}
        });
      }else {
        setClientErrors(curr => {
          return {...curr, identification_number: ''}
        });
      }
    }else {
      setClientErrors(curr => {
        return {...curr, identification_number: ''}
      });
    }
  }

  const validatePhoneNum = phoneNum => {
    const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phoneNum !== '') {
      if (!re.test(String(phoneNum).toLowerCase())) {
        setClientErrors(curr => {
          return {...curr, phone_number: 'Phone number number is invalid'}
        });
        return 
      }
    }
    setClientErrors(curr => {
      return {...curr, phone_number: ''}
    })
  }

  const validators = {phone_number: validatePhoneNum, email: validateEmail, identification_number: validateIdNum};

  return (
    <>
      <div className='card-body text-light'>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>First Name</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='first_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={clientInfo.first_name} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['first_name']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Last Name</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='last_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={clientInfo.last_name} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['last_name']}</p>
          </div>
        </div>

        <div className='row' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Gender</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <select name='gender' className='custom-select-form' onFocus={validate} onChange={handleChange} value={clientInfo.gender} required>
              <option value=''></option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
            </select>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['gender']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Date Of Birth</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='date_of_birth' type='date' className='custom-select-form' onFocus={validate} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} value={clientInfo.date_of_birth} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['date_of_birth']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Client Registration Date</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='registration_date' type='date' className='custom-select-form' onFocus={validate} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} value={clientInfo.registration_date} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['registration_date']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Phone Number</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='phone_number' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={clientInfo.phone_number} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['phone_number']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Identification Number</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='identification_number' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={clientInfo.identification_number} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['identification_number']}</p>
          </div>
        </div>

        <div className='row' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Identification Type</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <select name='identification_type' className='custom-select-form' onFocus={validate} onChange={handleChange} value={clientInfo.identification_type} required>
              <option value=''></option>
              <option value='ID'>National ID Card</option>
              <option value='Passport'>Passport</option>
              <option value='Licence'>Licence</option>
              <option value='Other'>Other</option>
            </select>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['identification_type']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Email</b></label>
          <div className='col-8'>
            <input data-format='' name='email' type='text' className='custom-select-form' autoComplete='new-password' onBlur={e => validateEmail(e.target.value)} onChange={handleChange} value={clientInfo.email}/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{clientErrors['email']}</p>
          </div>
        </div>
        <p><label className='form-label' style={{fontSize:"0.8125rem"}}><span style={{color: 'red'}}>*</span>Required field</label></p>
      </div>
      <div className="load-more-container">
        <button onClick={e => setTab('new')} type='button' className='btn btn-default'>Back</button>
        <button onClick={e => setTab('addr')} type='button' className='btn btn-info'>Next</button>
      </div>
    </>
  )
}

export default ClientInformation;