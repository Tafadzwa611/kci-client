import React from 'react';

function DateRange(props) {
  const disableFetch = props.rDate === '' || props.accountId === '';

  return (
    <div className="col-12 font-12 balance_sheet_date_range text-light" style={{border:"none", padding:"0"}}>
      <form onSubmit={props.onSubmit}>
        <div className="row" style={{display:"flex", columnGap:"1px", alignItems:"center", marginTop:"0"}}>
          <div className="input-group" style={{margin:"0"}}>
              <i className="uil uil-calendar-alt"></i>
              <input
                type='date'
                className='form-control input-background'
                max={props.currentDate}
                value={props.rDate}
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => props.setRDate(e.target.value)}
                style={{width:"400px", height:"auto"}}
              />
          </div>
          <div style={{width:"400px", margin:"10px"}}>
            <select className='report-custom-form-control currency' style={{width:"100%"}} value={props.accountId} onChange={e => props.setAccountId(e.target.value)}>
              <option value={''}></option>
              {props.accounts.map(account => {
                return (
                  <option key={account.id} value={account.id}>
                  {account.currency} {account.label} {account.branch}
                  </option>
                )
              })}
            </select>
          </div>
          <div style={{display:"flex", columnGap:"10px", margin:"10px"}}>
            {props.loading ? <button type='submit' className='btn btn-olive' style={{pointerEvents: 'none', opacity: '0.7'}}>
              Please wait..
            </button> :
            <button type='submit' className='btn btn-olive' style={disableFetch ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disableFetch}>
              Apply_filters_!
            </button>}
          </div>
        </div>
      </form>
    </div>
  )
}

export default DateRange;