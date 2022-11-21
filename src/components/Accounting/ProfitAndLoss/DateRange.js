import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';

const DateRange = (props) => {
    const [optionSelected, setOptionSelected] = useState([]);
    const [branches, setBranches] = useState([]);
    const {minDate, maxDate, currencies, currencyId, setCurrencyId, setMinDate, setMaxDate, onSubmit, disableFetch, updateSelectedBranchesId} = props;
    const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7', margin:'0'} : {margin:'0', cursor:'pointer'};

    const style = {
        control: base => ({
          ...base,
          border: '1px solid #dee2e6',
          boxShadow: "none",
          '&:hover':'1px solid #dee2e6',
        })
    };

    useEffect(() => {
        fetchBranches();
    }, []);
    
    const handleMultiSelect = selected => {
        setOptionSelected(selected);
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

    return (

        <div className="font-13 text-light">

            <form onSubmit={onSubmit}>
                <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0"}}>
                    <div className="row-payments-container" style={{width:"22%"}}>
                        <label className="form-label row-label">From</label>
                        <div className="input-group" style={{margin:"0"}}>
                            <i className="uil uil-calendar-alt"></i>
                            <input type='date' value={minDate} onKeyDown={(e) => e.preventDefault()} onChange={(e) => setMinDate(e.target.value)} className='custom-select-form row-form input-background' />
                        </div>
                    </div>
                    <div className="row-payments-container" style={{width:"22%"}}>
                        <label className="form-label row-label">To</label>
                        <div className="input-group" style={{margin:"0"}}>
                            <i className="uil uil-calendar-alt"></i>
                            <input type='date' value={maxDate} onKeyDown={(e) => e.preventDefault()} onChange={(e) => setMaxDate(e.target.value)} className='custom-select-form row-form input-background' />
                        </div>
                    </div>
                    <div className="row-payments-container" style={{width:"22%"}}>
                        <label className="form-label row-label">Currency</label>
                        <select className='custom-select-form row-form' style={{margin:"0"}} value={currencyId} onChange={changeCurrency}>
                            {currencies.map(currency => {
                                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                            })}
                        </select>
                    </div>
                    <div className="row-payments-container" style={{width:"22%"}}>
                        <label className="form-label row-label">Type</label>
                        <select className='custom-select-form row-form' style={{margin:"0"}} value={props.v} onChange={e => props.setV(e.target.value)}>
                            <option value={'o'}>Cash</option>
                            <option value={'n'}>Accrual</option>
                        </select>
                    </div>
                </div>

                <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", marginTop:"1rem"}}>
                    <div className="row-payments-container" style={{width:"80%"}}>
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
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <button type="submit" className="btn btn-olive" style={fetchStyles} disabled={disableFetch}>Run_Statement_!</button>
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