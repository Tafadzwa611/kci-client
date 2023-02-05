import React from 'react';

function TotalInterestIncome({totalInterestIncome, currencyIso}) {
  return (
    <tr>
      <td className='text-bold bg-green'>Total Interest Income</td>
      <td className='text-bold bg-green'></td>
      <td align='right' style={{fontWeight: 'bold'}}>
        {/* <input
          type='text'
          className='custom-select-form row-form input-background'
          value={`${currencyIso} ${totalInterestIncome}`}
          readOnly
        /> */}
        {`${currencyIso} ${totalInterestIncome}`}
      </td>
    </tr>
  )
}

export default TotalInterestIncome;