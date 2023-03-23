import React from 'react';
import { CustomInput, CustomSelect, CustomCheckbox, Button } from '../../../../../common';
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
      <CustomSelect label='Type' name={`fees[${index}].fee_payment`} required>
        <option value=''>------</option>
        {feePayments.map(feePayment => <option key={feePayment} value={feePayment}>{feePayment}</option>)}
      </CustomSelect>
      <CustomInput label='Amount' name={`fees[${index}].value`} type='number' required/>
      <CustomCheckbox label='Is Mandatory' name={`fees[${index}].is_mandatory`}/>
      <Button value={'Remove Fee'} handler={() => remove()} />
    </>
  )
}

function AddFee({setFieldValue, fees}) {
  const add = () => {
    const feeId = uuidv4();
    setFieldValue('fees', [...fees, {...initialFeeValues, id: feeId}]);
  }

  return (
    <Button value={'Add Fee'} handler={() => add()} />
  )
}

export {Fee, AddFee};