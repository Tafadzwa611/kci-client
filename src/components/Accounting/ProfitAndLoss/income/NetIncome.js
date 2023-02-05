
import React from 'react';

function NetIncome({netIncomeFromOps, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Net Income from Operations</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          {/* <input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${netIncomeFromOps}`} readOnly/> */}
          {`${currencyIso} ${netIncomeFromOps}`}
        </td>
      </tr>
    </>
  )
}

export default NetIncome;