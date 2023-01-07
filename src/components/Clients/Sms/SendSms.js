import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';

const SendSms = (props) => {
    const {open, setOpen, clients} = props;
    const [newSms, setNewSms] = useState('');
    const [optionSelected, setOptionSelected] = useState([]);
    const disableAdd = newSms == '' || optionSelected.length == 0;

    const submit = async () => {
        const body = {
            client_ids: optionSelected.map(opt => opt.value),
            sms: newSms
        };
        const response = await makeRequest.post('/clientsapi/send_sms/', body, {timeout: 8000});
        if (response.ok) {
            const data = await response.json();
            setNewSms('');
            return data
        }
        const errors = await response.json();
        console.log(errors);
    }

    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
            <div className='modal-dialog modal-lg modal-dialog-scrollable' style={{maxWidth:"calc(100% - 3rem)", height:"calc(100% - 7rem)", top:"4rem"}}>
                <div className='modal-content client-details-bg'>
                    <div className='modal-header'>
                        <span style={{fontWeight:"600"}}>Send Sms</span>
                        <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)}><span aria-hidden='true'>&times;</span></button>
                    </div>
                    <div className='modal-body'>
                        <div className='row custom-background' style={{marginTop: '15px'}}>
                            <label className='form-label'>Client<span style={{color: 'red'}}>*</span></label>
                            <div className='col-9'>
                                <Select
                                    isMulti
                                    name='colors'
                                    options={[props.allOption, ...clients]}
                                    value={optionSelected}
                                    classNamePrefix='select'
                                    className='basic-multi-select'
                                    placeholder='Select clients'
                                    onChange={selected => {
                                        if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                        setOptionSelected(clients);
                                        return
                                        }
                                        setOptionSelected(selected);
                                    }}
                                />
                            </div>
                        </div>

                        <div className='row custom-background' style={{marginTop: '15px'}}>
                            <label className='form-label'>Message<span style={{color: 'red'}}>*</span></label>
                            <div className='col-9'>
                                <textarea maxLength="160" name='sms' className='custom-select-form' onChange={evt => setNewSms(evt.target.value)} value={newSms} required />
                            </div>
                        </div>

                    </div>
                    <p style={{paddingLeft:"1rem"}}><label className='form-label'><span style={{color: 'red'}}>*</span>Required field</label></p>
                    <div className='modal-footer justify-content-between'>
                        <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
                        <button type='submit' className='btn btn-info' style={disableAdd ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableAdd} onClick={submit}>
                            Send Sms
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

SendSms.defaultProps = {
    allOption: {
        label: 'Select all',
        value: '*'
    }
};

export default SendSms;