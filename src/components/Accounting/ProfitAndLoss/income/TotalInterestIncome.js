import React from 'react';

function TotalInterestIncome({totalInterestIncome, currencyIso}) {
  return (
    <tr>
      <td className='text-bold bg-green'>Total Interest Income</td>
      <td className='text-bold bg-green'></td>
      <td align='right' style={{fontWeight: 'bold'}}>
        <input
          type='text'
          className='form-control well'
          value={`${currencyIso} ${totalInterestIncome}`}
          readOnly
        />
      </td>
    </tr>
  )
}

export default TotalInterestIncome;