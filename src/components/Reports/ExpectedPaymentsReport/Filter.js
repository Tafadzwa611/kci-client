import React, {useState} from 'react';
import Select from 'react-select';


function Filter({
    currencyId,
    setCurrencyId,
    currencies,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    disableFetch,
    loading,
    onSubmit,
    allOption,
    branches,
    setBranchIds
}) {
    const [optionSelected, setOptionSelected] = useState([]);
    const selectorBranches = [...branches.map(result => ({...result, label: result.name, value:result.id}))];
    const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};

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
        <div className="font-13 text-light">
            <form>
                <div className="disbursement_date_range" style={{padding:'0', border:"none"}}>

                    <div className="disbursement-report-fields">
                        <div style={{width:"100%"}}>
                            <label className="form-label">Start Value Date</label>
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
                            <label className="form-label">End Value Date</label>
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
                                <select className='report-custom-form-control currency' value={currencyId} onChange={e => setCurrencyId(e.target.value)} style={{width:"100%"}}>
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
                                    name='branches'
                                    options={[allOption, ...selectorBranches]}
                                    value={optionSelected}
                                    classNamePrefix='select'
                                    className='basic-multi-select'
                                    placeholder='Select Branches'
                                    onChange={selected => {
                                        if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === allOption.value) {
                                        return handleMultiSelect(selectorBranches);
                                        }
                                        handleMultiSelect(selected);
                                    }}
                                    styles={style}
                                />
                            </div>
                            {
                                loading ?
                                <button type='submit' className='btn btn-olive'><i className='fa fa-spinner fa-spin'></i> Please wait..</button> :
                                <button type='submit' name='ledger' className='btn btn-olive' onClick={onSubmit} style={fetchStyles} disabled={disableFetch}>Apply Filters!</button>
                            }
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