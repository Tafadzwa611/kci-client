import React from 'react';

function BankingOverview({bankInfo}) {
  return (
    <div className="text-light">
      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>Bank Name</label>
        <div className='col-8'>
          <input name='bank_name' type='text' className='custom-select-form' value={bankInfo.bank_name} disabled/>
        </div>
      </div>

      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>Bank Branch</label>
        <div className='col-8'>
          <input name='bank_branch' type='text' className='custom-select-form' value={bankInfo.bank_branch} disabled/>
        </div>
      </div>

      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>Account Number</label>
        <div className='col-8'>
          <input name='account_number' type='text' className='custom-select-form' value={bankInfo.account_number} disabled/>
        </div>
      </div>

      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>Mobile Money Number</label>
        <div className='col-8'>
          <input name='mobile_money_number' type='text' className='custom-select-form' value={bankInfo.mobile_money_number} disabled/>
        </div>
      </div>
    </div>
  )
}

export default BankingOverview;