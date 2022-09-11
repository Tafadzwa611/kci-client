import React, { useState } from 'react';
import { makeRequest } from '../../../../../utils/utils';

function UpdateBankingDetails({details, open, setClient, clientId, setOpen}) {
    const [newDetails, setNewDetails] = useState(details);
    const [serverError, setServerError] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        patchClient();
    }

    async function patchClient() {
        try {
            const response = await makeRequest.patch(`/clientsapi/update_client_banking/${clientId}/`, newDetails, {timeout: 8000});
            if (response.ok) {
                setClient(curr => ({...curr, ...newDetails}));
                setOpen(false);
                setServerError(false);
            }else {
                const error = await response.json();
                console.log(error);
                setServerError(true);
            }
        }catch(error) {
            setServerError(true);
        }
    }

    const disableAdd = Object.values(errors).findIndex(el => el!=='') != -1;

    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none', top:"4rem"}}>
            <div className='modal-dialog modal-lg modal-dialog-scrollable text-light' style={{maxHeight:"calc(100% - 6rem)"}}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className="form-title">[ Update Banking Info ]</label>
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
    }

    return (
        <>
            <div className='modal-body'>

                {serverError && <div className='alert alert-danger alert-dismissible'>
                <h4><i className='icon fa fa-ban'></i> Alert!</h4>
                    An error occured while updating banking information, please try again later.
                </div>}

                <div className='row custom-background'>
                    <label className='form-label'>Bank Name</label>
                    <div className='col-9'>
                        <input name='bank_name' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleChange} value={details.bank_name||''} required/>
                        <p style={{color: 'red'}}>{errors['bank_name']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Bank Branch</label>
                    <div className='col-9'>
                        <input name='bank_branch' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleChange} value={details.bank_branch||''} required/>
                        <p style={{color: 'red'}}>{errors['bank_branch']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Account Number</label>
                    <div className='col-9'>
                        <input name='account_number' type='text' className='custom-select-form' onChange={handleChange} value={details.account_number||''} required/>
                        <p style={{color: 'red'}}>{errors['account_number']}</p>
                    </div>
                </div>

                <div className='row custom-background'>
                    <label className='form-label'>Mobile Money Number</label>
                    <div className='col-9'>
                        <input name='mobile_money_number' type='text' className='custom-select-form' onChange={handleChange} value={details.mobile_money_number||''} required/>
                        <p style={{color: 'red'}}>{errors['mobile_money_number']}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateBankingDetails;