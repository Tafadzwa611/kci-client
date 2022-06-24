
import React, { useState } from 'react';

const initialState = {first_name: '', last_name: '', identification_number: '', phone_number: '', gender: '', date_of_birth: ''};

function AddDir({open, setOpen, setDirList}) {
  const [dir, setDir] = useState(initialState);

  const handleSubmit = () => {
    setDirList(curr => [...curr, {...dir, id: uuidv4()}]);
    setDir(initialState);
  }

  const disableAdd = Object.values(dir).findIndex(el => el==='') != -1;

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Add Director ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)}><span aria-hidden='true'>&times;</span></button>
          </div>
          <ModalBody dir={dir} setDir={setDir}/>
          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button type='submit' className='btn btn-info' style={disableAdd ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableAdd} onClick={handleSubmit}>
              Add Director
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ModalBody = ({dir, setDir}) => {
  const [errors, setErrors] = useState({});
  const handleChange = (evt) => {
    setDir(curr => {
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
      <>
        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'>First Name<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='first_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={dir.first_name} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{errors['first_name']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'>Last Name<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='last_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={dir.last_name} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{errors['last_name']}</p>
          </div>
        </div>

        <div className='row' style={{marginTop: '15px'}}>
          <label className='form-label'>Gender<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <select name='gender' className='custom-select-form' onFocus={validate} onChange={handleChange} value={dir.gender} required>
              <option value=''></option>
              <option value='MALE'>Male</option>
              <option value='FEMALE'>Female</option>
            </select>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{errors['gender']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'>Phone Number<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='phone_number' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={dir.phone_number} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{errors['phone_number']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'>Identification Number<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='identification_number' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={dir.identification_number} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{errors['identification_number']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'>Date of Birth<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='date_of_birth' type='date' className='custom-select-form' onFocus={validate} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} value={dir.date_of_birth} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{errors['date_of_birth']}</p>
          </div>
        </div>
      </>
    </div>
  )
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default AddDir;