import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';

const initialState = {first_name: '', last_name: '', relationship: '', phone_number: '', address: '', ownership: '', city: '', country: '', gender: ''};

function AddNextOfKin({open, setOpen, clientId, setNokList}) {
    const [nok, setNok] = useState(initialState);
    const [serverError, setServerError] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        const body = {...nok, client_id: clientId};
        try {
            const response = await makeRequest.post(`/clientsapi/add_nok/`, body, {timeout: 8000});
            if (response.ok) {
                const jsonRes = await response.json();
                setNokList(curr => [...curr, {...nok, id: jsonRes.nok_id}]);
                setNok(initialState);
                setServerError(false);
                setOpen(false);
            }else {
                setServerError(true);
            }
        }catch(error) {
            setServerError(true);
        }
    }

    const disableAdd = Object.values(nok).findIndex(el => el==='') != -1 || Object.values(errors).findIndex(el => el!=='') != -1;

    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none', top:"4rem"}}>
            <div className='modal-dialog modal-lg modal-dialog-scrollable text-light' style={{maxHeight:"calc(100% - 6rem)"}}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className="form-title">[ Add Next of Kin ]</label>
                        <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
                    </div>

                    <div className='modal-body'>
                        <ModalBody nok={nok} serverError={serverError} errors={errors} setErrors={setErrors} setNok={setNok}/>  
                    </div>

                    <div className='modal-footer justify-content-between'>
                        <button type='button' className='btn btn-default' onClick={e => setOpen(false)}>Close</button>
                        <button type='submit' className='btn btn-info' style={disableAdd ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableAdd} onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

const ModalBody = ({nok, serverError, setNok, errors, setErrors}) => {

    const handleChange = (evt) => {
        setNok(curr => {
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

    const validators = {phone_number: validatePhoneNum};

    return (
        <div className='modal-body'>
            {serverError && <div className='alert alert-danger alert-dismissible'>
                <h4><i className='icon fa fa-ban'></i> Alert!</h4>
                    An error occured while adding address, please try again later.
            </div>}
            <>
                <div className='row custom-background'>
                    <label className='form-label'>First Name<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='first_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={nok.first_name} required/>
                        <p style={{color: 'red'}}>{errors['first_name']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Last Name<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='last_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={nok.last_name} required/>
                        <p style={{color: 'red'}}>{errors['last_name']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Gender<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select name='gender' className='custom-select-form' onFocus={validate} onChange={handleChange} value={nok.gender} required>
                            <option value=''></option>
                            <option value='MALE'>Male</option>
                            <option value='FEMALE'>Female</option>
                        </select>
                        <p style={{color: 'red'}}>{errors['gender']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Relationship to Applicant<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='relationship' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={nok.relationship} required/>
                        <p style={{color: 'red'}}>{errors['relationship']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Phone Number<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='phone_number' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={nok.phone_number} required/>
                        <p style={{color: 'red'}}>{errors['phone_number']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Physical Address<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='address' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={nok.address} required/>
                        <p style={{color: 'red'}}>{errors['address']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Ownership<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select name='ownership' className='custom-select-form' onFocus={validate} onChange={handleChange} value={nok.ownership} required>
                            <option value=''></option>
                            <option value='OWNER'>Owner</option>
                            <option value='RENTING'>Renting</option>
                        </select>
                        <p style={{color: 'red'}}>{errors['ownership']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Town/City<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='city' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={nok.city} required/>
                        <p style={{color: 'red'}}>{errors['city']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Country</label>
                    <div className='col-9'>
                        <input name='country' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={nok.country} required/>
                        <p style={{color: 'red'}}>{errors['country']}</p>
                    </div>
                </div>
            </>
        </div>
    )
}

export default AddNextOfKin;