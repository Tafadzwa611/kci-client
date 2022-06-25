import React from 'react';

function BankingOverview({bankInfo}) {
  return (
    <div className="text-light">
      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Bank Name</label>
        <div className='col-sm-5'>
          <input name='bank_name' type='text' className='form-control well' value={bankInfo.bank_name} disabled/>
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Bank Branch</label>
        <div className='col-sm-5'>
          <input name='bank_branch' type='text' className='form-control well' value={bankInfo.bank_branch} disabled/>
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Account Number</label>
        <div className='col-sm-5'>
          <input name='account_number' type='text' className='form-control well' value={bankInfo.account_number} disabled/>
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Mobile Money Number</label>
        <div className='col-sm-5'>
          <input name='mobile_money_number' type='text' className='form-control well' value={bankInfo.mobile_money_number} disabled/>
        </div>
      </div>
    </div>
  )
}

export default BankingOverview;