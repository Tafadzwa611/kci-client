import React from 'react';
import Select from 'react-select';

const DateRange = (props) => {
    const [optionSelected, setOptionSelected] = React.useState([]);
    const {currencies, currencyId, setCurrencyId, minDate, maxDate, setMinDate, options, setMaxDate, onSubmit, disableFetch, updateSelected} = props;
    const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};
  
    const handleSelect = selected => {
      setOptionSelected(selected);
      updateSelected(selected.map(branch => branch.id));
    }
  
    const changeCurrency = (evt) => {
      setCurrencyId(evt.target.value);
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

            <div className="disbursement_date_range" style={{padding:"0", border:"none"}}>
                <form onSubmit={onSubmit}>
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
                            <label className="form-label">Max Date</label>
                            <div className="reports-input-group" style={{margin:"10px 0 0", border:"none"}}>
                                <select className='report-custom-form-control currency' style={{width:"100%"}} value={currencyId} onChange={changeCurrency}>
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
                                options={[props.allOption, ...options]}
                                value={optionSelected}
                                classNamePrefix='select'
                                className='basic-multi-select'
                                placeholder='Select loan products'
                                onChange={selected => {
                                    if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                    return handleSelect(options);
                                    }
                                    handleSelect(selected);
                                }}
                                styles={style}
                            />
                            </div>
                            <button type="submit" className="btn btn-olive" style={fetchStyles} disabled={disableFetch}>Apply_Filter_!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

DateRange.defaultProps = {
    allOption: {
      label: 'Select all',
      value: '*'
    }
};

export default DateRange;