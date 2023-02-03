import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';

const DateRange = (props) => {
    const [optionSelected, setOptionSelected] = useState([]);
    const [branches, setBranches] = useState([]);
    const {currencies, currencyId, setCurrencyId, minDate, maxDate, setMinDate, setMaxDate, onSubmit, disableFetch, updateSelectedBranchesId, setSelectedBranches} = props;
    const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};
  
    useEffect(() => {
        fetchBranches();
    }, []);

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setSelectedBranches(selected);
        updateSelectedBranchesId(selected.map(branch => branch.id));
    }
  
    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }
  
    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
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

        <div className="font-13 text-light">
            <form onSubmit={onSubmit}>

                <div className="disbursement_date_range" style={{padding:'0', border:"none"}}>

                    <div className="disbursement-report-fields">
                        <div style={{width:"100%"}}>
                            <label className="form-label">Min Date</label>
                            <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input 
                                    type='date' 
                                    value={minDate} 
                                    onKeyDown={(e) => e.preventDefault()} 
                                    onChange={(e) => setMinDate(e.target.value)} 
                                    className='reports-form-control' 
                                />
                            </div>
                        </div>
                        <div style={{width:"100%"}}>
                            <label className="form-label">Max Date</label>
                            <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                <i className="uil uil-calendar-alt"></i>
                                <input 
                                    type='date' 
                                    value={maxDate} 
                                    onKeyDown={(e) => e.preventDefault()} 
                                    onChange={(e) => setMaxDate(e.target.value)} 
                                    className='reports-form-control' 
                                />
                            </div>
                        </div>
                        <div style={{width:"100%"}}>
                            <label className="form-label">Select Currency</label>
                            <div className="reports-input-group" style={{margin:"10px 0 0", border:"none"}}>
                                <select className='report-custom-form-control currency' value={currencyId} onChange={changeCurrency} style={{width:"100%"}}>
                                    {currencies.map(currency => {
                                        return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop:"1rem"}}>
                        <div className="disbursement-report-fields">
                            <div style={{width:"85%"}}>
                                <Select
                                    isMulti
                                    name='colors'
                                    options={[props.allOption, ...branches]}
                                    value={optionSelected}
                                    classNamePrefix='select'
                                    className='basic-multi-select'
                                    placeholder='Select Branches'
                                    onChange={selected => {
                                        if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                        return handleMultiSelect(branches);
                                        }
                                        handleMultiSelect(selected);
                                    }}
                                    styles={style}
                                />
                            </div>
                            <button type='submit' className='btn btn-olive' style={fetchStyles} disabled={disableFetch}>Apply filters!</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
        
    );
}

DateRange.defaultProps = {
    allOption: {
        label: 'Select all',
        value: '*'
    }
};

export default DateRange;