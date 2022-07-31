
import React from 'react';

function NetIncome({netIncomeFromOps, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Net Income from Operations</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          <input type='text' className='form-control well' value={`${currencyIso} ${netIncomeFromOps}`} readOnly/>
        </td>
      </tr>
    </>
  )
}

export default NetIncome;