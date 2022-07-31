import React from 'react';
import { Link } from 'react-router-dom';

function NonInterestIncome({totalNonInterestIncome, nonInterestIncome, currencyIso}) {
  const handleClick = (evt) => {
    console.log('handleClick');
  }

  return (
    <>
      <tr>
        <td className='text-bold bg-green'>Non-Interest Income</td>
        <td className='text-bold bg-green'></td>
        <td align='right' style={{fontWeight: 'bold'}}>
        <input
          name='loansAndAdvances'
          type='text'
          className='form-control well'
          value={`${currencyIso} ${totalNonInterestIncome}`}
          readOnly
        />
        </td>
      </tr>
      {(nonInterestIncome.length > 0) ? nonInterestIncome.map((nii, idx) => {
        return (
          <tr key={idx}>
            <td><Link to='#' style={{cursor: 'pointer'}} onClick={handleClick} name={nii.name} data-type={nii.name}>{nii.name}</Link></td>
            <td align='right'>
              <input type='text' name={nii.name} autoComplete='off' value={`${currencyIso} ${nii.amount}`} readOnly={true} className='form-control well'/>
            </td>
          </tr>
        )
      }) :
      <tr>
        <td><h6>No Non-Interest Income was received in the selected branches within the selected date range.</h6></td>
        <td align='right'><input type='text' autoComplete='off' value={`${currencyIso} 0.00`} readOnly={true} className='form-control well'/></td>
      </tr>}
    </>
  )
}

export default NonInterestIncome;