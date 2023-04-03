import React, { useState } from 'react';
import {
  CustomInput,
} from '../../../common';

function Fee({fee, setFieldValue, values}) {
  const [value, setValue] = useState(fee.value);

  const onChange = (evt) => {
    setValue(evt.target.value);
    setFieldValue('fees', values.fees.map(fee => {
      if (fee.fee_name === evt.target.name) {
        return {fee_name: fee.fee_name, fee_type: fee.fee_type, fee_payment: fee.fee_payment, value: evt.target.value}
      }
      return fee
    }));
  }

  return (
    <>
      {fee.is_mandatory ?
      <CustomInput label={fee.fee_name} name={fee.fee_name} value={value} type='number' onChange={onChange} required/> :
      <CustomInput label={fee.fee_name} name={fee.fee_name} value={value} onChange={onChange} type='number'/>}
      <small><em>Fee Type: {fee.fee_type}</em></small>
      <small><em> Fee Payment: {fee.fee_payment}</em></small>
    </>
  )
}

export default Fee;