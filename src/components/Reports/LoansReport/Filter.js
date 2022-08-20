import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { makeRequest } from '../../../utils/utils';

const Filter = (props) => {
    const [optionSelected, setOptionSelected] = useState([]);
    const [branches, setBranches] = useState([]);
    const {currencies, currencyId, setCurrencyId, minDate, maxDate, setMinDate, setMaxDate, onSubmit, disableFetch, searchClient, searchString, updateSelectedBranchesId} = props;
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
        <div className="reports__filter__container font-13 text-light" style={{padding:"0", border:"none"}}>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="row-containers" style={{padding:"0", border:"none"}}>
                        <div className="row row-payments">
                            <div className="row-payments-container">
                                <label className="form-label row-label">Min Loan Release Date</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input
                                        type='date'
                                        value={minDate}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setMinDate(e.target.value)}
                                        className='custom-select-form row-form input-background'
                                    />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Max Loan Release Date</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input
                                        type='date'
                                        value={maxDate}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setMaxDate(e.target.value)}
                                        className='custom-select-form row-form input-background'
                                    />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Search Client</label>
                                <div className="input-group" style={{margin:"10px 0"}}>
                                    <input
                                        type='text'
                                        name='search'
                                        autoComplete='off'
                                        className='custom-select-form row-form input-background'
                                        placeholder='Search client...'
                                        value={searchString}
                                        onChange={searchClient}
                                    />
                                </div>
                            </div>
                            <div className="row-payments-container">
                                <label className="form-label row-label">Select Currency</label>
                                <select className='custom-select-form row-form' value={currencyId} onChange={changeCurrency} style={{margin:"10px 0"}}>
                                    {currencies.map(currency => {
                                        return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className="row row-payments" style={{marginTop:"1rem"}}>
                            <div className="row-payments-container" style={{width:"85%"}}>
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
                            <button type='submit' className='btn btn-info' style={fetchStyles} disabled={disableFetch}>Apply_filters!</button>
                        </div>

                    </div>

                </form>
            </div>
        </div>
    );
}


Filter.defaultProps = {
    allOption: {
        label: 'Select all',
        value: '*'
    }
};

export default Filter;