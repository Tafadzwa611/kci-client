import React from 'react';

function IncomeBeforeTax({totalIncomeBeforeTax, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Total Income before Tax</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          {/* <input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${totalIncomeBeforeTax}`} readOnly/> */}
          {`${currencyIso} ${totalIncomeBeforeTax}`}
          </td>
      </tr>
    </>
  )
}

export default IncomeBeforeTax;