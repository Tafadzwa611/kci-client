import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';

const UpdateClientControls = ({
    openupdate,
    setOpenUpdate,
    selectedClientControlId,
    setClientContol
}) => {

    const [serverError, setServerError] = useState(false);
    const [errors, setErrors] = useState({});

    const [clientcontrol, setClientControl] = useState(null);
    const [newDetails, setNewDetails] = useState(null);

    useEffect(() => {
        getClientControl();
      }, []);
    
    const getClientControl = async () => {
        await fetchClientControl();
    }

    async function fetchClientControl() {
        try {
            const response = await makeRequest.get(`/clientsapi/get_client_control/${selectedClientControlId}/`, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                setNewDetails({client_initial_status: json_res.client_initial_status})
                return setClientControl(json_res)
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    const handleChange = (evt) => {
        setNewDetails(curr => {
            return {...curr, [evt.target.name]: evt.target.value}
        })
    }

    const handleSubmit = () => {
        patchClientControl();
    }

    console.log(newDetails)

    async function patchClientControl() {
        try {
            const response = await makeRequest.patch(`/clientsapi/update_client_control/${selectedClientControlId}/`, newDetails, {timeout: 8000});
            console.log(newDetails);
            console.log(response);
            if (response.ok) {
                setClientContol(curr => {
                    const updatedClientControls = [...curr];
                    updatedClientControls[0].client_initial_status = newDetails.client_initial_status;
                    return updatedClientControls;
                })
                setOpenUpdate(false);
                setServerError(false);
            }else {
                console.log('else');
                const error = await response.text();
                console.log(error);
                setServerError(true);
            }
        }catch(error) {
            console.log('catch');
            console.log(error);
            setServerError(true);
        }
    }

    if (clientcontrol == null) {
        return <MiniLoader />;
    } 
    
    return (
        <div className={openupdate ? 'modal fade show' : 'modal fade'} style={{display: openupdate ? 'block' : 'none'}}>
            <div className='modal-dialog modal-lg modal-dialog-scrollable'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <label className="form-title">[ Update Client Controls ]</label>
                        <button type='button' className='close' onClick={(e) => setOpenUpdate(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
                    </div>
                    <div className='modal-body text-light'>

                        {/* {serverError.map((error, index) => (
                            <div className='row custom-background' style={{marginTop: '15px'}}>
                                <label className='form-label'></label>
                                <div className='col-9'>
                                    <div style={{fontSize: 12, color: 'red'}} key={index}>{error}</div>
                                </div>
                            </div>
                        ))} */}

                        <div className='row custom-background'>
                            <label className='form-label'>Client Initial Status<span style={{color: 'red'}}>*</span></label>
                            <div className='col-9'>
                                <select name='client_initial_status' className='custom-select-form' onChange={handleChange} value={newDetails.client_initial_status||''} required>
                                    <option value=''></option>
                                    <option value='Pending Approval'>Pending Approval</option>
                                    <option value='Inactive'>Inactive</option>
                                </select>
                                <p style={{color: 'red'}}>{errors['client_initial_status']}</p>
                            </div>
                        </div>

                    </div>

                    <div className='modal-footer justify-content-between'>
                        <button type='button' className='btn btn-default' onClick={(e) => setOpenUpdate(curr => !curr)}>Close</button>
                        <button type='submit' className='btn btn-info' onClick={handleSubmit}>
                            Update Client Control
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateClientControls;