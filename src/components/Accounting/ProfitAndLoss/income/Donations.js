import React from 'react';

function Donations({totalDonations, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Donations</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          <input type='text' className='custom-select-form row-form input-background' value={`${currencyIso} ${totalDonations}`} readOnly/>
        </td>
      </tr>
    </>
  )
}

export default Donations;