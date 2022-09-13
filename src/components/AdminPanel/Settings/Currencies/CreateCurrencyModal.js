import React, {useState} from 'react';
import { makeRequest } from '../../../../utils/utils';

const initialState = {fullname: '', shortname: '', date_created: ''};

function CreateCurrencyModal({open, setOpen, setCurrencies}) {
  const [cur, setCur] = useState(initialState);
  const [serverErrors, setServerErrors] = useState({});
  const [errors, setErrors] = useState({});

  const handleExpenseCurrencyChange = (e) => {
    const { name, value } = e.target;
    setCur({ ...cur, [name]: value });
    validate(e)
  };

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

  const submit = async () => {
    const body = {
      fullname: cur.fullname,
      shortname: cur.shortname,
      date_created: cur.date_created,
    };
    const response = await makeRequest.post('/usersapi/add_currency/', body, {timeout: 8000});
    if (response.ok) {
      const data = await response.json();
      setCurrencies(curr => [data, ...curr])
      setOpen(curr => !curr)
      setCur(initialState)
      return data
    }
    const errors = await response.json();
    console.log(errors);
    setServerErrors(errors);
  }


  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Add Currency ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)}><span aria-hidden='true'>&times;</span></button>
          </div>
          <div className='modal-body'>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Fullname<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='fullname' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleExpenseCurrencyChange} value={cur.fullname} required/>
                <p style={{color: 'red'}}>{errors['fullname']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Shortname<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='shortname' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleExpenseCurrencyChange} value={cur.shortname} required/>
                <p style={{color: 'red'}}>{errors['shortname']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Date Created<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='date_created' type='date' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleExpenseCurrencyChange} value={cur.date_created} required/>
                <p style={{color: 'red'}}>{errors['date_created']}</p>
              </div>
            </div>

            <div className="row">
                <p><label className='form-label'><span style={{color: 'red'}}>*</span>required field</label></p>
            </div>

          </div>

          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button type='submit' className='btn btn-info' onClick={submit}>
              Add Currency
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCurrencyModal;