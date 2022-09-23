import React from 'react';
import Select from 'react-select';

const Filter = (props) => {

    const {
        clientName,
        setClientName,
        currency,
        currencyId,
        setCurrencyId,
        minDateCreated,
        setMinDateCreated,
        maxDateCreated,
        setMaxDateCreated,
        onSubmit,
        open,
        setOpen,
        setPayments,
        changeCurrency,
        searching,
        setSearching,
        branches,
        setBranchIds,
    } = props;

    const style = {
        control: base => ({
            ...base,
            border: '1px solid #dee2e6',
            boxShadow: "none",
            '&:hover':'1px solid #dee2e6',
        })
    };

    const [optionSelected, setOptionSelected] = React.useState([]);
    const selectorBranches = [...branches.map(result => ({...result, label: result.name, value:result.id}))];
  
    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setBranchIds(selected.map(branch => branch.id));
    }

    return (
        <div>
            <form onSubmit={onSubmit}>

                <div className="text-light">

                    <div className="disbursement_date_range">

                        <div className="disbursement-report-fields">
                            <div style={{width:"100%"}}>
                                <label className="form-label">Min Col Date</label>
                                <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input 
                                        className="reports-form-control" 
                                        type="date" 
                                        value={minDateCreated}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setMinDateCreated(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{width:"100%"}}>
                                <label className="form-label">Max Col Date</label>
                                <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input 
                                        className="reports-form-control" 
                                        type="date" 
                                        value={maxDateCreated}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setMaxDateCreated(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div style={{width:"100%"}}>
                                <label className="form-label">Search Client</label>
                                <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="reports-form-control" 
                                        placeholder="Enter Expense Name..."
                                        autoComplete='off'
                                        type="text"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop:"20px"}}>
                            <div className="disbursement-report-fields">
                                <div className="row-payments-container" style={{width:"75%"}}>
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
                                <select className="report-custom-form-control currency" value={currencyId} onChange={changeCurrency} style={{width:"15%"}}>
                                    {currency.map(cur => {
                                        return <option key={cur.id} value={cur.id}>{cur.shortname}</option>
                                    })}
                                </select>
                                {searching ?
                                    <button type="submit" className="btn btn-info" style={{opacity:"0.7", cursor:"none"}}>Searching</button>:
                                    <button type="submit" className="btn btn-info" >Search</button>
                                }
                            </div>
                        </div>

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