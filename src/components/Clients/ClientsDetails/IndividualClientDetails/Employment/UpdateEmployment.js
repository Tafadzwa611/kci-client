import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';

function UpdateEmployment({details, open, setClient, clientId, setOpen}) {
    const [newDetails, setNewDetails] = useState({
        work_address: details.work_address,
        employer: details.employer,
        job_position: details.job_position,
        type_of_employer: details.type_of_employer,
        ec_number: details.ec_number
    });
    const [serverError, setServerError] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        patchClient();
    }

    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/clientsapi/update_client_employment/${clientId}/`, newDetails, {timeout: 8000});
                console.log(newDetails);
                console.log(response);
            if (response.ok) {
                setClient(curr => ({...curr, ...newDetails}));
                setOpen(false);
                setServerError(false);
            }else {
                console.log('else');
                const error = await response.text();
                console.log('else2');
                console.log(error);
                setServerError(true);
            }
        }catch(error) {
            console.log('catch');
            console.log(error);
            setServerError(true);
        }
    }

    const disableAdd = Object.values(errors).findIndex(el => el!=='') != -1;

    return (
            <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none', top: '4rem'}}>
                <div className='modal-dialog modal-lg modal-dialog-scrollable text-light' style={{maxHeight:"calc(100% - 6rem)"}}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className="form-title">[ Update Employment Details ]</label>
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
                validators[evt.target.name](evt);
        }
    }

    const validateEc = evt => {
        const re  = /^\d{7}[A-Za-z]{1}$/;
        if (evt.target.name==='type_of_employer') {
            if (evt.target.value==='Gvt') {
                if (details.ec_number==='') {
                    setErrors(curr => {
                        return {...curr, ec_number: 'This field is required'}
                })
                }else {
                    if (!re.test(String(details.ec_number).toLowerCase())) {
                        setErrors(curr => {
                            return {...curr, ec_number: 'EC Number is invalid'}
                        })
                    }
                }
            }else {
                setErrors(curr => {
                    return {...curr, ec_number: ''}
                })
            }
        }else if(evt.target.name==='ec_number') {
            if (!re.test(String(evt.target.value).toLowerCase()) && details.type_of_employer === 'Gvt') {
                setErrors(curr => {
                    return {...curr, ec_number: 'EC Number is invalid'}
                })
            }else {
                setErrors(curr => {
                    return {...curr, ec_number: ''}
                })
            }
        }
    }

    const validators = {ec_number: validateEc};

    return (
        <>
            <div className='modal-body'>

                {serverError && <div className='alert alert-danger alert-dismissible'>
                <h4><i className='icon fa fa-ban'></i> Alert!</h4>
                    An error occured while updating employment information, please try again later.
                </div>}

                <div className='row custom-background'>
                    <label className='form-label'>Employer<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='employer' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleChange} value={details.employer||''} required/>
                        <p style={{color: 'red'}}>{errors['employer']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Type Of Employer<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select name='type_of_employer' className='custom-select-form' onChange={handleChange} value={details.type_of_employer||''} required>
                            <option value=''></option>
                            <option value='Pvt'>Private</option>
                            <option value='Gvt'>Government</option>
                        </select>
                        <p style={{color: 'red'}}>{errors['type_of_employer']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Job Position<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='job_position' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleChange} value={details.job_position||''} required/>
                        <p style={{color: 'red'}}>{errors['job_position']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Ec Number<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='ec_number' type='text' className='custom-select-form' onChange={handleChange} value={details.ec_number||''} required/>
                        <p style={{color: 'red'}}>{errors['ec_number']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Work Address<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input name='work_address' type='text' className='custom-select-form' onChange={handleChange} value={details.work_address||''} required/>
                        <p style={{color: 'red'}}>{errors['work_address']}</p>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UpdateEmployment;