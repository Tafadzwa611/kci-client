
import React, { useState } from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';


function AddPaymentsReport({open, setOpen, setPaymentsR, branches, currencies}) {
    const [limits, setLimits] = useState({upperLimit: ''});
    const [currencyId, setCurrencyId] = useState('');
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [paymentsrname, setPaymentsRName] = useState('All time payments');
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        fetchPaymentsReport();
    }

    async function fetchPaymentsReport() {
        setLoading(true);
        try {
            const url = getUrl();
            const response = await makeRequest.get(url, {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                setOpen(false);
                setLoading(false);
                return setPaymentsR(curr => [...curr, {...data, currencyIso: currencies.filter(currency => currency.id == currencyId)[0].shortname, currencyId, selectedBranchesIds, limits}]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    const getUrl = () => {
        return `/loansapi/payments_report/?currency_id=${currencyId}
        &branch_ids=${selectedBranchesIds.toString()}
        ${limits.upperLimit != '' ? `&upper_limit=${limits.upperLimit}`: ``}`
    }

    const checkAllowSubmission = () => {
        if (currencyId === '') {return true}
        if (selectedBranchesIds.length === 0) {return true}
        if (errorMsg != null) {return true}
        return false
    }

    const allowSubmission = checkAllowSubmission();

    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
            <div className='modal-dialog modal-lg' style={{maxWidth:"calc(100% - 3rem)"}}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <span style={{fontWeight:"600"}}>{paymentsrname}</span>
                        <button type='button' className='close' onClick={e => setOpen(false)}><span aria-hidden='true'>&times;</span></button>
                    </div>
                    <ModalBody
                        branches={branches}
                        setSelectedBranchesIds={setSelectedBranchesIds}
                        currencies={currencies}
                        currencyId={currencyId}
                        setCurrencyId={setCurrencyId}
                        limits={limits}
                        setLimits={setLimits}
                        errorMsg={errorMsg}
                        setErrorMsg={setErrorMsg}
                        setPaymentsRName={setPaymentsRName}
                    />
                    <div className='modal-footer justify-content-between'>
                        <button type='button' className='btn btn-default' onClick={e => setOpen(false)}>Close</button>
                        <button
                            type='submit'
                            className='btn btn-info pull-right submit-btn'
                            style={allowSubmission ? {pointerEvents: 'none', opacity: '0.7'} : {}}
                            disabled={allowSubmission}
                            onClick={handleSubmit}
                        >
                        {loading ? <><i className='fa fa-spinner fa-spin'></i> Please wait..</> : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ModalBody = ({
        allOption,
        branches,
        setSelectedBranchesIds,
        currencies,
        currencyId,
        setCurrencyId,
        limits,
        setLimits,
        errorMsg,
        setErrorMsg,
        setPaymentsRName
    }) => {

    const [optionSelected, setOptionSelected] = useState([]);
    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setSelectedBranchesIds(selected.map(branch => branch.id));
    }

    const handleCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }

    const handleLimits = (evt) => {
        // clear previously set errors
        if (errorMsg != null){
        setErrorMsg(null)
        }

        if (evt.target.value != '' && Number(evt.target.value) < 1) {return}

        const newLimits = {...limits, [evt.target.name]: evt.target.value};
        setLimits(newLimits);
        const newPaymentName = getPaymentReportName(newLimits);
        setPaymentsRName(newPaymentName);

        if (newLimits.upperLimit === '') {return}

        if (Number(newLimits.upperLimit) <= 0) {
        setPaymentsRName('Error');
        return setErrorMsg('Upper Limit cannot be zero or than Lower zero.');
        }
    }

    const getPaymentReportName = (newLimits) => {
        if (newLimits.upperLimit == '') {
            return 'All time payments'
        }

        if (newLimits.upperLimit == 1) {
            return 'From yesterday payments'
        }
        
        if (newLimits.upperLimit != '') {
            return `Last ${newLimits.upperLimit} days payments`
        }
        
    }

    const style = {
        control: base => ({
            ...base,
            border: '1px solid #dee2e6',
            boxShadow: "none",
            '&:hover':'1px solid #dee2e6',
        })
    };

    return (
        <>
            <div className='modal-body text-light'>

                {errorMsg != null && <div className='alert alert-danger alert-dismissible'>
                    <h4><i className='icon fa fa-ban'></i> Alert!</h4>
                {errorMsg}
                </div>}

                <div className='row' style={{marginTop: '15px'}}>
                    <label className='form-label'>Branches<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <Select
                            isMulti
                            name='colors'
                            options={[allOption, ...branches]}
                            value={optionSelected}
                            classNamePrefix='select'
                            className='basic-multi-select'
                            placeholder='Select Branches'
                            onChange={selected => {
                                if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === allOption.value) {
                                return handleMultiSelect(branches);
                                }
                                handleMultiSelect(selected);
                            }}
                            styles={style}
                        />
                    </div>
                </div>

                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Currency<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select name='type_of_employer' className='custom-select-form' style={{width:"100%"}} value={currencyId} onChange={handleCurrency}>
                        <option>Select Currency</option>
                        {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                        </select>
                    </div>
                </div>

                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Days Ago</label>
                    <div className='col-9'>
                        <input name='upperLimit' value={limits.upperLimit} min={1} type='number' className='custom-select-form' style={{width:"100%"}} onChange={handleLimits}/>
                    </div>
                </div>
            </div>
        </>
    )
}

ModalBody.defaultProps = {
  allOption: {
    label: 'Select all',
    value: '*'
  }
};

export default AddPaymentsReport;