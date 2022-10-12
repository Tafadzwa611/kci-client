import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../../../utils/utils';

const initialState = {client_initial_status: ''};

const AddClientControl = ({
    open,
    setOpen,
    setClientContol
}) => {
    const [control, setControl] = useState(initialState)
    const [serverErrors, setServerErrors] = useState([]);
    const [errors, setErrors] = useState({});

    const handleClientControlChange = (e) => {
        const { name, value } = e.target;
        setControl({ ...control, [name]: value });
    };

    const submit = async () => {
        const body = {
            client_initial_status: control.client_initial_status,
        };
        const response = await makeRequest.post('/clientsapi/add_client_control/', body, {timeout: 8000});
        if (response.ok) {
            const data = await response.json();
            setClientContol(curr => [data, ...curr])
            setOpen(curr => !curr)
            setControl(initialState)
            return data
        }
        const errors = await response.json();
        setServerErrors(errors);
    }
    
    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
            <div className='modal-dialog modal-lg modal-dialog-scrollable'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className="form-title">[ Add Client Controls ]</label>
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

                        <div className='row custom-background'>
                            <label className='form-label'>Client Initial Status<span style={{color: 'red'}}>*</span></label>
                            <div className='col-9'>
                                <select name='client_initial_status' className='custom-select-form' onChange={handleClientControlChange} value={control.client_initial_status||''} required>
                                    <option value=''></option>
                                    <option value='Pending Approval'>Pending Approval</option>
                                    <option value='Inactive'>Inactive</option>
                                </select>
                                <p style={{color: 'red'}}>{errors['client_initial_status']}</p>
                            </div>
                        </div>

                    </div>

                    <div className='modal-footer justify-content-between'>
                        <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
                        <button type='submit' className='btn btn-info' onClick={submit}>
                            Add Client Controls
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddClientControl;