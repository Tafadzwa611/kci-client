import React from 'react';

function Filter({
  accs,
  accId,
  setAccId,
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  branchId,
  setBranchId,
  branches,
  currencies,
  currencyId,
  setCurrencyId,
  loading,
  disableFetch,
  mode,
  setMode,
  onSubmit
}) {
  const fetchStyles = disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {};

  return (
    <form>
      <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0"}}>
        <div className='row-payments-container'>
          <label className='form-label row-label'>Start Booking Date</label>
          <div className='input-group' style={{margin:"0px"}}>
            <input
              type='date'
              value={minDate}
              onKeyDown={(e) => e.preventDefault()}
              onChange={(e) => setMinDate(e.target.value)}
              className='custom-select-form row-form input-background'
            />
          </div>
        </div>

        <div className='row-payments-container'>
          <label className='form-label row-label'>End Booking Date</label>
          <div className='input-group' style={{margin:"0px"}}>
            <input
              type='date'
              value={maxDate}
              onKeyDown={(e) => e.preventDefault()}
              onChange={(e) => setMaxDate(e.target.value)}
              className='custom-select-form row-form input-background'
            />
          </div>
        </div>

        <div className='row-payments-container'>
          <label className='form-label row-label'>Select Currency</label>
            <select className='custom-select-form row-form' value={currencyId} onChange={e => setCurrencyId(e.target.value)}>
              <option value=''>Select Currency</option>
              {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.shortname}</option>)}
            </select>
        </div>
      </div>



      <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", marginTop:"1rem"}}>
        <div className='row-payments-container'>
            <select className='custom-select-form row-form' value={branchId} onChange={e => setBranchId(e.target.value)}>
              <option value=''>Select Branch</option>
              {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
            </select>
        </div>

        <div className='row-payments-container'>
            <select className='custom-select-form row-form' value={accId} onChange={e => setAccId(e.target.value)}>
              <option value=''>Select Account</option>
              {accs.map(acc => <option key={acc.id} value={acc.id}>{acc.general_ledger_code} {acc.general_ledger_name}</option>)}
            </select>
        </div>

        <div className='row-payments-container'>
          <div className='input-group' style={{margin:"0px"}}>
            <select className='custom-select-form row-form' value={mode} onChange={e => setMode(e.target.value)}>
              <option value='ledger'>Screen (HTML)</option>
              <option value='ledger_excel'>Excel</option>
            </select>
          </div>
        </div>
      </div>

      <div className="view_search_container online__applications font-13" style={{border:"none", padding:"0", marginTop:"1rem", justifyContent:"flex-end"}}>
        <div className='row-payments-container' style={{alignItems:"flex-end"}}>
          <span className='input-group-btn'>
            {
              loading ?
              <button type='submit' className='btn btn-olive'>
                <i className="fa fa-spinner fa-spin"></i> Please wait..
              </button> :
              <button type='submit' name='ledger' className='btn btn-olive' onClick={onSubmit} style={fetchStyles} disabled={disableFetch}>Apply_Filters_!</button>
            }
          </span>
        </div>
      </div>
    </form>
  )
}

export default Filter;