
import React from 'react';

function IncomeAfterTax({netIncomeAfterTax, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Total Income after Tax</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          {/* <input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${netIncomeAfterTax}`} readOnly/> */}
          {`${currencyIso} ${netIncomeAfterTax}`}
          </td>
      </tr>
    </>
  )
}

export default IncomeAfterTax;