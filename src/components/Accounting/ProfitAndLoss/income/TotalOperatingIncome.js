import React from 'react';

function TotalOperatingIncome({totalOperatingIncome, currencyIso}) {
  return (
    <tr>
      <td className='text-bold bg-gray'>Total Operating Income</td>
      <td className='text-bold bg-gray'></td>
      <td align='right' style={{fontWeight: 'bold'}}>
        <input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${totalOperatingIncome}`} readOnly/>
      </td>
    </tr>
  )
}

export default TotalOperatingIncome;