import React, { useState } from 'react';
import Select from 'react-select';

const Filter = (props) => {
    const {
        branches,
        setBranchIds,
        currencies,
        currencyId,
        setCurrencyId,
        month,
        setMonth,
        loading,
        onSubmit
    } = props;
    const [optionSelected, setOptionSelected] = useState([]);
    const selectorBranches = [...branches.map(result => ({...result, label: result.name, value:result.id}))];
    
    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setBranchIds(selected.map(branch => branch.id));
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
        <div>
            <form onSubmit={onSubmit}>

                <div>
                    <div className="view_search_container online__applications bck" style={{border:"none", paddingBottom:"1rem"}}>
                        <div className="row-payments-container" style={{width:"49%"}}>
                            <label className="form-label row-label">Enter</label>
                            <div className="input-group" style={{margin:"10px 0 0"}}>
                                <input
                                    type='month'
                                    value={month}
                                    onKeyDown={(e) => e.preventDefault()}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className='custom-select-form row-form input-background'
                                />
                            </div>
                        </div>
                        <div className="row-payments-container" style={{width:"49%"}}>
                            <label className="form-label row-label">Select Currency</label>
                            <select className='custom-select-form row-form' style={{margin:"10px 0 0"}} value={currencyId} onChange={evt => setCurrencyId(evt.target.value)}>
                                {currencies.map(currency => {
                                    return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="view_search_container online__applications bck" style={{border:"none", paddingTop:"0"}}>
                        <div className="row-payments-container" style={{width:"85%"}}>
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
                        <div style={{display:"flex", flexDirection:"column"}}>
                            {loading ?
                            <button type='submit' className='btn btn-info'>
                            <i className="fa fa-spinner fa-spin"></i> Please wait..
                            </button> :
                            <button type='submit' className='btn btn-info'>Apply filters!</button>}
                        </div>
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

export default Filter;