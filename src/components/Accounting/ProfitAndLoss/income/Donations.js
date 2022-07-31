import React from 'react';

function Donations({totalDonations, currencyIso}) {
  return (
    <>
      <tr>
        <td className='text-bold bg-gray'>Donations</td>
        <td className='text-bold bg-gray'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
          <input type='text' className='form-control well' value={`${currencyIso} ${totalDonations}`} readOnly/>
        </td>
      </tr>
    </>
  )
}

export default Donations;