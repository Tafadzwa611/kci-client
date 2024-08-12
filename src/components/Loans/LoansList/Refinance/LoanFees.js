import React from 'react';
import { ButtonDefault } from '../../../../common';

function LoanFees({fee, setFieldValue, values}) {
  const removeFees = (evt) => {
    evt.preventDefault();
    setFieldValue('fees', values.fees.filter(fee => fee.id != evt.target.id));
  }

  return (
    <div>
      <div>Fee Name: {fee.name}</div>
      <div>Fee Type: {fee.fee_type}</div>
      <div> Fee Payment: {fee.value} {fee.fee_calculation}</div>
      <div style={{marginTop:'10px'}}>
        <ButtonDefault id={fee.id} value='Remove Fee' handler={removeFees}/>
      </div>
    </div>
  )
}

export default LoanFees;