
import React from 'react';

function IncomeAfterTax({netIncomeAfterTax, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Total Income after Tax</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}><input type='text' className='form-control well' value={`${currencyIso} ${netIncomeAfterTax}`} readOnly/></td>
      </tr>
    </>
  )
}

export default IncomeAfterTax;