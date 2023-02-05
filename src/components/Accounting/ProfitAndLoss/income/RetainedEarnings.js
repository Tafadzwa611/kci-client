import React from 'react';

function RetainedEarnings({retainedEarnings, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Retained Earnings from Operations</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          {/* <input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${retainedEarnings}`} readOnly/> */}
          {`${currencyIso} ${retainedEarnings}`}
      </td>
      </tr>
    </>
  )
}

export default RetainedEarnings;