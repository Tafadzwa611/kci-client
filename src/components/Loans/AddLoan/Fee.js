import React from 'react';
import {
  ButtonDefault,
  CustomInput
} from '../../../common';

function Fee({index, fee, setFieldValue, values}) {
  return (
    <div>
      <div>Fee Name: {fee.name}</div>
      <div>Fee Type: {fee.fee_type}</div>
      <div> Fee Payment: {fee.value} {fee.fee_calculation}</div>
      <CustomInput label='Fee Value' name={`fees[${index}].value`} type='number' required/>
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
      <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
    </div>
  )
}

export default Fee;