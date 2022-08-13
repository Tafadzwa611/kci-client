
import React from 'react';

function Banking({bankInfo, setBankInfo, setTab}) {
  const handleChange = (evt) => {
    setBankInfo(curr => {
      return {...curr, [evt.target.name]: evt.target.value}
    })
  }

  return (
    <>
      <div className='text-light'>
        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Bank Name</b></label>
          <div className='col-8'>
            <input name='bank_name' type='text' className='custom-select-form' onChange={handleChange} value={bankInfo.bank_name}/>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Bank Branch</b></label>
          <div className='col-8'>
            <input name='bank_branch' type='text' className='custom-select-form' onChange={handleChange} value={bankInfo.bank_branch}/>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Account Number</b></label>
          <div className='col-8'>
            <input name='account_number' type='text' className='custom-select-form' onChange={handleChange} value={bankInfo.account_number}/>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Mobile Money Number</b></label>
          <div className='col-8'>
            <input name='mobile_money_number' type='text' className='custom-select-form' onChange={handleChange} value={bankInfo.mobile_money_number}/>
          </div>
        </div>
      </div>
      <div className="load-more-container">
        <button onClick={e => setTab('emp')} type='button' className='btn btn-default'>Back</button>
        <button onClick={e => setTab('kin')} type='button' className='btn btn-info'>Next</button>
      </div>
    </>
  )
}

export default Banking;