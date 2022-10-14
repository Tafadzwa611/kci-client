import React, { useState } from 'react';
import Select from 'react-select';


const Filter = (props) => {
    const {
        branches,
        setBranchIds,
        currencies,
        currencyId,
        setStatus,
        setCurrencyId,
        loading,
        onSubmit
    } = props;

    const [optionSelected, setOptionSelected] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const selectorBranches = [...branches.map(result => ({...result, label: result.name, value:result.id}))];
    const statusValues = ['Arrears'];
    const selectorStatuses = statusValues.map(val => ({label: val, value: val}));

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setBranchIds(selected.map(branch => branch.id));
    }
    
    const handleStatusSelect = selected => {
        setSelectedStatus(selected);
        setStatus(selected.map(val => val.value));
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
        <div style={{position:"relative", zIndex:"2"}}>
            <form onSubmit={onSubmit}>

                <div className="view_search_container online__applications" style={{borderBottom:"none", paddingBottom:"0"}}>
                    <div className="row-payments-container" style={{width:"49%"}}>
                        <label className="form-label row-label">Select Status</label>
                        <div>
                            <Select
                                isMulti
                                name='status'
                                options={[props.allOption, ...selectorStatuses]}
                                value={selectedStatus}
                                classNamePrefix='select'
                                className='basic-multi-select'
                                placeholder='Select Status'
                                onChange={selected => {
                                    if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                    return handleStatusSelect(selectorStatuses);
                                    }
                                    handleStatusSelect(selected);
                                }}
                                styles={style}
                            />
                        </div>
                    </div>
                    <div className="row-payments-container" style={{width:"49%"}}>
                        <label className="form-label row-label">Select Currency</label>
                        <select className='custom-select-form row-form input-background' value={currencyId} onChange={evt => setCurrencyId(evt.target.value)}>
                            {currencies.map(currency => {
                                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="view_search_container online__applications" style={{borderTop:"none"}}>
                    <div className="row-payments-container" style={{width:"85%"}}>
                        {/* <label className="form-label row-label">Select Branch</label> */}
                        <div>
                            <Select
                                isMulti
                                name='branches'
                                options={[props.allOption, ...selectorBranches]}
                                value={optionSelected}
                                classNamePrefix='select'
                                className='basic-multi-select'
                                placeholder='Select Branches'
                                onChange={selected => {
                                    if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                    return handleMultiSelect(selectorBranches);
                                    }
                                    handleMultiSelect(selected);
                                }}
                                styles={style}
                            />
                        </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        {/* <label className="form-label row-label">Search</label> */}
                        {loading ?
                        <button type='submit' className='btn btn-olive'>
                        <i className="fa fa-spinner fa-spin"></i> Please wait..
                        </button> :
                        <button type='submit' className='btn btn-olive'>Apply filters!</button>}
                    </div>
                </div>

            </form>
        </div>
    )
}

Filter.defaultProps = {
    allOption: {
        label: 'Select all',
        value: '*'
    }
};

export default Filter