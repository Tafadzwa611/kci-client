import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';

const initialState = {name: '', geographical_location: '', branch_code: '', date_of_opening: ''};

function CreateBranchModal({open, setOpen, setBranches}) {
  const [branch, setBranch] = useState(initialState);
  const [serverErrors, setServerErrors] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBranch({ ...branch, [name]: value });
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
      name: branch.name,
      geographical_location: branch.geographical_location,
      branch_code: branch.branch_code,
      date_of_opening: branch.date_of_opening,
    };
    const response = await makeRequest.post('/usersapi/add_branch/', body, {timeout: 8000});
    if (response.ok) {
      const data = await response.json();
      setBranches(curr => [data, ...curr])
      setOpen(curr => !curr)
      setBranch(initialState)
      return data
    }
    const errors = await response.json();
    setServerErrors(errors);
  }

  const disableAdd = Object.values(branch).findIndex(el => el==='') != -1;


  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Add Branch ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
          </div>
          <div className='modal-body text-light'>

            {serverErrors.map((error, index) => (
              <div className='row custom-background' style={{marginTop: '15px'}}>
                <label className='form-label'></label>
                <div className='col-9'>
                  <div style={{fontSize: 12, color: 'red'}} key={index}>{error}</div>
                </div>
              </div>
            ))}

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Name<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={branch.name} required/>
                <p style={{color: 'red'}}>{errors['name']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Geographical Location<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='geographical_location' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={branch.geographical_location} required/>
                <p style={{color: 'red'}}>{errors['geographical_location']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Branch Code<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='branch_code' type='text' className='custom-select-form' autoComplete='new-password' maxLength="5" onFocus={validate} onChange={handleChange} value={branch.branch_code} required/>
                <p style={{color: 'red'}}>{errors['branch_code']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Date of Opening<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='date_of_opening' type='date' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={branch.date_of_opening} required/>
                <p style={{color: 'red'}}>{errors['date_of_opening']}</p>
              </div>
            </div>

            <div className="row">
                <p><label className='form-label'><span style={{color: 'red'}}>*</span>required field</label></p>
            </div>

          </div>

          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button type='submit' className='btn btn-info' style={disableAdd ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableAdd} onClick={submit}>
              Add Branch
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateBranchModal;