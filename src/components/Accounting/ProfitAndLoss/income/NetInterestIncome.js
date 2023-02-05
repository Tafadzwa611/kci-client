import React from 'react';

function NetInterestIncome({netInterestIncome, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Net Interest Income</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          {/* <input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${netInterestIncome}`} readOnly/> */}
          {`${currencyIso} ${netInterestIncome}`}
        </td>
      </tr>
    </>
  )
}

export default NetInterestIncome;