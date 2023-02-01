import React from 'react';

function Filter({
    currencyId,
    setCurrencyId,
    currencies,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    paymentBranchId,
    setPaymentBranchId,
    loanBranchId,
    setLoanBranchId,
    branches,
    accounts,
    paymentFundAccountId,
    setPaymentFundAccountId,
    loanFundAccountId,
    setLoanFundAccountId,
    loanNumber,
    setLoanNumber,
    disableFetch,
    loading,
    onSubmit,
    mode,
    setMode
}) {
    const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};
    return (
        <form>
            <div className="row-containers" style={{padding:"0", border:"none"}}>
                <div className="row row-payments">
                    <div className="row-payments-container">
                        <label className="form-label row-label">Currency<span style={{color: 'red'}}>*</span></label>
                        <select className='custom-select-form row-form' value={currencyId} onChange={e => setCurrencyId(e.target.value)} style={{margin:"10px 0 0"}}>
                            <option value=''>Select Currency</option>
                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
                        </select>
                    </div>

                    <div className="row-payments-container">
                        <label className="form-label row-label">Start Value Date<span style={{color: 'red'}}>*</span></label>
                        <div className="input-group" style={{margin:"10px 0 0"}}>
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
                        <label className="form-label row-label">End Value Date<span style={{color: 'red'}}>*</span></label>
                        <div className="input-group" style={{margin:"10px 0 0"}}>
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
                        <label className="form-label row-label">Loan Number</label>
                        <div className="input-group" style={{margin:"10px 0 0"}}>
                            <input
                                step='1'
                                type='number'
                                value={loanNumber}
                                onKeyDown={(e) => {if(e.key==='.')e.preventDefault()}}
                                onChange={(e) => setLoanNumber(e.target.value)}
                                className='custom-select-form row-form input-background'
                            />
                        </div>
                    </div>

                </div>

                <div className="row row-payments" style={{marginTop:"1rem"}}>
                    <div className="row-payments-container">
                        <select className='custom-select-form row-form' value={paymentBranchId} onChange={e => setPaymentBranchId(e.target.value)}>
                            <option value=''>Select Payment Branch</option>
                            {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                        </select>
                    </div>

                    <div className="row-payments-container">
                        <select className='custom-select-form row-form' value={loanBranchId} onChange={e => setLoanBranchId(e.target.value)}>
                            <option value=''>Select Loan Branch</option>
                            {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
                        </select>
                    </div>

                    <div className="row-payments-container">
                        <select className='custom-select-form row-form' value={paymentFundAccountId} onChange={e => setPaymentFundAccountId(e.target.value)}>
                            <option value=''>Select Payment Fund Account</option>
                            {accounts.filter(acc => acc.currency_id == currencyId).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
                        </select>
                    </div>

                    <div className="row-payments-container">
                        <select className='custom-select-form row-form' value={loanFundAccountId} onChange={e => setLoanFundAccountId(e.target.value)}>
                            <option value=''>Select Loan Fund Account</option>
                            {accounts.filter(acc => acc.currency_id == currencyId).map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
                        </select>
                    </div>


                </div>

                <div className='form-group row'>

                    <div className='col-3'>
                        <span className='input-group-btn'>
                        {
                            loading ?
                            <button type='submit' className='btn btn-olive'><i className='fa fa-spinner fa-spin'></i> Please wait..</button> :
                            <button type='submit' name='ledger' className='btn btn-olive' onClick={onSubmit} style={fetchStyles} disabled={disableFetch}>Apply Filters!</button>
                        }
                        </span>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default Filter;