import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';

const Filter = (props) => {

    const [optionSelected, setOptionSelected] = useState([]);
    const [branches, setBranches] = useState([]);
    const {currencies, currencyId, setCurrencyId, month, setMonth, onSubmit, disableFetch, updateSelectedBranchesId} = props;
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

    const style = {
        control: base => ({
            ...base,
            border: '1px solid #dee2e6',
            boxShadow: "none",
            '&:hover':'1px solid #dee2e6',
        })
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0"}}>
                <div className="row-payments-container" style={{width:"48%"}}>
                    <label className="form-label row-label">Enter Date</label>
                    <div className="input-group" style={{margin:"10px 0 0"}}>
                        <i className="uil uil-calendar-alt"></i>
                        <input 
                            type='month' 
                            value={month} 
                            onKeyDown={(e) => e.preventDefault()} 
                            onChange={(e) => setMonth(e.target.value)} 
                            className='custom-select-form row-form input-background'
                        />
                    </div>
                </div>
                <div className="row-payments-container" style={{width:"48%"}}>
                    <label className="form-label row-label">Select Currency</label>
                    <select className='custom-select-form row-form' value={currencyId} onChange={changeCurrency} style={{margin:"10px 0 0"}}>
                        {currencies.map(currency => {
                            return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", marginTop:"1.5rem"}}>
                <div className="row-payments-container" style={{width:"27%", margin:"10px 0"}} style={{width:"85%"}}>
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
                    <button type='submit' className='btn btn-olive' style={fetchStyles} disabled={disableFetch}>Apply_Filters!</button>
                </div>
            </div>
        </form>
    )
}

Filter.defaultProps = {
    allOption: {
        label: 'Select all',
        value: '*'
    }
};

export default Filter;