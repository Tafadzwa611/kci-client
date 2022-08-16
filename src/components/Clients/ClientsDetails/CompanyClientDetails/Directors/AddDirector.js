import React, {useState} from 'react';
import {fetcherWithTimeout} from 'common/es';

const initialState = {first_name: '', last_name: '', identification_number: '', phone_number: '', date_of_birth: '', gender: ''};

function AddDirector({open, setOpen, businessId, setDirectors}) {
  const [director, setDirector] = useState(initialState);
  const [serverError, setServerError] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const body = {...director, business_id: businessId};
    try {
      const response = await fetcherWithTimeout.post(`/clientsapi/add_director/`, body, {timeout: 6000});
      if (response.ok) {
        const jsonRes = await response.json();
        setDirectors(curr => [...curr, {...director, id: jsonRes.dir_id}]);
        setDirector(initialState);
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

  const disableAdd = Object.values(director).findIndex(el => el==='') != -1 || Object.values(errors).findIndex(el => el!=='') != -1;

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h4 className='modal-title'>Add New Director</h4>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)}><span aria-hidden='true'>&times;</span></button>
          </div>
          <ModalBody director={director} serverError={serverError} errors={errors} setErrors={setErrors} setDirector={setDirector}/>
          <div className='modal-footer justify-content-between'>
            <button type='button' className='button button-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button
              type='submit'
              className='button button-info pull-right submit-btn'
              style={disableAdd ? {pointerEvents: 'none', opacity: '0.7'} : {}}
              disabled={disableAdd}
              onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ModalBody = ({director, serverError, setDirector, errors, setErrors}) => {
  const handleChange = (evt) => {
    setDirector(curr => {
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

  const validators = {phone_number: validatePhoneNum, identification_number: validateIdNum};

  return (
    <div className='modal-body'>
      {serverError && <div className='alert alert-danger alert-dismissible'>
          <h4><i className='icon fa fa-ban'></i> Alert!</h4>
            An error occured while adding address, please try again later.
        </div>}
      <>
        <div className='row'>
          <label className='col-sm-3 control-label'>First Name<span style={{color: 'red'}}>*</span></label>
          <div className='col-sm-5'>
            <input name='first_name' type='text' className='form-control well' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={director.first_name} required/>
            <p style={{color: 'red'}}>{errors['first_name']}</p>
          </div>
        </div>

        <div className='row'>
          <label className='col-sm-3 control-label'>Last Name<span style={{color: 'red'}}>*</span></label>
          <div className='col-sm-5'>
            <input name='last_name' type='text' className='form-control well' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={director.last_name} required/>
            <p style={{color: 'red'}}>{errors['last_name']}</p>
          </div>
        </div>

        <div className='row'>
          <label className='col-sm-3 control-label'>Gender<span style={{color: 'red'}}>*</span></label>
          <div className='col-sm-5'>
            <select name='gender' className='form-control well' onFocus={validate} onChange={handleChange} value={director.gender} required>
              <option value=''></option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
            </select>
            <p style={{color: 'red'}}>{errors['gender']}</p>
          </div>
        </div>

        <div className='row'>
          <label className='col-sm-3 control-label'>Phone Number<span style={{color: 'red'}}>*</span></label>
          <div className='col-sm-5'>
            <input name='phone_number' type='text' className='form-control well' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={director.phone_number} required/>
            <p style={{color: 'red'}}>{errors['phone_number']}</p>
          </div>
        </div>

        <div className='row'>
          <label className='col-sm-3 control-label'>Identification Number<span style={{color: 'red'}}>*</span></label>
          <div className='col-sm-5'>
            <input name='identification_number' type='text' className='form-control well' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={director.identification_number} required/>
            <p style={{color: 'red'}}>{errors['identification_number']}</p>
          </div>
        </div>

        <div className='row'>
          <label className='col-sm-3 control-label'>Date of Birth</label>
          <div className='col-sm-5'>
            <input name='date_of_birth' type='date' className='form-control well' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={director.date_of_birth} required/>
            <p style={{color: 'red'}}>{errors['date_of_birth']}</p>
          </div>
        </div>
      </>
    </div>
  )
}

export default AddDirector;