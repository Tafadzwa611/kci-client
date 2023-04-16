import React from 'react';
import { CustomInput, CustomSelect, ButtonDefault, ButtonSuccess } from '../../../../../common';
import { initialFeeValues } from './data';
import { uuidv4 } from '../../../../../utils';

function Fee({fee, index, setFieldValue, fees, loanFees}) {
  const remove = (evt) => {
    evt.preventDefault();
    setFieldValue('fees', fees.filter(f => f.id !== fee.id));
  }

  return (
    <>
      <CustomSelect label='Loan Fee' name={`fees[${index}].loanfee_id`} required>
        <option value=''>------</option>
        {loanFees.map(loanFee => <option key={loanFee.id} value={loanFee.id}>{loanFee.name}</option>)}
      </CustomSelect>
      <CustomInput label='Value' name={`fees[${index}].value`} type='number' required/>
      <div style={{marginTop:'10px'}}>
        <ButtonDefault value={'Remove Fee'} handler={remove} />
      </div>
      <div className="divider divider-default" style={{padding: "1.25rem"}}>
      </div>
    </>
  )
}

function AddFee({setFieldValue, fees}) {
  const add = (evt) => {
    evt.preventDefault();
    const feeId = uuidv4();
    setFieldValue('fees', [...fees, {...initialFeeValues, id: feeId}]);
  }

  return (
    <div style={{marginTop:'10px'}}>
      <ButtonSuccess value={'Add Fee'} handler={(evt) => add(evt)} />
    </div>
  )
}

export {Fee, AddFee};