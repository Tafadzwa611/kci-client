import React from 'react';
import CreateExpenseModal from '../CreateExpenseModal';
import Select from 'react-select';


const Filter = (props) => {

    const {
        expName,
        setExpName,
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
        setExpenses,
        changeCurrency,
        searching,
        setSearching,
        branches,
        setBranchIds,
        details
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
            {/* <CreateExpenseModal open={open} setOpen={setOpen} setExpenses={setExpenses} />
            <div style={{marginBottom:"1.5rem"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Expense</button>
            </div> */}
            <form onSubmit={onSubmit}>

                <div className="text-light search_background">

                    <div className="disbursement_date_range" style={{border:"none"}}>

                        <div className="disbursement-report-fields">
                            <div style={{width:"100%"}}>
                                <label className="form-label">Min Date Created</label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input 
                                        className="reports-form-control" 
                                        type="date" 
                                        value={minDateCreated}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setMinDateCreated(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                            <div style={{width:"100%"}}>
                                <label className="form-label">Max Date Created</label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input 
                                        className="reports-form-control" 
                                        type="date" 
                                        value={maxDateCreated}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setMaxDateCreated(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                            <div style={{width:"100%"}}>
                                <label className="form-label">Search</label>
                                <div className="reports-input-group search_input" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="reports-form-control" 
                                        placeholder="Enter Expense Name..."
                                        autoComplete='off'
                                        type="text"
                                        value={expName}
                                        onChange={(e) => setExpName(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop:"1rem"}}>
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
                                        isDisabled={details ? true: false}
                                    />
                                </div>
                                <select className="report-custom-form-control currency" value={currencyId} onChange={changeCurrency} style={{width:"15%"}} disabled={details ? "disabled": ""}>
                                    {currency.map(cur => {
                                        return <option key={cur.id} value={cur.id}>{cur.shortname}</option>
                                    })}
                                </select>
                                {searching ?
                                    <button type="submit" className="btn btn-olive" style={{opacity:"0.7", cursor:"none"}}>Searching</button>:
                                    <button type="submit" className="btn btn-olive" disabled={details ? "disabled": ""}>Search</button>
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