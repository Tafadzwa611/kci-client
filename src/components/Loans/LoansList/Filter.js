import React, {useState} from 'react';
import Select from 'react-select';

const Filter = (props) => {
    const {
        minLoanAddedOn,
        maxLoanAddedOn,
        setMinLoanAddedOn,
        setMaxLoanAddedOn,
        setSelectedBranches,
        branches,
        currencies,
        setBranchIds,
        currencyId,
        setCurrencyId,
        setStatus,
        loading,
        products,
        productId,
        setProductId,
        minPrincipalAmountDue,
        setMinPrincipalAmountDue,
        maxPrincipalAmountDue,
        setMaxPrincipalAmountDue,
        minAmountPaid,
        setMinAmountPaid,
        maxAmountPaid,
        setMaxAmountPaid,
        onSubmit,
        details,
        client,
        setClient
    } = props;
    const [optionSelected, setOptionSelected] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const selectorBranches = [...branches.map(result => ({...result, label: result.name, value:result.id}))];
    const statusValues = ['Processing', 'Open', 'Arrears', 'Fully Paid', 'Over Paid', 'Rejected', 'Written-Off', 'Restructured', 'Early Settlement'];
    const selectorStatuses = statusValues.map(val => ({label: val, value: val}));

    const handleMultiSelect = selected => {
        setOptionSelected(selected);
        setSelectedBranches(selected);
        setBranchIds(selected.map(branch => branch.id));
    }
    
    const handleStatusSelect = selected => {
        setSelectedStatus(selected);
        setStatus(selected.map(val => val.value));
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

    const changeProduct = (evt) => {
        setProductId(evt.target.value);
    }
    
    return (
        <div className="search_background">
            <form onSubmit={onSubmit}>
                <div className="row-containers" style={{border:"none"}}>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <div style={{display:"flex", justifyContent:"space-between", width:"32%", columnGap:"1rem"}}>
                            <div style={{width:"50%"}}>
                                <label className="form-label row-label">Min Disbursement Date</label>
                                <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input 
                                        className="custom-select-form row-form input-background" 
                                        type='date'
                                        value={minLoanAddedOn}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setMinLoanAddedOn(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                            <div style={{width:"50%"}}>
                                <label className="form-label row-label">Max Disbursement Date</label>
                                <div className="input-group search_input" style={{margin:"10px 0 0"}}>
                                    <i className="uil uil-calendar-alt"></i>
                                    <input 
                                        className="custom-select-form row-form input-background" 
                                        type='date'
                                        value={maxLoanAddedOn}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setMaxLoanAddedOn(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", width:"32%", columnGap:"1rem"}}>
                            <div>
                                <label className="form-label row-label">Min Principal Outstanding</label>
                                <div className="input-group" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="custom-select-form row-form input-background" 
                                        placeholder="Min Principal Outstanding" 
                                        type='number'
                                        value={minPrincipalAmountDue}
                                        placeholder='Min Principal Outstanding'
                                        onChange={(e) => setMinPrincipalAmountDue(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form-label row-label">Max Principal Outstanding</label>
                                <div className="input-group" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="custom-select-form row-form input-background" 
                                        placeholder="Max Principal Outstanding" 
                                        type='number'
                                        value={maxPrincipalAmountDue}
                                        placeholder='Max Principal Outstanding'
                                        onChange={(e) => setMaxPrincipalAmountDue(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{display:"flex", justifyContent:"space-between", width:"32%", columnGap:"1rem"}}>
                            <div>
                                <label className="form-label row-label">Min Amount Paid</label>
                                <div className="input-group" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="custom-select-form row-form input-background" 
                                        placeholder="Min Amount Paid" 
                                        type='number'
                                        value={minAmountPaid}
                                        placeholder='Min Amount Paid'
                                        onChange={(e) => setMinAmountPaid(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form-label row-label">Max Amount Paid</label>
                                <div className="input-group" style={{margin:"10px 0 0"}}>
                                    <input 
                                        className="custom-select-form row-form input-background" 
                                        placeholder="Max Amount Paid" 
                                        type='number'
                                        value={maxAmountPaid}
                                        placeholder='Max Amount Paid'
                                        onChange={(e) => setMaxAmountPaid(e.target.value)}
                                        disabled={details ? "disabled": ""}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-payments row-loans" style={{marginTop:"1rem"}}>
                        <div className="row-payments-container" style={{width:"32%"}}>
                            <Select
                                isMulti
                                name='status'
                                options={[props.allOption, ...selectorStatuses]}
                                value={selectedStatus}
                                classNamePrefix='select'
                                className='basic-multi-select'
                                placeholder='Select Status'
                                onChange={selected => {
                                    if (selected !== null && selected.length > 0 && selected[selected.length - 1].value === props.allOption.value) {
                                    return handleStatusSelect(selectorStatuses);
                                    }
                                    handleStatusSelect(selected);
                                }}
                                styles={style}
                                isDisabled={details ? true: false}
                            />
                        </div>
                        <div className="row-payments-container" style={{width:"32%"}}>
                            <div className="input-group" style={{margin:"0"}}>
                                <input 
                                    className="custom-select-form row-form input-background" 
                                    type='text'
                                    value={client}
                                    placeholder='Client Name'
                                    onChange={(e) => setClient(e.target.value)}
                                    disabled={details ? "disabled": ""}
                                />
                            </div>
                        </div>
                        <div className="row-payments-container" style={{width:"32%"}}>
                            <select className='custom-select-form row-form' value={currencyId} onChange={changeCurrency} style={{width:"100%"}} disabled={details ? "disabled": ""}>
                                {currencies.map(currency => {
                                    return <option key={currency.id} value={currency.id}>{currency.shortname}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="row row-payments row-loans" style={{marginTop:"1rem"}}>
                        <div className="row-payments-container" style={{width:"75%"}}> 
                            <Select
                                isMulti
                                name='branches'
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
                        <div className='row-payments-container' style={{width:"15%"}}>
                            <select className='custom-select-form row-form' value={productId} onChange={changeProduct} disabled={details ? "disabled": ""}>
                                <option value=''>Select Loan Product</option>
                                {products.map(product => {
                                    return <option key={product.id} value={product.id}>{product.name}</option>
                                })}
                            </select>
                        </div>
                        <span>
                            {loading ?
                            <button type='submit' className='btn btn-olive'>
                            <i className="fa fa-spinner fa-spin"></i> Please wait..
                            </button>:
                            <button type='submit' className='btn btn-olive' disabled={details ? "disabled": ""}>Apply filters!</button>}
                        </span>
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