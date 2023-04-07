import React from 'react';
import {
  ButtonDefault
} from '../../../common';

function Fee({fee, setFieldValue, values}) {
  return (
    <div>
      <div>Fee Name: {fee.fee_name}</div>
      <div>Fee Type: {fee.fee_type}</div>
      <div> Fee Payment: {fee.value} {fee.fee_payment}</div>
      {!fee.is_mandatory ?
        <div style={{marginTop:'10px'}}>
          <ButtonDefault
            value={'Remove Fee'}
            handler={(evt) => {
              evt.preventDefault();
              const feeName = fee.fee_name;
              setFieldValue('fees', values.fees.filter(fee => fee.fee_name !== feeName));
            }}
          />
        </div> :
        null
      }
    </div>
  )
}

export default Fee;