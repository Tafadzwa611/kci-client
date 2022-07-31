import React from 'react';

function IncomeBeforeTax({totalIncomeBeforeTax, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Total Income before Tax</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}><input type='text' className='form-control well' value={`${currencyIso} ${totalIncomeBeforeTax}`} readOnly/></td>
      </tr>
    </>
  )
}

export default IncomeBeforeTax;