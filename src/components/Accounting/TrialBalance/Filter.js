import React, { useState } from 'react';
import Select from 'react-select';

const Filter = (props) => {

    const {
        maxDate,
        setMaxDate,
        branches,
        setBranchIds,
        onSubmit,
        currencies,
        currencyId,
        setCurrencyId
    } = props;

    const [optionSelected, setOptionSelected] = useState([]);
    const selectorBranches = [...branches.map(result => ({...result, label: result.name, value:result.id}))];

    const style = {
        control: base => ({
            ...base,
            border: '1px solid #dee2e6',
            boxShadow: "none",
            '&:hover':'1px solid #dee2e6',
        })
    };

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setBranchIds(selected.map(branch => branch.id));
    }

    const changeCurrency = (evt) => {
        setCurrencyId(evt.target.value);
    }
    
    const disableSubmitButton = maxDate==='' || optionSelected.length===0;

    return (

        <div className="font-13 text-light">

            <form onSubmit={onSubmit}>
                <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0"}}>
                    <div className="row-payments-container" style={{width:"48%"}}>
                        <label className="form-label row-label">To</label>
                        <div className="input-group" style={{margin:"0"}}>
                            <i className="uil uil-calendar-alt"></i>
                            <input type='date' value={maxDate} onKeyDown={(e) => e.preventDefault()} onChange={(e) => setMaxDate(e.target.value)} className='custom-select-form row-form input-background' />
                        </div>
                    </div>

                    <div className="row-payments-container" style={{width:"48%"}}>
                        <label className="form-label row-label">Currency</label>
                        <select className='custom-select-form row-form' style={{margin:"0"}} value={currencyId} onChange={changeCurrency}>
                            {currencies.map(currency => {
                                return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", marginTop:"1rem"}}>
                    <div className="row-payments-container" style={{width:"80%"}}>
                        <Select
                            isMulti
                            name='colors'
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
                        <button 
                            type="submit" 
                            className="btn btn-olive"
                            style={disableSubmitButton ? {pointerEvents: 'none', opacity: '0.7'} : {}}
                            disabled={disableSubmitButton}>Apply_filters_!</button>
                    </div>
                </div>
            </form>

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