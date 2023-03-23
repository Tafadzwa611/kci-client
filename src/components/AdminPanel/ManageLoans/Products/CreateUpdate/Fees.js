import React from 'react';
import { CustomInput, CustomSelect, CustomCheckbox, ButtonDefault, ButtonSuccess } from '../../../../../common';
import { initialFeeValues } from './data';
import { uuidv4 } from '../../../../../utils';

function Fee({id, index, setFieldValue, fees}) {
  const feeTypes = ['Deducted', 'Capitalized', 'Upfront Disbursement', 'Payment due', 'Manual fees'];
  const feePayments = ['Flat', 'Flat/Installments', '% Of DB Amount', '% Of DB Amount/Installments'];

  const remove = () => {
    setFieldValue('fees', fees.filter(fee => fee.id !== id));
  }

  return (
    <>
      <CustomInput label='Fee Name' name={`fees[${index}].fee_name`} type='text' required/>
      <CustomSelect label='Type' name={`fees[${index}].fee_type`} required>
        <option value=''>------</option>
        {feeTypes.map(feeType => <option key={feeType} value={feeType}>{feeType}</option>)}
      </CustomSelect>
      <CustomSelect label='Fee Payment' name={`fees[${index}].fee_payment`} required>
        <option value=''>------</option>
        {feePayments.map(feePayment => <option key={feePayment} value={feePayment}>{feePayment}</option>)}
      </CustomSelect>
      <CustomInput label='Amount' name={`fees[${index}].value`} type='number' required/>
      <CustomCheckbox label='Is Mandatory' name={`fees[${index}].is_mandatory`}/>
      <div style={{marginTop:'10px'}}>
        <ButtonDefault value={'Remove Fee'} handler={() => remove()} />
      </div>
      <div className="divider divider-default" style={{padding: "1.25rem"}}>
      </div>
    </>
  )
}

function AddFee({setFieldValue, fees}) {
  const add = () => {
    const feeId = uuidv4();
    setFieldValue('fees', [...fees, {...initialFeeValues, id: feeId}]);
  }

  return (
    <div style={{marginTop:'10px'}}>
      <ButtonSuccess value={'Add Fee'} handler={() => add()} />
    </div>
  )
}

export {Fee, AddFee};