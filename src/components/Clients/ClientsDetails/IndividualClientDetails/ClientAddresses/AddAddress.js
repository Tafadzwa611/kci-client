import React, {useState} from 'react';
import { makeRequest } from '../../../../../utils/utils';

const initialState = {address: '', ownership: '', city: '', country: ''};

function AddAddress({open, setOpen, setAddresses, clientId}) {
    const [addr, setAddr] = useState(initialState);
    const [serverError, setServerError] = useState(false);

    const handleSubmit = async () => {
        const body = {...addr, client_id: clientId};
        try {
            const response = await makeRequest.post(`/clientsapi/add_address/`, body, {timeout: 8000});
            if (response.ok) {
                const jsonRes = await response.json();
                setAddresses(curr => [...curr, {...addr, id: jsonRes.address_id}]);
                setAddr(initialState);
                setOpen(false);
            }else {
                setServerError(true);
            }
        }catch(error) {
            setServerError(true);
        }
    }

    const disableAdd = Object.values(addr).findIndex(el => el==='') != -1;

    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
            <div className='modal-dialog modal-lg modal-dialog-scrollable text-light'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className="form-title">[ Add Address ]</label>
                        <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
                    </div>

                    <div className='modal-body'>
                        <ModalBody addr={addr} setAddr={setAddr} serverError={serverError}/>
                    </div>

                    <div className='modal-footer justify-content-between'>
                        <button type='button' className='btn btn-default' onClick={e => setOpen(false)}>Close</button>
                        <button type='submit' className='btn btn-info' style={disableAdd ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableAdd} onClick={handleSubmit}>
                            Add Address
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


const ModalBody = ({addr, setAddr, serverError}) => {
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

            {serverError && <div className='alert alert-danger alert-dismissible'>
                <h4><i className='icon fa fa-ban'></i> Alert!</h4>
                An error occured while adding address, please try again later.
            </div>}

            <div className='row custom-background' style={{marginTop: '15px'}}>
                <label className='form-label'>Physical Address<span style={{color: 'red'}}>*</span></label>
                <div className='col-9'>
                    <input name='address' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={addr.address} required/>
                    <p style={{color: 'red'}}>{errors['address']}</p>
                </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
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

            <div className='row custom-background' style={{marginTop: '15px'}}>
                <label className='form-label'>Town/City<span style={{color: 'red'}}>*</span></label>
                <div className='col-9'>
                    <input name='city' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={addr.city} required/>
                    <p style={{color: 'red'}}>{errors['city']}</p>
                </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
                <label className='form-label'>Country<span style={{color: 'red'}}>*</span></label>
                <div className='col-9'>
                    <input name='country' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={addr.country} required/>
                    <p style={{color: 'red'}}>{errors['country']}</p>
                </div>
            </div>
        </div>
        <p><label className='form-label'><span style={{color: 'red'}}>*</span>Required field</label></p>
        </>
    )
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

export default AddAddress;