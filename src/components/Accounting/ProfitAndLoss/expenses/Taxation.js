import React from 'react';

function Taxation({totalTaxation, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold'>Taxation</td>
        <td className='text-bold'></td>
        <td align='right' style={{fontWeight: 'bold'}}><input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${totalTaxation}`} readOnly/></td>
      </tr>
    </>
  )
}

export default Taxation;