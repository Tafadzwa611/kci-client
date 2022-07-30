import React, { useEffect, useState } from 'react';
import { makeRequest } from '../../../utils/utils';
import Select from 'react-select';

const DateRange = (props) => {
    const [optionSelected, setOptionSelected] = useState([]);
    const [branches, setBranches] = useState([]);
    const {minDate, currencies, currencyId, setCurrencyId, maxDate, setMinDate, setMaxDate, onSubmit, disableFetch, updateSelectedBranchesId} = props;
    const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};

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
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 6000});
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

        <div className="font-13 text-light" style={{marginTop:"3rem"}}>

            <form onSubmit={onSubmit}>
                <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0"}}>
                    <div className="row-payments-container" style={{width:"20%"}}>
                        <label className="form-label row-label">From</label>
                        <div className="input-group" style={{margin:"0"}}>
                            <i className="uil uil-calendar-alt"></i>
                            <input type='date' value={minDate} onKeyDown={(e) => e.preventDefault()} onChange={(e) => setMinDate(e.target.value)} className='custom-select-form row-form input-background' />
                        </div>
                    </div>
                    <div className="row-payments-container" style={{width:"20%"}}>
                        <label className="form-label row-label">To</label>
                        <div className="input-group" style={{margin:"0"}}>
                            <i className="uil uil-calendar-alt"></i>
                            <input type='date' value={maxDate} onKeyDown={(e) => e.preventDefault()} onChange={(e) => setMaxDate(e.target.value)} className='custom-select-form row-form input-background' />
                        </div>
                    </div>
                    <div className="row-payments-container" style={{width:"20%"}}>
                        <label className="form-label row-label">Branch</label>
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
                            />
                    </div>
                    <div className="row-payments-container" style={{width:"20%"}}>
                        <label className="form-label row-label">Currency</label>
                        <select className='custom-select-form row-form' style={{margin:"0"}} value={currencyId} onChange={changeCurrency}>
                            {currencies.map(currency => {
                                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                            })}
                        </select>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label className="form-label row-label">Generate</label>
                        <button type="submit" className="btn btn-olive" style={{margin:"0"}}>Generate_Cashflow</button>
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