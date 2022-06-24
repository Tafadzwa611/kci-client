import React, { useState } from 'react';

const initialState = {address: '', ownership: '', city: '', country: ''};

function UpdateAddress({open, addrList, addr, setAddr, setAddrList}) {
  const [newAddr, setNewAddr] = useState(addr);

  const handleSubmit = () => {
    const objIndex = addrList.findIndex((obj => obj.id == addr.id));
    addrList[objIndex] = {...newAddr, id: uuidv4()};
    setAddrList(addrList);
    setAddr(initialState);
  }

  const closeModal = () => {
    setAddr(initialState);
  }

  const disableAdd = Object.values(addr).findIndex(el => el==='') != -1;

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Update Address ]</label>
            <button type='button' className='close' onClick={closeModal}><span aria-hidden='true'>&times;</span></button>
          </div>
          <ModalBody addr={newAddr} setAddr={setNewAddr}/>
          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={closeModal}>Close</button>
            <button type='submit' className='btn btn-info pull-right submit-btn' style={disableAdd ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableAdd} onClick={handleSubmit}>
              Update Address
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ModalBody = ({addr, setAddr}) => {
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    setAddr(curr => {
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
        <div className='row' style={{marginTop: '15px'}}>
          <label className='form-label'>Physical Address<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='address' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={addr.address} required/>
            <p style={{color: 'red'}}>{errors['address']}</p>
          </div>
        </div>

        <div className='row' style={{marginTop: '15px'}}>
          <label className='form-label'>Ownership<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <select name='ownership' className='custom-select-form' onFocus={validate} onChange={handleChange} value={addr.ownership} required>
              <option value=''></option>
              <option value='OWNER'>Owner</option>
              <option value='RENTING'>Renting</option>
            </select>
            <p style={{color: 'red'}}>{errors['ownership']}</p>
          </div>
        </div>

        <div className='row' style={{marginTop: '15px'}}>
          <label className='form-label'>Town/City<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='city' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={addr.city} required/>
            <p style={{color: 'red'}}>{errors['city']}</p>
          </div>
        </div>

        <div className='row' style={{marginTop: '15px'}}>
          <label className='form-label'>Country<span style={{color: 'red'}}>*</span></label>
          <div className='col-9'>
            <input name='country' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={addr.country} required/>
            <p style={{color: 'red'}}>{errors['country']}</p>
          </div>
        </div>

        <div className="row">
            <p><label className='form-label'><span style={{color: 'red'}}>*</span>Required field</label></p>
        </div>

      </div>

    </>
  )
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default UpdateAddress;