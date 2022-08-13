import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../../../utils/utils';

const initialState = {general_ledger_name: '', general_ledger_code: '', account_type: '', date_created: '', description: ''};

function CreateMainAccountModal({open, setOpen, setMainAccounts}) {
  const [acc, setAcc] = useState(initialState);
  const [disable, setDisable] = useState(true);
  const [serverErrors, setServerErrors] = useState([]);
  const [errors, setErrors] = useState({});

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAcc({ ...acc, [name]: value });
    validate(e)
  };

  useEffect(() => {
    if  (acc.general_ledger_name != "" && acc.general_ledger_code != "" &&  acc.account_type != "" && acc.date_created != "" ) {
      setDisable(false)
    }
  },[acc]);
  
  const validate = (evt) => {
    if (evt.target.required && evt.target.value === '') {
      setDisable(true)
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
        general_ledger_name: acc.general_ledger_name,
        general_ledger_code: acc.general_ledger_code,
        account_type: acc.account_type,
        date_created: acc.date_created,
        description: acc.description,
    };
    const response = await makeRequest.post('/acc-api/create-main-account/', body, {timeout: 8000});
    if (response.ok) {
        const data = await response.json();
        setMainAccounts(curr => [data, ...curr])
        setOpen(curr => !curr)
        setAcc(initialState)
        setServerErrors([])
        return data
    }
        const errors = await response.json();
        setServerErrors(errors);
        window.scrollTo(0, 0);
  }

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable text-light'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Add Main Account ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
          </div>
          <div className='modal-body'>

            {serverErrors.map((error, index) => (
              <div className='row custom-background' style={{marginTop: '15px'}} key={index}>
                <label className='form-label'></label>
                <div className='col-9'>
                  <div style={{fontSize: 12, color: 'red'}}>{error}</div>
                </div>
              </div>
            ))}

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>General Ledger Name<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='general_ledger_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleAccountChange} value={acc.general_ledger_name} required/>
                <p style={{color: 'red'}}>{errors['general_ledger_name']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>General Ledger Code<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='general_ledger_code' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleAccountChange} value={acc.general_ledger_code} required/>
                <p style={{color: 'red'}}>{errors['general_ledger_code']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Date of Account Opening<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='date_created' type='date' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleAccountChange} value={acc.date_created} required/>
                <p style={{color: 'red'}}>{errors['date_created']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Account Type<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <select name='account_type' className='custom-select-form' onFocus={validate} onChange={handleAccountChange} value={acc.account_type} required>
                    <option></option>
                    <option value={'ASSET'}>ASSET</option>
                    <option value={'LIABILITY'}>LIABILITY</option>
                    <option value={'EQUITY'}>EQUITY</option>
                    <option value={'INCOME'}>INCOME</option>
                    <option value={'EXPENSE'}>EXPENSE</option>
                </select>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Description</label>
              <div className='col-9'>
                <input name='description' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleAccountChange} value={acc.description}/>
              </div>
            </div>

            <div className="row">
                <p><label className='form-label'><span style={{color: 'red'}}>*</span>required field</label></p>
            </div>

          </div>

          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button type='submit' className='btn btn-info' onClick={submit} style={disable ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disable}>
              Add Main Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateMainAccountModal;