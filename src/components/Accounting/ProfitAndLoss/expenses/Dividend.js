import React from 'react';

function Dividend({totalDividend, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold'>Dividend</td>
        <td className='text-bold'></td>
        <td align='right' style={{fontWeight: 'bold'}}><input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${totalDividend}`} readOnly/></td>
      </tr>
    </>
  )
}

export default Dividend;